
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

const module4: IASModule = {
  unitId: "ias-module-02",
  moduleId: "04",
  title: "Security Governance, Policies, and Compliance",
  description:
    "Covers the management structures, policies, standards, and compliance practices used to direct an information security program.",
  objectives: [
    "Explain the purpose of security governance and organizational accountability.",
    "Differentiate information security policies, standards, procedures, and guidelines.",
    "Identify the responsibilities of key information security stakeholders.",
    "Explain how awareness training, audits, and compliance activities support security.",
    "Describe how metrics, frameworks, and maturity assessments guide security improvements.",
    "Explain how organizations establish security expectations for suppliers and service providers.",
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
            "The leadership structures and processes used to direct and oversee information security.",
          source: "NIST Cybersecurity Framework",
        },
        {
          word: "Accountability",
          definition:
            "The obligation to explain decisions, actions, and outcomes to the appropriate authority.",
          source: "NIST SP 800-53",
        },
        {
          word: "Risk Appetite",
          definition:
            "The amount and type of risk an organization is willing to accept while pursuing its objectives.",
          source: "NIST SP 800-39",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Purpose of Security Governance",
          "Security governance connects information security with an organization's mission, objectives, and risk tolerance. It establishes who makes security decisions, who oversees implementation, and how performance is evaluated. Effective governance ensures that security is treated as an organizational responsibility rather than solely an IT concern.",
        ),
        createSection(
          "02",
          "Leadership and Oversight",
          "Senior leaders establish priorities, approve policies, allocate resources, and review significant risks. Security managers coordinate the program, while system owners and operational teams implement safeguards. Governance also establishes reporting and escalation channels so that important security issues reach the appropriate decision-makers.",
        ),
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
            "An approved statement of management intent, rules, and requirements for protecting information and systems.",
          source: "NIST SP 800-12",
        },
        {
          word: "Acceptable Use",
          definition:
            "Rules describing the permitted and prohibited use of organizational technology and information.",
          source: "NIST SP 800-12",
        },
        {
          word: "Policy Enforcement",
          definition:
            "The processes used to communicate, apply, monitor, and address violations of established policies.",
          source: "NIST SP 800-12",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Purpose and Scope of Security Policies",
          "An information security policy communicates management's expectations for protecting organizational information. It may cover access to systems, password management, data classification, remote work, incident reporting, and acceptable technology use. A clear policy identifies its scope, responsible parties, required behavior, and approval authority.",
        ),
        createSection(
          "02",
          "Policy Development and Maintenance",
          "Policies should reflect organizational objectives, business risks, legal obligations, and operational needs. They require formal approval, accessible documentation, communication to affected personnel, and periodic review. Organizations should update policies when systems, threats, regulations, or business requirements change and address violations through established procedures.",
        ),
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
            "A mandatory, specific requirement that supports a policy and promotes consistent implementation.",
          source: "NIST SP 800-12",
        },
        {
          word: "Procedure",
          definition:
            "A documented sequence of steps for completing a task consistently and correctly.",
          source: "NIST SP 800-12",
        },
        {
          word: "Guideline",
          definition:
            "A recommended practice that provides direction while allowing appropriate flexibility.",
          source: "NIST SP 800-12",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "From Policy to Implementation",
          "Policies establish what an organization requires, while standards define specific mandatory criteria. For example, a password policy may require strong authentication, while a technical standard specifies approved password settings or multi-factor authentication requirements. These documents help translate management expectations into consistent security controls.",
        ),
        createSection(
          "02",
          "Procedures and Guidelines in Practice",
          "Procedures explain how personnel perform recurring activities, such as creating user accounts, reviewing access, or responding to incidents. Guidelines recommend effective practices without necessarily imposing mandatory requirements. Together, these documents help employees apply policies consistently and provide operational teams with clear instructions.",
        ),
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
          source: "NIST SP 800-12",
        },
        {
          word: "System Owner",
          definition:
            "The individual accountable for a system's operation, requirements, and associated security responsibilities.",
          source: "NIST SP 800-37",
        },
        {
          word: "Separation of Duties",
          definition:
            "A control that divides critical responsibilities among multiple people to reduce errors, misuse, and fraud.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Key Security Stakeholders",
          "Information security depends on clearly assigned responsibilities. Security officers coordinate security strategy and risk management. System owners oversee system-specific requirements, administrators configure and maintain technical safeguards, auditors independently evaluate controls, and ordinary users follow policies and report suspicious activity. Management remains responsible for providing oversight and resources.",
        ),
        createSection(
          "02",
          "Responsibility, Authorization, and Separation of Duties",
          "Organizations should document who approves access, implements controls, reviews evidence, and accepts risk. Separation of duties prevents one person from controlling every stage of a sensitive process. For example, one employee may request a payment while another approves it. Clear responsibility assignments reduce ambiguity and strengthen accountability.",
        ),
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
            "Activities that help people recognize security risks and understand their individual responsibilities.",
          source: "NIST SP 800-50 Rev. 1",
        },
        {
          word: "Security Training",
          definition:
            "Instruction designed to develop the knowledge and skills needed to perform security-related responsibilities.",
          source: "NIST SP 800-50 Rev. 1",
        },
        {
          word: "Phishing Simulation",
          definition:
            "A controlled exercise that evaluates how participants recognize and respond to simulated phishing attempts.",
          source: "NIST SP 800-50 Rev. 1",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Building a Security-Aware Workforce",
          "Employees can unintentionally expose an organization to risk by clicking malicious links, sharing credentials, mishandling sensitive data, or ignoring updates. Awareness programs explain common threats and expected behavior. Topics may include phishing, social engineering, secure passwords, multi-factor authentication, privacy, physical security, and incident reporting.",
        ),
        createSection(
          "02",
          "Training Effectiveness and Improvement",
          "Training should reflect participants' responsibilities and the risks they encounter. New employees may receive introductory training, while administrators and security personnel need role-specific instruction. Organizations can evaluate effectiveness through assessments, simulations, reporting behavior, and incident trends, then improve content based on identified knowledge gaps.",
        ),
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
            "A structured examination of security practices, evidence, and controls against defined criteria.",
          source: "NIST SP 800-53",
        },
        {
          word: "Audit Evidence",
          definition:
            "Records, observations, interviews, or other information used to support audit findings and conclusions.",
          source: "NIST SP 800-53",
        },
        {
          word: "Finding",
          definition:
            "A documented result identifying a condition that meets or does not meet an audit criterion.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Purpose and Scope of Security Audits",
          "Security audits help determine whether an organization follows its policies, meets applicable requirements, and maintains effective safeguards. Depending on the scope, an audit may examine access records, system configurations, incident reports, change management, backups, or vendor documentation. Audit criteria should be established before evidence is collected.",
        ),
        createSection(
          "02",
          "Audit Evidence and Corrective Actions",
          "Auditors collect and evaluate evidence through document reviews, interviews, observations, and technical testing where authorized. Findings should explain the condition, supporting evidence, applicable criteria, and potential impact. Management then assigns corrective actions, responsible owners, and target dates, followed by verification to determine whether identified issues were addressed.",
        ),
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
            "Conformance with applicable legal, regulatory, contractual, or organizational requirements.",
          source: "NIST Cybersecurity Framework",
        },
        {
          word: "Regulatory Requirement",
          definition:
            "An obligation established by an applicable law or regulation that an organization must follow.",
          source: "Applicable laws and regulations",
        },
        {
          word: "Compliance Gap",
          definition:
            "A difference between a required condition and the organization's current practices or controls.",
          source: "NIST Cybersecurity Framework",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Sources of Compliance Requirements",
          "Organizations may have obligations arising from privacy and data protection laws, sector-specific regulations, customer contracts, procurement terms, and adopted security standards. Applicable requirements depend on the organization's location, industry, activities, and the types of information it handles. A compliance inventory helps identify obligations and the teams responsible for addressing them.",
        ),
        createSection(
          "02",
          "Monitoring and Demonstrating Compliance",
          "Organizations demonstrate compliance through documented policies, control records, assessments, audit reports, and other relevant evidence. Compliance reviews identify gaps that require remediation, while assigned owners track corrective actions to completion. Meeting a compliance requirement does not automatically eliminate risk; controls must also be appropriate and effective for the organization's circumstances.",
        ),
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
            "A measurable value used to evaluate a security activity, condition, or outcome.",
          source: "NIST SP 800-55",
        },
        {
          word: "Key Performance Indicator (KPI)",
          definition:
            "A measure used to evaluate progress toward a defined performance objective.",
          source: "NIST SP 800-55",
        },
        {
          word: "Key Risk Indicator (KRI)",
          definition:
            "A measure used to signal changes in exposure to a particular risk.",
          source: "NIST SP 800-55",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Measuring Security Performance",
          "Security metrics provide evidence about whether security activities are achieving their intended outcomes. Examples include the percentage of systems receiving timely patches, completion rates for awareness training, time required to resolve vulnerabilities, and the proportion of critical assets covered by monitoring. Each metric should have a clear definition, data source, owner, and reporting frequency.",
        ),
        createSection(
          "02",
          "Reporting and Decision-Making",
          "Security reports communicate trends, control weaknesses, incidents, and progress toward objectives. Technical teams may need detailed operational data, while executives generally need concise summaries of business impact, risk exposure, and decisions requiring approval. Metrics should be interpreted in context: a rising incident count, for example, may reflect increased attacks or improved detection and reporting.",
        ),
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
            "A coordinated set of governance activities, policies, processes, personnel, and controls that manage security risks.",
          source: "NIST SP 800-37",
        },
        {
          word: "Security Roadmap",
          definition:
            "A planned sequence of initiatives and milestones for achieving security objectives over time.",
          source: "NIST Cybersecurity Framework",
        },
        {
          word: "Continuous Improvement",
          definition:
            "An ongoing process of evaluating results and making changes to improve program effectiveness.",
          source: "NIST Cybersecurity Framework",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Planning and Coordinating Security Initiatives",
          "Security program management aligns people, processes, technology, and funding with organizational priorities. Program activities may include risk assessments, policy development, security awareness, vulnerability management, incident response, and compliance monitoring. A roadmap organizes these initiatives into achievable milestones based on risk, available resources, and business needs.",
        ),
        createSection(
          "02",
          "Evaluating and Improving the Program",
          "Program managers track project milestones, control effectiveness, resource use, and changes in the risk environment. Assessment findings, incident lessons, audit results, and performance metrics help identify areas for improvement. Management should periodically review priorities and adjust the roadmap so the program remains relevant as organizational objectives and threats evolve.",
        ),
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
          word: "NIST Cybersecurity Framework (CSF)",
          definition:
            "A framework that helps organizations understand, assess, prioritize, and communicate cybersecurity risk.",
          source: "NIST Cybersecurity Framework 2.0",
        },
        {
          word: "ISO/IEC 27001",
          definition:
            "An international standard specifying requirements for establishing, implementing, maintaining, and continually improving an information security management system.",
          source: "ISO/IEC 27001:2022",
        },
        {
          word: "CIS Controls",
          definition:
            "A prioritized set of safeguards designed to help organizations defend against common cybersecurity threats.",
          source: "Center for Internet Security",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Purpose of Security Frameworks",
          "Security frameworks organize security activities into recognizable practices, outcomes, or requirements. The NIST CSF 2.0 uses six functions: Govern, Identify, Protect, Detect, Respond, and Recover. ISO/IEC 27001 specifies requirements for an information security management system, while CIS Controls provides prioritized safeguards. These approaches can help organizations structure and communicate security work.",
        ),
        createSection(
          "02",
          "Selecting and Applying a Framework",
          "Framework selection depends on organizational goals, risk exposure, customer expectations, regulatory obligations, resources, and existing processes. An organization can assess its current practices, identify gaps, prioritize improvements, and establish a target state. Frameworks are not interchangeable in every respect, and adopting one does not automatically guarantee security or legal compliance.",
        ),
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
            "The degree to which security practices are established, repeatable, measured, and continually improved.",
          source: "NIST Cybersecurity Framework",
        },
        {
          word: "Current State",
          definition:
            "A documented view of the organization's existing security practices and capabilities.",
          source: "NIST Cybersecurity Framework",
        },
        {
          word: "Target State",
          definition:
            "A defined set of desired security outcomes that guide improvement priorities.",
          source: "NIST Cybersecurity Framework",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Understanding Security Maturity",
          "A maturity assessment examines how consistently an organization performs and improves its security activities. Some practices may be informal and dependent on individual knowledge, while others may be documented, repeatable, measured, and continuously improved. The assessment should use defined criteria and evidence rather than relying only on subjective opinions.",
        ),
        createSection(
          "02",
          "Identifying Gaps and Planning Improvements",
          "Organizations compare their current security practices with a target state based on business objectives, risks, and applicable requirements. The resulting gaps can be ranked by potential impact, urgency, effort, and available resources. A maturity assessment supports planning and progress tracking, but a higher maturity rating alone does not prove that every security risk is adequately controlled.",
        ),
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
          word: "Supply-Chain Risk Management",
          definition:
            "The process of identifying, assessing, and managing risks arising from products, services, suppliers, and their associated processes.",
          source: "NIST SP 800-161 Rev. 1",
        },
        {
          word: "Third-Party Risk",
          definition:
            "Risk introduced through an external organization that provides products, services, access, or operational support.",
          source: "NIST SP 800-161 Rev. 1",
        },
        {
          word: "Due Diligence",
          definition:
            "The process of gathering and evaluating relevant information before making or maintaining a business relationship.",
          source: "NIST SP 800-161 Rev. 1",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Managing Supplier Security Risks",
          "Organizations rely on vendors for cloud hosting, software, hardware, payment processing, support, and other services. A supplier may introduce risk through weak access controls, compromised software, inadequate incident response, or poor data handling. Risk-based supplier assessments should consider service criticality, information sensitivity, access privileges, dependencies, and the potential impact of a supplier disruption.",
        ),
        createSection(
          "02",
          "Contracts, Monitoring, and Supplier Offboarding",
          "Organizations can establish supplier security expectations through contracts, service-level agreements, access restrictions, incident notification requirements, audit rights, and data protection terms. Monitoring and periodic reassessment help identify changes in supplier risk. When a relationship ends, organizations should revoke access, recover assets, address data return or deletion, and ensure that remaining obligations are fulfilled.",
        ),
      ],
    },
  ],
  references: [
    {
      title: "NIST Cybersecurity Framework (CSF) 2.0",
      url: "https://doi.org/10.6028/NIST.CSWP.29",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-12 Rev. 1: An Introduction to Information Security",
      url: "https://doi.org/10.6028/NIST.SP.800-12r1",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-37 Rev. 2: Risk Management Framework for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-37r2",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-39: Managing Information Security Risk",
      url: "https://doi.org/10.6028/NIST.SP.800-39",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-50 Rev. 1: Building a Cybersecurity and Privacy Learning Program",
      url: "https://doi.org/10.6028/NIST.SP.800-50r1",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-55 Vol. 1: Measurement Guide for Information Security",
      url: "https://doi.org/10.6028/NIST.SP.800-55v1",
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
      title: "SP 800-161 Rev. 1: Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-161r1",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "ISO/IEC 27001:2022 — Information security management systems",
      url: "https://www.iso.org/standard/27001",
      author: "International Organization for Standardization",
      organization: "ISO/IEC",
    },
    {
      title: "CIS Critical Security Controls",
      url: "https://www.cisecurity.org/controls",
      author: "Center for Internet Security",
      organization: "CIS",
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default module4;
