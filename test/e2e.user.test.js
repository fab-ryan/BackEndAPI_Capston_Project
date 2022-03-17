import app from "../src/index.js";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";

chai.use(chaiHttp);
let token = "";
//sign up
describe("POST API /api/v1/user", () => {
  before(() => {
    mongoose.connection.dropCollection("users");
  });
  const user = {
    firstname: "ndacyayisenga",
    lastname: "fabrice",
    username: "fab",
    password: "password",
    email: "royal@gmail.com",
  };
  it("It should successfully create an account and return 201", (done) => {
    chai
      .request(app)
      .post("/api/v1/user")
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.equal(201);
        return done();
      });
  });
  it("Should return 201 when email exists", (done) => {
    const oldMail = user.email;
    chai
      .request(app)
      .post("/api/v1/user")
      .send(user)
      .end((err, res) => {
        if (oldMail) return done(err);
        expect(res.status).to.be.equal(201);
        expect(res).to.have.property("error");
        expect(res.body).to.have.property("");
        return done();
      });
  });
});

// get user profile
describe("GET API /api/v1/auth/user-profile", () => {
  it("Should return the profile of authorized user", (done) => {
    chai
      .request(app)
      .get("/api/v1/auth/user-profile")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.eql(200);
        return done();
      });
  });
  it("Should return Not Authorized", (done) => {
    let fakeToken = "testing";
    chai
      .request(app)
      .get("/api/v1/auth/user-profile")
      .set("Authorization", `Bearer ${fakeToken}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.equal(401);
        return done();
      });
  });
});
