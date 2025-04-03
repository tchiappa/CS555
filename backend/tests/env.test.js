import { describe, it, expect, assert } from 'vitest'
import dotenv from "dotenv";
dotenv.config();

describe("Check Local Environment Settings", async () => {
    it("Check Port", () => {
        const port = process.env.port;
        assert.equal(port, 4000);
    });

    it("Check Database URI", () => {
        const dbURI = process.env.dbURI;
        assert.equal(dbURI, "mongodb://127.0.0.1:27017/test");
    });
});
