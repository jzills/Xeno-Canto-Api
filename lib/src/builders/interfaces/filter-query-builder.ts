import { Area, Group, Quality, Sex } from "../filter-query-builder";

interface IFilterQueryBuilder {
    withSpecies(value: string): this;
    withGenus(value: string): this;
    withSubspecies(value: string): this;
    withFamily(value: string): this;
    withEnglishName(value: string): this;
    withGroup(value: Group): this;
    withCountry(value: string): this;
    withLocation(value: string): this;
    withLatitude(value: string | number): this;
    withLongitude(value: string | number): this;
    withArea(value: Area): this;
    withBoundingBox(latMin: number, lonMin: number, latMax: number, lonMax: number): this;
    withYear(value: string | number): this;
    withMonth(value: string | number): this;
    withUploadedSince(days: number): this;
    withType(value: string): this;
    withSex(value: Sex): this;
    withStage(value: string): this;
    withRecordist(value: string): this;
    withBackgroundSpecies(value: string): this;
    withQuality(value: Quality): this;
    withLength(value: string | number): this;
    withSampleRate(value: string | number): this;
}

export type { IFilterQueryBuilder };
