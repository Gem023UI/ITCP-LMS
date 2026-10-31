export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  readMinutes: number;
  likes: number;
  author: string;
  publishedAt: string; // YYYY-MM-DD
  content: ArticleBlock[];
  isUserMade?: boolean;
};

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

const BASE_ARTICLES: Article[] = [
  {
    id: "what-is-cloud-computing",
    title: "What Is Cloud Computing?",
    description:
      "A plain-language tour of what the cloud actually is, who runs it, and why almost every modern app depends on it.",
    coverUrl: cover("cloud-basics"),
    readMinutes: 5,
    likes: 248,
    author: "LMS Team",
    publishedAt: "2026-09-02",
    content: [
      { type: "paragraph", text: "Cloud computing is the delivery of computing resources such as servers, storage, databases and networking over the internet, on demand and usually billed by usage." },
      { type: "heading", text: "The three service models" },
      { type: "list", items: ["IaaS: you rent virtual machines, storage and networks.", "PaaS: you deploy code and the platform manages the servers.", "SaaS: you simply use finished software through a browser."] },
      { type: "heading", text: "Why it matters" },
      { type: "paragraph", text: "Instead of buying hardware up front, teams can start small, scale when traffic grows, and shut things down when they are no longer needed." },
    ],
  },
  {
    id: "iaas-paas-saas-explained",
    title: "IaaS vs PaaS vs SaaS",
    description:
      "Three service models, one simple way to remember who manages what, with everyday examples for each.",
    coverUrl: cover("service-models"),
    readMinutes: 4,
    likes: 197,
    author: "LMS Team",
    publishedAt: "2026-09-09",
    content: [
      { type: "paragraph", text: "The easiest way to compare the models is to ask which layers of the stack you are responsible for." },
      { type: "heading", text: "Infrastructure as a Service" },
      { type: "paragraph", text: "You manage the operating system, runtime and application. The provider manages the physical hardware and virtualization." },
      { type: "heading", text: "Platform as a Service" },
      { type: "paragraph", text: "You manage only your application and data. The provider handles the OS, runtime and scaling." },
      { type: "heading", text: "Software as a Service" },
      { type: "paragraph", text: "You manage nothing but your own account and settings." },
    ],
  },
  {
    id: "shared-responsibility-model",
    title: "The Shared Responsibility Model",
    description:
      "Security in the cloud is split between the provider and you. Learn where the line sits and what falls on your side.",
    coverUrl: cover("shared-responsibility"),
    readMinutes: 6,
    likes: 312,
    author: "LMS Team",
    publishedAt: "2026-09-16",
    content: [
      { type: "paragraph", text: "Cloud providers secure the underlying infrastructure, but customers remain responsible for what they put on it." },
      { type: "heading", text: "Provider responsibilities" },
      { type: "list", items: ["Physical data centers and hardware", "Host operating systems and virtualization", "Core networking"] },
      { type: "heading", text: "Customer responsibilities" },
      { type: "list", items: ["Identity and access management", "Data classification and encryption", "Application and network configuration"] },
      { type: "paragraph", text: "Most real-world cloud breaches trace back to misconfiguration on the customer side, not to the provider." },
    ],
  },
  {
    id: "choosing-a-cloud-region",
    title: "Choosing a Cloud Region",
    description:
      "Latency, cost, compliance and availability: the four things to weigh before deploying anywhere.",
    coverUrl: cover("cloud-region"),
    readMinutes: 3,
    likes: 96,
    author: "LMS Team",
    publishedAt: "2026-09-23",
    content: [
      { type: "paragraph", text: "A region is a geographic area containing multiple data centers. Where you deploy affects both user experience and legal obligations." },
      { type: "list", items: ["Latency: place workloads close to your users.", "Cost: prices differ between regions.", "Compliance: some data must stay inside a country.", "Availability: spread across zones for resilience."] },
    ],
  },
  {
    id: "intro-to-containers",
    title: "Containers in 5 Minutes",
    description:
      "What a container is, how it differs from a virtual machine, and why Docker changed how software ships.",
    coverUrl: cover("containers"),
    readMinutes: 5,
    likes: 421,
    author: "LMS Team",
    publishedAt: "2026-10-01",
    content: [
      { type: "paragraph", text: "A container packages an application together with everything it needs to run, so it behaves the same on a laptop and in production." },
      { type: "heading", text: "Containers vs virtual machines" },
      { type: "paragraph", text: "Virtual machines each carry a full guest operating system. Containers share the host kernel, which makes them smaller and much faster to start." },
      { type: "heading", text: "Why teams like them" },
      { type: "list", items: ["Consistent environments", "Fast startup and scaling", "Easy to version and roll back"] },
    ],
  },
  {
    id: "cost-optimization-basics",
    title: "Cloud Cost Optimization Basics",
    description:
      "Simple habits that keep your monthly bill under control without slowing your team down.",
    coverUrl: cover("cloud-cost"),
    readMinutes: 4,
    likes: 154,
    author: "LMS Team",
    publishedAt: "2026-10-12",
    content: [
      { type: "paragraph", text: "The cloud makes it easy to create resources and just as easy to forget them. A few habits go a long way." },
      { type: "list", items: ["Tag every resource with an owner and project.", "Right-size instances based on real usage.", "Turn off non-production environments overnight.", "Set budgets and billing alerts early."] },
      { type: "paragraph", text: "Review the bill monthly. Unexpected line items are almost always forgotten resources." },
    ],
  },
];

