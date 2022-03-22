import request from "supertest";
import app from "../src";
describe("TESTING UTILS", () => {
  let res, token, id;
  describe("LOGIN TESTING POINT", () => {
    it("LOGIN TEST with correct password", async () => {
      res = await request(app).post("/api/v1/login").send({
        email: "admin@gmail.com",
        password: "password",
      });
      expect(res.status).toBe(201);
    }, 50000);
    it("LOGIN TEST with INcorrect password", async () => {
      res = await request(app).post("/api/v1/login").send({
        email: "admin@gmail.com",
        password: "passworddd",
      });
      expect(res.status).toBe(401);
    }, 50000);
    it("LOGIN TEST with UserNot found", async () => {
      res = await request(app).post("/api/v1/login").send({
        email: "adn@gmail.com",
        password: "password",
      });
      expect(res.status).toBe(403);
    }, 50000);
    it("LOGIN TEST with internal server error ", async () => {
      res = await request(app).post("/api/v1/login").send({
        password: "password",
      });
      expect(res.status).toBe(403);
    }, 50000);
  });
  describe("TESTING URL", () => {
    it("responses", async () => {
      res = await request(app).post("/login");
      expect(res.status).toBe(404);
    }, 50000);
  });
});
