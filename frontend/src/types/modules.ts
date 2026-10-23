
export interface CloudComputingChapter {
  chapterId: string;
  title: string;
  description: string;
  objectives: CloudChapterObjective[];
  videoUrl: string;
  slideUrl: string;
  sections: CloudChapterSection[];
  keyTerms: CloudKeyTerm[];
  references: CloudReference[];
  createdAt: string;
  updatedAt: string;
}

export interface CloudChapterObjective {
  objective: string;
}

export interface CloudChapterSection {
  sectionNo: string;
  header: string;
  imageUrl: CloudSectionImage[];
  imageSource: CloudSectionImageSource[];
  content: CloudSectionContent[];
}

export interface CloudSectionImage {
  url: string;
}

export interface CloudSectionImageSource {
  source: string;
}

export interface CloudSectionContent {
  paragraph: string;
}

export interface CloudKeyTerm {
  word: string;
  definition: string;
  source: string;
}

export interface CloudReference {
  author: string;
  link: string;
}