/* ---- 24 more samples ---- */
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const l = (...items: string[]): ArticleBlock => ({ type: "list", items });

const sample = (
  id: string,
  title: string,
  description: string,
  readMinutes: number,
  likes: number,
  publishedAt: string,
  content: ArticleBlock[],
): Article => ({
  id,
  title,
  description,
  coverUrl: cover(id),
  readMinutes,
  likes,
  author: "LMS Team",
  publishedAt,
  content,
});

const MORE_ARTICLES: Article[] = [
  sample("serverless-computing", "Serverless Computing Explained", "Run code without managing servers, and pay only for the milliseconds it actually runs.", 5, 289, "2026-10-13", [
    p("Serverless doesn't mean there are no servers. It means the provider manages them, so you only write functions and trigger them with events."),
    h("When it fits"),
    l("Event-driven tasks such as image resizing", "APIs with unpredictable traffic", "Scheduled jobs and automation"),
    p("Cold starts and execution time limits are the main trade-offs to plan around."),
  ]),
  sample("load-balancing", "How Load Balancers Work", "Spread traffic across servers so no single machine becomes the bottleneck.", 4, 176, "2026-10-13", [
    p("A load balancer sits in front of your servers and decides which one handles each request."),
    h("Common strategies"),
    l("Round robin: rotate through servers in order.", "Least connections: pick the least busy server.", "IP hash: keep a client on the same server."),
    p("Health checks let the balancer stop sending traffic to servers that fail."),
  ]),
  sample("auto-scaling", "Auto Scaling in Practice", "Let your infrastructure grow and shrink with demand instead of guessing capacity.", 4, 132, "2026-10-14", [
    p("Auto scaling adds or removes instances based on rules such as CPU usage or request count."),
    h("Two directions"),
    l("Scale out: add more instances.", "Scale up: use a bigger instance."),
    p("Set a sensible minimum and maximum so a traffic spike can't become a surprise bill."),
  ]),
  sample("cdn-basics", "CDN Basics", "Content delivery networks serve files from servers near your users, making sites faster everywhere.", 3, 105, "2026-10-14", [
    p("A CDN caches copies of your static files at edge locations around the world."),
    l("Faster page loads", "Less load on your origin server", "Some protection against traffic spikes"),
    p("Cache headers decide how long each file stays at the edge."),
  ]),
  sample("object-vs-block-storage", "Object vs Block Storage", "Two ways to store data in the cloud, and how to pick between them.", 5, 89, "2026-10-15", [
    p("Block storage behaves like a hard drive attached to a server. Object storage stores files as objects with metadata, accessed over HTTP."),
    h("Pick block storage for"),
    l("Databases", "Operating system disks"),
    h("Pick object storage for"),
    l("Images, videos and backups", "Static website files", "Data lakes"),
  ]),
  sample("virtual-private-cloud", "Understanding the Virtual Private Cloud", "Your own isolated network inside the provider's data center.", 6, 73, "2026-10-15", [
    p("A VPC lets you define IP ranges, subnets, route tables and gateways for your resources."),
    h("Key pieces"),
    l("Public subnets for internet-facing services", "Private subnets for databases and internal services", "Security groups as per-instance firewalls"),
  ]),
  sample("iam-least-privilege", "IAM and Least Privilege", "Give every user and service only the permissions it needs, and nothing more.", 5, 66, "2026-10-16", [
    p("Identity and Access Management controls who can do what in your cloud account."),
    l("Never use the root account for daily work.", "Grant permissions to groups or roles, not individuals.", "Turn on multi-factor authentication.", "Review unused permissions regularly."),
  ]),
  sample("intro-to-kubernetes", "A Gentle Intro to Kubernetes", "How Kubernetes schedules and heals containers so you don't have to.", 7, 58, "2026-10-16", [
    p("Kubernetes is an orchestrator. You describe the state you want, and it works to keep the cluster in that state."),
    h("Core objects"),
    l("Pod: one or more containers running together", "Deployment: manages replicas and updates", "Service: a stable address for a set of pods"),
  ]),
  sample("infrastructure-as-code", "Infrastructure as Code", "Define servers and networks in files you can review, version and reuse.", 5, 41, "2026-10-17", [
    p("Instead of clicking through a console, you describe your infrastructure in code and apply it with a tool."),
    l("Repeatable environments", "Changes tracked in version control", "Easy to tear down and rebuild"),
  ]),
  sample("cloud-databases", "Choosing a Cloud Database", "Relational, document, key-value: which one matches your data?", 6, 34, "2026-10-18", [
    p("The right database depends on how your data is shaped and how it is queried."),
    h("Rule of thumb"),
    l("Relational for structured data and transactions", "Document stores for flexible, nested data", "Key-value stores for caching and sessions"),
  ]),
  sample("multi-cloud-vs-hybrid", "Multi-Cloud vs Hybrid Cloud", "Two terms that sound alike but solve different problems.", 4, 27, "2026-10-19", [
    p("Hybrid cloud mixes on-premises infrastructure with a public cloud. Multi-cloud uses more than one public provider."),
    p("Teams choose them for compliance, resilience or to avoid depending on a single vendor."),
  ]),
  sample("disaster-recovery", "Disaster Recovery Planning", "What happens when a whole region goes down? Plan for it before it does.", 5, 23, "2026-10-20", [
    p("Two numbers drive every recovery plan."),
    l("RTO: how long you can be down", "RPO: how much data you can afford to lose"),
    p("The lower those numbers, the more a plan costs. Match them to what the business truly needs."),
  ]),
  sample("devops-ci-cd", "CI/CD in the Cloud", "Automate building, testing and deploying so releases become routine.", 5, 18, "2026-10-21", [
    p("Continuous integration merges and tests code often. Continuous delivery keeps it ready to deploy at any time."),
    l("Run tests on every push", "Deploy to staging automatically", "Keep rollbacks one click away"),
  ]),
  sample("cloud-monitoring", "Monitoring and Logging Basics", "You can't fix what you can't see. Start with metrics, logs and alerts.", 4, 15, "2026-10-22", [
    p("Metrics tell you something is wrong, logs tell you why, and alerts tell you when to look."),
    p("Alert on symptoms users feel, such as error rates and latency, before low-level causes."),
  ]),
  sample("api-gateways", "What Is an API Gateway?", "A single front door for all your backend services.", 3, 12, "2026-10-23", [
    p("An API gateway routes requests and can handle authentication, rate limiting and caching in one place."),
    l("Simpler clients", "Central security rules", "Easier monitoring"),
  ]),
  sample("edge-computing", "Edge Computing in a Nutshell", "Move computation closer to where data is created.", 4, 10, "2026-10-24", [
    p("Edge computing processes data near its source, cutting latency and bandwidth use."),
    p("Think smart cameras, factory sensors and CDN functions."),
  ]),
  sample("cloud-migration-strategies", "Cloud Migration Strategies", "Rehost, replatform, refactor: the main paths to the cloud.", 6, 9, "2026-10-25", [
    p("Not every application should move the same way."),
    l("Rehost: lift and shift as-is", "Replatform: small changes to use managed services", "Refactor: redesign to be cloud-native"),
  ]),
  sample("encryption-at-rest", "Encryption at Rest and in Transit", "Protect data when it is stored and when it moves.", 4, 8, "2026-10-26", [
    p("At rest means encrypting disks and databases. In transit means using TLS for every connection."),
    p("Most providers offer managed key services so you don't store keys next to the data."),
  ]),
  sample("microservices", "Microservices vs Monoliths", "Smaller services bring flexibility and new kinds of complexity.", 5, 7, "2026-10-27", [
    p("A monolith is one deployable unit. Microservices split the app into small services that communicate over the network."),
    p("Start with a well-structured monolith unless you have a clear reason to split."),
  ]),
  sample("message-queues", "Message Queues 101", "Decouple services so slow work doesn't block fast requests.", 4, 5, "2026-10-27", [
    p("A queue holds messages until a worker is ready to process them."),
    l("Smooths traffic spikes", "Lets services fail independently", "Enables retries"),
  ]),
  sample("cloud-certifications", "Are Cloud Certifications Worth It?", "A student's guide to choosing a first certification.", 3, 4, "2026-10-28", [
    p("Entry-level certifications cover core concepts and give structure to your learning."),
    p("Pair them with a small hands-on project so the knowledge sticks."),
  ]),
  sample("green-cloud", "Green Cloud Computing", "How data centers are cutting their energy footprint.", 3, 3, "2026-10-29", [
    p("Efficient hardware, renewable energy and shared infrastructure all reduce the footprint of each workload."),
  ]),
  sample("vendor-lock-in", "Understanding Vendor Lock-In", "What it is, why it happens, and how much to worry about it.", 4, 2, "2026-10-29", [
    p("Lock-in happens when moving away from a provider becomes costly because of proprietary services."),
    p("Open standards and containers reduce it, but some lock-in is a fair price for convenience."),
  ]),
  sample("cloud-glossary", "Cloud Glossary for Beginners", "Twenty terms you'll hear in every cloud class.", 2, 0, "2026-10-30", [
    l("Instance: a virtual server", "Region: a geographic area of data centers", "Bucket: a container for stored objects", "Latency: delay between request and response"),
  ]),
];

export const ARTICLES: Article[] = [...BASE_ARTICLES, ...MORE_ARTICLES];

export const getArticle = (id: string) => ARTICLES.find((a) => a.id === id);