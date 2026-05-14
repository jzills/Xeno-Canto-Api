import { describe, expect, it } from "vitest";
import QueryBuilder from "../../src/builders/query-builder";

const KEY = "test-key";

describe("QueryBuilder", () => {
    it("defaults page to 1 and per_page to 100", () => {
        const params = new URLSearchParams(new QueryBuilder().build(KEY));
        expect(params.get("page")).toBe("1");
        expect(params.get("per_page")).toBe("100");
    });

    it("sets page", () => {
        const params = new URLSearchParams(new QueryBuilder().withPage(3).build(KEY));
        expect(params.get("page")).toBe("3");
    });

    it("sets per_page", () => {
        const params = new URLSearchParams(new QueryBuilder().withPerPage(200).build(KEY));
        expect(params.get("per_page")).toBe("200");
    });

    it("clamps per_page minimum to 50", () => {
        const params = new URLSearchParams(new QueryBuilder().withPerPage(10).build(KEY));
        expect(params.get("per_page")).toBe("50");
    });

    it("clamps per_page maximum to 500", () => {
        const params = new URLSearchParams(new QueryBuilder().withPerPage(9999).build(KEY));
        expect(params.get("per_page")).toBe("500");
    });

    it("includes the API key", () => {
        const params = new URLSearchParams(new QueryBuilder().build(KEY));
        expect(params.get("key")).toBe(KEY);
    });

    it("produces empty query string when no tags added", () => {
        const params = new URLSearchParams(new QueryBuilder().build(KEY));
        expect(params.get("query")).toBe("");
    });

    it("auto-quotes tag values with spaces", () => {
        class TestBuilder extends QueryBuilder {
            withTag(name: string, value: string): this {
                return this.addTag(name, value);
            }
        }
        const params = new URLSearchParams(new TestBuilder().withTag("grp", "land mammals").build(KEY));
        expect(params.get("query")).toBe(`grp:"land mammals"`);
    });

    it("auto-quotes tag values starting with >", () => {
        class TestBuilder extends QueryBuilder {
            withTag(name: string, value: string): this {
                return this.addTag(name, value);
            }
        }
        const params = new URLSearchParams(new TestBuilder().withTag("len", ">3600").build(KEY));
        expect(params.get("query")).toBe(`len:">3600"`);
    });

    it("auto-quotes tag values starting with <", () => {
        class TestBuilder extends QueryBuilder {
            withTag(name: string, value: string): this {
                return this.addTag(name, value);
            }
        }
        const params = new URLSearchParams(new TestBuilder().withTag("year", "<1970").build(KEY));
        expect(params.get("query")).toBe(`year:"<1970"`);
    });

    it("does not quote simple single-word tag values", () => {
        class TestBuilder extends QueryBuilder {
            withTag(name: string, value: string): this {
                return this.addTag(name, value);
            }
        }
        const params = new URLSearchParams(new TestBuilder().withTag("cnt", "france").build(KEY));
        expect(params.get("query")).toBe("cnt:france");
    });

    it("joins multiple tags with spaces", () => {
        class TestBuilder extends QueryBuilder {
            withTag(name: string, value: string): this {
                return this.addTag(name, value);
            }
        }
        const params = new URLSearchParams(
            new TestBuilder().withTag("gen", "larus").withTag("cnt", "france").build(KEY)
        );
        expect(params.get("query")).toBe("gen:larus cnt:france");
    });
});
