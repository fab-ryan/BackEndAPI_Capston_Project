import request from "supertest";
import app from "../src";
describe("Blog test", () => {
  let token;
  let blog, res;
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
  blog = {
    ArticleTitle: "Testing Page",
    ArticlePriview: "Testing Preview",
    ArticleDescription: "Testing desc",
    ArticleImage: "ssakjkjkas",
  };
  it("CreateBlog", async () => {
    res = await request(app)
      .post("/api/v1/blog")
      .send(blog)
      .set("Authorization", "Bearer" + token);
    expect(res.status).toBe(403);
  });
  describe("All Blogs", () => {
    it("All Blogs", async () => {
      res = await request(app).get("/api/v1/blog");
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("all Blogs");
    }, 50000);
  });
});
