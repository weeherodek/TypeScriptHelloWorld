import request from "supertest";
import { app } from "../server";

describe("Test connection with Request", () => {
  it("Should test if the test route is running", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res.statusCode).toBe(200);
  });
});

describe("AuthController tests", () => {
  it("Should not login into the application and return 400.", async () => {
    const res = await request(app).get("/api/v1/login");
    expect(res.statusCode).toBe(401);
  });

  it("Should login in with test user", async () => {
    const res = await request(app)
      .get("/api/v1/login")
      .auth("teste", "teste", { type: "basic" });
    expect(res.statusCode).toBe(200);
  });

  it("Login with wrong datas, should not login and return 401.", async () => {
    const res = await request(app)
      .get("/api/v1/login")
      .auth("", "", { type: "basic" });
    expect(res.statusCode).toBe(401);
  });
});
