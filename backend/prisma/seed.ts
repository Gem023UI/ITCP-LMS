import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// ───────────── helpers ─────────────
const hash = (p: string) => bcrypt.hash(p, 10);
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}`;
const pic = (seed: string, w = 1200, h = 630) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
// TODO: replace with real lesson videos
const PLACEHOLDER_VIDEO = "https://www.youtube.com/embed/dQw4w9WgXcQ";

// ───────────── users ─────────────
type Role = "ADMIN" | "TEACHER" | "STUDENT";
type SeedUser = {
  email: string;
  tuptId: string | null;
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
};

const FIRST = [
  "Angelo", "Bea", "Carlo", "Denise", "Elijah", "Francine", "Gabriel", "Hazel", "Ivan",
  "Jasmine", "Kyle", "Lorraine", "Marco", "Nicole", "Orlando", "Patricia", "Quentin",
  "Rhea", "Sam", "Trisha", "Uriel", "Vanessa", "Wesley", "Xyra", "Yuri",
];
const LAST = [
  "Reyes", "Garcia", "Bautista", "Mendoza", "Aquino", "Villanueva", "Castillo", "Ramos",
  "Navarro", "Domingo", "Soriano", "Pascual", "Tolentino", "Salazar", "Lim", "Corpuz",
  "Manalo", "Valdez", "Ocampo", "Santiago", "Dizon", "Francisco", "Cruz", "Torres", "Alvarez",
];

const mainUsers: SeedUser[] = [
  { email: "admin@tup.edu.ph", tuptId: null, firstName: "Alex", lastName: "Admin", role: "ADMIN", password: "Admin@12345" },
  { email: "teacher@tup.edu.ph", tuptId: "TUPT-20-0001", firstName: "Maria", lastName: "Santos", role: "TEACHER", password: "Teacher@12345" },
  { email: "student@tup.edu.ph", tuptId: "TUPT-24-0001", firstName: "Juan", lastName: "Dela Cruz", role: "STUDENT", password: "Student@12345" },
];

const extraStudents: SeedUser[] = Array.from({ length: 25 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    email: `student${n}@tup.edu.ph`,
    tuptId: `TUPT-24-${1001 + i}`,
    firstName: FIRST[i],
    lastName: LAST[i],
    role: "STUDENT" as Role,
    password: `Student${n}@TUP`,
  };
});

// ───────────── subjects ─────────────
type SeedSubject = {
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  code?: string; // private only
  chapters: string[]; // exactly 5
  mc: { question: string; choices: string[]; answer: string };
  ident: { question: string; answer: string }; // answers stored in ALL CAPS
};

const subjects: SeedSubject[] = [
  // ── PUBLIC ──
  {
    title: "Cloud Computing Fundamentals",
    description: "Core concepts of cloud computing: service models, deployment models, virtualization, and pricing.",
    visibility: "PUBLIC",
    chapters: ["What Is Cloud Computing", "Service Models: IaaS, PaaS, SaaS", "Deployment Models", "Virtualization Basics", "Cloud Economics and Pricing"],
    mc: { question: "Which service model delivers a ready-to-use application over the internet?", choices: ["IaaS", "PaaS", "SaaS", "DaaS"], answer: "SaaS" },
    ident: { question: "What is the term for the ability to scale resources up or down on demand?", answer: "ELASTICITY" },
  },
  {
    title: "Linux for the Cloud",
    description: "Hands-on Linux skills for working with servers and cloud instances.",
    visibility: "PUBLIC",
    chapters: ["Linux Basics and the Shell", "Users, Permissions, and Processes", "Package Management", "Networking Essentials", "Shell Scripting and Automation"],
    mc: { question: "Which command lists the files in a directory?", choices: ["ls", "cd", "rm", "mv"], answer: "ls" },
    ident: { question: "What is the superuser account in Linux called?", answer: "ROOT" },
  },
  {
    title: "Networking Fundamentals",
    description: "How data moves across networks: protocols, addressing, routing, and basic security.",
    visibility: "PUBLIC",
    chapters: ["OSI and TCP/IP Models", "IP Addressing and Subnetting", "DNS and DHCP", "Routing and Switching", "Network Security Basics"],
    mc: { question: "How many layers does the OSI model have?", choices: ["4", "5", "7", "9"], answer: "7" },
    ident: { question: "Which protocol translates domain names into IP addresses? (acronym)", answer: "DNS" },
  },
  {
    title: "Introduction to Databases",
    description: "Relational design, SQL, normalization, indexing, and a first look at NoSQL.",
    visibility: "PUBLIC",
    chapters: ["The Relational Model", "SQL Fundamentals", "Normalization", "Indexing and Query Performance", "NoSQL Overview"],
    mc: { question: "Which SQL clause filters rows?", choices: ["SELECT", "WHERE", "ORDER BY", "GROUP BY"], answer: "WHERE" },
    ident: { question: "What kind of key uniquely identifies each row in a table?", answer: "PRIMARY KEY" },
  },
  {
    title: "Web Application Development",
    description: "Build and deploy a web app: HTTP, front-end basics, and REST APIs.",
    visibility: "PUBLIC",
    chapters: ["HTTP and the Web", "HTML and CSS Essentials", "JavaScript Fundamentals", "REST APIs with Express", "Deploying Web Apps"],
    mc: { question: "Which HTTP method is typically used to create a resource?", choices: ["GET", "POST", "DELETE", "HEAD"], answer: "POST" },
    ident: { question: "What does the 'S' in HTTPS stand for?", answer: "SECURE" },
  },
  // ── PRIVATE ──
  {
    title: "Containers and Docker",
    description: "Package and run applications consistently with containers.",
    visibility: "PRIVATE",
    code: "K7M2QX",
    chapters: ["Why Containers", "Images and Dockerfiles", "Volumes and Networking", "Docker Compose", "Registries and CI Basics"],
    mc: { question: "What is a running instance of a Docker image called?", choices: ["Volume", "Container", "Registry", "Layer"], answer: "Container" },
    ident: { question: "Which file defines the steps to build a Docker image?", answer: "DOCKERFILE" },
  },
  {
    title: "Kubernetes Essentials",
    description: "Orchestrate containers at scale with Kubernetes.",
    visibility: "PRIVATE",
    code: "P4R9TD",
    chapters: ["Kubernetes Architecture", "Pods and Deployments", "Services and Ingress", "Config and Secrets", "Scaling and Observability"],
    mc: { question: "What is the smallest deployable unit in Kubernetes?", choices: ["Node", "Pod", "Cluster", "Namespace"], answer: "Pod" },
    ident: { question: "Which command-line tool is used to interact with a Kubernetes cluster?", answer: "KUBECTL" },
  },
  {
    title: "Cloud Security",
    description: "Protect cloud workloads: identity, encryption, network controls, and compliance.",
    visibility: "PRIVATE",
    code: "W3N8ZB",
    chapters: ["The Shared Responsibility Model", "Identity and Access Management", "Encryption and Key Management", "Network Security Controls", "Compliance and Incident Response"],
    mc: { question: "Under the shared responsibility model, who is always responsible for securing customer data?", choices: ["The cloud provider only", "The customer", "Neither party", "The internet provider"], answer: "The customer" },
    ident: { question: "What is the principle of granting only the minimum permissions needed called?", answer: "LEAST PRIVILEGE" },
  },
  {
    title: "DevOps and CI/CD",
    description: "Automate building, testing, and releasing software.",
    visibility: "PRIVATE",
    code: "H6C5YA",
    chapters: ["DevOps Culture and Practices", "Git Workflows", "Continuous Integration Pipelines", "Continuous Delivery and Release Strategies", "Monitoring and Feedback Loops"],
    mc: { question: "What does CI stand for in CI/CD?", choices: ["Continuous Integration", "Cloud Infrastructure", "Code Inspection", "Central Install"], answer: "Continuous Integration" },
    ident: { question: "What is an automated series of build and test steps called?", answer: "PIPELINE" },
  },
  {
    title: "Infrastructure as Code",
    description: "Provision and manage infrastructure declaratively with code.",
    visibility: "PRIVATE",
    code: "D2F7LJ",
    chapters: ["IaC Concepts", "Terraform Basics", "State and Modules", "Provisioning Cloud Resources", "Testing and Governance"],
    mc: { question: "Which tool by HashiCorp is a popular declarative IaC tool?", choices: ["Terraform", "Docker", "Nginx", "Jenkins"], answer: "Terraform" },
    ident: { question: "What file tracks the real-world resources Terraform manages? (two words)", answer: "STATE FILE" },
  },
];

// ───────────── articles ─────────────
const articleSeeds: [title: string, blurb: string][] = [
  ["Getting Started with Cloud Computing as a Student", "Cloud platforms are friendlier to beginners than most people think."],
  ["5 Linux Commands Every Beginner Should Know", "A handful of commands cover most of what you will do on a server."],
  ["How I Prepared for My First Capstone Defense", "Preparation, rehearsal, and honest answers carried our team through."],
  ["Understanding REST APIs in Plain English", "REST is mostly about treating everything as a resource with a clear address."],
  ["Docker for Absolute Beginners", "Containers solve the classic 'it works on my machine' problem."],
  ["Why Version Control Matters for Group Projects", "Git turns chaotic group work into a traceable, reversible process."],
  ["Intro to SQL: Writing Your First Queries", "Four keywords get you surprisingly far: SELECT, FROM, WHERE, JOIN."],
  ["Demystifying DNS: How Domain Names Work", "DNS is the internet's phone book, and it is worth understanding."],
  ["Study Habits That Actually Work for IT Students", "Consistency beats cramming, especially for hands-on subjects."],
  ["Choosing Between SQL and NoSQL", "The right database depends on your data shape and access patterns."],
  ["A Beginner's Guide to Git Branching", "Branches let you experiment without breaking the main line."],
  ["Securing Your First Web App", "Basic hygiene such as hashing passwords and validating input prevents most issues."],
  ["What Is Kubernetes and Do You Need It?", "Kubernetes is powerful, but many projects are fine without it."],
  ["Building a Portfolio That Gets Noticed", "Show a few polished projects with clear write-ups instead of many half-finished ones."],
  ["Understanding Big O Notation Without the Math Fear", "Big O describes how work grows as input grows, nothing more."],
  ["CI/CD Explained with a Pizza Analogy", "Think of a pipeline as an assembly line that never ships a burnt pizza."],
  ["How to Read Documentation Effectively", "Skim the structure first, then dive into the section you need."],
  ["Cloud Cost Management for Students", "Free tiers and budgets alerts keep surprise bills away."],
  ["Debugging Strategies for Beginners", "Reproduce, isolate, and change one thing at a time."],
  ["Lessons from Our Campus Hackathon", "Scope small, communicate often, and demo something that works."],
];

// ───────────── main ─────────────
async function main() {
  // 1) USERS
  const hashes = new Map<string, string>();
  for (const u of [...mainUsers, ...extraStudents]) hashes.set(u.password, await hash(u.password));

  const idByEmail = new Map<string, string>();
  for (const u of [...mainUsers, ...extraStudents]) {
    const row = await prisma.user.create({
      data: {
        email: u.email,
        tuptId: u.tuptId,
        firstName: u.firstName,
        lastName: u.lastName,
        passwordHash: hashes.get(u.password)!,
        imageUrl: avatar(`${u.firstName} ${u.lastName}`),
        role: u.role,
        status: "ACTIVE",
        ...(u.role === "STUDENT" ? { student: { create: {} } } : {}),
        ...(u.role === "TEACHER" ? { teacher: { create: {} } } : {}),
      },
    });
    idByEmail.set(u.email, row.id);
  }
  const teacherId = idByEmail.get("teacher@tup.edu.ph")!;
  const studentIds = ["student@tup.edu.ph", ...extraStudents.map((s) => s.email)].map((e) => idByEmail.get(e)!); // 26 students

  // 2) SUBJECTS -> CHAPTERS -> QUIZ (first chapter only, no deadline)
  for (const s of subjects) {
    const subject = await prisma.subject.create({
      data: {
        teacherId,
        title: s.title,
        description: s.description,
        mediaUrl: PLACEHOLDER_VIDEO,
        visibility: s.visibility,
        code: s.visibility === "PRIVATE" ? s.code! : null,
      },
    });

    for (let i = 0; i < s.chapters.length; i++) {
      const n = i + 1;
      const title = s.chapters[i];
      const key = `${slug(s.title)}-${n}`;
      const chapter = await prisma.chapter.create({
        data: {
          subjectId: subject.id,
          chapterNo: n,
          cardImage: pic(key, 640, 360),
          title,
          description: `An overview of ${title.toLowerCase()} in ${s.title}.`,
          durationMinutes: 20 + n * 5,
          videoUrl: PLACEHOLDER_VIDEO,
          slideUrl: `https://example.com/slides/${slug(s.title)}/chapter-${n}.pdf`,
          objectives: [
            { objective: `Explain the core ideas behind ${title}` },
            { objective: "Identify common real-world use cases" },
            { objective: "Apply the concepts in a short exercise" },
          ],
          sections: [
            ["Introduction", `This chapter introduces ${title.toLowerCase()} and why it matters in ${s.title}.`],
            ["Core Concepts", `The main building blocks of ${title.toLowerCase()} and how they fit together.`],
            ["Summary", `A recap of the key points covered in ${title.toLowerCase()}.`],
          ].map(([header, paragraph], idx) => ({
            sectionNo: String(idx + 1),
            header,
            imageUrl: [{ url: pic(`${key}-s${idx + 1}`, 800, 450) }],
            imageSource: [{ source: "Placeholder image (picsum.photos)" }],
            content: [{ paragraph }],
          })),
          keyTerms: [
            { word: title, definition: `The central topic of chapter ${n}.`, source: "" },
            { word: s.title, definition: "The subject this chapter belongs to.", source: "" },
          ],
          references: [{ author: `Further reading: ${title}`, link: `https://example.com/references/${key}` }],
        },
      });

      if (n === 1) {
        await prisma.quiz.create({
          data: {
            chapterId: chapter.id,
            deadline: null, // no deadline
            deadlineMode: "STRICT", // ignored while deadline is null
            questions: [
              { questionNo: 1, type: "multiple_choice", question: s.mc.question, choices: s.mc.choices, correctAnswer: s.mc.answer },
              { questionNo: 2, type: "identification", question: s.ident.question, choices: [], correctAnswer: s.ident.answer },
            ],
          },
        });
      }
    }
  }

  // 3) ARTICLES (authors: teacher or students only). First 5 get 20+ likes.
  const popularCounts = [26, 25, 23, 22, 21];
  for (let i = 0; i < articleSeeds.length; i++) {
    const [title, blurb] = articleSeeds[i];
    const key = slug(title);
    const authorId = i % 5 === 0 ? teacherId : studentIds[i % studentIds.length];
    const likeCount = i < 5 ? popularCounts[i] : (i * 2) % 7; // 0..6 for the rest
    const likers = i < 5 ? studentIds.slice(0, likeCount) : studentIds.slice(5, 5 + likeCount);

    await prisma.article.create({
      data: {
        authorId,
        title,
        coverImageUrl: pic(`${key}-cover`),
        likesCount: likers.length,
        sections: [
          { header: "Introduction", imageUrl: pic(`${key}-1`, 1000, 560), content: `${blurb} In this article we walk through the basics and share what we learned along the way.` },
          { header: "Key Takeaways", imageUrl: pic(`${key}-2`, 1000, 560), content: `Start small, practice regularly, and build something real. Mistakes are part of the process, and each one teaches you something you will not forget.` },
          { header: "Final Thoughts", imageUrl: pic(`${key}-3`, 1000, 560), content: `If you are just starting out, keep going. Share what you learn with classmates and keep asking questions.` },
        ],
        likes: { create: likers.map((userId) => ({ userId })) },
      },
    });
  }

  // 4) Credentials printout
  console.table(
    [...mainUsers, ...extraStudents].map((u) => ({
      role: u.role, email: u.email, tuptId: u.tuptId ?? "—", password: u.password,
    })),
  );
  console.log("Private subject codes:", subjects.filter((s) => s.code).map((s) => `${s.title}: ${s.code}`));
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });