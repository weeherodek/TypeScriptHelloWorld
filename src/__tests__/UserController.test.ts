import request from "supertest";
import { app } from "../server";

interface Login {
  status: string;
  message: string;
  token: string;
}

let token: string;

beforeAll(async () => {
  const data = await request(app)
    .get("/api/v1/login")
    .auth("teste", "teste", { type: "basic" });

  token = (data.body as Login).token;
});

describe("Test UserController Routes", () => {
  it("Should return all the users", async () => {
    const res = await request(app)
      .get("/api/v1/users/")
      .set("x-access-token", token);

    expect(res.body).toHaveProperty("status", "Success");
    expect(res.statusCode).toBe(200);
  });

  it("Should create a new user", async () => {
    const res = await request(app)
      .post("/api/v1/users/")
      .set("x-access-token", token)
      .send({
        user: "teste10",
        password: "teste10",
      });
    expect(res.body).toHaveProperty("status", "Success");
    expect(res.statusCode).toBe(201);
  });
});
