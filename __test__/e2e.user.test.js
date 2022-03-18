import request from "supertest";
import app from "../src/index";

describe("user Test", () => {
  let token;
  beforeAll(() => {
    request(app)
      .post("/api/v1/login")
      .send({
        email: "jean@gmail.com",
        password: "password",
      })
      .then((res) => {
        token = res.body.token;
      });
  });
  let user, res;
  it("it user exist", async () => {
    user = {
      firstname: "iradukunda",
      lastname: "jean De dieu",
      username: "dedsec",
      password: "password",
      confirmpassword: "password",
      email: "jean@gmail.com",
    };

    res = await request(app).post("/api/v1/user").send(user);
    expect(res.status).toBe(400);
  }, 50000);

  it("it create user", async () => {
    user = {
      firstname: "iradukunda",
      lastname: "jean De dieu",
      username: "dedsec",
      password: "password",
      confirmpassword: "password",
      email: "test@gmail.com",
    };
    res = await request(app).post("/api/v1/user").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toContain("Created successfully");
  }, 50000);

  it("Internal Server error", async () => {
    res = await request(app).post("/api/v1/user").send(user);
    expect(res.status).toBe(500);
  }, 50000);

  describe("get All Users errors", () => {
    it("Get all useer", async () => {
      res = await request(app)
        .get("/api/v1/user")
        .set("Authorization", "Bear " + token);
      expect(res.status).toBe(401);
      expect(res.body.message).toContain(
        "You don't have permission to perform"
      );
    }, 50000);
  });
});
