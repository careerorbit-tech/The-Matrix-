import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";
import { kv } from "@vercel/kv";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      fullName: insertUser.fullName ?? null,
      email: insertUser.email ?? null,
      avatar: insertUser.avatar ?? null,
      bio: insertUser.bio ?? null,
      reason: insertUser.reason ?? null,
      interestType: insertUser.interestType ?? null,
      role: insertUser.role ?? "user",
      createdAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, update: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...update } as User;
    this.users.set(id, updated);
    return updated;
  }
}

export class KVStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await kv.get<User>(`user:${id}`);
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find(u => u.username === username);
  }

  async getUsers(): Promise<User[]> {
    const keys = await kv.keys('user:*');
    if (keys.length === 0) return [];
    const users = await kv.mget<User[]>(...keys);
    return users.filter((u): u is User => u !== null);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      fullName: insertUser.fullName ?? null,
      email: insertUser.email ?? null,
      avatar: insertUser.avatar ?? null,
      bio: insertUser.bio ?? null,
      reason: insertUser.reason ?? null,
      interestType: insertUser.interestType ?? null,
      role: insertUser.role ?? "user",
      createdAt: new Date().toISOString()
    };
    await kv.set(`user:${id}`, user);
    return user;
  }

  async updateUser(id: string, update: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    const updated = { ...user, ...update } as User;
    await kv.set(`user:${id}`, updated);
    return updated;
  }
}

// Automatically use KV if configured, else fallback to Memory
export const storage = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  ? new KVStorage()
  : new MemStorage();
