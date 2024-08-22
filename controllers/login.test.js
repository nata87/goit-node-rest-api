const require = request("supertest");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../app.js";

jest.mock("../db/models/User");

describe("Login Controller", () => {
  it("should return status 200 and a token and user object on successful login", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      subscription: "starter",
      password: "hashedpassword",
      save: jest.fn().mockResolvedValue(true),
    };
    User.findOne.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    jest.spyOn(jwt, "sign").mockResolvedValue("mocked-token");
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "hashedpassword",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token", "mocked-token");
    expect(res.body.user).toMachObject({
      email: "test@example.com",
      subscription: "starter",
    });
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});
