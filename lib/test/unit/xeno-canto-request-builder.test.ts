import { describe, expect, it } from "vitest";
import XenoCantoRequestBuilder from "../../src/xeno-canto-request-builder";

const KEY = "test-key";

function query(builder: XenoCantoRequestBuilder): string {
    return new URLSearchParams(builder.build(KEY)).get("query") ?? "";
}

describe("XenoCantoRequestBuilder", () => {
    it("composes all filter methods on a single builder", () => {
        const builder = new XenoCantoRequestBuilder()
            .withGenus("troglodytes")
            .withSpecies("troglodytes")
            .withCountry("spain")
            .withType("song")
            .withQuality("A");
        expect(query(builder)).toBe("gen:troglodytes sp:troglodytes cnt:spain type:song q:A");
    });

    it("uses withPage and withPerPage from base QueryBuilder", () => {
        const params = new URLSearchParams(
            new XenoCantoRequestBuilder().withPage(2).withPerPage(50).build(KEY)
        );
        expect(params.get("page")).toBe("2");
        expect(params.get("per_page")).toBe("50");
    });

    it("builds query mirroring the API example for Lesser Black-backed Gull", () => {
        const result = query(
            new XenoCantoRequestBuilder()
                .withGenus("larus")
                .withSpecies("fuscus")
        );
        expect(result).toBe("gen:larus sp:fuscus");
    });

    it("builds query with bounding box and group", () => {
        const result = query(
            new XenoCantoRequestBuilder()
                .withBoundingBox(-1.16, 94.62, 6.34, 106.48)
                .withGroup("grasshoppers")
        );
        expect(result).toBe("box:-1.16,94.62,6.34,106.48 grp:grasshoppers");
    });
});
