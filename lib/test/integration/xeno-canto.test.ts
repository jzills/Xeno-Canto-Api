import { describe, expect, it } from "vitest";
import XenoCanto from "../../src/xeno-canto";
import XenoCantoRequestBuilder from "../../src/xeno-canto-request-builder";

const APIKey = import.meta.env.VITE_API_KEY as string;
const xc = new XenoCanto(APIKey);

describe("XenoCanto (integration)", () => {
    it("searches for recordings by genus and species", async () => {
        const builder = new XenoCantoRequestBuilder()
            .withGenus("troglodytes")
            .withSpecies("troglodytes")
            .withPerPage(50);
        const result = await xc.search(builder);
        expect(Number(result.numRecordings)).toBeGreaterThan(0);
        expect(result.recordings.length).toBeGreaterThan(0);
        expect(result.recordings[0].gen).toBe("Troglodytes");
    });

    it("filters recordings by country and sound type", async () => {
        const builder = new XenoCantoRequestBuilder()
            .withGenus("parus")
            .withCountry("france")
            .withType("song")
            .withPerPage(50);
        const result = await xc.search(builder);
        expect(Number(result.numRecordings)).toBeGreaterThan(0);
        expect(result.recordings[0].cnt).toBe("France");
    });

    it("filters recordings by quality", async () => {
        const builder = new XenoCantoRequestBuilder()
            .withGroup("birds")
            .withQuality("A")
            .withArea("europe")
            .withPerPage(50);
        const result = await xc.search(builder);
        expect(Number(result.numRecordings)).toBeGreaterThan(0);
        result.recordings.forEach(rec => expect(rec.q).toBe("A"));
    });

    it("paginates results", async () => {
        const page1 = await xc.search(
            new XenoCantoRequestBuilder().withGroup("birds").withCountry("spain").withPage(1).withPerPage(50)
        );
        const page2 = await xc.search(
            new XenoCantoRequestBuilder().withGroup("birds").withCountry("spain").withPage(2).withPerPage(50)
        );
        expect(page1.page).toBe(1);
        expect(page2.page).toBe(2);
        expect(page1.recordings[0].id).not.toBe(page2.recordings[0].id);
    });
});
