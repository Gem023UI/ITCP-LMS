import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { dayStart, shiftDay, toDay, toDbDate } from "../utils/tz";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// ───────────── helpers ─────────────
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const NOW = new Date();

const hash = (p: string) => bcrypt.hash(p, 10);
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const avatar = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}`;
const pic = (seed: string, w = 1200, h = 630) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
// TODO: replace with real lesson videos
const PLACEHOLDER_VIDEO = "https://www.youtube.com/embed/dQw4w9WgXcQ";
const ago = (ms: number) => new Date(NOW.getTime() - ms);

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

// ───────────── subjects / chapters / quiz questions ─────────────
// each chapter: [title, [mcQuestion, choices, answer], [identificationQuestion, ANSWER]]
type ChapterSeed = [title: string, mc: [string, string[], string], ident: [string, string]];
type SeedSubject = {
  title: string;
  description: string;
  visibility: "PUBLIC" | "PRIVATE";
  code?: string; // private only
  chapters: ChapterSeed[]; // exactly 5
};

const subjects: SeedSubject[] = [
  // ── PUBLIC ──
  {
    title: "Cloud Computing Fundamentals",
    description: "Core concepts of cloud computing: service models, deployment models, virtualization, and pricing.",
    visibility: "PUBLIC",
    chapters: [
      ["What Is Cloud Computing", ["Which is an essential characteristic of cloud computing?", ["On-demand self-service", "Fixed hardware capacity", "Manual provisioning only", "Single-tenant hosting"], "On-demand self-service"], ["What do we call delivering computing services over the internet? (two words)", "CLOUD COMPUTING"]],
      ["Service Models: IaaS, PaaS, SaaS", ["In which model does the provider manage everything, including the application?", ["IaaS", "PaaS", "SaaS", "On-premises"], "SaaS"], ["What does the 'P' in PaaS stand for?", "PLATFORM"]],
      ["Deployment Models", ["Which deployment model combines public and private clouds?", ["Hybrid cloud", "Community cloud", "Edge cloud", "Local cloud"], "Hybrid cloud"], ["A cloud operated for a single organization is called a ___ cloud.", "PRIVATE"]],
      ["Virtualization Basics", ["What software creates and runs virtual machines?", ["Hypervisor", "Compiler", "Router", "Debugger"], "Hypervisor"], ["What is a virtual copy of a computer called? (acronym)", "VM"]],
      ["Cloud Economics and Pricing", ["Which pricing model charges only for what you use?", ["Pay-as-you-go", "Flat annual license", "One-time purchase", "Pre-paid hardware"], "Pay-as-you-go"], ["Moving from upfront hardware costs to ongoing usage costs shifts spending from CAPEX to ___ (acronym)", "OPEX"]],
    ],
  },
  {
    title: "Linux for the Cloud",
    description: "Hands-on Linux skills for working with servers and cloud instances.",
    visibility: "PUBLIC",
    chapters: [
      ["Linux Basics and the Shell", ["Which command prints the current working directory?", ["pwd", "cd", "ls", "echo"], "pwd"], ["What is the default shell on most Linux distributions? (one word)", "BASH"]],
      ["Users, Permissions, and Processes", ["Which command changes file permissions?", ["chmod", "chown", "ps", "kill"], "chmod"], ["Which command lists running processes? (command)", "PS"]],
      ["Package Management", ["Which tool installs packages on Debian and Ubuntu?", ["apt", "yum", "brew", "pacman"], "apt"], ["Which package manager is used on Red Hat based systems? (command)", "YUM"]],
      ["Networking Essentials", ["Which command shows IP address configuration?", ["ip addr", "cat", "grep", "top"], "ip addr"], ["Which command tests connectivity with ICMP echo? (command)", "PING"]],
      ["Shell Scripting and Automation", ["What does the first line #!/bin/bash specify?", ["The script interpreter", "A comment only", "The file owner", "The script name"], "The script interpreter"], ["Which scheduler runs commands at set times? (command name)", "CRON"]],
    ],
  },
  {
    title: "Networking Fundamentals",
    description: "How data moves across networks: protocols, addressing, routing, and basic security.",
    visibility: "PUBLIC",
    chapters: [
      ["OSI and TCP/IP Models", ["Which OSI layer handles routing?", ["Network", "Transport", "Session", "Data link"], "Network"], ["Which protocol provides reliable delivery at the transport layer? (acronym)", "TCP"]],
      ["IP Addressing and Subnetting", ["How many bits is an IPv4 address?", ["32", "64", "128", "16"], "32"], ["What is the 128-bit successor to IPv4 called?", "IPV6"]],
      ["DNS and DHCP", ["What does DHCP automatically provide?", ["IP address configuration", "Encryption keys", "Web pages", "Email delivery"], "IP address configuration"], ["Which DNS record type maps a name to an IPv4 address? (one letter)", "A"]],
      ["Routing and Switching", ["Which device forwards frames using MAC addresses?", ["Switch", "Router", "Modem", "Firewall"], "Switch"], ["Which device connects different networks and forwards packets between them?", "ROUTER"]],
      ["Network Security Basics", ["What does a firewall primarily do?", ["Filters traffic by rules", "Stores files", "Compiles code", "Assigns IP addresses"], "Filters traffic by rules"], ["Which protocol secures web traffic with encryption? (acronym)", "TLS"]],
    ],
  },
  {
    title: "Introduction to Databases",
    description: "Relational design, SQL, normalization, indexing, and a first look at NoSQL.",
    visibility: "PUBLIC",
    chapters: [
      ["The Relational Model", ["In a relational table, what does a row represent?", ["A record", "A column type", "A database", "An index"], "A record"], ["What do we call a column that references another table's primary key? (two words)", "FOREIGN KEY"]],
      ["SQL Fundamentals", ["Which statement retrieves data?", ["SELECT", "INSERT", "UPDATE", "DELETE"], "SELECT"], ["Which keyword combines rows from two tables? (one word)", "JOIN"]],
      ["Normalization", ["What is the goal of normalization?", ["Reduce data redundancy", "Increase redundancy", "Speed up hardware", "Encrypt data"], "Reduce data redundancy"], ["Which normal form removes partial dependencies? (e.g. 1NF)", "2NF"]],
      ["Indexing and Query Performance", ["What does an index mainly improve?", ["Read speed for lookups", "Write speed", "Disk size", "Network latency"], "Read speed for lookups"], ["Which SQL command shows a query's execution plan? (one word)", "EXPLAIN"]],
      ["NoSQL Overview", ["Which of these is a document database?", ["MongoDB", "MySQL", "PostgreSQL", "SQLite"], "MongoDB"], ["Complete the phrase: Not Only ___", "SQL"]],
    ],
  },
  {
    title: "Web Application Development",
    description: "Build and deploy a web app: HTTP, front-end basics, and REST APIs.",
    visibility: "PUBLIC",
    chapters: [
      ["HTTP and the Web", ["Which status code means 'Not Found'?", ["404", "200", "500", "301"], "404"], ["Which HTTP method retrieves a resource? (one word)", "GET"]],
      ["HTML and CSS Essentials", ["Which tag creates a hyperlink?", ["<a>", "<p>", "<div>", "<img>"], "<a>"], ["Which CSS property changes text color? (one word)", "COLOR"]],
      ["JavaScript Fundamentals", ["Which keyword declares a block-scoped variable?", ["let", "var", "def", "dim"], "let"], ["Complete: JSON.___ converts JSON text into an object", "PARSE"]],
      ["REST APIs with Express", ["Which Express method defines a GET route?", ["app.get", "app.fetch", "app.read", "app.route.get"], "app.get"], ["Which HTTP status code means 'Created'? (number)", "201"]],
      ["Deploying Web Apps", ["What does CI/CD automate?", ["Building, testing and deploying", "Writing code", "Designing logos", "Hiring developers"], "Building, testing and deploying"], ["Which file lists a Node project's dependencies? (file name)", "PACKAGE.JSON"]],
    ],
  },
  // ── PRIVATE ──
  {
    title: "Containers and Docker",
    description: "Package and run applications consistently with containers.",
    visibility: "PRIVATE",
    code: "K7M2QX",
    chapters: [
      ["Why Containers", ["What do containers share with the host?", ["The OS kernel", "The BIOS", "The disk image", "The CPU only"], "The OS kernel"], ["Running the same way on any machine is called ___ (one word)", "PORTABILITY"]],
      ["Images and Dockerfiles", ["Which instruction sets the base image?", ["FROM", "RUN", "CMD", "COPY"], "FROM"], ["Complete: docker ___ builds an image", "BUILD"]],
      ["Volumes and Networking", ["What keeps data after a container is removed?", ["A volume", "A layer", "A tag", "A port"], "A volume"], ["Complete: docker ___ lists running containers", "PS"]],
      ["Docker Compose", ["Compose files are written in which format?", ["YAML", "XML", "CSV", "INI"], "YAML"], ["Complete: docker compose ___ starts the services", "UP"]],
      ["Registries and CI Basics", ["Which of these is a public image registry?", ["Docker Hub", "Git LFS", "Nginx", "Redis"], "Docker Hub"], ["Complete: docker ___ uploads an image to a registry", "PUSH"]],
    ],
  },
  {
    title: "Kubernetes Essentials",
    description: "Orchestrate containers at scale with Kubernetes.",
    visibility: "PRIVATE",
    code: "P4R9TD",
    chapters: [
      ["Kubernetes Architecture", ["Which component stores the cluster state?", ["etcd", "kubelet", "kube-proxy", "Pod"], "etcd"], ["A machine that runs workloads in a cluster is called a worker ___", "NODE"]],
      ["Pods and Deployments", ["Which object manages rolling updates of Pods?", ["Deployment", "Namespace", "ConfigMap", "Ingress"], "Deployment"], ["The smallest deployable unit in Kubernetes is a ___", "POD"]],
      ["Services and Ingress", ["Which object gives Pods a stable address?", ["Service", "Secret", "Volume", "Job"], "Service"], ["Which object routes external HTTP traffic into the cluster?", "INGRESS"]],
      ["Config and Secrets", ["Where should sensitive values be stored?", ["Secret", "ConfigMap", "Label", "Annotation"], "Secret"], ["Which object stores non-sensitive configuration? (one word)", "CONFIGMAP"]],
      ["Scaling and Observability", ["Which controller scales Pods based on CPU usage?", ["Horizontal Pod Autoscaler", "Scheduler", "Kubelet", "Ingress"], "Horizontal Pod Autoscaler"], ["Complete: kubectl ___ shows a Pod's output", "LOGS"]],
    ],
  },
  {
    title: "Cloud Security",
    description: "Protect cloud workloads: identity, encryption, network controls, and compliance.",
    visibility: "PRIVATE",
    code: "W3N8ZB",
    chapters: [
      ["The Shared Responsibility Model", ["Who secures the physical datacenter?", ["The cloud provider", "The customer", "Both equally", "Neither"], "The cloud provider"], ["Who is always responsible for their own data? (one word)", "CUSTOMER"]],
      ["Identity and Access Management", ["What does IAM manage?", ["Identities and permissions", "Disk space", "Billing", "DNS"], "Identities and permissions"], ["Which extra login step goes beyond a password? (acronym)", "MFA"]],
      ["Encryption and Key Management", ["Which protects data stored on disk?", ["Encryption at rest", "Load balancing", "Caching", "Compression"], "Encryption at rest"], ["Which kind of encryption uses a single shared key? (one word)", "SYMMETRIC"]],
      ["Network Security Controls", ["Which control isolates a private network segment in the cloud?", ["Virtual private cloud", "CDN", "Cron job", "Repository"], "Virtual private cloud"], ["Which attack overwhelms a service with traffic? (acronym)", "DDOS"]],
      ["Compliance and Incident Response", ["What is the first phase of incident response?", ["Preparation", "Recovery", "Lessons learned", "Eradication"], "Preparation"], ["A record of who did what in a system is an ___ log", "AUDIT"]],
    ],
  },
  {
    title: "DevOps and CI/CD",
    description: "Automate building, testing, and releasing software.",
    visibility: "PRIVATE",
    code: "H6C5YA",
    chapters: [
      ["DevOps Culture and Practices", ["DevOps mainly improves collaboration between which teams?", ["Development and operations", "Sales and HR", "Design and legal", "Finance and support"], "Development and operations"], ["What does the 'Ops' in DevOps stand for? (one word)", "OPERATIONS"]],
      ["Git Workflows", ["Which command creates a branch and switches to it?", ["git checkout -b", "git commit -m", "git push", "git init"], "git checkout -b"], ["Complete: git ___ combines another branch into the current one", "MERGE"]],
      ["Continuous Integration Pipelines", ["What typically triggers a CI pipeline?", ["A code push", "A power outage", "A password reset", "A DNS change"], "A code push"], ["What automated step verifies code behavior? (one word)", "TEST"]],
      ["Continuous Delivery and Release Strategies", ["Which release strategy sends traffic to a small share of users first?", ["Canary release", "Big bang", "Cold start", "Hard fork"], "Canary release"], ["Blue-___ runs two identical environments and switches between them", "GREEN"]],
      ["Monitoring and Feedback Loops", ["Which of these is a monitoring tool?", ["Prometheus", "Terraform", "Webpack", "Babel"], "Prometheus"], ["Numeric measurements collected over time are called ___ (one word)", "METRICS"]],
    ],
  },
  {
    title: "Infrastructure as Code",
    description: "Provision and manage infrastructure declaratively with code.",
    visibility: "PRIVATE",
    code: "D2F7LJ",
    chapters: [
      ["IaC Concepts", ["What is a key benefit of IaC?", ["Repeatable infrastructure", "Manual changes", "Hidden configs", "Slower setup"], "Repeatable infrastructure"], ["IaC describes infrastructure using ___ (one word)", "CODE"]],
      ["Terraform Basics", ["Which command previews changes?", ["terraform plan", "terraform fmt", "terraform init", "terraform login"], "terraform plan"], ["Complete: terraform ___ makes the changes", "APPLY"]],
      ["State and Modules", ["What is a reusable group of Terraform resources called?", ["Module", "Provider", "Output", "Variable"], "Module"], ["Teams commonly keep state in a remote ___ (one word)", "BACKEND"]],
      ["Provisioning Cloud Resources", ["Which Terraform block configures a cloud API?", ["provider", "locals", "output", "moved"], "provider"], ["Which block declares an infrastructure object? (one word)", "RESOURCE"]],
      ["Testing and Governance", ["Which practice checks infrastructure code before applying?", ["Policy as code and linting", "Skipping reviews", "Editing production by hand", "Deleting state"], "Policy as code and linting"], ["Enforcing rules automatically is called policy as ___", "CODE"]],
    ],
  },
];

const questionsFor = (chs: ChapterSeed[]) => {
  let n = 0;
  return chs.flatMap(([, mc, ident]) => [
    { questionNo: ++n, type: "multiple_choice", question: mc[0], choices: mc[1], correctAnswer: mc[2] },
    { questionNo: ++n, type: "identification", question: ident[0], choices: [] as string[], correctAnswer: ident[1] },
  ]);
};
type SeedQuestion = ReturnType<typeof questionsFor>[number];

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
  ["Cloud Cost Management for Students", "Free tiers and budget alerts keep surprise bills away."],
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
        createdAt: ago(45 * DAY),
        ...(u.role === "STUDENT" ? { student: { create: {} } } : {}),
        ...(u.role === "TEACHER" ? { teacher: { create: {} } } : {}),
      },
    });
    idByEmail.set(u.email, row.id);
  }
  const teacherId = idByEmail.get("teacher@tup.edu.ph")!;
  const studentIds = ["student@tup.edu.ph", ...extraStudents.map((s) => s.email)].map((e) => idByEmail.get(e)!); // 26 students

  // 2) SUBJECTS -> CHAPTERS -> QUIZZES (one quiz per chapter, deadlines from tomorrow to +30 days)
  type SeededQuiz = { id: string; questions: SeedQuestion[]; chapterIdx: number[] };
  type SeededSubject = { id: string; chapterIds: string[]; quizzes: SeededQuiz[] };
  const seeded: SeededSubject[] = [];
  const today = toDay(NOW);
  const DEADLINE_HOUR = 17; // 5:00 PM in the app timezone

  for (let si = 0; si < subjects.length; si++) {
    const s = subjects[si];
    const subject = await prisma.subject.create({
      data: {
        teacherId,
        title: s.title,
        description: s.description,
        mediaUrl: PLACEHOLDER_VIDEO,
        visibility: s.visibility,
        code: s.visibility === "PRIVATE" ? s.code! : null,
        createdAt: ago(44 * DAY),
      },
    });

    const chapterIds: string[] = [];
    for (let i = 0; i < s.chapters.length; i++) {
      const n = i + 1;
      const [title] = s.chapters[i];
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
          createdAt: ago(44 * DAY),
        },
      });
      chapterIds.push(chapter.id);
    }

    // quiz q (1..5) covers chapter q; quiz 5 also covers chapter 4 (multi-chapter coverage)
    const quizzes: SeededQuiz[] = [];
    for (let q = 0; q < 5; q++) {
      const chapterIdx = q === 4 ? [3, 4] : [q];
      const k = q * 10 + si; // 0..49: every subject gets deadlines spread across the whole month
      const daysAhead = 1 + Math.floor((k * 29) / 49); // 1..30
      const deadline = new Date(dayStart(shiftDay(today, daysAhead)).getTime() + DEADLINE_HOUR * HOUR);
      const questions = questionsFor(chapterIdx.map((i) => s.chapters[i]));

      const quiz = await prisma.quiz.create({
        data: {
          subjectId: subject.id,
          quizNo: q + 1,
          title: `${s.title} Quiz ${q + 1}`,
          questions,
          deadline,
          deadlineMode: k % 2 === 0 ? "STRICT" : "LATE",
          createdAt: ago(40 * DAY),
          coverage: { create: chapterIdx.map((i) => ({ chapterId: chapterIds[i] })) },
        },
      });
      quizzes.push({ id: quiz.id, questions, chapterIdx });
    }
    seeded.push({ id: subject.id, chapterIds, quizzes });
  }

  // 3) DEMO ACTIVITY over the last 30 days: joins, chapter completions, quiz attempts, study days
  const activity = new Map<string, Map<string, number>>(); // studentId -> day -> count
  const bump = (studentId: string, at: Date, by = 1) => {
    const day = toDay(at);
    const m = activity.get(studentId) ?? new Map<string, number>();
    m.set(day, (m.get(day) ?? 0) + by);
    activity.set(studentId, m);
  };

  const enrollments: {
    subjectId: string; studentId: string; status: "ONGOING" | "FINISHED";
    progress: number; joinedAt: Date; finishedAt: Date | null;
  }[] = [];
  const progressRows: {
    studentId: string; chapterId: string; percent: number; completedAt: Date | null;
  }[] = [];
  const attemptRows: {
    quizId: string; studentId: string; score: number; total: number;
    answers: { questionNo: number; answer: string }[]; isLate: boolean; createdAt: Date;
  }[] = [];

  const MAIN_DONE: Record<number, number> = { 0: 5, 1: 5, 2: 3, 5: 2 }; // the demo student's completed chapters per subject
  for (let j = 0; j < studentIds.length; j++) {
    const studentId = studentIds[j];
    const subjectIdxs =
      j === 0 ? [0, 1, 2, 5] : Array.from({ length: 2 + (j % 3) }, (_, t) => (j + t * 3) % 10);

    for (const si of subjectIdxs) {
      const sub = seeded[si];
      const joinedAt = ago(((j * 7 + si * 3) % 30) * DAY + (1 + ((j + si) % 12)) * HOUR);
      const done = j === 0 ? (MAIN_DONE[si] ?? 0) : (j + si) % 6; // 0..5 chapters completed

      // chapter completions (+ a half-read next chapter for resume)
      const completedAt: Date[] = [];
      for (let c = 0; c < done; c++) {
        const at = new Date(Math.min(joinedAt.getTime() + (c + 1) * 1.2 * DAY, NOW.getTime() - 30 * MIN));
        completedAt.push(at);
        progressRows.push({ studentId, chapterId: sub.chapterIds[c], percent: 100, completedAt: at });
        bump(studentId, at);
      }
      if (done < 5) {
        progressRows.push({
          studentId,
          chapterId: sub.chapterIds[done],
          percent: 20 + ((j + si) % 5) * 15,
          completedAt: null,
        });
      }

      // quiz attempts for quizzes whose chapters are all completed
      let taken = 0;
      let lastAttempt: Date | null = null;
      sub.quizzes.forEach((quiz, q) => {
        const eligible = quiz.chapterIdx.every((ci) => ci < done);
        const skip = j !== 0 && (j + q + si) % 5 === 4; // not everyone takes every quiz
        if (!eligible || skip) return;

        const lastChapter = Math.max(...quiz.chapterIdx);
        const at = new Date(Math.min(completedAt[lastChapter].getTime() + 2 * HOUR, NOW.getTime() - 5 * MIN));
        const answers = quiz.questions.map((qq, i) => {
          const good = j === 0 ? (q * 7 + si * 5 + i * 11) % 5 !== 0 : (j * 3 + si * 5 + q * 7 + i * 11) % 4 !== 0;
          const wrong = qq.type === "multiple_choice" ? qq.choices.find((c) => c !== qq.correctAnswer)! : "N/A";
          return { questionNo: qq.questionNo, answer: good ? qq.correctAnswer : wrong };
        });
        const score = answers.filter((a, i) => a.answer === quiz.questions[i].correctAnswer).length;
        attemptRows.push({ quizId: quiz.id, studentId, score, total: quiz.questions.length, answers, isLate: false, createdAt: at });
        taken++;
        lastAttempt = at;
      });

      // same rule as syncSubjectStatus: progress = (chapters + quizzes) / (all chapters + all quizzes);
      // FINISHED = every chapter completed and every quiz taken (deadlines are all in the future, none missed yet)
      const finished = done === 5 && taken === 5;
      enrollments.push({
        subjectId: sub.id,
        studentId,
        status: finished ? "FINISHED" : "ONGOING",
        progress: Math.round(((done + taken) / 10) * 100),
        joinedAt,
        finishedAt: finished ? lastAttempt : null,
      });
    }
  }

  // the demo student studied every day for the last 12 days -> a visible streak and heatmap
  for (let d = 0; d < 12; d++) bump(studentIds[0], ago(d * DAY + 2 * HOUR), 1 + (d % 3));

  await prisma.subjectStudent.createMany({ data: enrollments });
  await prisma.chapterProgress.createMany({ data: progressRows });
  await prisma.quizAttempt.createMany({ data: attemptRows });
  await prisma.studyActivity.createMany({
    data: [...activity.entries()].flatMap(([studentId, days]) =>
      [...days.entries()].map(([day, count]) => ({ studentId, date: toDbDate(day), count })),
    ),
  });

  // 4) ARTICLES (authors: teacher or students only). First 5 get 20+ likes, spread over the last 30 days.
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
        createdAt: ago((50 - i) * DAY), // all published before the 30-day window
        sections: [
          { header: "Introduction", imageUrl: pic(`${key}-1`, 1000, 560), content: `${blurb} In this article we walk through the basics and share what we learned along the way.` },
          { header: "Key Takeaways", imageUrl: pic(`${key}-2`, 1000, 560), content: `Start small, practice regularly, and build something real. Mistakes are part of the process, and each one teaches you something you will not forget.` },
          { header: "Final Thoughts", imageUrl: pic(`${key}-3`, 1000, 560), content: `If you are just starting out, keep going. Share what you learn with classmates and keep asking questions.` },
        ],
        likes: {
          create: likers.map((userId, r) => ({
            userId,
            createdAt: ago(((i * 5 + r * 7) % 30) * DAY + (1 + (r % 12)) * HOUR),
          })),
        },
      },
    });
  }

  // 5) Credentials printout
  console.table(
    [...mainUsers, ...extraStudents].map((u) => ({
      role: u.role, email: u.email, tuptId: u.tuptId ?? "—", password: u.password,
    })),
  );
  console.log("Private subject codes:", subjects.filter((s) => s.code).map((s) => `${s.title}: ${s.code}`));
  console.log(
    `Seeded ${subjects.length} subjects, ${seeded.reduce((n, s) => n + s.quizzes.length, 0)} quizzes, ` +
      `${enrollments.length} enrollments, ${attemptRows.length} quiz attempts, ${articleSeeds.length} articles.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });