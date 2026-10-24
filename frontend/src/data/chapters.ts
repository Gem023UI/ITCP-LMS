import type { CloudComputingChapter } from "../types/modules";

export interface ChapterCardData {
  id: string;
  chapterNo: number;
  title: string;
  description: string;
  image: string;
  chapter: CloudComputingChapter;
}

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e3fd8"/><stop offset="1" stop-color="#0b0b11"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/></svg>`,
  );

const isText = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const isArr = (v: unknown): v is unknown[] => Array.isArray(v);

/** Runtime check that a value satisfies the CloudComputingChapter interface (types/modules.ts) */
export function isValidChapter(value: unknown): value is CloudComputingChapter {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;

  const baseOk =
    isText(c.chapterId) &&
    isText(c.title) &&
    isText(c.description) &&
    typeof c.videoUrl === "string" &&
    typeof c.slideUrl === "string" &&
    typeof c.createdAt === "string" &&
    typeof c.updatedAt === "string" &&
    isArr(c.objectives) &&
    isArr(c.keyTerms) &&
    isArr(c.references) &&
    isArr(c.sections) &&
    c.sections.length > 0;
  if (!baseOk) return false;

  return (c.sections as unknown[]).every((s) => {
    if (!s || typeof s !== "object") return false;
    const sec = s as Record<string, unknown>;
    return (
      isText(sec.sectionNo) &&
      isText(sec.header) &&
      isArr(sec.imageUrl) &&
      isArr(sec.imageSource) &&
      isArr(sec.content)
    );
  });
}

const modules = import.meta.glob("./modules/chapter*.ts", { eager: true }) as Record<
  string,
  Record<string, unknown>
>;

/** Builds one card per chapter file that has content satisfying the module interface. */
export function getChapterCards(): ChapterCardData[] {
  const seen = new Set<string>();
  const chapters: CloudComputingChapter[] = [];

  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .forEach(([, mod]) => {
      Object.values(mod).forEach((exported) => {
        if (isValidChapter(exported) && !seen.has(exported.chapterId)) {
          seen.add(exported.chapterId);
          chapters.push(exported);
        }
      });
    });

  return chapters
    .map((chapter, i) => {
      const parsed = parseInt(chapter.chapterId.match(/\d+/)?.[0] ?? "", 10);
      const image =
        chapter.cardImage ?? FALLBACK_IMAGE;
      return {
        id: chapter.chapterId,
        chapterNo: Number.isFinite(parsed) ? parsed : i + 1,
        title: chapter.title,
        description: chapter.description,
        image,
        chapter,
      };
    })
    .sort((a, b) => a.chapterNo - b.chapterNo);
}

export function toRoman(n: number): string {
  const map: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let rest = Math.max(1, Math.floor(n));
  for (const [v, s] of map) {
    while (rest >= v) {
      out += s;
      rest -= v;
    }
  }
  return out;
}