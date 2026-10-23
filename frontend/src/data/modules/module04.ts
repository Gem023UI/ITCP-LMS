
import type { IASModule } from "../../types/modules";

const VIDEO_URL =
  "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm";

const IMAGE_URL =
  "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ";

const iasModule04: IASModule = {
  unitId: "ias-module-02",
  moduleId: "04",
  moduleNo: 4,
  title: "Security Governance, Policies, and Compliance",
  description:
    "Covers the management structures, policies, standards, and compliance practices used to direct an information security program.",
  objectives: [
    "Explain the purpose of security governance and its role in organizational accountability.",
    "Differentiate information security policies, standards, procedures, and guidelines.",
    "Identify the responsibilities of key stakeholders in an information security program.",
    "Explain the importance of security awareness, audits, and compliance.",
    "Describe how security metrics, program management, and maturity assessments support continuous improvement.",
    "Recognize the role of security frameworks and supply-chain governance in managing organizational risk.",
  ],
  lessons: [
    {
      id: "ias-m04-l01",
      lessonNo: "4.1",
      title: "Security Governance",
      description:
        "Defines leadership, oversight, decision-making, and accountability for information security.",
      keyTerms: [
        {
          word: "Security Governance",
          definition:
            "The leadership structures and processes used to direct, oversee, and evaluate information security.",
          source: "NIST Cybersecurity Framework 2.0",
        },
        {
          word: "Accountability",
          definition:
            "The obligation of an individual or organization to explain and take responsibility for decisions and outcomes.",
        },
        {
          word: "Risk Appetite",
          definition:
            "The amount and type of risk an organization is willing to accept while pursuing its objectives.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "Information Security Governance",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.1.1",
          header: "Understanding Security Governance",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security governance establishes how an organization directs and oversees the protection of its information, systems, and technology resources. It connects security decisions to business objectives, legal obligations, and organizational risk.",
            },
            {
              type: "heading",
              level: 3,
              text: "Core Governance Activities",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Establishing security objectives and organizational priorities.",
                "Assigning authority, responsibilities, and accountability.",
                "Approving policies, risk decisions, and security investments.",
                "Monitoring security performance and reporting significant risks.",
                "Reviewing the effectiveness of the security program.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Governance and Management",
            },
            {
              type: "table",
              headers: ["Aspect", "Governance", "Management"],
              rows: [
                [
                  "Primary concern",
                  "Direction and oversight",
                  "Execution and coordination",
                ],
                [
                  "Typical activities",
                  "Approving strategy and risk appetite",
                  "Implementing controls and plans",
                ],
                [
                  "Example",
                  "Leadership approves a security policy",
                  "IT implements the policy's access controls",
                ],
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Key Principle",
              text:
                "Information security is an organizational responsibility. It should be supported by leadership rather than treated solely as a technical task assigned to IT.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l02",
      lessonNo: "4.2",
      title: "Information Security Policies",
      description:
        "Establishes organizational rules and requirements for protecting information.",
      keyTerms: [
        {
          word: "Security Policy",
          definition:
            "An approved statement of management intent, requirements, and expectations for protecting organizational information and resources.",
        },
        {
          word: "Acceptable Use Policy",
          definition:
            "A policy defining permitted and prohibited uses of organizational systems, networks, and information.",
        },
        {
          word: "Policy Enforcement",
          definition:
            "The mechanisms used to ensure that established policy requirements are followed.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "Information Security Policies",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.2.1",
          header: "Purpose and Scope of Security Policies",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "An information security policy communicates management's expectations for protecting information assets. It establishes requirements that guide employee behavior, technical decisions, and organizational security activities.",
            },
            {
              type: "heading",
              level: 3,
              text: "Common Security Policies",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Access Control Policy: defines how access to systems and information is authorized.",
                "Password and Authentication Policy: establishes authentication requirements.",
                "Acceptable Use Policy: defines appropriate use of organizational technology.",
                "Data Classification Policy: establishes categories for handling information.",
                "Incident Response Policy: defines high-level expectations for handling security incidents.",
                "Remote Access Policy: establishes requirements for accessing systems outside approved facilities.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Characteristics of an Effective Policy",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Clearly defines its purpose and scope.",
                "Uses understandable and unambiguous language.",
                "Assigns responsibility for compliance and enforcement.",
                "Receives approval from the appropriate authority.",
                "Is communicated to affected personnel.",
                "Is reviewed and updated when risks or requirements change.",
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Practical Example",
              text:
                "A university policy may require staff to use approved storage services for student records instead of saving sensitive information in personal cloud accounts.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l03",
      lessonNo: "4.3",
      title: "Standards, Procedures, and Guidelines",
      description:
        "Explains how policies are translated into technical requirements and repeatable activities.",
      keyTerms: [
        {
          word: "Standard",
          definition:
            "A specific, consistent requirement that supports and implements a policy.",
        },
        {
          word: "Procedure",
          definition:
            "A documented sequence of steps for completing a task or process consistently.",
        },
        {
          word: "Guideline",
          definition:
            "Recommended practices that help people make appropriate decisions without necessarily imposing mandatory requirements.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "Policies, Standards, Procedures, and Guidelines",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.3.1",
          header: "Turning Policy into Practice",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Policies establish what an organization expects. Standards define specific requirements, procedures explain how to perform activities, and guidelines provide recommendations for applying sound practices.",
            },
            {
              type: "heading",
              level: 3,
              text: "Comparison of Governance Documents",
            },
            {
              type: "table",
              headers: [
                "Document",
                "Purpose",
                "Example",
                "Typical status",
              ],
              rows: [
                [
                  "Policy",
                  "States organizational intent and rules",
                  "Sensitive data must be protected",
                  "Mandatory organizational requirement",
                ],
                [
                  "Standard",
                  "Defines specific requirements",
                  "Approved systems must use a specified encryption standard",
                  "Mandatory within its scope",
                ],
                [
                  "Procedure",
                  "Provides step-by-step instructions",
                  "Steps for granting a new employee system access",
                  "Followed when performing the process",
                ],
                [
                  "Guideline",
                  "Recommends good practices",
                  "Recommendations for secure remote work",
                  "Generally advisory",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "How They Work Together",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "A policy requires that access to sensitive data be restricted.",
                "A standard specifies approved authentication and access requirements.",
                "A procedure explains how administrators grant, review, and revoke access.",
                "A guideline recommends additional practices for reducing account compromise.",
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Remember",
              text:
                "The exact mandatory status of a standard or procedure depends on the organization's governance rules and the document's approved scope.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l04",
      lessonNo: "4.4",
      title: "Security Roles and Responsibilities",
      description:
        "Defines the responsibilities of security officers, system owners, administrators, auditors, and users.",
      keyTerms: [
        {
          word: "Chief Information Security Officer (CISO)",
          definition:
            "A senior leader responsible for directing or overseeing an organization's information security program.",
        },
        {
          word: "System Owner",
          definition:
            "The individual accountable for a system's operation, business purpose, and associated risk decisions within their authority.",
        },
        {
          word: "Separation of Duties",
          definition:
            "A control that divides sensitive responsibilities among multiple people to reduce errors, misuse, and fraud.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "Information Security Roles and Responsibilities",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.4.1",
          header: "Assigning Security Responsibilities",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Clearly assigned responsibilities help ensure that security tasks are performed, risks are escalated, and decisions are made by authorized individuals. Role assignments vary by organizational size, structure, and regulatory requirements.",
            },
            {
              type: "table",
              headers: ["Role", "Typical responsibilities"],
              rows: [
                [
                  "Executive leadership",
                  "Approves security direction, resources, and significant risk decisions.",
                ],
                [
                  "CISO or security manager",
                  "Coordinates the security program, policies, risk reporting, and security initiatives.",
                ],
                [
                  "System owner",
                  "Defines system requirements, approves appropriate access, and addresses system risks.",
                ],
                [
                  "System administrator",
                  "Configures, maintains, and monitors systems according to approved requirements.",
                ],
                [
                  "Data owner or steward",
                  "Defines data classification, handling requirements, and authorized use within assigned responsibilities.",
                ],
                [
                  "Internal auditor",
                  "Independently evaluates controls and reports findings.",
                ],
                [
                  "End user",
                  "Follows policies, protects credentials, and reports suspicious activity.",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Separation of Duties",
            },
            {
              type: "paragraph",
              text:
                "Separation of duties reduces the chance that one person can perform an entire sensitive process without oversight. For example, the employee who requests a payment should not be the only person who approves and executes it.",
            },
            {
              type: "callout",
              variant: "warning",
              title: "Avoid Unclear Ownership",
              text:
                "When no individual is accountable for a control or risk, security issues can remain unresolved. Document ownership and escalation paths clearly.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l05",
      lessonNo: "4.5",
      title: "Security Awareness and Training",
      description:
        "Teaches users how to recognize threats and follow secure practices.",
      keyTerms: [
        {
          word: "Security Awareness",
          definition:
            "Activities that help people recognize security risks and understand their responsibilities.",
        },
        {
          word: "Security Training",
          definition:
            "Instruction that develops the knowledge and practical skills needed to perform security-related tasks.",
        },
        {
          word: "Phishing",
          definition:
            "A deceptive attempt to obtain information or induce an action by impersonating a trusted person or organization.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "Security Awareness and Training",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.5.1",
          header: "Building a Security-Aware Organization",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "People are an important part of an organization's security defenses. Awareness and training programs help personnel recognize threats, understand policies, and respond appropriately to suspicious activity.",
            },
            {
              type: "heading",
              level: 3,
              text: "Awareness, Training, and Education",
            },
            {
              type: "table",
              headers: ["Activity", "Main goal", "Example"],
              rows: [
                [
                  "Awareness",
                  "Recognize risks and responsibilities",
                  "A campaign about suspicious email attachments",
                ],
                [
                  "Training",
                  "Learn how to perform a task",
                  "Practicing the process for reporting an incident",
                ],
                [
                  "Education",
                  "Develop broader knowledge and understanding",
                  "Studying security management and risk analysis",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Recommended Program Activities",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Provide security orientation for new personnel.",
                "Teach employees to recognize phishing and social engineering.",
                "Explain password, authentication, and data-handling requirements.",
                "Conduct role-specific training for administrators and security personnel.",
                "Practice incident reporting and response procedures.",
                "Evaluate learning and update training based on observed risks.",
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Measure Behavior, Not Just Attendance",
              text:
                "Training attendance alone does not prove effectiveness. Use assessments, incident trends, and other appropriate indicators to determine whether personnel understand and apply secure practices.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l06",
      lessonNo: "4.6",
      title: "Security Audits",
      description:
        "Examines whether controls are appropriately designed, implemented, and maintained.",
      keyTerms: [
        {
          word: "Security Audit",
          definition:
            "A systematic examination of security controls, records, and practices against defined criteria.",
        },
        {
          word: "Audit Evidence",
          definition:
            "Information collected to support audit observations, conclusions, and findings.",
        },
        {
          word: "Audit Finding",
          definition:
            "A documented result identifying a condition, deficiency, or area of improvement against established criteria.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "Information Security Auditing",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.6.1",
          header: "Purpose and Process of Security Audits",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security audits provide evidence about whether an organization's controls meet established requirements. They can identify weaknesses, verify compliance, and support management decisions about remediation and improvement.",
            },
            {
              type: "heading",
              level: 3,
              text: "Common Audit Activities",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define the audit scope, objectives, criteria, and applicable systems.",
                "Review relevant policies, procedures, and records.",
                "Interview personnel and examine control configurations.",
                "Collect and evaluate sufficient, appropriate evidence.",
                "Document findings and assess their significance.",
                "Report results and track corrective actions.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Design and Operating Effectiveness",
            },
            {
              type: "table",
              headers: ["Evaluation", "Key question", "Example"],
              rows: [
                [
                  "Control design",
                  "Would the control address the intended risk if implemented correctly?",
                  "Does the access review process require an authorized reviewer?",
                ],
                [
                  "Implementation",
                  "Has the control been put in place?",
                  "Is an access review process documented and configured?",
                ],
                [
                  "Operating effectiveness",
                  "Does the control work consistently in practice?",
                  "Are reviews completed on schedule and exceptions resolved?",
                ],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Independence Matters",
              text:
                "Auditors should maintain appropriate objectivity and avoid evaluating their own work when doing so would impair independence.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l07",
      lessonNo: "4.7",
      title: "Security Compliance",
      description:
        "Covers adherence to applicable laws, regulations, contractual obligations, and standards.",
      keyTerms: [
        {
          word: "Compliance",
          definition:
            "Conformance with applicable legal, regulatory, contractual, and organizational requirements.",
        },
        {
          word: "Regulation",
          definition:
            "A binding requirement issued by a government or authorized regulatory body.",
        },
        {
          word: "Noncompliance",
          definition:
            "Failure to meet an applicable requirement or obligation.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "Information Security Compliance",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.7.1",
          header: "Understanding Compliance Obligations",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Organizations may have security obligations arising from laws, regulations, contracts, industry standards, and internal policies. Compliance activities identify applicable requirements, assign responsibility, implement controls, and maintain evidence that obligations are being met.",
            },
            {
              type: "heading",
              level: 3,
              text: "Common Sources of Requirements",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Laws governing privacy, personal information, and records.",
                "Sector-specific regulations and regulatory directives.",
                "Customer and business-partner contractual obligations.",
                "Security standards or certification requirements adopted by the organization.",
                "Internal policies and approved governance documents.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Examples of Security-Related Frameworks and Laws",
            },
            {
              type: "table",
              headers: ["Requirement", "General relevance"],
              rows: [
                [
                  "Philippines Data Privacy Act of 2012 (RA 10173)",
                  "Establishes obligations relating to the processing and protection of personal information in the Philippines.",
                ],
                [
                  "ISO/IEC 27001",
                  "Specifies requirements for establishing, implementing, maintaining, and continually improving an information security management system.",
                ],
                [
                  "PCI DSS",
                  "Defines technical and operational requirements for protecting payment account data within its scope.",
                ],
                [
                  "Contractual security clauses",
                  "May require particular controls, reporting timelines, or evidence from a service provider.",
                ],
              ],
            },
            {
              type: "callout",
              variant: "warning",
              title: "Compliance Depends on Scope",
              text:
                "Not every law, standard, or framework applies to every organization. Applicability depends on factors such as jurisdiction, data processed, industry, contracts, and the organization's activities.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l08",
      lessonNo: "4.8",
      title: "Security Metrics and Reporting",
      description:
        "Uses measurable indicators and reports to evaluate security performance.",
      keyTerms: [
        {
          word: "Security Metric",
          definition:
            "A measurement used to evaluate a security activity, control, or outcome.",
        },
        {
          word: "Key Performance Indicator (KPI)",
          definition:
            "A measure used to evaluate progress toward a defined performance objective.",
        },
        {
          word: "Key Risk Indicator (KRI)",
          definition:
            "A measure used to monitor exposure to a particular risk or changes in risk conditions.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "Security Metrics and Reporting",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.8.1",
          header: "Measuring Security Performance",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security metrics help organizations understand whether controls and security initiatives are achieving their intended outcomes. Useful reporting connects measurements to risks, objectives, thresholds, and decisions rather than simply counting activities.",
            },
            {
              type: "heading",
              level: 3,
              text: "Examples of Security Metrics",
            },
            {
              type: "table",
              headers: ["Metric", "What it measures", "Possible interpretation"],
              rows: [
                [
                  "Patch compliance rate",
                  "Percentage of applicable systems meeting patch requirements",
                  "A low rate may indicate increased exposure to known vulnerabilities.",
                ],
                [
                  "Mean time to detect",
                  "Average time taken to identify an incident",
                  "A rising value may indicate detection gaps.",
                ],
                [
                  "Mean time to respond",
                  "Average time taken to respond to an incident",
                  "A high value may indicate response delays.",
                ],
                [
                  "Training completion rate",
                  "Percentage of assigned personnel completing training",
                  "A low rate indicates incomplete program participation.",
                ],
                [
                  "Open high-risk findings",
                  "Number of unresolved high-risk issues",
                  "A rising count may require escalation and remediation planning.",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Qualities of Useful Metrics",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Relevant to a defined security objective or risk.",
                "Clearly defined, consistently collected, and verifiable.",
                "Reported with appropriate context and time periods.",
                "Compared with suitable targets, baselines, or thresholds.",
                "Used to guide action, resource allocation, and improvement.",
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Interpret Metrics Carefully",
              text:
                "A high number of reported incidents does not automatically mean security is getting worse. It may also reflect better detection and a stronger reporting culture.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l09",
      lessonNo: "4.9",
      title: "Security Program Management",
      description:
        "Covers the planning, implementation, coordination, and improvement of security initiatives.",
      keyTerms: [
        {
          word: "Security Program",
          definition:
            "A coordinated set of governance activities, processes, people, and controls designed to manage information security across an organization.",
        },
        {
          word: "Security Roadmap",
          definition:
            "A planned sequence of security initiatives and milestones aligned with organizational priorities.",
        },
        {
          word: "Remediation",
          definition:
            "Action taken to correct a security weakness, deficiency, or noncompliant condition.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "Information Security Program Management",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.9.1",
          header: "Managing a Security Program",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security program management coordinates security policies, risk management, people, technologies, and resources into a sustained organizational effort. It ensures that individual projects contribute to broader security objectives.",
            },
            {
              type: "heading",
              level: 3,
              text: "Core Program Management Activities",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Assess current security capabilities, obligations, and risks.",
                "Define objectives, priorities, and measurable outcomes.",
                "Develop a roadmap, budget, schedule, and resource plan.",
                "Assign owners and coordinate implementation across teams.",
                "Monitor progress, risks, findings, and performance metrics.",
                "Report results to leadership and revise plans as needed.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Prioritizing Security Initiatives",
            },
            {
              type: "paragraph",
              text:
                "Organizations often have more security improvements to complete than available resources can support at once. Prioritization should consider risk severity, legal obligations, business impact, implementation effort, dependencies, and available resources.",
            },
            {
              type: "table",
              headers: ["Initiative", "Risk or objective", "Example priority factor"],
              rows: [
                [
                  "Enable multifactor authentication",
                  "Reduce account compromise risk",
                  "Exposure of privileged or remote accounts",
                ],
                [
                  "Improve backup recovery",
                  "Reduce disruption and data loss",
                  "Criticality of systems and recovery requirements",
                ],
                [
                  "Update security policies",
                  "Clarify requirements and accountability",
                  "New obligations or significant policy gaps",
                ],
                [
                  "Conduct staff training",
                  "Reduce human-related security risks",
                  "Observed phishing trends and role-specific exposure",
                ],
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Continuous Improvement",
              text:
                "A security program should be reviewed and adjusted as business objectives, technology, threats, incidents, and compliance obligations change.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l10",
      lessonNo: "4.10",
      title: "Security Frameworks",
      description:
        "Introduces structured approaches such as NIST CSF, ISO/IEC 27001, and CIS Controls.",
      keyTerms: [
        {
          word: "Security Framework",
          definition:
            "A structured set of concepts, practices, or requirements that helps organizations organize and improve information security.",
        },
        {
          word: "NIST Cybersecurity Framework (CSF)",
          definition:
            "A framework that helps organizations understand, assess, prioritize, and communicate cybersecurity risks.",
          source: "NIST Cybersecurity Framework 2.0",
        },
        {
          word: "Information Security Management System (ISMS)",
          definition:
            "A coordinated management system for establishing, operating, evaluating, and continually improving information security.",
          source: "ISO/IEC 27001",
        },
      ],
      durationMinutes: 35,
      video: [
        {
          title: "Information Security Frameworks",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.10.1",
          header: "Why Organizations Use Security Frameworks",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security frameworks provide a structured way to organize security activities, assess current capabilities, identify gaps, and prioritize improvements. They support consistent planning and communication but do not automatically guarantee that an organization is secure.",
            },
            {
              type: "heading",
              level: 3,
              text: "Common Frameworks",
            },
            {
              type: "table",
              headers: ["Framework", "Primary focus", "Typical use"],
              rows: [
                [
                  "NIST Cybersecurity Framework 2.0",
                  "Cybersecurity risk outcomes and organizational risk management",
                  "Organizing and assessing cybersecurity activities",
                ],
                [
                  "ISO/IEC 27001",
                  "Requirements for an information security management system",
                  "Establishing and continually improving an ISMS; certification may be pursued",
                ],
                [
                  "CIS Critical Security Controls",
                  "Prioritized safeguards against common cyber threats",
                  "Selecting and implementing practical security safeguards",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "NIST CSF 2.0 Core Functions",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Govern: establish and monitor cybersecurity risk strategy, expectations, and responsibilities.",
                "Identify: understand assets, context, and cybersecurity risks.",
                "Protect: implement safeguards to reduce cybersecurity risk.",
                "Detect: identify possible cybersecurity events.",
                "Respond: take action concerning detected cybersecurity incidents.",
                "Recover: restore affected capabilities and services.",
              ],
            },
            {
              type: "image",
              url: IMAGE_URL,
              alt:
                "IT professional reviewing information systems and security-related information",
              caption:
                "Security frameworks help organize technical controls and management activities into a coordinated program.",
            },
            {
              type: "callout",
              variant: "info",
              title: "Choosing a Framework",
              text:
                "Framework selection depends on organizational objectives, risks, industry, regulatory obligations, resources, and customer expectations. Organizations may use more than one framework when appropriate.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l11",
      lessonNo: "4.11",
      title: "Security Maturity Assessment",
      description:
        "Evaluates the consistency and effectiveness of organizational security practices.",
      keyTerms: [
        {
          word: "Security Maturity",
          definition:
            "The extent to which security practices are established, repeatable, measured, managed, and improved.",
        },
        {
          word: "Maturity Assessment",
          definition:
            "An evaluation of an organization's practices and capabilities against defined criteria or maturity levels.",
        },
        {
          word: "Gap Analysis",
          definition:
            "A comparison of current conditions with desired requirements or target capabilities.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "Security Maturity Assessment",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.11.1",
          header: "Evaluating Security Maturity",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "A security maturity assessment evaluates how consistently and effectively an organization performs security activities. It helps identify gaps, establish a baseline, and plan improvements based on business needs and risk.",
            },
            {
              type: "heading",
              level: 3,
              text: "Illustrative Maturity Levels",
            },
            {
              type: "table",
              headers: ["Level", "Description", "Example"],
              rows: [
                [
                  "1 — Initial",
                  "Practices are largely informal or reactive.",
                  "Access reviews occur only after a problem is discovered.",
                ],
                [
                  "2 — Developing",
                  "Some practices are documented but inconsistently applied.",
                  "Certain departments perform scheduled access reviews.",
                ],
                [
                  "3 — Defined",
                  "Standardized processes are documented and communicated.",
                  "An organization-wide access review procedure exists.",
                ],
                [
                  "4 — Managed",
                  "Performance is measured and monitored against defined criteria.",
                  "Review completion and overdue exceptions are tracked.",
                ],
                [
                  "5 — Improving",
                  "Practices are regularly evaluated and improved using evidence.",
                  "Review processes are refined based on findings and changing risks.",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Assessment Process",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define the scope and assessment criteria.",
                "Collect evidence from documents, interviews, observations, and system records.",
                "Evaluate current practices against the selected criteria.",
                "Identify gaps, strengths, dependencies, and improvement opportunities.",
                "Set target maturity levels appropriate to organizational needs.",
                "Create an improvement roadmap and reassess progress periodically.",
              ],
            },
            {
              type: "callout",
              variant: "warning",
              title: "Maturity Is Not the Same as Security",
              text:
                "A higher maturity score does not automatically mean lower risk. An organization must still assess whether its controls address the actual threats and business risks it faces.",
            },
          ],
        },
      ],
    },
    {
      id: "ias-m04-l12",
      lessonNo: "4.12",
      title: "Supply-Chain Security Governance",
      description:
        "Establishes security expectations for vendors, suppliers, and external service providers.",
      keyTerms: [
        {
          word: "Third-Party Risk",
          definition:
            "Risk arising from an external organization that provides products, services, technology, or other resources.",
        },
        {
          word: "Supply-Chain Risk Management",
          definition:
            "The process of identifying and managing risks associated with suppliers, service providers, products, and external dependencies.",
        },
        {
          word: "Due Diligence",
          definition:
            "Reasonable investigation and evaluation performed before or during a business relationship to understand relevant risks and obligations.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "Supply-Chain Security and Third-Party Risk",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "4.12.1",
          header: "Governing External Security Relationships",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Organizations rely on external providers for cloud hosting, software, payment processing, technical support, and other services. These relationships can introduce risks when a provider has access to sensitive data, critical systems, or essential business processes.",
            },
            {
              type: "heading",
              level: 3,
              text: "Third-Party Security Risks",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Unauthorized access to organizational information.",
                "Exposure of personal or confidential data through a provider breach.",
                "Service disruption caused by provider outages or cyberattacks.",
                "Weak security practices in supplier software or infrastructure.",
                "Insufficient incident notification or recovery capabilities.",
                "Unclear responsibility for security controls and compliance obligations.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Third-Party Risk Management Lifecycle",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify providers and the systems, data, and services they affect.",
                "Classify providers based on criticality and potential impact.",
                "Perform risk-based due diligence before engagement.",
                "Establish security requirements in contracts and service agreements.",
                "Monitor provider performance, security changes, and relevant incidents.",
                "Reassess risks periodically and manage contract termination or provider transitions securely.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Example Security Contract Requirements",
            },
            {
              type: "table",
              headers: ["Requirement", "Purpose"],
              rows: [
                [
                  "Access restrictions",
                  "Limit provider access to authorized systems and information.",
                ],
                [
                  "Incident notification",
                  "Define how and when relevant security incidents must be reported.",
                ],
                [
                  "Data protection",
                  "Specify safeguards for storage, processing, transfer, and deletion of data.",
                ],
                [
                  "Audit or assurance rights",
                  "Provide appropriate evidence that agreed security requirements are met.",
                ],
                [
                  "Business continuity",
                  "Establish expectations for recovery, availability, and continuity.",
                ],
                [
                  "Termination and data return",
                  "Define secure data return, transfer, or deletion when the relationship ends.",
                ],
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Shared Responsibility Does Not Remove Accountability",
              text:
                "Using a third-party provider does not automatically remove the organization's own responsibilities. Contracts, oversight, risk assessments, and ongoing monitoring help manage risks associated with external dependencies.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    {
      title: "The NIST Cybersecurity Framework (CSF) 2.0",
      url: "https://doi.org/10.6028/NIST.CSWP.29",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
      publishedYear: 2024,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "NIST SP 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-53r5",
      author: "Joint Task Force",
      organization: "NIST",
      publishedYear: 2020,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "NIST SP 800-100: Information Security Handbook: A Guide for Managers",
      url: "https://doi.org/10.6028/NIST.SP.800-100",
      author: "Karen Scarfone et al.",
      organization: "NIST",
      publishedYear: 2006,
      accessedAt: "2026-10-23",
    },
    {
      title: "ISO/IEC 27001 — Information Security Management Systems",
      url: "https://www.iso.org/standard/27001",
      organization: "International Organization for Standardization",
      accessedAt: "2026-10-23",
    },
    {
      title: "CIS Critical Security Controls",
      url: "https://www.cisecurity.org/controls",
      organization: "Center for Internet Security",
      accessedAt: "2026-10-23",
    },
    {
      title: "Republic Act No. 10173 — Data Privacy Act of 2012",
      url: "https://privacy.gov.ph/data-privacy-act/",
      organization: "National Privacy Commission, Philippines",
      publishedYear: 2012,
      accessedAt: "2026-10-23",
    },
    {
      title: "NIST SP 800-161 Rev. 1: Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-161r1",
      author: "Jon Boyens et al.",
      organization: "NIST",
      publishedYear: 2022,
      accessedAt: "2026-10-23",
    },
    {
      title: "PCI Security Standards",
      url: "https://www.pcisecuritystandards.org/standards/",
      organization: "PCI Security Standards Council",
      accessedAt: "2026-10-23",
    },
  ],
  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z",
};

export default iasModule04;
