/**
 * Sample seeder: 2 subjects x 3 chapters x 5-question quiz.
 * Run from the backend folder:  npx tsx prisma/seed.ts
 * Safe to re-run: a subject whose title already exists is skipped.
 */
import { prisma } from "../utils/prisma";

const SLIDE_URL = "about:blank"; // TODO: replace with a real slide embed link

type Question = {
  type: "multiple_choice" | "identification";
  question: string;
  choices: string[];
  correctAnswer: string;
};

/** multiple choice: `slot` is where the correct answer sits among the 4 choices */
const mc = (question: string, correct: string, wrong: [string, string, string], slot: number): Question => {
  const choices = [...wrong];
  choices.splice(slot, 0, correct);
  return { type: "multiple_choice", question, choices, correctAnswer: correct };
};
/** identification: answer is stored in ALL CAPS */
const ident = (question: string, answer: string): Question => ({
  type: "identification",
  question,
  choices: [],
  correctAnswer: answer.toUpperCase(),
});

type Section = { header: string; paragraphs: [string, string] };
type ChapterSeed = {
  title: string;
  description: string;
  objectives: [string, string, string];
  sections: [Section, Section, Section];
  quiz: [Question, Question, Question, Question, Question];
};
type SubjectSeed = {
  title: string;
  description: string;
  mediaUrl: string;
  cover: string;
  chapters: [ChapterSeed, ChapterSeed, ChapterSeed];
};

