import type { ChapterFull, ChapterInput } from "../services/manageApi";

/* The chapter form works with plain, friendly shapes (lists of text boxes).
   `draftFromChapter` / `buildChapter` convert to and from the API's JSON structure,
   so teachers never see or type JSON. */

export type ImageDraft = { url: string; source: string };
export type SectionDraft = {
  /** kept from the saved chapter; "" for new sections (a free "section-n" is generated on save) */
  sectionNo: string;
  header: string;
  images: ImageDraft[];
  paragraphs: string[];
};
export type TermDraft = { word: string; definition: string; source: string };
export type RefDraft = { author: string; link: string };

export type ChapterDraft = {
  chapterNo: string;
  title: string;
  description: string;
  durationMinutes: string;
  cardImage: string;
  videoUrl: string;
  slideUrl: string;
  objectives: string[];
  sections: SectionDraft[];
  keyTerms: TermDraft[];
  references: RefDraft[];
};

export const blankSection = (): SectionDraft => ({ sectionNo: "", header: "", images: [], paragraphs: [""] });
export const blankTerm = (): TermDraft => ({ word: "", definition: "", source: "" });
export const blankRef = (): RefDraft => ({ author: "", link: "" });

export const blankChapter = (nextNo: number): ChapterDraft => ({
  chapterNo: String(nextNo),
  title: "",
  description: "",
  durationMinutes: "30",
  cardImage: "",
  videoUrl: "",
  slideUrl: "",
  objectives: [""],
  sections: [blankSection()],
  keyTerms: [],
  references: [],
});

/* ---------- saved chapter -> form ---------- */

const rec = (v: unknown): Record<string, unknown> => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});
const list = (v: unknown): Record<string, unknown>[] => (Array.isArray(v) ? v.map(rec) : []);
const str = (v: unknown) => (typeof v === "string" ? v : "");

export function draftFromChapter(c: ChapterFull): ChapterDraft {
  const objectives = list(c.objectives).map((o) => str(o.objective));
  const sections = list(c.sections).map((s): SectionDraft => {
    const urls = list(s.imageUrl);
    const sources = list(s.imageSource);
    const n = Math.max(urls.length, sources.length); // image i = url i + credit i
    const paragraphs = list(s.content).map((p) => str(p.paragraph));
    return {
      sectionNo: str(s.sectionNo),
      header: str(s.header),
      images: Array.from({ length: n }, (_, i) => ({ url: str(urls[i]?.url), source: str(sources[i]?.source) })),
      paragraphs: paragraphs.length ? paragraphs : [""],
    };
  });

  return {
    chapterNo: String(c.chapterNo),
    title: c.title,
    description: c.description,
    durationMinutes: String(c.durationMinutes),
    cardImage: c.cardImage,
    videoUrl: c.videoUrl,
    slideUrl: c.slideUrl,
    objectives: objectives.length ? objectives : [""],
    sections: sections.length ? sections : [blankSection()],
    keyTerms: list(c.keyTerms).map((t) => ({ word: str(t.word), definition: str(t.definition), source: str(t.source) })),
    references: list(c.references).map((r) => ({ author: str(r.author), link: str(r.link) })),
  };
}

/* ---------- form -> API input (with friendly validation) ---------- */

const HTTP = /^https?:\/\/\S+$/i;
const fail = (error: string) => ({ ok: false as const, error });

export function buildChapter(d: ChapterDraft): { ok: true; body: ChapterInput } | { ok: false; error: string } {
  const chapterNo = Number(d.chapterNo);
  const duration = Number(d.durationMinutes);
  if (!Number.isInteger(chapterNo) || chapterNo < 1) return fail("Chapter number must be a whole number, 1 or higher.");
  if (!d.title.trim()) return fail("Give the chapter a title.");
  if (!d.description.trim()) return fail("Add a short description of the chapter.");
  if (!Number.isInteger(duration) || duration < 1) return fail("Duration must be a whole number of minutes, 1 or higher.");
  if (!d.cardImage.trim()) return fail("Add a card image (a link, or a path like /chapters/01.png).");
  if (!HTTP.test(d.videoUrl.trim())) return fail("The video link must start with http:// or https://.");
  if (!HTTP.test(d.slideUrl.trim())) return fail("The slides link must start with http:// or https://.");

  const objectives = d.objectives.map((o) => o.trim()).filter(Boolean);
  if (objectives.length === 0) return fail("Add at least one learning objective.");

  // sections: completely untouched ones are skipped, half-filled ones are reported
  const kept: (SectionDraft & { paragraphs: string[] })[] = [];
  for (let i = 0; i < d.sections.length; i++) {
    const s = d.sections[i];
    const header = s.header.trim();
    const paragraphs = s.paragraphs.map((p) => p.trim()).filter(Boolean);
    const images = s.images.filter((im) => im.url.trim() || im.source.trim());
    if (!header && paragraphs.length === 0 && images.length === 0) continue;

    const n = `Section ${i + 1}`;
    if (!header) return fail(`${n} needs a heading.`);
    if (paragraphs.length === 0) return fail(`${n} needs at least one paragraph.`);
    if (images.some((im) => !im.url.trim())) return fail(`${n}: every image needs a link (or remove the image).`);
    kept.push({ ...s, header, images, paragraphs });
  }
  if (kept.length === 0) return fail("Add at least one section of lesson content.");

  // saved section ids are preserved; new ones get the next free "section-n"
  const reserved = new Set(kept.map((s) => s.sectionNo.trim()).filter(Boolean));
  const assigned = new Set<string>();
  const sections = kept.map((s) => {
    let no = s.sectionNo.trim();
    if (!no || assigned.has(no)) {
      let k = 1;
      while (reserved.has(`section-${k}`) || assigned.has(`section-${k}`)) k++;
      no = `section-${k}`;
    }
    assigned.add(no);
    return {
      sectionNo: no,
      header: s.header,
      imageUrl: s.images.map((im) => ({ url: im.url.trim() })),
      imageSource: s.images.map((im) => ({ source: im.source.trim() })),
      content: s.paragraphs.map((paragraph) => ({ paragraph })),
    };
  });

  const keyTerms: ChapterInput["keyTerms"] = [];
  for (let i = 0; i < d.keyTerms.length; i++) {
    const t = d.keyTerms[i];
    const word = t.word.trim();
    const definition = t.definition.trim();
    const source = t.source.trim();
    if (!word && !definition && !source) continue;
    if (!word || !definition) return fail(`Key term ${i + 1} needs both a word and a definition.`);
    keyTerms.push({ word, definition, source });
  }

  const references: ChapterInput["references"] = [];
  for (let i = 0; i < d.references.length; i++) {
    const author = d.references[i].author.trim();
    const link = d.references[i].link.trim();
    if (!author && !link) continue;
    if (!author) return fail(`Reference ${i + 1} needs an author or source name.`);
    references.push({ author, link });
  }

  return {
    ok: true,
    body: {
      chapterNo,
      title: d.title.trim(),
      description: d.description.trim(),
      durationMinutes: duration,
      cardImage: d.cardImage.trim(),
      videoUrl: d.videoUrl.trim(),
      slideUrl: d.slideUrl.trim(),
      objectives: objectives.map((objective) => ({ objective })),
      sections,
      keyTerms,
      references,
    },
  };
}
