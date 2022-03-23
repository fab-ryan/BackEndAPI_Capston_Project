import request from "supertest";
import app from "../src";
import blogModel from "../src/model/blogModel";
describe("Blog test", () => {
  let token;
  let blog, res;
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
  describe("BLOG VALIDATION", () => {
    it("Invalid Article title", async () => {
      res = await request(app)
        .post("/api/v1/blog")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "testing demo",
          ArticlePriview: "Testing Preview",
          ArticleDescription: "Testing desc",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(409);
    }, 5000);
    it("Invalid Article title", async () => {
      res = await request(app)
        .post("/api/v1/blog")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticlePriview: "Testing Preview",
          ArticleDescription: "Testing desc",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(409);
    }, 5000);
    it("Invalid Article Preview", async () => {
      res = await request(app)
        .post("/api/v1/blog")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePriview: "",
          ArticleDescription: "Testing desc",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(409);
    }, 5000);
    it("Invalid Article Preview", async () => {
      res = await request(app)
        .post("/api/v1/blog")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticleDescription: "Testing desc",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(409);
    }, 5000);
    it("Invalid Article description", async () => {
      res = await request(app)
        .post("/api/v1/blog")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePriview: "testing preview",
          ArticleDescription: "",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(409);
    }, 5000);
    it("Invalid Article description", async () => {
      res = await request(app)
        .post("/api/v1/blog")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePriview: "testing preview",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(409);
    }, 5000);
  });

  describe("GET BLOGS", () => {
    it("Get all Blogs ", async () => {
      res = await request(app).get("/api/v1/blog");
      expect(res.status).toBe(200);
    }, 50000);
    it("Get one blog with wrong id", async () => {
      const obj = new blogModel();
      res = await request(app).get("/api/v1/blog/" + obj._id);
      expect(res.status).toBe(404);
    }, 50000);
    it("Get one blog with invalid Id", async () => {
      res = await request(app).get("/api/v1/blog/id");
      expect(res.status).toBe(500);
    }, 50000);
    it("Get Ablog with correct Id", async () => {
      res = await request(app).get("/api/v1/blog/623994388fc027c10adf5a60");
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("UPDATE BLOG", () => {
    it("Update Blog with wrong id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .patch("/api/v1/blogImage/" + obj._id)
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePreview: "testing preview",
          ArticleDescription: "Testing",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(404);
    }, 50000);
    it("Update Blog with invalid", async () => {
      const obj = new blogModel();
      res = await request(app)
        .patch("/api/v1/blogImage/id")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePreview: "testing preview",
          ArticleDescription: "Testing",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(500);
    }, 50000);
    it("Update Blog with correct id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .patch("/api/v1/blogImage/623994388fc027c10adf5a60")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePreview: "testing preview",
          ArticleDescription: "Testing",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(500);
    }, 50000);
  });
  describe("UPDATE BLOG With Picture", () => {
    it("Update Blog with wrong id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .patch("/api/v1/blog/" + obj._id)
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePreview: "testing preview",
          ArticleDescription: "Testing",
        });
      expect(res.status).toBe(404);
    }, 50000);
    it("Update Blog with invalid", async () => {
      const obj = new blogModel();
      res = await request(app)
        .patch("/api/v1/blog/id")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePreview: "testing preview",
          ArticleDescription: "Testing",
        });
      expect(res.status).toBe(500);
    }, 50000);
    it("Update Blog with correct id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .patch("/api/v1/blog/623994388fc027c10adf5a60")
        .set("Authorization", "Bearer " + token)
        .send({
          ArticleTitle: "Testing",
          ArticlePreview: "testing preview",
          ArticleDescription: "Testing",
          ArticleImage: "ssakjkjkas",
        });
      expect(res.status).toBe(201);
    }, 50000);
  });
  describe("DELETE BLOG TESTING", () => {
    it("Delete with wrong id", async () => {
      const obj = new blogModel();
      res = await request(app)
        .delete("/api/v1/blog/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
    it("Delete with invalid id", async () => {
      res = await request(app)
        .delete("/api/v1/blog/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
  });
});
