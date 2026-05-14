# xeno-canto-api

A TypeScript client library for the [Xeno Canto API v3](https://xeno-canto.org/explore/api).

## Installation

```bash
npm install xeno-canto-api
```

## Usage

```typescript
import { XenoCanto, XenoCantoRequestBuilder } from "xeno-canto-api";

const xc = new XenoCanto("your-api-key");

const result = await xc.search(
    new XenoCantoRequestBuilder()
        .withGenus("troglodytes")
        .withSpecies("troglodytes")
        .withCountry("spain")
        .withType("song")
        .withQuality("A")
        .withPerPage(50)
);

console.log(result.numRecordings, "recordings found");
result.recordings.forEach(rec => {
    console.log(rec.en, rec.cnt, rec.date, rec.file);
});
```

## API

### `XenoCanto`

```typescript
const xc = new XenoCanto(APIKey: string);
xc.search(builder: QueryBuilder): Promise<RecordingsResponse>
```

### `XenoCantoRequestBuilder`

Fluent builder for constructing Xeno Canto API v3 queries. All methods return `this` for chaining.

#### Taxonomic

| Method | Tag | Example |
|---|---|---|
| `withSpecies(value)` | `sp:` | `withSpecies("troglodytes")` |
| `withGenus(value)` | `gen:` | `withGenus("larus")` |
| `withSubspecies(value)` | `ssp:` | `withSubspecies("fuscus")` |
| `withFamily(value)` | `fam:` | `withFamily("laridae")` |
| `withEnglishName(value)` | `en:` | `withEnglishName("eurasian wren")` |
| `withGroup(value)` | `grp:` | `withGroup("birds")` |

Groups: `"birds"`, `"grasshoppers"`, `"bats"`, `"frogs"`, `"land mammals"`, `"soundscape"`

#### Geographic

| Method | Tag | Example |
|---|---|---|
| `withCountry(value)` | `cnt:` | `withCountry("france")` |
| `withLocation(value)` | `loc:` | `withLocation("Suffolk, England")` |
| `withLatitude(value)` | `lat:` | `withLatitude(">66.5")` |
| `withLongitude(value)` | `lon:` | `withLongitude(4.2884)` |
| `withArea(value)` | `area:` | `withArea("europe")` |
| `withBoundingBox(latMin, lonMin, latMax, lonMax)` | `box:` | `withBoundingBox(-1.16, 94.62, 6.34, 106.48)` |

Areas: `"africa"`, `"america"`, `"asia"`, `"australia"`, `"europe"`, `"antarctica"`

#### Date

| Method | Tag | Example |
|---|---|---|
| `withYear(value)` | `year:` | `withYear("<1970")` |
| `withMonth(value)` | `month:` | `withMonth(">8")` |
| `withUploadedSince(days)` | `since:` | `withUploadedSince(31)` |

#### Sound and animal

| Method | Tag | Example |
|---|---|---|
| `withType(value)` | `type:` | `withType("song")`, `withType("social call")` |
| `withSex(value)` | `sex:` | `withSex("female")` |
| `withStage(value)` | `stage:` | `withStage("juvenile")` |
| `withRecordist(value)` | `rec:` | `withRecordist("John Smith")` |
| `withBackgroundSpecies(value)` | `also:` | `withBackgroundSpecies("Parus major")` |

#### Sound file

| Method | Tag | Example |
|---|---|---|
| `withQuality(value)` | `q:` | `withQuality("A")` |
| `withLength(value)` | `len:` | `withLength(">3600")` |
| `withSampleRate(value)` | `smp:` | `withSampleRate(">192000")` |

#### Pagination

```typescript
.withPage(2)        // default: 1
.withPerPage(50)    // default: 100, range: 50–500
```

## License

MIT
