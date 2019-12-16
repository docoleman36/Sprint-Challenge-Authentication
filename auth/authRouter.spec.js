const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe("root", () => {
  test("work should be testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  })
})

describe("register user", () => {
  it("should return status 201", async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: "darrel",
        password: "password"
      });
    expect(res.status).toBe(201)
  })

  it("should return json", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "darrel",
        password: "password"
      });
    expect(res.type).toBe("application/json");
  })

  it("returns an id", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "darrel",
        password: "password"
      });
    expect(res.body.id).not.toBeNaN();
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});

describe("login works", () => {
  it("should return status 200", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "darrel", password: "password" });

    expect(res.status).toBe(200);
  });

  it("should return a token", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "darrel", password: "password" });

    expect(res.body.token).toBeTruthy();
  });

  it("should return json", async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: "darrel", password: "password" });

    expect(res.type).toBe("application/json");
  })
})

