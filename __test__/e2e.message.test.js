//  "?klsk
import app from "../src";
import request from "supertest";
describe("Message Post", () => {
  let token;
  beforeAll(() =>
    request(app)
      .post("/api/v1/login")
      .send({
        email: "jean@gmail.com",
        password: "password",
      })
      .then((res) => {
        token = res.body.token;
      })
  );
  let message, res;
  message = {
    name: "jean",
    email: "jean@gmail.com",
    message: "kslkaslkalsklkl",
  };
  it("Send Message", async () => {
    res = await request(app)
      .post("/api/v1/messages")
      .set("Authorization", "Bear " + token)
      .send(message);
    expect(res.status).toBe(201);
  },50000);
});
