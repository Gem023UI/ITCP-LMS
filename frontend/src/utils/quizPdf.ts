import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { QuizRecords } from "../services/manageApi";

const fullDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "quiz";

/** builds the quiz report (details, stats, full records table) and downloads it as a PDF */
export function downloadQuizPdf({ quiz, stats, records }: QuizRecords) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = 52;

  // title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  const titleLines = doc.splitTextToSize(quiz.title, pageW - margin * 2) as string[];
  doc.text(titleLines, margin, y);
  y += titleLines.length * 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text(`${quiz.subjectTitle} · Quiz ${quiz.quizNo}`, margin, y);
  y += 22;

  // details
  doc.setTextColor(0);
  const chapters = quiz.chapters.length
    ? quiz.chapters.map((c) => `Ch ${c.chapterNo}: ${c.title}`).join("; ")
    : "None";
  const details: [string, string][] = [
    ["Chapters covered", chapters],
    ["Deadline", quiz.deadline ? fullDate(quiz.deadline) : "No deadline"],
    ["Mode", quiz.deadline ? (quiz.deadlineMode === "STRICT" ? "Strict" : "Late allowed") : "-"],
    ["Students who took it", `${stats.taken} / ${stats.enrolled}`],
    ["Average score", `${stats.averageScore} / ${stats.totalItems} (${stats.averagePercent}%)`],
  ];
  const labelW = 120;
  for (const [label, value] of details) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(value, pageW - margin * 2 - labelW) as string[];
    doc.text(lines, margin + labelW, y);
    y += Math.max(1, lines.length) * 13 + 3;
  }
  y += 8;

  // full records table
  autoTable(doc, {
    startY: y,
    head: [
      [
        "First Name",
        "Last Name",
        { content: "Score", styles: { halign: "right" } },
        { content: "Percentage", styles: { halign: "right" } },
      ],
    ],
    body: records.map((r) => [
      r.firstName,
      r.lastName,
      `${r.score}/${r.total}${r.isLate ? " (Late)" : ""}`,
      `${r.percent}%`,
    ]),
    margin: { left: margin, right: margin },
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [10, 132, 255] },
    columnStyles: { 2: { halign: "right" }, 3: { halign: "right" } },
    didDrawPage: () => {
      const h = doc.internal.pageSize.getHeight();
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(`Page ${doc.getNumberOfPages()}`, pageW - margin, h - 20, { align: "right" });
    },
  });

  doc.save(`${slug(quiz.title)}-records.pdf`);
}
