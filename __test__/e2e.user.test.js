import request from "supertest";
import app from "../src/index";

describe("user Test", () => {
  let user, res;
  describe("test signup", () => {
    try {
      test("it user exist", async () => {
        user = {
          firstname: "iradukunda",
          lastname: "jean De dieu",
          username: "dedsec",
          password: "password",
          confirmpassword: "password",
          email: "jean@gmail.com",
        };

        res = await request(app).post("/user").send(user);
        if (res)
          expect(res.body.error).toContain(
            `User with this email ${user.email} is exists`
          );
      });
      test("it create user", async () => {
        user = {
          firstname: "iradukunda",
          lastname: "jean De dieu",
          username: "dedsec",
          password: "password",
          confirmpassword: "password",
          email: "test@gmail.com",
        };
        res = await request(app).post("/user").send(user);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toContain("Created successfully");
      });
    } catch (e) {
      test("Internal Server error", async () => {
        res = await request(app).post("/user").send(user);
        await expect(res.status).toBe(500);
      });
    }
  });
  describe("get ALL Users", () => {
    test("Get all useer", async () => {
      res = await request(app).get("/user");
      expect(res.status).toBe(200);
      expect(res.body.message).toContain('"All user Registered');
    });
  });
}, 5000);
