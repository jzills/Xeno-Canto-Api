import { Recording } from "./recording";

type RecordingsResponse = {
    numRecordings: string;
    numSpecies: string;
    page: number;
    numPages: number;
    recordings: Recording[];
};

export type { RecordingsResponse };
