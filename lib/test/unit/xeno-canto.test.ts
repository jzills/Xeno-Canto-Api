import { describe, expect, it, vi } from "vitest";
import XenoCanto, { XenoCantoError } from "../../src/xeno-canto";
import XenoCantoRequestBuilder from "../../src/xeno-canto-request-builder";
import { lastFetchUrl, lastFetchParams } from "./helpers";

const xc = new XenoCanto("test-key");

describe("XenoCanto.search", () => {
    it("calls the recordings endpoint with built query", async () => {
        await xc.search(new XenoCantoRequestBuilder().withGenus("troglodytes"));
        expect(lastFetchUrl()).toContain("xeno-canto.org/api/3/recordings");
        expect(lastFetchParams().get("query")).toContain("gen:troglodytes");
    });

    it("includes the API key in the request", async () => {
        await xc.search(new XenoCantoRequestBuilder().withGenus("larus"));
        expect(lastFetchParams().get("key")).toBe("test-key");
    });

    it("returns a recordings response with recordings array", async () => {
        const result = await xc.search(new XenoCantoRequestBuilder().withGenus("troglodytes"));
        expect(result.recordings).toBeInstanceOf(Array);
        expect(result.numRecordings).toBeTypeOf("string");
        expect(result.numPages).toBeTypeOf("number");
    });

    it("returns recording with correct shape", async () => {
        const result = await xc.search(new XenoCantoRequestBuilder().withGenus("troglodytes"));
        const rec = result.recordings[0];
        expect(rec.id).toBe("694038");
        expect(rec.gen).toBe("Troglodytes");
        expect(rec.sp).toBe("troglodytes");
        expect(rec.en).toBe("Eurasian Wren");
        expect(rec.also).toBeInstanceOf(Array);
    });

    it("throws on error response", async () => {
        vi.mocked(fetch).mockResolvedValueOnce({
            ok: false,
            status: 400,
            text: () => Promise.resolve("Bad request"),
        } as any);
        const error = await xc.search(new XenoCantoRequestBuilder()).catch(e => e);
        expect(error).toBeInstanceOf(XenoCantoError);
        expect(error.status).toBe(400);
        expect(error.message).toBe("Bad request");
    });
});
