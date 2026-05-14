export default class QueryBuilder {
    private readonly tags: string[] = [];
    private page: number = 1;
    private perPage: number = 100;

    withPage(page: number): this {
        this.page = page;
        return this;
    }

    withPerPage(perPage: number): this {
        this.perPage = Math.min(Math.max(perPage, 50), 500);
        return this;
    }

    protected addTag(name: string, value: string | number): this {
        this.tags.push(`${name}:${QueryBuilder.formatValue(value)}`);
        return this;
    }

    private static formatValue(value: string | number): string {
        const str = String(value);
        if (/\s/.test(str) || /^[<>=]/.test(str)) {
            return `"${str}"`;
        }
        return str;
    }

    build(APIKey: string): string {
        const params = new URLSearchParams();
        params.set("query", this.tags.join(" "));
        params.set("key", APIKey);
        params.set("page", String(this.page));
        params.set("per_page", String(this.perPage));
        return params.toString();
    }
}
