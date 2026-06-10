import QueryBuilder from "./builders/query-builder";
import { RecordingsResponse } from "./types/recordings-response";

export class XenoCantoError extends Error {
    constructor(readonly status: number, message: string) {
        super(message);
        this.name = "XenoCantoError";
    }
}

export default class XenoCanto {
    readonly URL: string = "https://xeno-canto.org/api/3";
    readonly APIKey: string;

    constructor(APIKey: string) {
        this.APIKey = APIKey;
    }

    search = async (builder: QueryBuilder): Promise<RecordingsResponse> => {
        const response = await fetch(`${this.URL}/recordings?${builder.build(this.APIKey)}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new XenoCantoError(response.status, await response.text());
        }
    };
}
