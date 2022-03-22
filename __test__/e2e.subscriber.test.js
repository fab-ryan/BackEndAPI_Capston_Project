import request from "supertest";
import app from "../src";
import subscriberModel from "../src/model/subscriberModel";

describe("Subscriber Testing", () => {
  let token, res, id;

  beforeAll(async () => {
    await request(app)
      .post("/api/v1/login")
      .send({
        email: "admin@gmail.com",
        password: "password",
      })
      .then((res) => {
        token = res.body.token;
      });
  }, 50000);

  // let email = {
  //   email: "test1@gmail.com",
  // };
  describe("POST SUBSCRIBER", () => {
    it("postSubscriber", async () => {
      res = await request(app)
        .post("/api/v1/subscriber")
        .send({ email: "test@gmail.com" });
      expect(res.status).toBe(201);
      id = res.body.data._id;
    }, 50000);
    it("postSubscriber", async () => {
      res = await request(app)
        .post("/api/v1/subscriber")
        .send({ email: "NewTest@gmail.com" });
      expect(res.status).toBe(400);
    }, 50000);
  });
  describe("GET ALL SUBSCRIBERS", () => {
    it("allSubscriber", async () => {
      res = await request(app)
        .get("/api/v1/subscriber")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("GET ONE SUBSCRIBER", () => {
    it("no id found in subscriber", async () => {
      const obj = new subscriberModel();
      res = await request(app)
        .get("/api/v1/subscriber/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(400);
    }, 50000);
    it("id found in subscriber", async () => {
      res = await request(app)
        .get("/api/v1/subscriber/623915f466433a58e293ec8e")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("DELETE", () => {
    it("delete with incorrect id", async () => {
      const obj = new subscriberModel();
      res = await request(app)
        .delete("/api/v1/subscriber/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(400);
    }, 50000);
    it("delete with invalid id ", async () => {
      const obj = new subscriberModel();
      res = await request(app)
        .delete("/api/v1/subscriber/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
    it("delete with correct id id ", async () => {
      const obj = new subscriberModel();
      res = await request(app)
        .delete("/api/v1/subscriber/" + id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(201);
    }, 50000);
  });
});
