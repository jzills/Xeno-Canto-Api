import { afterAll, beforeAll, beforeEach, vi } from "vitest";
import fixture from "./fixtures/response.json";

beforeAll(() => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation((url: string) => {
        if (url.includes("/api/3/recordings")) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(fixture),
            });
        }
        return Promise.resolve({
            ok: false,
            text: () => Promise.resolve("Not found"),
        });
    }));
});

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.unstubAllGlobals();
});
