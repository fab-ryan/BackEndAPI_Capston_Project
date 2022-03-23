import app from "../src";
import messageModel from "../src/model/messageModel";
import request from "supertest";
import commentModel from "../src/model/commentModel";

describe("Message Ends", () => {
  let token;
  let message, res, id;

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
        }),
    50000
  );
  describe("TESTING OF SENG MESSAGE", () => {
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
      id = res.body.data._id;
    }, 50000);
  });
  describe("MISSING MESSAGE", () => {
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
      expect(res.error).toBe(false);
    }, 50000);
    it("Send Message with missing name", async () => {
      message = {
        name: "",
        email: "jean@gmail.com",
        message: "Hello Message is there",
      };
      res = await request(app)
        .post("/api/v1/message")
        .set("Authorization", "Bear " + token)
        .send(message);
      expect(res.error).toBe(false);
    }, 50000);
  });
  describe("MISSING EMAIL", () => {
    it("Send Message", async () => {
      message = {
        name: "jean",
        email: "",
        message: "jkljlkjlkj",
      };
      res = await request(app)
        .post("/api/v1/message")
        .set("Authorization", "Bear " + token)
        .send(message);
      expect(res.error).toBe(false);
    }, 50000);
    it("Invalid Email", async () => {
      message = {
        name: "jean",
        email: "@gmail.com",
        message: "jkljlkjlkj",
      };
      res = await request(app)
        .post("/api/v1/message")
        .set("Authorization", "Bear " + token)
        .send(message);
      expect(res.error).toBe(false);
    }, 50000);
  });
  describe("UNAUTHONTICATED USER", () => {
    it("Get all Messages unauthanticated user", async () => {
      res = await request(app)
        .get("/api/v1/messages")
        .set("Authorization", "Bearer" + token);
      expect(res.status).toBe(403);
    }, 50000);
  });
  describe("GET ONE MESSAGE ERROR", () => {
    it("Get One Message an unathenticated user", async () => {
      res = await request(app)
        .get("/api/v1/message/62373c3c94fbb7f9fc8cbadf")
        .set("Authorization", "Bearer" + token);
      expect(res.status).toBe(403);
    }, 50000);
  });
  describe("GET ALL MESSAGE FOR UNAUTHORIZES USER ", () => {
    it("Get all Messages user", async () => {
      res = await request(app)
        .get("/api/v1/messages")
        .set("Authorization", "Bearer" + token);
      expect(res.status).toBe(403);
    }, 50000);
  });
  describe("INCOMPLETE EMAIL", () => {
    it("Incomplete email ", async () => {
      message = {
        name: "jean",
        email: "ryalfabrice",
        message: "jkljlkjlkj",
      };
      res = await request(app)
        .post("/api/v1/message")
        .set("Authorization", "Bear " + token)
        .send(message);
      expect(res.error).toBe(false);
    }, 50000);
  });
  describe("DELETE MESSAGE ID", () => {
    it("Delete Message", async () => {
      res = await request(app)
        .delete(`/api/v1/message/id`)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
  });
  describe("DELETE  MESSAGE", () => {
    it("No Message with this Id", async () => {
      const obj = new commentModel();
      res = await request(app)
        .delete("/api/v1/message/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
  });
  describe("DELETE  MESSAGE", () => {
    it(" Message with this Id", async () => {
      const obj = new messageModel();
      res = await request(app)
        .delete("/api/v1/message/" + id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(201);
    }, 50000);
  });
  describe("UPDATE MESSAGE WITH", () => {
    it("correct Id", async () => {
      const obj = new messageModel();
      res = await request(app)
        .patch("/api/v1/message/" + obj._id)
        .send({ name: "jean", email: "ryalfabrice", message: "jkljlkjlkj" })
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 500000);
  });
  describe("Wrong Id", () => {
    it("wrong Id", async () => {
      res = await request(app)
        .patch("/api/v1/message/uiyiuyiuy9s7721")
        .send({ name: "jean", email: "ryalfabrice", message: "jkljlkjlkj" })
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 500000);
  });
  describe("Internal server ", () => {
    it("Internal server error", async () => {
      res = await request(app)
        .patch("/api/v1/message/id")
        .send({ name: "jean", email: "ryalfabrice", message: "jkljlkjlkj" })
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 500000);
  });
  describe("GETTING SINGLE MESSAGE", () => {
    it("Getting one messa", async () => {
      res = await request(app)
        .get("/api/v1/message/6238fdb0576d13581d3a17ad")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("GETTING SINGLE MESSAGE", () => {
    it("Getting one messag with wrong id", async () => {
      res = await request(app)
        .get("/api/v1/message/6238e70684e9b3164988b2f3")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
  });
  describe("GETTING SINGLE MESSAGE", () => {
    it("Getting one messag with Internal server error", async () => {
      res = await request(app)
        .get("/api/v1/message/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
  });
});
