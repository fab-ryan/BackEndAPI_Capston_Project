import request from "supertest";
import app from "../src/index";
import userModel from "../src/model/userModel";
describe("user Test", () => {
  let token, id;

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
  let user, res;
  describe("USER EXIT", () => {
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
  });
  describe("NEW USER ", () => {
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
      id = res.body.userId;
    }, 50000);
  });
  describe("EMAIL VALIDATION", () => {
    it("Email required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "jean De dieu",
        username: "dedsec",
        password: "password",
        confirmpassword: "password",
        email: "",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("Email is required");
    }, 50000);
    it("Invalid Email", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "jean De dieu",
        username: "dedsec",
        password: "password",
        confirmpassword: "password",
        email: "@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("The email is Incomplete");
    }, 50000);
  });
  describe("FIRST NAME", () => {
    it("first name required", async () => {
      user = {
        firstname: "",
        lastname: "jean De dieu",
        username: "dedsec",
        password: "password",
        confirmpassword: "password",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("First Name is required");
    }, 50000);

    it("EmailValifa required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        password: "password",
        confirmpassword: "password",
        email: "testgmail",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("The email is Incomplete");
    }, 50000);
  });
  describe("LAST NAME VALIDATION", () => {
    it("lastname required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "",
        username: "dedsec",
        password: "password",
        confirmpassword: "password",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("Last Name is required");
    }, 50000);
  });
  describe("USER NAME VALIDATION", () => {
    it("Username required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "",
        password: "password",
        confirmpassword: "password",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("User Name is required");
    }, 50000);
  });

  describe("PASSWORD VALIDATION", () => {
    it("password required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        password: "",
        confirmpassword: "password",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("Password is Require");
    }, 50000);
    it("confim password required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        password: "password",
        confirmpassword: "",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("Password is Require");
    }, 50000);
    it("Less password", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        password: "password",
        confirmpassword: "sss",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain(
        "confirm password must have 8 characters"
      );
    }, 50000);
    it("Less password", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        password: "pas",
        confirmpassword: "password",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("password must have 8 characters");
    }, 50000);
    it("Less password", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        password: "passsword 1",
        confirmpassword: "password",
        email: "test@gmail.com",
      };
      res = await request(app).post("/api/v1/user").send(user);
      expect(res.body.error).toContain("password does not match");
    }, 50000);
  });
  describe("INTERNAL SERVE", () => {
    it("Internal Server error", async () => {
      res = await request(app).post("/api/v1/user/").send(user);
      expect(res.status).toBe(200);
    }, 50000);
  });

  describe("GET ALL USERS", () => {
    it("Get all useer", async () => {
      res = await request(app)
        .get("/api/v1/user")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("GET USER TEST", () => {
    it("Get a user", async () => {
      res = await request(app)
        .get("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
    it("Get a user invalid", async () => {
      res = await request(app)
        .get("/api/v1/user/6239063468d4241020570e97")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
    it("Get Internal server for get user", async () => {
      res = await request(app)
        .get("/api/v1/user/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
  });
  describe("UPDATE USERS", () => {
    it("Update no found  user ", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        email: "test@gmail.com",
      };
      const obj = new userModel();
      res = await request(app)
        .patch("/api/v1/user/" + obj._id)
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.status).toBe(404);
    }, 50000);
    it("Update user ", async () => {
      user = {
        firstname: "admin",
        lastname: "admin",
        username: "admin",
        email: "admin@gmail.com",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.status).toBe(201);
    }, 50000);
    it("Update user ", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "Jean",
        username: "Desce",
        email: "test@gmail.com",
      };
      res = await request(app)
        .patch("/api/v1/user/id")
        .send(user)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
  });
  describe("GET USER INFORMATION", () => {
    it("User Only infor", async () => {
      res = await request(app)
        .get("/api/v1/userInfo")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("CHANGE PASSWORD", () => {
    it("change password incorrect the current password", async () => {
      res = await request(app)
        .patch("/api/v1/changepassword")
        .set("Authorization", "Bearer " + token)
        .send({ currentPassword: "passwordsd", newPassword: "password" });
      expect(res.status).toBe(409);
    }, 50000);
  });
  describe("DELETE USER ", () => {
    it("unfound user", async () => {
      const obj = new userModel();
      res = await request(app)
        .delete("/api/v1/user/" + obj._id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(404);
    }, 50000);
    it("internal server error for user delete", async () => {
      res = await request(app)
        .delete("/api/v1/user/id")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(500);
    }, 50000);
    it("  user delete", async () => {
      res = await request(app)
        .delete("/api/v1/user/" + id)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toBe(200);
    }, 50000);
  });
  describe("VALIDATION ON UPDATE USERS", () => {
    it("lastname required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "",
        username: "dedsec",
        email: "test@gmail.com",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.body.error).toContain("Last Name is required");
    }, 50000);
    it("First name required", async () => {
      user = {
        firstname: "",
        lastname: "Jean",
        username: "dedsec",
        email: "test@gmail.com",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.body.error).toContain(" required");
    }, 50000);
    it(" Email required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "jean ",
        username: "dedsec",
        email: "",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.body.error).toContain(" required");
    }, 50000);
    it(" Username required", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "jean ",
        username: "",
        email: "test@gmail.com",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.body.error).toContain(" required");
    }, 50000);
    it(" Email is incomplete", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "jean ",
        username: "test",
        email: "testgmailcom",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.body.error).toContain("The email is Incomplete");
    }, 50000);
    it(" Email is incomplete", async () => {
      user = {
        firstname: "iradukunda",
        lastname: "jean ",
        username: "test",
        email: "@gmail.com",
      };
      res = await request(app)
        .patch("/api/v1/user/62373d042a77bf8f0dea51d0")
        .set("Authorization", "Bearer " + token)
        .send(user);
      expect(res.body.error).toContain("The email is Incomplete");
    }, 50000);
  });
});
