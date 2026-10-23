
export interface IASModule {
  unitId: string;
  moduleId: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: IASLesson[];
  references: IASReference[];
  createdAt: string;
  updatedAt: string;
}

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

export interface IASTerm {
  word: string;
  definition: string;
  source: string;
}

export interface IASVideo {
  title: string;
  url: string;
  provider: string;
}

export interface IASSection {
  sectionNo: string;
  header: string;
  imageUrl: string;
  imageSource: string;
  textContent: string;
}

export interface IASReference {
  title: string;
  url: string;
  author: string;
  organization?: string;
}
