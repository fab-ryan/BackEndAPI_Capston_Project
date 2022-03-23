import request from "supertest";
import app from "../src";
import blogModel from "../src/model/blogModel";
describe("Blog test", () => {
  let token;
  let id, res;
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

  describe("VALIDATION FIRST TESTING", () => {
    it("full name Validation", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .send({
          fullname: "",
          email: "testing@gmail.com",
          comment: "Hello this is the testing",
        })
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(409);
    }, 50000);
    it("mail Validation", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .set("Authorization", "Bearer " + token)
        .send({
          fullname: "testing",
          email: "",
          comment: "Hello this is the testing",
        });
      expect(res.status).toBe(409);
    }, 50000);
    it("mail @ messing Validation", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .set("Authorization", "Bearer " + token)
        .send({
          fullname: "testing",
          email: "testing",
          comment: "Hello this is the testing",
        });
      expect(res.status).toBe(409);
    }, 50000);
    it("mail index of @ . in wrong place messing Validation", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .set("Authorization", "Bearer " + token)
        .send({
          fullname: "testing",
          email: "@.com",
          comment: "Hello this is the testing",
        });
      expect(res.body.error).toContain("The email is Incomplete");
    }, 50000);
    it("comment Validation", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .set("Authorization", "Bearer " + token)
        .send({ fullname: "testing", email: "testing@gmil.com", comment: "" });
      expect(res.status).toBe(409);
    }, 50000);
  });
  describe("ADD COMMENT TO BLOG", () => {
    it("Add Comment", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .set("Authorization", "Bearer " + token)
        .send({
          fullname: "testing",
          email: "testing@gmil.com",
          comment: "comment",
        });
      id = res.body.commentId._id;
      expect(res.status).toBe(201);
    }, 50000);
    it("Add Comment with incorrect id", async () => {
      res = await request(app)
        .post("/api/v1/blog/623994388fc027c10adf5a6/comment")
        .set("Authorization", "Bearer " + token)
        .send({
          fullname: "testing",
          email: "testing@gmil.com",
          comment: "comment",
        });
      expect(res.status).toBe(500);
    }, 50000);
  });
  describe("GETTING ALL comments", () => {
    it("Geting all blogs", async () => {
      res = await request(app)
        .get("/api/v1/blog/623994388fc027c10adf5a60/comment")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
    it("Geting all Blog with wrong Id", async () => {
      res = await request(app)
        .get("/api/v1/blog/623994388fc027c10adf5a6/comment")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
    it("Geting all Blog with invalid Id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .get("/api/v1/blog/" + obj._id + "/comment")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
  });
  describe("DELETE THE COMMENT", () => {
    it("delete blog with invalid Id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .delete("/api/v1/blog/623994388fc027c10adf5a60/comment/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
    it("delete blog with invalid Id", async () => {
      res = await request(app)
        .delete("/api/v1/blog/623994388fc027c10adf5a60/comment/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
    it("delete blog with invalid Id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .delete("/api/v1/blog/623994388fc027c10adf5a60/comment/" + id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(201);
    }, 50000);
  });
});
