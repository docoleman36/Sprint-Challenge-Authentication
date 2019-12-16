const server = require('../api/server');
const request = require("supertest");

describe("jokes router", () => {
  it("should return status 401 without auth", async () => {
    const res = await request(server).get("/api/jokes");

    expect(res.status).toBe(401)
  });

  it("should be a json response", async () => {
    const res = await request(server).get("/api/jokes");

    expect(res.type).toBe("application/json");
  });
});