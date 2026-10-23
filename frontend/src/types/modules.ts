
/* ================================
   IAS MODULE
================================ */

export interface IASModule {
  unitId: string;
  moduleId: string;
  moduleNo: number;
  title: string;
  description: string;
  objectives: string[];
  lessons: IASLesson[];
  references: IASReference[];
  createdAt: string;
  updatedAt: string;
}

/* ================================
   IAS LESSON
================================ */

export interface IASLesson {
  id: string;
  lessonNo: string;
  title: string;
  description: string;
  keyTerms: IASTerm[];
  durationMinutes: number;
  video: IASVideo[];
  sections: IASSection[];
}

/* ================================
   KEY TERMS
================================ */

export interface IASTerm {
  word: string;
  definition: string;
  source?: string;
}

/* ================================
   VIDEO RESOURCES
================================ */

export interface IASVideo {
  title: string;
  url: string;
  provider: "youtube" | "vimeo" | "local" | "other";
}

/* ================================
   LESSON SECTIONS
================================ */

export interface IASSection {
  sectionNo: string;
  header: string;
  contentBlocks: IASContentBlock[];
}

/* ================================
   CONTENT BLOCKS
================================ */

export type IASContentBlock =
  | IASParagraphBlock
  | IASHeadingBlock
  | IASListBlock
  | IASImageBlock
  | IASTableBlock
  | IASCalloutBlock
  | IASCodeBlock
  | IASQuoteBlock;

/* Paragraph */

export interface IASParagraphBlock {
  type: "paragraph";
  text: string;
}

/* Heading */

export interface IASHeadingBlock {
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

/* Ordered or unordered list */

export interface IASListBlock {
  type: "list";
  style: "ordered" | "unordered";
  items: string[];
}

/* Image */

export interface IASImageBlock {
  type: "image";
  url: string;
  alt: string;
  source?: string;
  caption?: string;
}

/* Table */

export interface IASTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

/* Callout */

export interface IASCalloutBlock {
  type: "callout";
  variant: "info" | "tip" | "warning" | "important";
  title?: string;
  text: string;
}

/* Code sample */

export interface IASCodeBlock {
  type: "code";
  language: string;
  code: string;
  caption?: string;
}

/* Quote */

export interface IASQuoteBlock {
  type: "quote";
  text: string;
  attribution?: string;
}

/* ================================
   REFERENCES
================================ */

export interface IASReference {
  title: string;
  url: string;
  author?: string;
  organization?: string;
  publishedYear?: number;
  accessedAt?: string;
}
