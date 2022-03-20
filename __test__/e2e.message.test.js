import app from "../src";
import request from "supertest";
describe("Message Post", () => {
  let token;
  beforeAll(
    async () =>
      await request(app)
        .post("/api/v1/login")
        .send({
          email: "admin@gmail.com",
          password: "password",
        })
        .then((res) => {
          token = res.body.token;
        })
  );
  let message, res;
  it("Send Message", async () => {
    message = {
      name: "jean",
      email: "jean@gmail.com",
      message: "kslkaslkalsklkl",
    };
    res = await request(app)
      .post("/api/v1/message")
      .set("Authorization", "Bear " + token)
      .send(message);
    expect(res.status).toBe(201);
  }, 50000);
  it("Send Message", async () => {
    message = {
      name: "jean",
      email: "jean@gmail.com",
      message: "",
    };
    res = await request(app)
      .post("/api/v1/message")
      .set("Authorization", "Bear " + token)
      .send(message);
    expect(res.error).toContain("Message is Required");
  }, 50000);
  it("Send Message", async () => {
    message = {
      name: "jean",
      email: "jean@gmail.com",
      message: "jkljlkjlkj",
    };
    res = await request(app)
      .post("/api/v1/message")
      .set("Authorization", "Bear " + token)
      .send(message);
    expect(res.error).toContain("Email is required");
  }, 50000);
  it("Get all Messages unauthanticated user", async () => {
    res = await request(app)
      .get("/api/v1/messages")
      .set("Authorization", "Bearer" + token);
    expect(res.status).toBe(403);
  }, 50000);
  it("Get One Message an unathenticated user", async () => {
    res = await request(app)
      .get("/api/v1/message/62373c3c94fbb7f9fc8cbadf")
      .set("Authorization", "Bearer" + token);
    expect(res.status).toBe(403);
  }, 50000);

  it("Get all Messages user", async () => {
    res = await request(app)
      .get("/api/v1/messages")
      .set("Authorization", "Bearer" + token);
    expect(res.status).toBe(200);
  }, 50000);
  it("Get all Messages user", async () => {
    res = await request(app)
      .get("/api/v1/message/62373c3c94fbb7f9fc8cbadf")
      .set("Authorization", "Bearer" + token);
    expect(res.status).toBe(200);
  }, 50000);
}, 50000);
