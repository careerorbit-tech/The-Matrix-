import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  setupAuth(app);

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
