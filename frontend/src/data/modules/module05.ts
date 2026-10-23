
import type { IASModule } from "../../types/modules";

const VIDEO_URL =
  "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm";

const IMAGE_URL =
  "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ";

const iasModule05: IASModule = {
  unitId: "ias-module-02",
  moduleId: "05",
  moduleNo: 5,
  title: "Risk Management Framework (RMF)",
  description:
    "Introduces the NIST Risk Management Framework and its lifecycle for managing security and privacy risks in information systems.",
  objectives: [
    "Explain the purpose, principles, stakeholders, and lifecycle of the NIST Risk Management Framework.",
    "Describe the activities and outputs of each of the seven RMF steps.",
    "Explain how system categorization and control selection support risk-based security decisions.",
    "Describe how security controls are implemented, assessed, authorized, and continuously monitored.",
    "Identify the documentation needed to support RMF decisions and demonstrate accountability.",
    "Apply the RMF lifecycle to a hypothetical information system and justify key risk management decisions.",
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
            "A structured process for managing security and privacy risk through system categorization, control selection, implementation, assessment, authorization, and continuous monitoring.",
          source: "NIST SP 800-37 Rev. 2",
        },
        {
          word: "Security Control",
          definition:
            "A safeguard or countermeasure designed to protect information systems and manage security or privacy risks.",
        },
        {
          word: "Authorization",
          definition:
            "A formal decision by an authorized official to permit system operation based on an understanding of risk.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "NIST Risk Management Framework Overview",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.1.1",
          header: "Purpose and Principles of RMF",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The NIST Risk Management Framework provides a repeatable approach for managing security and privacy risks throughout the system life cycle. It connects organizational risk management with the design, implementation, operation, and monitoring of information systems.",
            },
            {
              type: "heading",
              level: 3,
              text: "The Seven RMF Steps",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Prepare — establish the context, priorities, responsibilities, and readiness for risk management.",
                "Categorize — determine the impact level associated with the system and its information.",
                "Select — choose appropriate security and privacy controls.",
                "Implement — put the selected controls into operation and document them.",
                "Assess — determine whether controls are implemented correctly and operate as intended.",
                "Authorize — obtain an authorized official's risk-based decision on system operation.",
                "Monitor — track control effectiveness, system changes, vulnerabilities, and risk over time.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Key RMF Stakeholders",
            },
            {
              type: "table",
              headers: ["Stakeholder", "Typical responsibility"],
              rows: [
                [
                  "Authorizing Official (AO)",
                  "Makes the formal risk-based authorization decision.",
                ],
                [
                  "System Owner",
                  "Coordinates system operation, requirements, documentation, and risk management activities.",
                ],
                [
                  "Information Owner",
                  "Helps define information sensitivity, criticality, and protection requirements.",
                ],
                [
                  "Common Control Provider",
                  "Provides controls used by multiple systems or organizational components.",
                ],
                [
                  "Security Control Assessor",
                  "Assesses controls and reports findings and weaknesses.",
                ],
                [
                  "System Security Officer",
                  "Coordinates system security activities and documentation.",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Risk Management Across the System Life Cycle",
            },
            {
              type: "paragraph",
              text:
                "RMF activities should begin early and continue as the system evolves. Changes to technology, information, threats, or organizational requirements may require controls to be reassessed and risk decisions to be revisited.",
            },
            {
              type: "callout",
              variant: "important",
              title: "Core Principle",
              text:
                "RMF is not a one-time checklist. It is a risk-based life-cycle process that supports informed decisions and ongoing accountability.",
            },
          ],
        },
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
            "The organizational objectives, operating environment, assumptions, constraints, and conditions used to understand risk.",
        },
        {
          word: "Risk Tolerance",
          definition:
            "The amount of variation in risk an organization is willing to accept in pursuit of its objectives.",
        },
        {
          word: "Authorization Boundary",
          definition:
            "The defined scope of a system and the components included in a particular authorization decision.",
          source: "NIST SP 800-37 Rev. 2",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "RMF Prepare Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.2.1",
          header: "Establishing Readiness for Risk Management",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Prepare step establishes the organizational and system-level conditions needed for effective RMF implementation. It clarifies priorities, responsibilities, risk assumptions, resources, and the environment in which the system will operate.",
            },
            {
              type: "heading",
              level: 3,
              text: "Prepare Step Activities",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Identify organizational objectives and risk management priorities.",
                "Define roles, responsibilities, and decision-making authority.",
                "Identify important systems, information, and shared services.",
                "Establish risk tolerance and assumptions for decision-making.",
                "Determine the system's scope and authorization boundary.",
                "Plan resources, coordination, and the documentation needed for RMF activities.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Organizational-Level and System-Level Preparation",
            },
            {
              type: "table",
              headers: ["Level", "Focus", "Example"],
              rows: [
                [
                  "Organization",
                  "Shared priorities, policies, resources, and risk strategy",
                  "Establishing common security requirements for university systems",
                ],
                [
                  "System",
                  "System-specific context, responsibilities, scope, and risks",
                  "Identifying the components and stakeholders of an online enrollment system",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Example: University Enrollment System",
            },
            {
              type: "paragraph",
              text:
                "Before securing an enrollment system, the university identifies the business owner, information handled, connected services, operational priorities, applicable requirements, and people authorized to make risk decisions. These details establish the foundation for the remaining RMF steps.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Why Prepare First?",
              text:
                "Without clear scope, responsibilities, and organizational priorities, teams may select inappropriate controls or overlook systems and dependencies that affect risk.",
            },
          ],
        },
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
            "The process of determining the impact level of a potential loss of confidentiality, integrity, or availability.",
          source: "FIPS 199",
        },
        {
          word: "Confidentiality",
          definition:
            "Preserving authorized restrictions on information access and disclosure.",
        },
        {
          word: "Integrity",
          definition:
            "Guarding against improper information modification or destruction and supporting authenticity and reliability.",
        },
        {
          word: "Availability",
          definition:
            "Ensuring timely and reliable access to and use of information and systems.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "RMF Categorize Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.3.1",
          header: "Categorizing Information Systems",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Categorize step determines the potential adverse impact if information or system operations are compromised. Under FIPS 199, confidentiality, integrity, and availability are considered separately, and the resulting system impact level is determined using the applicable categorization methodology.",
            },
            {
              type: "heading",
              level: 3,
              text: "Three Security Objectives",
            },
            {
              type: "table",
              headers: ["Objective", "Potential compromise", "Example"],
              rows: [
                [
                  "Confidentiality",
                  "Unauthorized disclosure",
                  "Student personal records are exposed.",
                ],
                [
                  "Integrity",
                  "Unauthorized modification or destruction",
                  "Enrollment grades are altered without authorization.",
                ],
                [
                  "Availability",
                  "Disruption of access or service",
                  "The enrollment portal becomes unavailable during registration.",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Impact Levels",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Low impact: a compromise could have a limited adverse effect.",
                "Moderate impact: a compromise could have a serious adverse effect.",
                "High impact: a compromise could have a severe or catastrophic adverse effect.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Categorization Process",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify the information types processed, stored, or transmitted.",
                "Determine potential impacts on confidentiality, integrity, and availability.",
                "Assign impact values using applicable criteria and business context.",
                "Determine the system's overall security categorization according to the relevant standard.",
                "Document and obtain appropriate review of the categorization decision.",
              ],
            },
            {
              type: "callout",
              variant: "warning",
              title: "Categorization Is Impact-Based",
              text:
                "A system is not automatically high impact because it is important or technically complex. Its categorization should be justified by the potential consequences of compromising its information and operations.",
            },
          ],
        },
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
          word: "Security Control Baseline",
          definition:
            "A predefined set of controls selected according to a system's categorization and applicable requirements.",
        },
        {
          word: "Control Tailoring",
          definition:
            "Adjusting a control baseline to reflect system conditions, risk, and applicable requirements while documenting the rationale.",
        },
        {
          word: "Common Control",
          definition:
            "A control implemented and managed by an organization or provider for use by multiple information systems.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "RMF Select Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.4.1",
          header: "Choosing Appropriate Controls",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Select step identifies the controls needed to manage system risks and meet organizational requirements. Control selection considers the system's categorization, mission and business needs, applicable standards, dependencies, and risk assessment results.",
            },
            {
              type: "heading",
              level: 3,
              text: "Control Selection Activities",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Select an appropriate control baseline using the applicable guidance.",
                "Tailor the baseline to account for system characteristics and requirements.",
                "Identify controls provided by shared organizational services.",
                "Add or strengthen controls when risk assessments identify additional needs.",
                "Document control assignments, implementation responsibilities, and rationale.",
                "Develop or update the system security and privacy plans.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Control Categories",
            },
            {
              type: "table",
              headers: ["Control type", "Purpose", "Example"],
              rows: [
                [
                  "Access control",
                  "Restricts access to authorized users and processes.",
                  "Role-based permissions",
                ],
                [
                  "Identification and authentication",
                  "Establishes and verifies identities.",
                  "Multifactor authentication",
                ],
                [
                  "Audit and accountability",
                  "Records and supports review of system activity.",
                  "Centralized security logs",
                ],
                [
                  "Contingency planning",
                  "Supports recovery after disruption.",
                  "Tested backups and recovery procedures",
                ],
                [
                  "System and communications protection",
                  "Protects systems and information flows.",
                  "Encryption and network segmentation",
                ],
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Controls Must Match Risk",
              text:
                "Selecting controls is not simply a matter of choosing as many as possible. Controls should address relevant risks, meet applicable requirements, and be supported by documented decisions.",
            },
          ],
        },
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
            "The process of putting selected safeguards and countermeasures into operation.",
        },
        {
          word: "System Security Plan (SSP)",
          definition:
            "Documentation describing a system's security requirements, control implementations, and relevant system characteristics.",
          source: "NIST SP 800-18",
        },
        {
          word: "Control Inheritance",
          definition:
            "The use of controls provided by another system or organization, with the applicable responsibilities and dependencies documented.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "RMF Implement Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.5.1",
          header: "Putting Controls into Operation",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Implement step puts the selected security and privacy controls into operation. It includes configuring technologies, establishing processes, assigning responsibilities, and documenting how each control is implemented or provided.",
            },
            {
              type: "heading",
              level: 3,
              text: "Implementation Activities",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Configure systems and deploy approved security technologies.",
                "Establish operational procedures and assign control owners.",
                "Coordinate controls provided by shared services or external providers.",
                "Document implementation details in the appropriate plans and records.",
                "Identify implementation gaps and resolve them before assessment where possible.",
                "Keep implementation documentation accurate as changes occur.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Example: Multifactor Authentication",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define which users and systems require multifactor authentication.",
                "Configure the approved identity provider and authentication methods.",
                "Test access, account recovery, and exception handling.",
                "Document the configuration, scope, dependencies, and responsible personnel.",
                "Prepare evidence so assessors can verify the implementation.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Implementation Documentation",
            },
            {
              type: "paragraph",
              text:
                "Documentation should explain how controls are implemented, who is responsible, what components are covered, and which dependencies exist. A control that is only partially implemented or inherited from another provider should be described accurately.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Implementation Is Not Assessment",
              text:
                "The implementing team deploys and documents the controls. The Assess step evaluates whether those controls are implemented correctly and operating effectively.",
            },
          ],
        },
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
            "An evaluation of controls to determine whether they are implemented correctly, operating as intended, and producing the desired security outcomes.",
        },
        {
          word: "Assessment Plan",
          definition:
            "A document defining assessment objectives, scope, methods, procedures, and responsibilities.",
        },
        {
          word: "Plan of Action and Milestones (POA&M)",
          definition:
            "A management document used to track identified weaknesses, planned corrective actions, responsible parties, and milestones.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "RMF Assess Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.6.1",
          header: "Evaluating Control Effectiveness",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Assess step determines whether implemented controls satisfy their requirements and operate as intended. Assessment results provide evidence for risk decisions and help identify weaknesses that need remediation or explicit consideration during authorization.",
            },
            {
              type: "heading",
              level: 3,
              text: "Common Assessment Methods",
            },
            {
              type: "table",
              headers: ["Method", "Description", "Example"],
              rows: [
                [
                  "Examine",
                  "Review documents, configurations, records, or other evidence.",
                  "Inspect authentication settings and access review records.",
                ],
                [
                  "Interview",
                  "Ask personnel about processes and responsibilities.",
                  "Ask administrators how privileged access is approved.",
                ],
                [
                  "Test",
                  "Exercise a control to determine whether it operates as intended.",
                  "Verify that unauthorized access attempts are blocked.",
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
                "Plan the assessment scope, objectives, and procedures.",
                "Collect evidence using appropriate assessment methods.",
                "Compare results with control requirements and assessment criteria.",
                "Document findings, weaknesses, and supporting evidence.",
                "Prepare assessment results for the relevant decision-makers.",
                "Track corrective actions and reassess controls when necessary.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Assessment Outcomes",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Controls may be assessed as effective based on the applicable criteria.",
                "Controls may have deficiencies requiring corrective action.",
                "Evidence may be insufficient, requiring further examination or testing.",
                "Findings may affect the system's risk determination and authorization decision.",
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Evidence-Based Conclusions",
              text:
                "A control should not be considered effective merely because a policy says it exists. Assessment conclusions should be supported by sufficient and appropriate evidence.",
            },
          ],
        },
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
          word: "Authorizing Official (AO)",
          definition:
            "The designated official with authority to make a risk-based decision about allowing a system to operate.",
        },
        {
          word: "Authorization Decision",
          definition:
            "A formal determination, based on relevant risk information, about whether a system may operate under specified conditions.",
        },
        {
          word: "Residual Risk",
          definition:
            "Risk that remains after security and privacy controls have been applied.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "RMF Authorize Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.7.1",
          header: "Making the Authorization Decision",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Authorize step provides the designated official with the information needed to decide whether the system's remaining risk is acceptable within the organization's authority and risk tolerance. The decision considers system documentation, assessment results, identified weaknesses, planned corrective actions, and the operational context.",
            },
            {
              type: "heading",
              level: 3,
              text: "Information Supporting Authorization",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "The system security and privacy plans.",
                "Security control assessment results.",
                "Identified weaknesses and remediation plans.",
                "Risk assessments and the significance of unresolved findings.",
                "Relevant dependencies, operational constraints, and mission needs.",
                "Recommendations and other required authorization documentation.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Possible Authorization Outcomes",
            },
            {
              type: "table",
              headers: ["Outcome", "Meaning"],
              rows: [
                [
                  "Authorize",
                  "The official permits operation under the decision's applicable conditions.",
                ],
                [
                  "Authorize with conditions",
                  "Where permitted by the governing process, operation is allowed subject to specified restrictions, conditions, or corrective actions.",
                ],
                [
                  "Do not authorize",
                  "Operation is not permitted under the decision because the risk or other requirements are unacceptable.",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Accountability in Authorization",
            },
            {
              type: "paragraph",
              text:
                "Technical teams provide evidence and recommendations, but the formal authorization decision belongs to the designated official. The decision should be documented and based on the applicable organizational process rather than an informal assumption that a system is safe.",
            },
            {
              type: "callout",
              variant: "warning",
              title: "Authorization Does Not Eliminate Risk",
              text:
                "Authorization is a risk decision, not a guarantee that the system is free of vulnerabilities or future incidents. Conditions and ongoing monitoring remain important.",
            },
          ],
        },
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
            "An ongoing process for observing security and privacy controls, system changes, and risk conditions to support timely decisions.",
        },
        {
          word: "Significant Change",
          definition:
            "A change that may affect a system's security, privacy, risk, authorization conditions, or operating environment.",
        },
        {
          word: "Reauthorization",
          definition:
            "A new or renewed authorization decision when required by applicable risk conditions or organizational processes.",
        },
      ],
      durationMinutes: 30,
      video: [
        {
          title: "RMF Monitor Step",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.8.1",
          header: "Maintaining Security Over Time",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The Monitor step maintains awareness of whether controls remain effective and whether system changes introduce new risks. Monitoring supports ongoing risk decisions and helps determine when remediation, reassessment, or changes to authorization conditions are necessary.",
            },
            {
              type: "heading",
              level: 3,
              text: "Monitoring Activities",
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Review system and infrastructure changes.",
                "Track vulnerabilities, threats, incidents, and control weaknesses.",
                "Evaluate the continued effectiveness of implemented controls.",
                "Review remediation progress and unresolved findings.",
                "Monitor changes in external providers and system dependencies.",
                "Report significant changes and risks to appropriate stakeholders.",
                "Update documentation and initiate reassessment when required.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Example Monitoring Schedule",
            },
            {
              type: "table",
              headers: ["Activity", "Illustrative frequency", "Purpose"],
              rows: [
                [
                  "Security log review",
                  "Daily or according to operational needs",
                  "Identify suspicious activity and potential incidents.",
                ],
                [
                  "Vulnerability scanning",
                  "Regularly and after relevant changes",
                  "Identify known weaknesses in system components.",
                ],
                [
                  "Access review",
                  "Periodically and when personnel roles change",
                  "Confirm that permissions remain appropriate.",
                ],
                [
                  "Control assessment",
                  "According to the monitoring strategy and risk",
                  "Verify continued control effectiveness.",
                ],
                [
                  "Risk review",
                  "Periodically and when significant changes occur",
                  "Determine whether risk decisions remain appropriate.",
                ],
              ],
            },
            {
              type: "paragraph",
              text:
                "The example frequencies are illustrative. Organizations should establish monitoring activities and schedules according to risk, system criticality, control requirements, and applicable policies.",
            },
            {
              type: "callout",
              variant: "tip",
              title: "Monitoring Closes the Loop",
              text:
                "Monitoring findings can trigger updates to system categorization, control selection, implementation, assessment, or authorization decisions when the risk context changes.",
            },
          ],
        },
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
            "A document describing a system, its security requirements, and how applicable controls are implemented or provided.",
        },
        {
          word: "Security Assessment Report (SAR)",
          definition:
            "A report documenting the results of a security control assessment, including findings and supporting conclusions.",
        },
        {
          word: "Plan of Action and Milestones (POA&M)",
          definition:
            "A record of identified weaknesses, planned corrective actions, responsible parties, and expected milestones.",
        },
      ],
      durationMinutes: 25,
      video: [
        {
          title: "RMF Security Documentation",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.9.1",
          header: "Documenting the RMF Process",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "RMF documentation records system characteristics, security requirements, implemented controls, assessment evidence, identified weaknesses, and risk decisions. Accurate documentation supports accountability, repeatability, review, and informed authorization.",
            },
            {
              type: "heading",
              level: 3,
              text: "Common RMF Documents",
            },
            {
              type: "table",
              headers: ["Document", "Purpose", "Typical contents"],
              rows: [
                [
                  "System Security Plan (SSP)",
                  "Describes the system and its security implementation",
                  "System boundary, environment, requirements, control implementations, and responsibilities",
                ],
                [
                  "Security Assessment Plan",
                  "Defines how controls will be evaluated",
                  "Scope, assessment objectives, methods, procedures, and schedule",
                ],
                [
                  "Security Assessment Report (SAR)",
                  "Records assessment results",
                  "Evidence, findings, control effectiveness, and weaknesses",
                ],
                [
                  "Plan of Action and Milestones (POA&M)",
                  "Tracks remediation and corrective actions",
                  "Weaknesses, priorities, responsible owners, milestones, and status",
                ],
                [
                  "Authorization decision records",
                  "Documents the official risk decision",
                  "Decision, relevant conditions, rationale, and applicable limitations",
                ],
                [
                  "Continuous monitoring strategy",
                  "Defines ongoing monitoring activities",
                  "Monitoring scope, methods, schedules, responsibilities, and reporting",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Documentation Lifecycle",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Create documentation as system scope and requirements are established.",
                "Record selected controls and implementation details.",
                "Collect assessment evidence and document findings.",
                "Track weaknesses and corrective actions through remediation records.",
                "Use documented results to support authorization decisions.",
                "Update records when controls, risks, systems, or authorization conditions change.",
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Example Control Record",
            },
            {
              type: "code",
              language: "text",
              code: `Control ID: AC-2
Control Name: Account Management
Implementation Status: Partially Implemented
Responsible Owner: System Administrator
Evidence: Account inventory and access review records
Identified Weakness: Inactive accounts are not disabled consistently
Planned Action: Automate inactivity detection and account review
Target Date: Defined by the organization
Status: In Progress`,
              caption:
                "Illustrative control documentation. The status, evidence, and remediation details must reflect actual assessment results.",
            },
            {
              type: "callout",
              variant: "important",
              title: "Documentation Must Be Accurate",
              text:
                "Documentation is not a substitute for an effective control. Records should reflect actual implementation and assessment evidence, including gaps and unresolved weaknesses.",
            },
          ],
        },
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
          word: "Risk-Based Decision",
          definition:
            "A decision that considers the likelihood and consequences of potential adverse events alongside organizational objectives and risk tolerance.",
        },
        {
          word: "Control Gap",
          definition:
            "A difference between required or intended control capabilities and the controls actually implemented or operating.",
        },
        {
          word: "Risk Acceptance",
          definition:
            "A decision by an authorized person to tolerate a defined level of risk under applicable organizational rules.",
        },
      ],
      durationMinutes: 40,
      video: [
        {
          title: "Applying the NIST Risk Management Framework",
          url: VIDEO_URL,
          provider: "youtube",
        },
      ],
      sections: [
        {
          sectionNo: "5.10.1",
          header: "Case Study: University Enrollment System",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "A hypothetical university plans to deploy an online enrollment system that processes student information, enrollment requests, and academic records. The system will be used by students, faculty, and authorized administrative personnel. The university must determine how to manage the system's security and privacy risks before and during operation.",
            },
            {
              type: "image",
              url: IMAGE_URL,
              alt:
                "IT professional reviewing system information and security-related data",
              caption:
                "The case study follows the RMF lifecycle from preparation through continuous monitoring.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 1 — Prepare",
            },
            {
              type: "paragraph",
              text:
                "The university identifies the system owner, security personnel, information owner, administrators, and authorizing official. It defines the system boundary, identifies connected services, establishes risk priorities, and identifies applicable privacy and security requirements.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 2 — Categorize",
            },
            {
              type: "paragraph",
              text:
                "The team identifies student records, enrollment data, and academic information handled by the system. It evaluates potential confidentiality, integrity, and availability impacts. For this teaching scenario, assume the approved categorization is Moderate overall, based on the applicable categorization method and documented impact analysis. This is an illustrative assumption, not a universal classification for enrollment systems.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 3 — Select",
            },
            {
              type: "paragraph",
              text:
                "Using the approved categorization and applicable requirements, the team selects appropriate controls. Examples include access authorization, multifactor authentication for privileged users, audit logging, secure communications, backup and recovery, vulnerability management, and incident response procedures.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 4 — Implement",
            },
            {
              type: "paragraph",
              text:
                "Administrators configure the selected controls, establish account management and incident response procedures, test backup recovery, and document control implementations in the system security plan. The team records which controls are inherited from shared services and which are managed directly.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 5 — Assess",
            },
            {
              type: "paragraph",
              text:
                "An assessor reviews configurations and documentation, interviews administrators, and tests selected controls. The assessment finds that privileged accounts use multifactor authentication, but several inactive accounts remain enabled and some access reviews are overdue. These findings are documented with supporting evidence.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 6 — Authorize",
            },
            {
              type: "paragraph",
              text:
                "The authorizing official reviews the system documentation, assessment results, identified weaknesses, remediation plans, and potential impact. The official determines whether the remaining risk is acceptable and makes a formal decision under the university's authorization process. The decision cannot be assumed in advance; it depends on the evidence and risk criteria.",
            },
            {
              type: "heading",
              level: 3,
              text: "Step 7 — Monitor",
            },
            {
              type: "paragraph",
              text:
                "After authorization, the university monitors security logs, vulnerabilities, account activity, access reviews, system changes, and remediation progress. Significant changes or newly discovered weaknesses are evaluated to determine whether further assessment or a revised risk decision is needed.",
            },
            {
              type: "heading",
              level: 3,
              text: "Case Study Summary",
            },
            {
              type: "table",
              headers: ["RMF step", "Key decision or output"],
              rows: [
                [
                  "Prepare",
                  "Scope, stakeholders, responsibilities, and risk context",
                ],
                [
                  "Categorize",
                  "Documented impact analysis and system categorization",
                ],
                [
                  "Select",
                  "Risk-appropriate control baseline and tailored controls",
                ],
                [
                  "Implement",
                  "Deployed controls and implementation documentation",
                ],
                [
                  "Assess",
                  "Assessment evidence, findings, and identified weaknesses",
                ],
                [
                  "Authorize",
                  "Formal risk-based authorization decision",
                ],
                [
                  "Monitor",
                  "Ongoing monitoring, remediation, and updated risk information",
                ],
              ],
            },
            {
              type: "heading",
              level: 3,
              text: "Student Activity",
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify two information assets and explain their security needs.",
                "Describe one potential threat and one relevant vulnerability.",
                "Recommend three controls and explain which risks they address.",
                "Propose evidence that an assessor could use to evaluate those controls.",
                "Explain what information the authorizing official needs before deciding.",
                "Identify two monitoring activities and state what conditions would trigger further action.",
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Case Study Takeaway",
              text:
                "The RMF steps are connected. Categorization informs control selection, implementation enables assessment, assessment supports authorization, and monitoring provides information for continuing risk decisions.",
            },
          ],
        },
      ],
    },
  ],
  references: [
    {
      title:
        "NIST SP 800-37 Rev. 2: Risk Management Framework for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-37r2",
      author: "Joint Task Force",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2018,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "NIST SP 800-30 Rev. 1: Guide for Conducting Risk Assessments",
      url: "https://doi.org/10.6028/NIST.SP.800-30r1",
      author: "Joint Task Force",
      organization: "NIST",
      publishedYear: 2012,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "FIPS 199: Standards for Security Categorization of Federal Information and Information Systems",
      url: "https://doi.org/10.6028/NIST.FIPS.199",
      organization: "NIST",
      publishedYear: 2004,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "FIPS 200: Minimum Security Requirements for Federal Information and Information Systems",
      url: "https://doi.org/10.6028/NIST.FIPS.200",
      organization: "NIST",
      publishedYear: 2006,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "NIST SP 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-53r5",
      organization: "NIST",
      publishedYear: 2020,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "NIST SP 800-53A Rev. 5: Assessing Security and Privacy Controls in Information Systems and Organizations",
      url: "https://doi.org/10.6028/NIST.SP.800-53Ar5",
      organization: "NIST",
      publishedYear: 2022,
      accessedAt: "2026-10-23",
    },
    {
      title:
        "NIST SP 800-18 Rev. 1: Guide for Developing Security Plans for Federal Information Systems",
      url: "https://doi.org/10.6028/NIST.SP.800-18r1",
      organization: "NIST",
      publishedYear: 2006,
      accessedAt: "2026-10-23",
    },
    {
      title: "The NIST Cybersecurity Framework (CSF) 2.0",
      url: "https://doi.org/10.6028/NIST.CSWP.29",
      organization: "NIST",
      publishedYear: 2024,
      accessedAt: "2026-10-23",
    },
  ],
  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z",
};

export default iasModule05;
