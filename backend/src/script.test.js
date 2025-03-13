import { describe, it } from "node:test";
import assert from "node:assert";
import dotenv from "dotenv";
dotenv.config();

describe("#Setup Local Development", async () => {
  it("Check Port", () => {
    const port = process.env.port;
    assert(port == 4000);
  });
  it("Check Database URI", () => {
    const dbURI = process.env.dbURI;
    assert(dbURI == "mongodb://127.0.0.1:27017/test");
  });
});
