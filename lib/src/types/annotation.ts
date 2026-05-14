type OriginalSetMetadata = {
    set_name: string;
    set_creator: string;
    set_owner: string;
    set_license: string;
    set_uri: string;
    set_creation_date: string;
};

type Annotation = {
    annotation_xc_id: number;
    xc_nr: string;
    scientific_name: string;
    annotator: string;
    start_time: number;
    end_time: number;
    frequency_high: number;
    frequency_low: number;
    sound_type: string;
    sex: string | null;
    life_stage: string | null;
    annotation_remarks: string;
    original_set_metadata: OriginalSetMetadata;
};

type AnnotationSet = {
    set_name: string;
    set_creator: string;
    set_creation_date: string;
    set_remarks: string;
    annotations: Annotation[];
};

export type { OriginalSetMetadata, Annotation, AnnotationSet };
