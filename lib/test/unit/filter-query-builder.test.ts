import { describe, expect, it } from "vitest";
import QueryBuilder from "../../src/builders/query-builder";
import FilterQueryBuilder from "../../src/builders/filter-query-builder";

class TestBuilder extends FilterQueryBuilder(QueryBuilder) {}

const KEY = "test-key";

function query(builder: TestBuilder): string {
    return new URLSearchParams(builder.build(KEY)).get("query") ?? "";
}

describe("FilterQueryBuilder - taxonomic", () => {
    it("withSpecies sets sp tag", () => {
        expect(query(new TestBuilder().withSpecies("troglodytes"))).toBe("sp:troglodytes");
    });

    it("withSpecies quotes multi-word species", () => {
        expect(query(new TestBuilder().withSpecies("larus fuscus"))).toBe(`sp:"larus fuscus"`);
    });

    it("withGenus sets gen tag", () => {
        expect(query(new TestBuilder().withGenus("larus"))).toBe("gen:larus");
    });

    it("withSubspecies sets ssp tag", () => {
        expect(query(new TestBuilder().withSubspecies("fuscus"))).toBe("ssp:fuscus");
    });

    it("withFamily sets fam tag", () => {
        expect(query(new TestBuilder().withFamily("laridae"))).toBe("fam:laridae");
    });

    it("withEnglishName quotes the value", () => {
        expect(query(new TestBuilder().withEnglishName("eurasian wren"))).toBe(`en:"eurasian wren"`);
    });

    it("withGroup sets grp tag for single-word group", () => {
        expect(query(new TestBuilder().withGroup("birds"))).toBe("grp:birds");
    });

    it("withGroup quotes multi-word group", () => {
        expect(query(new TestBuilder().withGroup("land mammals"))).toBe(`grp:"land mammals"`);
    });
});

describe("FilterQueryBuilder - geographic", () => {
    it("withCountry sets cnt tag", () => {
        expect(query(new TestBuilder().withCountry("spain"))).toBe("cnt:spain");
    });

    it("withLocation sets loc tag and quotes value", () => {
        expect(query(new TestBuilder().withLocation("Suffolk, England"))).toBe(`loc:"Suffolk, England"`);
    });

    it("withLatitude sets lat tag", () => {
        expect(query(new TestBuilder().withLatitude(42.8373))).toBe("lat:42.8373");
    });

    it("withLatitude quotes operator values", () => {
        expect(query(new TestBuilder().withLatitude(">66.5"))).toBe(`lat:">66.5"`);
    });

    it("withLongitude sets lon tag", () => {
        expect(query(new TestBuilder().withLongitude(-8.652))).toBe("lon:-8.652");
    });

    it("withArea sets area tag", () => {
        expect(query(new TestBuilder().withArea("europe"))).toBe("area:europe");
    });

    it("withBoundingBox sets box tag", () => {
        expect(query(new TestBuilder().withBoundingBox(-1.16, 94.62, 6.34, 106.48))).toBe("box:-1.16,94.62,6.34,106.48");
    });
});

describe("FilterQueryBuilder - date", () => {
    it("withYear sets year tag", () => {
        expect(query(new TestBuilder().withYear(2021))).toBe("year:2021");
    });

    it("withYear quotes operator string", () => {
        expect(query(new TestBuilder().withYear("<1970"))).toBe(`year:"<1970"`);
    });

    it("withMonth sets month tag", () => {
        expect(query(new TestBuilder().withMonth(6))).toBe("month:6");
    });

    it("withMonth quotes operator string", () => {
        expect(query(new TestBuilder().withMonth(">8"))).toBe(`month:">8"`);
    });

    it("withUploadedSince sets since tag", () => {
        expect(query(new TestBuilder().withUploadedSince(31))).toBe("since:31");
    });
});

describe("FilterQueryBuilder - sound and animal", () => {
    it("withType sets type tag", () => {
        expect(query(new TestBuilder().withType("song"))).toBe("type:song");
    });

    it("withType quotes multi-word type", () => {
        expect(query(new TestBuilder().withType("social call"))).toBe(`type:"social call"`);
    });

    it("withSex sets sex tag", () => {
        expect(query(new TestBuilder().withSex("male"))).toBe("sex:male");
    });

    it("withStage sets stage tag", () => {
        expect(query(new TestBuilder().withStage("adult"))).toBe("stage:adult");
    });

    it("withRecordist sets rec tag", () => {
        expect(query(new TestBuilder().withRecordist("Smith"))).toBe("rec:Smith");
    });

    it("withRecordist quotes multi-word name", () => {
        expect(query(new TestBuilder().withRecordist("John Smith"))).toBe(`rec:"John Smith"`);
    });

    it("withBackgroundSpecies sets also tag", () => {
        expect(query(new TestBuilder().withBackgroundSpecies("Parus major"))).toBe(`also:"Parus major"`);
    });
});

describe("FilterQueryBuilder - sound file", () => {
    it("withQuality sets q tag", () => {
        expect(query(new TestBuilder().withQuality("A"))).toBe("q:A");
    });

    it("withLength sets len tag", () => {
        expect(query(new TestBuilder().withLength(240))).toBe("len:240");
    });

    it("withLength quotes operator string", () => {
        expect(query(new TestBuilder().withLength(">3600"))).toBe(`len:">3600"`);
    });

    it("withSampleRate sets smp tag", () => {
        expect(query(new TestBuilder().withSampleRate(44100))).toBe("smp:44100");
    });

    it("withSampleRate quotes operator string", () => {
        expect(query(new TestBuilder().withSampleRate(">192000"))).toBe(`smp:">192000"`);
    });
});

describe("FilterQueryBuilder - composition", () => {
    it("joins multiple tags with spaces", () => {
        const result = query(
            new TestBuilder()
                .withGenus("larus")
                .withSpecies("fuscus")
                .withCountry("france")
        );
        expect(result).toBe("gen:larus sp:fuscus cnt:france");
    });

    it("combines taxonomic and geographic tags", () => {
        const result = query(
            new TestBuilder()
                .withGroup("birds")
                .withArea("europe")
                .withType("song")
        );
        expect(result).toBe("grp:birds area:europe type:song");
    });
});
