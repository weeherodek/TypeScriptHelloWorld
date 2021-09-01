import { app } from "../server";
import request from "supertest";

describe("Test connection with Request", () => {
  it("Should test if the test route is running", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res.statusCode).toBe(200);
  });
});
