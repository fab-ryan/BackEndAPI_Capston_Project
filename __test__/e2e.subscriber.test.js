import request from "supertest";
import app from "../src";
describe("Subscriber Testing", () => {
  let token, res;
  let email = {
    email: "test1@gmail.com",
  };
  it("postSubscriber", async () => {
    res = await request(app).post("/subscriber").send(email);
    expect(res.status).toBe(201)
  },50000);
});
