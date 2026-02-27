import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { redis } from "./redis";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  setupAuth(app);

  app.get("/api/redis-test", async (_req, res) => {
    try {
      if (!redis) {
        return res.status(503).json({
          message: "Redis is not configured locally.",
          hint: "Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in your environment."
        });
      }
      // Set a test value
      await redis.set("test_key", "Upstash Redis is working!");
      // Get the test value
      const result = await redis.get("test_key");
      res.json({ result, status: "success" });
    } catch (err) {
      console.error("Redis error:", err);
      res.status(500).json({ message: "Failed to connect to Redis", error: String(err) });
    }
  });

  app.get("/api/users", async (_req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/sync-users", async (req, res) => {
    try {
      const { users } = req.body;
      if (!Array.isArray(users)) return res.status(400).send("Invalid users data");

      // Simple sync: merge with existing users
      for (const user of users) {
        const existing = await storage.getUserByUsername(user.username);
        if (!existing) {
          await storage.createUser(user);
        }
      }
      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ message: "Failed to sync users" });
    }
  });

  return httpServer;
}
