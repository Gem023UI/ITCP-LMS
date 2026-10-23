
import type { IASModule } from "../../types/modules";

const placeholderImageUrl =
  "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIxNjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ";

const placeholderVideo = {
  title: "Introduction to Information Security",
  url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
  provider: "YouTube",
};

const createSection = (
  sectionNo: string,
  header: string,
  textContent: string,
) => ({
  sectionNo,
  header,
  imageUrl: placeholderImageUrl,
  imageSource: "User-provided placeholder image URL.",
  textContent,
});

const module5: IASModule = {
  unitId: "ias-module-02",
  moduleId: "05",
  title: "Risk Management Framework (RMF)",
  description:
    "Introduces the NIST Risk Management Framework and its lifecycle for managing security and privacy risks in information systems.",
  objectives: [
    "Explain the purpose, principles, stakeholders, and lifecycle of the NIST Risk Management Framework.",
    "Describe the activities and outcomes of each of the seven RMF steps.",
    "Explain how information systems are categorized according to the impact of a potential compromise.",
    "Describe how security and privacy controls are selected, implemented, and assessed.",
    "Explain how authorization decisions are made based on system risk and supporting evidence.",
    "Describe continuous monitoring and the role of security control documentation.",
    "Apply the seven RMF steps to a hypothetical information system and justify key risk management decisions.",
  ],
  lessons: [
    {
      id: "ias-m05-l01",
      lessonNo: "5.1",
      title: "RMF Overview",
      description:
        "Explains the purpose, principles, stakeholders, and lifecycle of the NIST RMF.",
      keyTerms: [
        {
          word: "Risk Management Framework (RMF)",
          definition:
            "A structured process for managing security and privacy risks throughout the life cycle of information systems.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Security Control",
          definition:
            "A safeguard or countermeasure designed to protect systems and information by addressing security risks.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Authorizing Official",
          definition:
            "A senior official with the authority and responsibility to make a risk-based authorization decision for a system.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Purpose and Principles of RMF",
          "The NIST Risk Management Framework provides a repeatable approach for managing security and privacy risks in information systems. It connects organizational priorities with system-level risk decisions and helps ensure that appropriate controls are selected, implemented, evaluated, and maintained. RMF is a life-cycle process rather than a one-time checklist, so risk decisions must be revisited as systems and operating conditions change.",
        ),
        createSection(
          "02",
          "The Seven RMF Steps and Stakeholders",
          "NIST SP 800-37 Rev. 2 defines seven steps: Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor. Organizational leaders establish priorities, system owners coordinate system-level activities, security and privacy professionals support risk analysis, control implementers deploy safeguards, assessors evaluate their effectiveness, and the authorizing official decides whether the remaining risk is acceptable. These stakeholders collaborate throughout the system life cycle.",
        ),
      ],
    },
    {
      id: "ias-m05-l02",
      lessonNo: "5.2",
      title: "Prepare",
      description:
        "Establishes organizational context, responsibilities, priorities, and readiness for risk management.",
      keyTerms: [
        {
          word: "Risk Context",
          definition:
            "The organizational mission, operating environment, objectives, and conditions used to understand and manage risk.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Risk Tolerance",
          definition:
            "The level and type of risk an organization is willing to accept in pursuit of its objectives.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "System Stakeholder",
          definition:
            "A person or organization with an interest in, responsibility for, or potential impact from an information system.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Establishing Organizational Readiness",
          "The Prepare step establishes the context needed for effective security and privacy risk management. Activities include identifying organizational priorities, risk tolerance, applicable requirements, common controls, and the systems that support critical missions. Preparation helps organizations coordinate risk activities across enterprise and system levels instead of treating every system as an isolated project.",
        ),
        createSection(
          "02",
          "Assigning Responsibilities and Resources",
          "Organizations identify key stakeholders, assign risk management responsibilities, and determine the resources needed to perform RMF activities. They may define system boundaries, identify dependencies, establish assessment strategies, and document existing security capabilities. For example, before deploying a student information system, an institution should identify the system owner, data protection responsibilities, approval authority, and relevant privacy requirements.",
        ),
      ],
    },
    {
      id: "ias-m05-l03",
      lessonNo: "5.3",
      title: "Categorize",
      description:
        "Classifies information and systems according to the impact of a potential compromise.",
      keyTerms: [
        {
          word: "Security Categorization",
          definition:
            "The process of determining the security impact level of information and information systems based on potential adverse effects.",
          source: "FIPS PUB 199",
        },
        {
          word: "Confidentiality Impact",
          definition:
            "The potential harm resulting from unauthorized disclosure of information.",
          source: "FIPS PUB 199",
        },
        {
          word: "Security Objective",
          definition:
            "A protection objective concerned with confidentiality, integrity, or availability.",
          source: "FIPS PUB 199",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Categorizing Information and Systems",
          "The Categorize step determines the potential impact if information is disclosed, modified, destroyed, or made unavailable. Under FIPS 199, organizations evaluate confidentiality, integrity, and availability separately using potential impact levels of low, moderate, or high. The system's overall security categorization is based on the highest applicable impact level among these objectives, following the prescribed methodology.",
        ),
        createSection(
          "02",
          "Impact Analysis and System Boundaries",
          "Categorization requires understanding the information processed, stored, and transmitted by a system, as well as its users, connections, and operational purpose. For example, unauthorized disclosure of routine public information may have a low impact, while exposure of sensitive student records may have a more serious impact. The resulting categorization is documented and reviewed with appropriate stakeholders before controls are selected.",
        ),
      ],
    },
    {
      id: "ias-m05-l04",
      lessonNo: "5.4",
      title: "Select",
      description:
        "Chooses security and privacy controls appropriate to the system's risks and requirements.",
      keyTerms: [
        {
          word: "Control Baseline",
          definition:
            "A predefined set of security or privacy controls selected according to system characteristics and impact categorization.",
          source: "NIST SP 800-53B",
        },
        {
          word: "Tailoring",
          definition:
            "The process of adjusting a control baseline to account for organizational requirements, system conditions, and risk decisions.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Common Control",
          definition:
            "A control that supports multiple information systems and is implemented and managed at an organizational level.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Selecting Appropriate Security Controls",
          "During Select, the organization chooses controls based on the system's categorization, applicable requirements, risk assessment, and organizational priorities. NIST SP 800-53 provides a catalog of security and privacy controls, while SP 800-53B provides control baselines. Controls may address access control, authentication, audit logging, incident response, contingency planning, and data protection.",
        ),
        createSection(
          "02",
          "Tailoring and Control Allocation",
          "The organization tailors the selected baseline to its environment, documenting justified control adjustments and additional safeguards where necessary. Controls may be implemented by the system itself or inherited from shared organizational services. For example, a system may inherit physical security from its hosting facility while implementing its own role-based access controls. The resulting decisions form the basis of the system's security and privacy plan.",
        ),
      ],
    },
    {
      id: "ias-m05-l05",
      lessonNo: "5.5",
      title: "Implement",
      description:
        "Deploys selected controls and documents their implementation.",
      keyTerms: [
        {
          word: "Control Implementation",
          definition:
            "The deployment and configuration of safeguards according to established security and privacy requirements.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "System Security Plan",
          definition:
            "A document describing a system, its operating environment, implemented security requirements, and relevant controls.",
          source: "NIST SP 800-18",
        },
        {
          word: "Control Inheritance",
          definition:
            "The use of security or privacy controls provided by another system or organizational capability.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Deploying Security and Privacy Controls",
          "The Implement step puts the selected controls into operation according to the system's approved plans and requirements. Activities may include configuring authentication, restricting access, encrypting sensitive information, enabling audit logs, deploying endpoint protection, and establishing backup procedures. Implementation must account for both technical safeguards and administrative or physical controls.",
        ),
        createSection(
          "02",
          "Documenting Implementation",
          "The organization records how each control is implemented, who is responsible, and whether the control is system-specific, shared, or inherited. The System Security Plan describes the system and its planned or implemented safeguards. Accurate documentation allows assessors to verify implementation and helps decision-makers understand the protection measures supporting the system before authorization.",
        ),
      ],
    },
    {
      id: "ias-m05-l06",
      lessonNo: "5.6",
      title: "Assess",
      description:
        "Evaluates whether controls are correctly implemented and operating effectively.",
      keyTerms: [
        {
          word: "Security Control Assessment",
          definition:
            "An evaluation of controls to determine whether they are implemented correctly, operating as intended, and producing the desired outcomes.",
          source: "NIST SP 800-53A Rev. 5",
        },
        {
          word: "Assessment Plan",
          definition:
            "A document defining the scope, methods, procedures, and objectives of a control assessment.",
          source: "NIST SP 800-53A Rev. 5",
        },
        {
          word: "Assessment Finding",
          definition:
            "A documented result describing a control weakness, deficiency, or other condition identified during an assessment.",
          source: "NIST SP 800-53A Rev. 5",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Evaluating Control Effectiveness",
          "The Assess step determines whether implemented controls meet their security and privacy requirements. Assessors use methods such as examination, interviews, and testing to gather evidence. For example, they may review access permissions, interview administrators about account management, and test whether unauthorized users are prevented from accessing restricted records. Assessment activities should follow an approved plan and appropriate rules of engagement.",
        ),
        createSection(
          "02",
          "Reporting Findings and Remediation Needs",
          "Assessors document the procedures performed, evidence collected, and conclusions about control effectiveness. Findings may identify missing safeguards, incorrect configurations, insufficient documentation, or controls that fail under testing. The organization reviews the results, evaluates their risk implications, and identifies corrective actions. Assessment results become important evidence for the authorization decision and subsequent risk monitoring.",
        ),
      ],
    },
    {
      id: "ias-m05-l07",
      lessonNo: "5.7",
      title: "Authorize",
      description:
        "Supports an authorized official's decision about whether the remaining risk is acceptable.",
      keyTerms: [
        {
          word: "Authorization",
          definition:
            "A formal decision by an authorized official to permit system operation based on an assessment of risk and supporting evidence.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Residual Risk",
          definition:
            "The risk that remains after implemented controls and other risk responses have been considered.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Plan of Action and Milestones (POA&M)",
          definition:
            "A document tracking weaknesses, planned corrective actions, responsible parties, and target completion dates.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Making the Authorization Decision",
          "The Authorize step enables the designated authorizing official to decide whether a system may operate, based on its assessed risk and the organization's risk tolerance. The official reviews relevant documentation, including the System Security Plan, assessment results, identified weaknesses, and proposed corrective actions. Authorization is a risk-based management decision, not simply confirmation that technical testing has been completed.",
        ),
        createSection(
          "02",
          "Authorization Outcomes and Risk Acceptance",
          "Based on the evidence and applicable organizational procedures, the official may authorize operation, require further remediation or assessment, or decline authorization. Any acceptance of residual risk must be made by an official with the appropriate authority. Outstanding weaknesses and corrective actions may be tracked in a Plan of Action and Milestones. Significant changes or unacceptable risk may require additional review or a new authorization decision.",
        ),
      ],
    },
    {
      id: "ias-m05-l08",
      lessonNo: "5.8",
      title: "Monitor",
      description:
        "Continuously reviews control effectiveness, system changes, vulnerabilities, and risks.",
      keyTerms: [
        {
          word: "Continuous Monitoring",
          definition:
            "Ongoing observation and assessment of security controls, system changes, and risk conditions.",
          source: "NIST SP 800-137",
        },
        {
          word: "Change Management",
          definition:
            "A controlled process for evaluating, approving, documenting, and implementing changes to systems or their environments.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Security Posture",
          definition:
            "The overall state of an organization's or system's security capabilities, controls, and exposure to risk.",
          source: "NIST SP 800-137",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Continuous Monitoring Activities",
          "The Monitor step keeps security and privacy risk information current throughout system operation. Activities can include vulnerability scanning, log review, configuration monitoring, incident tracking, control assessments, and reassessment of identified weaknesses. Monitoring frequency and scope should reflect system criticality, threat exposure, control effectiveness, and organizational requirements.",
        ),
        createSection(
          "02",
          "Responding to Changes and Emerging Risks",
          "Changes to software, infrastructure, system connections, users, or business processes can affect previously assessed risks. Organizations evaluate significant changes, track corrective actions, and update system documentation and risk information. If monitoring reveals unacceptable exposure or a material change in the system's risk, responsible officials may require additional controls, reassessment, or a revised authorization decision.",
        ),
      ],
    },
    {
      id: "ias-m05-l09",
      lessonNo: "5.9",
      title: "Security Control Documentation",
      description:
        "Records control implementations, assessment results, weaknesses, and remediation activities.",
      keyTerms: [
        {
          word: "System Security Plan (SSP)",
          definition:
            "Documentation describing a system's boundaries, operating environment, security requirements, and control implementations.",
          source: "NIST SP 800-18",
        },
        {
          word: "Security Assessment Report (SAR)",
          definition:
            "A report documenting the scope, methods, results, and findings of a security control assessment.",
          source: "NIST SP 800-53A Rev. 5",
        },
        {
          word: "Evidence Traceability",
          definition:
            "The ability to connect security requirements and control claims to supporting records, test results, and responsible parties.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Core RMF Documentation",
          "RMF documentation provides evidence that security and privacy risks have been evaluated and managed. The System Security Plan describes the system and its controls. The Security Assessment Report records assessment results and weaknesses, while the Plan of Action and Milestones tracks planned corrective actions. Authorization records capture the official decision and the risk information supporting it. Organizations should also maintain relevant monitoring and change records.",
        ),
        createSection(
          "02",
          "Maintaining Accurate and Useful Records",
          "Documentation should be accurate, current, accessible to authorized personnel, and protected against unauthorized disclosure or modification. Records need clear ownership, review dates, version history, and traceability to relevant requirements or findings. When a control changes or a weakness is resolved, the responsible team updates the relevant records and preserves evidence needed for future assessments, audits, and authorization reviews.",
        ),
      ],
    },
    {
      id: "ias-m05-l10",
      lessonNo: "5.10",
      title: "RMF Case Study",
      description:
        "Applies the seven RMF steps to a hypothetical information system and documents the decisions.",
      keyTerms: [
        {
          word: "System Boundary",
          definition:
            "The defined scope of an information system, including its components, information, interfaces, and relevant operating environment.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Risk Treatment",
          definition:
            "The selection and implementation of actions intended to modify identified risks.",
          source: "NIST SP 800-30 Rev. 1",
        },
        {
          word: "Risk Register",
          definition:
            "A record of identified risks and relevant information such as likelihood, impact, ownership, and treatment decisions.",
          source: "NIST SP 800-30 Rev. 1",
        },
      ],
      durationMinutes: 35,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Case Study: University Student Information System",
          "Consider a hypothetical university deploying a web-based Student Information System (SIS) that stores student profiles, enrollment records, grades, and account information. During Prepare, the university assigns a system owner and identifies privacy and operational requirements. During Categorize, stakeholders evaluate confidentiality, integrity, and availability impacts. During Select, they choose controls such as role-based access, multi-factor authentication for privileged accounts, encryption, audit logging, and backups. During Implement, the IT team deploys these controls and documents them in the System Security Plan.",
        ),
        createSection(
          "02",
          "Assessment, Authorization, and Monitoring Decisions",
          "During Assess, an independent assessment team tests access restrictions, reviews audit logs, and checks backup restoration procedures. Suppose the assessment identifies excessive permissions on a staff account. The team records the finding and recommends removing unnecessary access. During Authorize, the designated official reviews the assessment results, remaining weaknesses, and remediation plan before deciding whether operation is acceptable. During Monitor, the university reviews access changes, patches, vulnerabilities, incidents, and outstanding corrective actions. Learners should document each step, the stakeholders involved, the evidence considered, and the resulting decisions.",
        ),
      ],
    },
  ],
  references: [
    {
      title:
        "SP 800-37 Rev. 2: Risk Management Framework for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-37r2",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "FIPS PUB 199: Standards for Security Categorization of Federal Information and Information Systems",
      url: "https://doi.org/10.6028/NIST.FIPS.199",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "FIPS PUB 200: Minimum Security Requirements for Federal Information and Information Systems",
      url: "https://doi.org/10.6028/NIST.FIPS.200",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-18 Rev. 1: Guide for Developing Security Plans for Federal Information Systems",
      url: "https://doi.org/10.6028/NIST.SP.800-18r1",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-30 Rev. 1: Guide for Conducting Risk Assessments",
      url: "https://doi.org/10.6028/NIST.SP.800-30r1",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-53r5",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-53A Rev. 5: Assessing Security and Privacy Controls in Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-53Ar5",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-53B: Control Baselines for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-53B",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-137: Information Security Continuous Monitoring",
      url: "https://doi.org/10.6028/NIST.SP.800-137",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default module5;