/* ------------------------------------------------------------------ */
/*  SUBJECT 1                                                          */
/* ------------------------------------------------------------------ */
const subject1: SubjectSeed = {
  title: "Am I Falling Behind? Life as a Tech Student",
  description:
    "Comparing yourself to classmates, online prodigies and AI-assisted peers? A grounded look at pacing, skills and staying in the race as a tech student.",
  mediaUrl: "https://www.youtube.com/embed/leh1u84LktY?si=PuoU_IGqjbavoYMr",
  cover:
    "https://imgs.search.brave.com/t0awgEIpBv6bJjm7Y458vN4DRmwY88XLe0-VORy3djs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg4/OTIxOTM5Ny9waG90/by90ZWFjaGVyLWhl/bHBpbmctYS1zdHVk/ZW50LXdvcmtpbmct/b24tYS1sYXB0b3At/aW4tYS1jb2xsZWdl/LWNhZmV0ZXJpYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/dFJQUnJGV2tJaFJO/VXpOWkMwUUd5c3ls/T1RoaE56cUp0RXNu/d3NUWC0tdz0",
  chapters: [
    {
      title: "The Comparison Trap",
      description: "Why everyone else seems ahead, and why that picture is usually incomplete.",
      objectives: [
        "Recognize how social media distorts perceived progress",
        "Explain why learning timelines differ between students",
        "Describe one way to track your own progress",
      ],
      sections: [
        {
          header: "Everyone's Highlight Reel",
          paragraphs: [
            "Online, tech students mostly share finished projects, internships and certificates. The hours of confusion, failed builds and rewritten code that came before them rarely make it into the post.",
            "Comparing your behind-the-scenes to someone else's highlight reel will almost always make you feel behind. The comparison is unfair because it matches unequal information.",
          ],
        },
        {
          header: "Why Timelines Differ",
          paragraphs: [
            "Students start with different backgrounds, access to equipment, free time and support. A classmate who coded in high school is not on a faster path, only on a different one.",
            "Progress in technology is also uneven. You may move slowly through one topic, then understand the next three in a week once the foundations click.",
          ],
        },
        {
          header: "Measuring Against Yourself",
          paragraphs: [
            "A more useful question than 'Am I ahead of them?' is 'Can I do something today that I could not do last month?' Personal benchmarks make progress visible without needing anyone else's results.",
            "Keep a simple log of skills learned, projects finished and problems solved. Reviewing it every few weeks shows steady growth that daily comparison hides.",
          ],
        },
      ],
      quiz: [
        mc(
          "What does social media usually show about other students?",
          "Mostly finished results and achievements",
          ["Their complete study process", "Their failed attempts", "Their daily schedules"],
          0,
        ),
        mc(
          "Why is comparing yourself to others often unfair?",
          "You compare your struggles with their highlights",
          ["Everyone learns at the same speed", "Other students never struggle", "Grades are always identical"],
          1,
        ),
        mc(
          "Which of these can explain different learning timelines?",
          "Background, access to resources and free time",
          ["Only natural talent", "Only the school attended", "Only the programming language chosen"],
          2,
        ),
        mc(
          "What is a healthier question to ask than 'Am I ahead of them?'",
          "Can I do something today that I could not do last month?",
          ["Who has more followers?", "Who finished first?", "Who has the newest laptop?"],
          3,
        ),
        ident("A simple record of skills learned and projects finished that helps you see progress is called a progress ____.", "LOG"),
      ],
    },
    {
      title: "Skills That Outlast Trends",
      description: "Where to invest your learning time when tools and frameworks keep changing.",
      objectives: [
        "Differentiate fundamentals from short-lived trends",
        "Explain how to use AI tools to support, not replace, learning",
        "Identify examples of proof of work",
      ],
      sections: [
        {
          header: "Fundamentals First",
          paragraphs: [
            "Frameworks come and go, but data structures, networking, databases and problem solving remain useful across tools. Strong fundamentals make new technologies faster to learn.",
            "Before chasing the newest library, ask whether you can explain the concept underneath it. If you can, switching tools later will feel manageable instead of stressful.",
          ],
        },
        {
          header: "Learning With AI, Not Instead of It",
          paragraphs: [
            "AI assistants can explain errors, suggest approaches and speed up repetitive work. Used well, they act like a patient tutor available at any hour.",
            "The risk is accepting answers you do not understand. Try solving first, then use AI to check, question and improve your work so the learning stays with you.",
          ],
        },
        {
          header: "Building Proof of Work",
          paragraphs: [
            "Employers trust evidence. A small deployed project, a documented repository or a clear write-up of a problem you solved says more than a list of tools on a resume.",
            "Start small and finish things. Several completed, modest projects teach more and show more than one ambitious project that never ships.",
          ],
        },
      ],
      quiz: [
        mc(
          "Which is considered a long-lasting skill?",
          "Problem solving and data structures",
          ["Memorizing one framework's syntax", "Following every new trend", "Collecting certificates only"],
          1,
        ),
        mc(
          "How should AI tools ideally be used while learning?",
          "To check and improve work you attempted yourself",
          ["To avoid thinking about problems", "To copy answers without reading", "To replace all practice"],
          0,
        ),
        mc(
          "What is the main risk of relying on AI answers?",
          "Accepting solutions you do not understand",
          ["AI never makes mistakes", "AI cannot explain errors", "AI slows down all learning"],
          2,
        ),
        mc(
          "Which is the best example of proof of work?",
          "A documented project that is deployed and shareable",
          ["A list of tools you have heard of", "A screenshot of a course", "An unfinished idea"],
          3,
        ),
        ident("The skills that stay useful across tools, such as networking and databases, are called ____ skills.", "FUNDAMENTAL"),
      ],
    },
    {
      title: "Pacing Your Journey",
      description: "Study habits, asking for help and planning so you can keep going for the long run.",
      objectives: [
        "Describe a sustainable study routine",
        "Explain why asking for help early matters",
        "Outline a simple plan for the next semester",
      ],
      sections: [
        {
          header: "Sustainable Study Habits",
          paragraphs: [
            "Short, consistent sessions beat occasional all-night marathons. Thirty focused minutes daily builds memory and skill more reliably than one exhausting weekend.",
            "Rest is part of learning. Sleep, breaks and time away from screens help your brain consolidate what you studied and protect you from burnout.",
          ],
        },
        {
          header: "Asking for Help Early",
          paragraphs: [
            "Being stuck for hours is normal, but staying stuck for weeks is costly. Classmates, instructors and online communities can unblock you faster than struggling alone.",
            "When you ask, show what you have tried and where you are confused. Clear questions get better answers and teach you to describe problems like a professional.",
          ],
        },
        {
          header: "Planning the Next Semester",
          paragraphs: [
            "Choose two or three goals you can realistically reach, such as finishing one portfolio project or mastering one core subject. Fewer, clearer goals are easier to protect.",
            "Review the plan monthly and adjust. A plan that changes when life changes is a good plan, not a failed one.",
          ],
        },
      ],
      quiz: [
        mc(
          "Which study pattern is usually more effective?",
          "Short sessions done consistently",
          ["One all-night session per week", "Studying only before exams", "Skipping breaks entirely"],
          2,
        ),
        mc(
          "Why is rest important for learning?",
          "It helps the brain consolidate what was studied",
          ["It replaces practice", "It makes goals unnecessary", "It lowers motivation"],
          0,
        ),
        mc(
          "What should you include when asking for help?",
          "What you tried and where you are confused",
          ["Only the word 'help'", "A request for the full solution", "Nothing, to save time"],
          1,
        ),
        mc(
          "How many goals does the chapter suggest for a semester?",
          "Two or three realistic goals",
          ["As many as possible", "Ten or more", "None, just improvise"],
          3,
        ),
        ident("Feeling mentally and physically exhausted from too much study without rest is called ____.", "BURNOUT"),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  SUBJECT 2                                                          */
/* ------------------------------------------------------------------ */
const subject2: SubjectSeed = {
  title: "The Modern Tech Team: AI, Lean Structures & the Rise of Intern-Driven Execution",
  description:
    "How today's tech teams use AI, stay lean, and rely on interns to ship real work.",
  mediaUrl: "https://www.youtube.com/embed/aFIYqtsDrJg?si=B-B1c99qpUWSUb8K",
  cover:
    "https://imgs.search.brave.com/Ydit8FWd5QOadsYuAwoZRn1L0iDbXzGYCHX-MFMJik0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNjgw/NDA3My9wZXhlbHMt/cGhvdG8tNjgwNDA3/My5qcGVnP2NzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw",
  chapters: [
    {
      title: "AI in the Modern Tech Team",
      description: "How AI tools are changing the way engineering teams plan, build and review work.",
      objectives: [
        "Describe how AI tools are used across a team's workflow",
        "Identify tasks where AI adds the most value",
        "Explain why human judgment remains essential",
      ],
      sections: [
        {
          header: "From Tools to Teammates",
          paragraphs: [
            "AI has moved from a novelty to a daily tool. Teams use it to draft code, write tests, summarize documents and explore design options in minutes instead of hours.",
            "As these tools grow more capable, many teams treat them like a fast junior collaborator: useful, tireless, and in need of direction and review.",
          ],
        },
        {
          header: "Where AI Helps Most",
          paragraphs: [
            "AI shines on repetitive, well-defined work such as boilerplate code, documentation, refactoring and first-pass bug investigation. Automating these frees people for harder problems.",
            "It also lowers the cost of experimenting. Prototypes that once took days can be sketched in an afternoon, so teams can test more ideas before committing.",
          ],
        },
        {
          header: "Where Humans Stay in Charge",
          paragraphs: [
            "AI can produce confident but incorrect output. People remain responsible for requirements, architecture, security and the final decision to ship.",
            "Good teams set clear rules: review all AI-generated code, protect sensitive data and record important decisions so the reasoning is never left to a tool.",
          ],
        },
      ],
      quiz: [
        mc(
          "How do many teams treat AI tools today?",
          "Like a fast collaborator that needs direction and review",
          ["As a replacement for all engineers", "As a tool nobody should use", "As an infallible authority"],
          0,
        ),
        mc(
          "Which task is AI especially good at?",
          "Repetitive, well-defined work like boilerplate code",
          ["Deciding company strategy alone", "Replacing security reviews", "Understanding unstated customer needs"],
          1,
        ),
        mc(
          "What is a key risk of AI-generated output?",
          "It can be confident but incorrect",
          ["It is always too slow", "It cannot write text", "It never needs checking"],
          2,
        ),
        mc(
          "Who remains responsible for the decision to ship?",
          "The people on the team",
          ["The AI tool", "The code editor", "No one in particular"],
          3,
        ),
        ident("Checking AI-generated code before it is merged is called code ____.", "REVIEW"),
      ],
    },
    {
      title: "Lean Team Structures",
      description: "Why smaller teams with broader ownership are becoming the norm, and what they cost.",
      objectives: [
        "Define a lean team structure",
        "Explain how flat hierarchies speed up decisions",
        "Identify risks of running too lean",
      ],
      sections: [
        {
          header: "Small Teams, Wide Ownership",
          paragraphs: [
            "A lean team keeps headcount low and gives each person responsibility across more of the product, from design decisions to deployment and monitoring.",
            "With AI handling more routine work, a few skilled people can now cover ground that once needed an entire department.",
          ],
        },
        {
          header: "Flat Hierarchies and Fast Decisions",
          paragraphs: [
            "Fewer layers of management mean fewer handoffs and approvals. Decisions are made closer to the work, which shortens the time from idea to release.",
            "The tradeoff is that everyone must communicate clearly and take initiative, because there is less structure to catch what falls through the cracks.",
          ],
        },
        {
          header: "The Cost of Going Lean",
          paragraphs: [
            "Lean teams can become fragile. If one key person leaves or burns out, there may be no backup, and knowledge can disappear with them.",
            "Healthy lean teams document their work, share knowledge deliberately and keep workloads realistic so speed does not come at the expense of stability.",
          ],
        },
      ],
      quiz: [
        mc(
          "What characterizes a lean team?",
          "Low headcount with broad individual ownership",
          ["Many layers of management", "Strict single-task roles", "Large departments for each task"],
          1,
        ),
        mc(
          "What is a benefit of flat hierarchies?",
          "Faster decisions with fewer handoffs",
          ["More approvals per task", "Slower releases", "Less communication needed"],
          0,
        ),
        mc(
          "What is a common risk of lean teams?",
          "Losing knowledge when a key person leaves",
          ["Having too much redundancy", "Too many managers", "Work being too easy"],
          2,
        ),
        mc(
          "How can lean teams stay stable?",
          "Document work and share knowledge deliberately",
          ["Avoid writing anything down", "Keep all knowledge with one person", "Increase workloads constantly"],
          3,
        ),
        ident("A team structure with few management layers is described as ____.", "FLAT"),
      ],
    },
    {
      title: "Intern-Driven Execution",
      description: "How interns have become real contributors on lean, AI-assisted teams.",
      objectives: [
        "Explain why interns take on real delivery work",
        "Describe how to structure meaningful intern tasks",
        "Identify the role of mentorship and review",
      ],
      sections: [
        {
          header: "Interns as Contributors",
          paragraphs: [
            "On lean teams, interns are often given real tickets rather than coffee runs. With AI tools lowering the barrier to getting started, they can contribute to production work sooner.",
            "This benefits both sides: teams gain extra capacity, and interns gain experience that classrooms alone cannot provide.",
          ],
        },
        {
          header: "Structuring Meaningful Work",
          paragraphs: [
            "Effective intern tasks are scoped clearly, have a visible outcome and are safe to attempt, such as a small feature, a test suite or an internal tool.",
            "Clear acceptance criteria and a defined deadline help interns stay focused and let the team measure success fairly.",
          ],
        },
        {
          header: "Mentorship and Review",
          paragraphs: [
            "Speed without guidance can lead to weak habits. A mentor who reviews work, explains decisions and gives honest feedback turns output into real learning.",
            "Regular check-ins and thoughtful code review keep quality high while helping interns grow into dependable engineers.",
          ],
        },
      ],
      quiz: [
        mc(
          "What kind of work do interns often receive on lean teams?",
          "Real tickets that contribute to delivery",
          ["Only administrative errands", "No tasks at all", "Only watching meetings"],
          2,
        ),
        mc(
          "Which makes an intern task effective?",
          "A clear scope with a visible outcome",
          ["A vague goal with no deadline", "An unreviewable huge project", "A task nobody needs"],
          0,
        ),
        mc(
          "Why do mentors matter in intern-driven execution?",
          "They turn output into real learning through feedback",
          ["They do all the work instead", "They remove the need for review", "They slow the team deliberately"],
          1,
        ),
        mc(
          "What benefits do teams get from involving interns?",
          "Extra capacity and fresh perspective",
          ["Zero need for documentation", "Elimination of all risk", "A reason to skip reviews"],
          3,
        ),
        ident("Defining what must be true for a task to be considered done is writing acceptance ____.", "CRITERIA"),
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

async function seedSubject(s: SubjectSeed, ownerId: string | null) {
  const existing = await prisma.subject.findFirst({ where: { title: s.title }, select: { id: true } });
  if (existing) {
    console.log(`skip (already exists): ${s.title}`);
    return;
  }

  await prisma.subject.create({
    data: {
      title: s.title,
      description: s.description,
      mediaUrl: s.mediaUrl,
      visibility: "PUBLIC",
      code: null,
      ...(ownerId ? { owner: { connect: { id: ownerId } } } : {}),
      chapters: {
        create: s.chapters.map((c, i) => ({
          chapterId: `chapter-${pad(i + 1)}`,
          chapterNo: i + 1,
          cardImage: s.cover,
          title: c.title,
          description: c.description,
          durationMinutes: 15,
          videoUrl: s.mediaUrl,
          slideUrl: SLIDE_URL,
          objectives: c.objectives.map((objective) => ({ objective })),
          sections: c.sections.map((sec, j) => ({
            sectionNo: j + 1,
            header: sec.header,
            imageUrl: [],
            imageSource: [],
            content: sec.paragraphs.map((paragraph) => ({ paragraph })),
          })),
          keyTerms: [],
          references: [],
          quiz: {
            create: {
              questions: c.quiz.map((q, k) => ({ questionNo: k + 1, ...q })),
            },
          },
        })),
      },
    },
  });
  console.log(`seeded: ${s.title}`);
}

async function main() {
  // attach to the first teacher if one exists (ownerId is optional)
  const teacher = await prisma.user.findFirst({ where: { role: "TEACHER" }, select: { id: true } });
  await seedSubject(subject1, teacher?.id ?? null);
  await seedSubject(subject2, teacher?.id ?? null);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());