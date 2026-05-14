import { Constructor } from "../types/constructor";
import { IFilterQueryBuilder } from "./interfaces/filter-query-builder";
import QueryBuilder from "./query-builder";

type Group = "birds" | "grasshoppers" | "bats" | "frogs" | "land mammals" | "soundscape";
type Area = "africa" | "america" | "asia" | "australia" | "europe" | "antarctica";
type Sex = "male" | "female";
type Quality = "A" | "B" | "C" | "D" | "E";

export default function FilterQueryBuilder<T extends Constructor<QueryBuilder>>(Base: T): T & Constructor<IFilterQueryBuilder> {
    return class extends Base {
        withSpecies(value: string): this {
            return this.addTag("sp", value);
        }

        withGenus(value: string): this {
            return this.addTag("gen", value);
        }

        withSubspecies(value: string): this {
            return this.addTag("ssp", value);
        }

        withFamily(value: string): this {
            return this.addTag("fam", value);
        }

        withEnglishName(value: string): this {
            return this.addTag("en", value);
        }

        withGroup(value: Group): this {
            return this.addTag("grp", value);
        }

        withCountry(value: string): this {
            return this.addTag("cnt", value);
        }

        withLocation(value: string): this {
            return this.addTag("loc", value);
        }

        withLatitude(value: string | number): this {
            return this.addTag("lat", value);
        }

        withLongitude(value: string | number): this {
            return this.addTag("lon", value);
        }

        withArea(value: Area): this {
            return this.addTag("area", value);
        }

        withBoundingBox(latMin: number, lonMin: number, latMax: number, lonMax: number): this {
            return this.addTag("box", `${latMin},${lonMin},${latMax},${lonMax}`);
        }

        withYear(value: string | number): this {
            return this.addTag("year", value);
        }

        withMonth(value: string | number): this {
            return this.addTag("month", value);
        }

        withUploadedSince(days: number): this {
            return this.addTag("since", days);
        }

        withType(value: string): this {
            return this.addTag("type", value);
        }

        withSex(value: Sex): this {
            return this.addTag("sex", value);
        }

        withStage(value: string): this {
            return this.addTag("stage", value);
        }

        withRecordist(value: string): this {
            return this.addTag("rec", value);
        }

        withBackgroundSpecies(value: string): this {
            return this.addTag("also", value);
        }

        withQuality(value: Quality): this {
            return this.addTag("q", value);
        }

        withLength(value: string | number): this {
            return this.addTag("len", value);
        }

        withSampleRate(value: string | number): this {
            return this.addTag("smp", value);
        }
    };
}

export type { Group, Area, Sex, Quality };
