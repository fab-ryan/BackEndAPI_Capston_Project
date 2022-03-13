import request from "supertest";
import app from "../src";

describe("Blog test", () => {
  describe("All Blogs", () => {
    let user, res;
    test("All Blogs", async () => {
      res = await request(app).get("/blog");
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("all Blogs");
    });
  }, 5000);
});
