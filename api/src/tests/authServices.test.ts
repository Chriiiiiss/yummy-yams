import { describe } from "node:test";
import request from "supertest";
import { app } from "../server";
import ENV from "../config";
import { IncomingMessage, Server, ServerResponse } from "node:http";

describe("authServices", () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  describe("register", () => {
    it("should return an error if the user already exists", async () => {
      await request(app)
        .post("/register")
        .send({ username: "chris@gmail.com", password: "123456789123" })
        .expect(409);
    });
  });
});
