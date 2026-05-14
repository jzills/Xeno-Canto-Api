import { AnnotationSet } from "./annotation";

type Sonogram = {
    small: string;
    med: string;
    large: string;
    full: string;
};

type Oscillogram = {
    small: string;
    med: string;
    large: string;
};

type Recording = {
    id: string;
    gen: string;
    sp: string;
    ssp: string;
    grp: string;
    en: string;
    rec: string;
    cnt: string;
    loc: string;
    lat: string;
    lon: string;
    alt: string;
    type: string;
    sex: string;
    stage: string;
    method: string;
    url: string;
    file: string;
    "file-name": string;
    sono: Sonogram;
    osci: Oscillogram;
    lic: string;
    q: string;
    length: string;
    time: string;
    date: string;
    uploaded: string;
    also: string[];
    rmk: string;
    "animal-seen": string;
    "playback-used": string;
    temp: string;
    regnr: string;
    auto: string;
    dvc: string;
    mic: string;
    smp: string;
    "annotation-set"?: AnnotationSet;
};

export type { Recording, Sonogram, Oscillogram };
