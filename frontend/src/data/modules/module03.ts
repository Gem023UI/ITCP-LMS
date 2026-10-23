
import type { IASModule } from "../../types/modules";

const VIDEO_URL =
  "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm";

const IMAGE_URL =
  "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ";

const iasModule03: IASModule = {
  unitId: "ias-module-01",
  moduleId: "03",
  moduleNo: 3,
  title: "Information Security Risk Management",
  description:
    "Teaches learners to identify, analyze, prioritize, treat, and monitor risks to organizational information systems.",

  objectives: [
    "Identify information assets, threats, vulnerabilities, and risk conditions.",
    "Explain qualitative and quantitative risk assessment methods.",
    "Evaluate and prioritize risks based on likelihood, impact, and organizational objectives.",
    "Compare risk avoidance, mitigation, transfer, and acceptance.",
    "Explain vulnerability assessment, threat modeling, and business impact analysis.",
    "Distinguish inherent risk, control effectiveness, and residual risk.",
    "Describe continuous risk monitoring and third-party risk management."
  ],

  lessons: [
    // ==========================================
    // LESSON 3.1
    // ==========================================
    {
      id: "ias-m03-l01",
      lessonNo: "3.1",
      title: "Risk Identification",
      description:
        "Identifies assets, threats, vulnerabilities, and conditions that could affect organizational objectives.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Risk Identification",
          definition:
            "The process of identifying and documenting risks that could affect an organization's objectives."
        },
        {
          word: "Asset",
          definition:
            "Anything of value that an organization needs to protect, including information, systems, people, and services."
        },
        {
          word: "Threat Source",
          definition:
            "The person, group, condition, or event that may cause harm to an information system or organization."
        },
        {
          word: "Vulnerability",
          definition:
            "A weakness in a system, process, or control that a threat could exploit or trigger."
        }
      ],

      video: [
        {
          title: "Risk Identification (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Identifying What Could Go Wrong",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Risk identification establishes what an organization needs to protect and what circumstances could prevent it from achieving its objectives. It considers assets, threats, vulnerabilities, existing controls, and operational dependencies."
            },
            {
              type: "image",
              url: IMAGE_URL,
              alt: "Administrator reviewing computer systems and backup data",
              source: "Provided placeholder image URL",
              caption:
                "Identifying assets and protection requirements is an important starting point for risk management."
            },
            {
              type: "heading",
              level: 3,
              text: "What Should Be Identified?"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Assets: databases, applications, devices, records, and services.",
                "Threats: malware, human error, unauthorized access, and equipment failure.",
                "Vulnerabilities: weak configurations, missing updates, and inadequate procedures.",
                "Existing controls: safeguards already in place.",
                "Consequences: possible financial, operational, legal, or reputational harm."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Example: Student Information System"
            },
            {
              type: "paragraph",
              text:
                "A school identifies its student database as a critical asset. An outdated database server is a vulnerability, while an attacker attempting to exploit it is a threat scenario. The resulting risk could involve unauthorized disclosure or modification of student records."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Practical technique",
              text:
                "Use asset inventories, interviews, system documentation, incident records, and vulnerability reports to discover risks. Record each risk clearly enough that it can be analyzed and assigned for treatment."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.2
    // ==========================================
    {
      id: "ias-m03-l02",
      lessonNo: "3.2",
      title: "Risk Analysis",
      description:
        "Estimates the likelihood and consequences of security incidents.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Risk Analysis",
          definition:
            "The process of examining a risk scenario to understand its likelihood, consequences, and contributing conditions."
        },
        {
          word: "Likelihood",
          definition:
            "An estimate of how probable or plausible a specified event or outcome is within a defined context."
        },
        {
          word: "Impact",
          definition:
            "The magnitude of harm or consequences that could result if a risk scenario occurs."
        },
        {
          word: "Risk Scenario",
          definition:
            "A description of a potential event, its causes, the affected assets, and its possible consequences."
        }
      ],

      video: [
        {
          title: "Risk Analysis (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Estimating Likelihood and Impact",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Risk analysis examines how a harmful event could occur and what its consequences might be. Organizations consider factors such as threat capability, exposure, existing safeguards, incident history, and the value of affected assets."
            },
            {
              type: "heading",
              level: 3,
              text: "Steps in Risk Analysis"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define the risk scenario and affected assets.",
                "Identify relevant threats and vulnerabilities.",
                "Review existing controls and their effectiveness.",
                "Estimate the likelihood of the scenario occurring.",
                "Estimate the operational, financial, legal, and other impacts.",
                "Document assumptions, evidence, and uncertainty."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Example"
            },
            {
              type: "paragraph",
              text:
                "An organization evaluates the possibility of a server outage. Its analysis considers previous outages, server age, redundancy, recovery procedures, and the cost of interrupted operations. These factors inform its assessment of likelihood and impact."
            },
            {
              type: "callout",
              variant: "important",
              title: "Key distinction",
              text:
                "Likelihood and impact are different dimensions. An event can be unlikely but extremely damaging, or frequent but relatively easy to recover from."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.3
    // ==========================================
    {
      id: "ias-m03-l03",
      lessonNo: "3.3",
      title: "Qualitative Risk Assessment",
      description:
        "Uses descriptive ratings, such as low, medium, and high, to evaluate risks.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Qualitative Assessment",
          definition:
            "An assessment that uses descriptive categories or informed judgments to characterize risk."
        },
        {
          word: "Risk Matrix",
          definition:
            "A tool that combines likelihood and impact categories to support risk rating and prioritization."
        },
        {
          word: "Risk Rating",
          definition:
            "A category or score assigned to a risk based on defined assessment criteria."
        },
        {
          word: "Risk Criteria",
          definition:
            "The standards an organization uses to determine the significance and acceptability of risks."
        }
      ],

      video: [
        {
          title: "Qualitative Risk Assessment (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Using Descriptive Risk Ratings",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Qualitative risk assessment classifies risks using descriptive scales rather than requiring precise numerical probabilities or financial estimates. It is useful when detailed statistical data is unavailable or when an organization needs an accessible initial assessment."
            },
            {
              type: "table",
              headers: ["Likelihood / Impact", "Low Impact", "Medium Impact", "High Impact"],
              rows: [
                ["High likelihood", "Medium", "High", "High"],
                ["Medium likelihood", "Low", "Medium", "High"],
                ["Low likelihood", "Low", "Low", "Medium"]
              ],
              caption:
                "Illustrative risk matrix. Actual ratings depend on the organization's approved criteria."
            },
            {
              type: "heading",
              level: 3,
              text: "Assessment Process"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define consistent likelihood and impact categories.",
                "Gather evidence and consult relevant stakeholders.",
                "Assign ratings using the established criteria.",
                "Document the reasons for each rating.",
                "Compare risks and identify those requiring attention."
              ]
            },
            {
              type: "callout",
              variant: "warning",
              title: "Avoid false precision",
              text:
                "Qualitative labels can mean different things to different teams. Define each category clearly and apply the same criteria consistently."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.4
    // ==========================================
    {
      id: "ias-m03-l04",
      lessonNo: "3.4",
      title: "Quantitative Risk Assessment",
      description:
        "Uses numerical estimates to express risk exposure and potential financial impact.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Quantitative Assessment",
          definition:
            "An assessment that uses numerical data or estimates to characterize risk, such as probabilities, losses, and financial exposure."
        },
        {
          word: "Single Loss Expectancy (SLE)",
          definition:
            "The estimated loss from one occurrence of a specified adverse event."
        },
        {
          word: "Annual Rate of Occurrence (ARO)",
          definition:
            "An estimate of how many times a specified event occurs per year, expressed as an expected rate."
        },
        {
          word: "Annualized Loss Expectancy (ALE)",
          definition:
            "An estimate of expected annual loss, traditionally calculated as single loss expectancy multiplied by annual rate of occurrence."
        }
      ],

      video: [
        {
          title: "Quantitative Risk Assessment (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Expressing Risk Numerically",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Quantitative risk assessment uses numerical estimates to help compare potential losses and evaluate the financial implications of security decisions. Estimates may use incident records, business data, expert judgment, or statistical models."
            },
            {
              type: "heading",
              level: 3,
              text: "Traditional Annual Loss Calculation"
            },
            {
              type: "paragraph",
              text:
                "A traditional quantitative method estimates the loss from one incident and multiplies it by the expected number of occurrences per year."
            },
            {
              type: "code",
              language: "text",
              code:
                "SLE = Asset Value × Exposure Factor\nALE = SLE × Annual Rate of Occurrence",
              caption:
                "Illustrative traditional risk formulas. Values are estimates, not guarantees."
            },
            {
              type: "heading",
              level: 3,
              text: "Worked Example"
            },
            {
              type: "paragraph",
              text:
                "Suppose an incident could cause an estimated loss of ₱100,000 and is expected to occur 0.2 times per year. The estimated annual loss is ₱100,000 × 0.2 = ₱20,000."
            },
            {
              type: "table",
              headers: ["Measure", "Example Value"],
              rows: [
                ["Single loss expectancy", "₱100,000"],
                ["Annual rate of occurrence", "0.2"],
                ["Annualized loss expectancy", "₱20,000"]
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Interpret results carefully",
              text:
                "An expected annual loss is a planning estimate, not a prediction that the organization will lose exactly that amount each year. Results depend on the quality of the assumptions and data."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.5
    // ==========================================
    {
      id: "ias-m03-l05",
      lessonNo: "3.5",
      title: "Risk Evaluation and Prioritization",
      description:
        "Ranks risks according to severity, likelihood, impact, and organizational priorities.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Risk Evaluation",
          definition:
            "The process of comparing analyzed risks against established risk criteria to determine their significance and whether further action is needed."
        },
        {
          word: "Risk Prioritization",
          definition:
            "Ordering risks according to their urgency, severity, potential consequences, and organizational needs."
        },
        {
          word: "Risk Appetite",
          definition:
            "The amount and type of risk an organization is willing to pursue or retain in achieving its objectives."
        },
        {
          word: "Risk Tolerance",
          definition:
            "The acceptable variation in risk exposure or outcomes around organizational objectives."
        }
      ],

      video: [
        {
          title: "Risk Evaluation and Prioritization (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Deciding Which Risks Need Attention First",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "After analyzing risks, an organization compares the results against its risk criteria, legal obligations, business objectives, and available resources. Prioritization helps direct attention toward the risks that matter most."
            },
            {
              type: "heading",
              level: 3,
              text: "Factors That Influence Priority"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Likelihood of the risk scenario occurring.",
                "Severity of the potential consequences.",
                "Criticality of the affected asset or business service.",
                "Legal, regulatory, and contractual obligations.",
                "Effectiveness of existing controls.",
                "Time required to reduce exposure and available resources."
              ]
            },
            {
              type: "table",
              headers: ["Risk Scenario", "Illustrative Rating", "Possible Priority"],
              rows: [
                [
                  "Public exposure of sensitive records",
                  "High",
                  "Urgent remediation"
                ],
                [
                  "Outdated software on an isolated test device",
                  "Low",
                  "Schedule remediation"
                ],
                [
                  "Failure of a critical service without tested recovery",
                  "High",
                  "Urgent continuity planning"
                ]
              ],
              caption:
                "Illustrative priorities. Actual decisions depend on context and approved criteria."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Prioritization principle",
              text:
                "Do not rank risks by technical severity alone. Consider business context, exposure, existing safeguards, and the consequences of leaving the risk untreated."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.6
    // ==========================================
    {
      id: "ias-m03-l06",
      lessonNo: "3.6",
      title: "Risk Treatment",
      description:
        "Explores risk avoidance, mitigation, transfer, and acceptance.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Risk Treatment",
          definition:
            "The process of selecting and implementing options for modifying risk."
        },
        {
          word: "Risk Avoidance",
          definition:
            "Changing or discontinuing an activity so that a particular risk is no longer taken."
        },
        {
          word: "Risk Mitigation",
          definition:
            "Taking measures to reduce the likelihood or consequences of a risk."
        },
        {
          word: "Risk Transfer",
          definition:
            "Sharing or shifting some financial or other consequences of risk to another party, such as through insurance or contractual arrangements."
        },
        {
          word: "Risk Acceptance",
          definition:
            "An informed decision to retain a risk under defined conditions and within appropriate authority."
        }
      ],

      video: [
        {
          title: "Risk Treatment Strategies (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Choosing a Risk Response",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Risk treatment determines what an organization will do about an identified risk. The choice depends on risk severity, legal obligations, cost, available controls, business objectives, and the organization's authority to accept exposure."
            },
            {
              type: "table",
              headers: ["Strategy", "Approach", "Example"],
              rows: [
                [
                  "Avoidance",
                  "Stop or change the risky activity.",
                  "Discontinue an unsupported application."
                ],
                [
                  "Mitigation",
                  "Reduce likelihood or impact.",
                  "Patch a vulnerable server and restrict access."
                ],
                [
                  "Transfer or sharing",
                  "Allocate some consequences to another party.",
                  "Purchase suitable cyber insurance."
                ],
                [
                  "Acceptance",
                  "Retain the risk through an informed decision.",
                  "Accept a minor risk with documented approval."
                ]
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Documenting Treatment"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Select the treatment option or combination of options.",
                "Identify the required controls and responsible owners.",
                "Estimate implementation costs and expected benefits.",
                "Set deadlines and success criteria.",
                "Record approvals and any remaining exposure.",
                "Monitor implementation and reassess the risk."
              ]
            },
            {
              type: "callout",
              variant: "warning",
              title: "Important",
              text:
                "Risk transfer does not eliminate every consequence of an incident. Insurance and contracts may have exclusions, limits, and conditions, while legal and operational responsibilities may remain with the organization."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.7
    // ==========================================
    {
      id: "ias-m03-l07",
      lessonNo: "3.7",
      title: "Vulnerability Assessment",
      description:
        "Identifies, evaluates, and prioritizes weaknesses in systems and configurations.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Vulnerability Assessment",
          definition:
            "A systematic process for identifying, analyzing, and prioritizing security weaknesses in systems, applications, and configurations."
        },
        {
          word: "Vulnerability Scanner",
          definition:
            "A tool that checks systems or applications for known weaknesses and configuration problems."
        },
        {
          word: "Misconfiguration",
          definition:
            "A system or service setting that is incorrect or insecure for its intended use."
        },
        {
          word: "Remediation",
          definition:
            "An action taken to correct a vulnerability or otherwise resolve a security weakness."
        }
      ],

      video: [
        {
          title: "Vulnerability Assessment (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Finding and Prioritizing Weaknesses",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Vulnerability assessment helps organizations discover weaknesses before they lead to incidents. Assessments may combine automated scanning, configuration reviews, dependency checks, and manual verification."
            },
            {
              type: "heading",
              level: 3,
              text: "Assessment Workflow"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define the authorized assessment scope.",
                "Inventory the systems, applications, and assets to examine.",
                "Scan for known vulnerabilities and insecure configurations.",
                "Validate important findings and investigate false positives.",
                "Prioritize findings according to severity and actual exposure.",
                "Remediate, verify fixes, and document accepted exceptions."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Severity Is Not the Only Factor"
            },
            {
              type: "paragraph",
              text:
                "A vulnerability's priority depends on more than its technical severity. Whether it is exposed to the internet, whether exploitation is known, the value of the affected asset, and the effectiveness of existing controls also matter."
            },
            {
              type: "callout",
              variant: "important",
              title: "Authorized testing only",
              text:
                "Assess systems only with appropriate authorization and within an agreed scope. Scanning can disrupt services or expose sensitive information if performed carelessly."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.8
    // ==========================================
    {
      id: "ias-m03-l08",
      lessonNo: "3.8",
      title: "Threat Modeling",
      description:
        "Analyzes how attackers might compromise a system and identifies appropriate defenses.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Threat Modeling",
          definition:
            "A structured process for identifying potential threats, attack paths, and security requirements for a system."
        },
        {
          word: "Attack Surface",
          definition:
            "The set of points through which a system could be accessed, influenced, or attacked."
        },
        {
          word: "Trust Boundary",
          definition:
            "A boundary across which data or operations move between components with different trust levels."
        },
        {
          word: "Attack Tree",
          definition:
            "A diagram that organizes possible ways an attacker could achieve a particular objective."
        }
      ],

      video: [
        {
          title: "Threat Modeling (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Thinking Through Potential Attacks",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Threat modeling examines how a system could be attacked and which defenses would best reduce the resulting risks. It is most effective when considered during system design and repeated as architecture, dependencies, and threats change."
            },
            {
              type: "heading",
              level: 3,
              text: "A Basic Threat Modeling Process"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Define the system, scope, and security objectives.",
                "Map components, data flows, entry points, and trust boundaries.",
                "Identify valuable assets and potential threat actors.",
                "Consider plausible attack scenarios and weaknesses.",
                "Select safeguards to prevent, detect, or limit attacks.",
                "Review the model as the system evolves."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Example: Online Shopping Application"
            },
            {
              type: "paragraph",
              text:
                "A threat model for an online store examines customer accounts, product records, payment integrations, and administrative functions. Potential threats include account takeover, unauthorized price changes, and exposure of customer information. Appropriate defenses include strong authentication, server-side authorization, input handling, and monitoring."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Design for security",
              text:
                "Threat modeling helps identify security requirements before weaknesses become expensive to correct. It complements, rather than replaces, testing and ongoing monitoring."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.9
    // ==========================================
    {
      id: "ias-m03-l09",
      lessonNo: "3.9",
      title: "Business Impact Analysis",
      description:
        "Evaluates how disruptions affect critical business functions and resources.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Business Impact Analysis",
          definition:
            "A process for determining the effects of disruptions on business functions and identifying recovery requirements."
        },
        {
          word: "Recovery Time Objective (RTO)",
          definition:
            "The target time within which a disrupted service or activity should be restored."
        },
        {
          word: "Recovery Point Objective (RPO)",
          definition:
            "The point in time to which data must be recovered after a disruption, expressed as the maximum targeted period of data loss."
        },
        {
          word: "Critical Business Function",
          definition:
            "An activity that must be maintained or restored within an acceptable period to meet essential organizational needs."
        }
      ],

      video: [
        {
          title: "Business Impact Analysis (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Understanding the Consequences of Disruption",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Business impact analysis, or BIA, identifies critical activities and evaluates what happens when they are disrupted. It helps organizations establish recovery priorities, resource requirements, and acceptable restoration targets."
            },
            {
              type: "heading",
              level: 3,
              text: "Key BIA Activities"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify critical business functions and services.",
                "Determine which systems, people, data, and suppliers they depend on.",
                "Assess operational, financial, legal, and reputational impacts over time.",
                "Establish recovery time and recovery point objectives.",
                "Identify resource requirements and recovery priorities.",
                "Use the results to inform continuity and disaster recovery plans."
              ]
            },
            {
              type: "table",
              headers: ["Measure", "Example Target", "Meaning"],
              rows: [
                [
                  "RTO",
                  "4 hours",
                  "Target to restore the affected service within four hours."
                ],
                [
                  "RPO",
                  "1 hour",
                  "Target to recover data to a point no more than one hour before the disruption."
                ]
              ],
              caption:
                "Illustrative recovery objectives. Actual targets must be based on business needs."
            },
            {
              type: "callout",
              variant: "important",
              title: "Do not confuse the two",
              text:
                "RTO concerns the target time for service restoration. RPO concerns the acceptable period of data loss measured backward from the disruption."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.10
    // ==========================================
    {
      id: "ias-m03-l10",
      lessonNo: "3.10",
      title: "Residual Risk",
      description:
        "Explains the risk remaining after security controls are applied.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Inherent Risk",
          definition:
            "The level of risk considered before accounting for the effects of the relevant controls."
        },
        {
          word: "Residual Risk",
          definition:
            "The risk that remains after the effects of implemented controls and other treatment measures are considered."
        },
        {
          word: "Control Effectiveness",
          definition:
            "The degree to which a safeguard operates as intended and achieves its security objectives."
        },
        {
          word: "Risk Acceptance",
          definition:
            "An authorized decision to retain a risk after considering its significance and the available treatment options."
        }
      ],

      video: [
        {
          title: "Residual Risk (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Understanding Remaining Exposure",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security controls reduce risk but rarely eliminate it entirely. Residual risk is the exposure that remains after controls and other treatment measures have been taken into account. Organizations need to understand this remaining exposure before deciding whether it is acceptable."
            },
            {
              type: "heading",
              level: 3,
              text: "Example"
            },
            {
              type: "paragraph",
              text:
                "A company introduces multifactor authentication, access restrictions, and account monitoring to reduce account takeover risk. These controls make unauthorized access more difficult, but phishing, compromised devices, and implementation weaknesses may still create residual risk."
            },
            {
              type: "heading",
              level: 3,
              text: "Managing Residual Risk"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Assess the effectiveness of implemented controls.",
                "Reevaluate likelihood and impact after treatment.",
                "Compare the remaining exposure with approved risk criteria.",
                "Apply additional controls when necessary and feasible.",
                "Document remaining risks, owners, and treatment decisions.",
                "Obtain acceptance from the appropriate authority when required."
              ]
            },
            {
              type: "callout",
              variant: "warning",
              title: "Acceptance is not automatic",
              text:
                "A risk should not be considered acceptable simply because controls have been implemented. Remaining exposure must be evaluated against organizational criteria, legal obligations, and approval requirements."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.11
    // ==========================================
    {
      id: "ias-m03-l11",
      lessonNo: "3.11",
      title: "Risk Monitoring",
      description:
        "Tracks changing threats, vulnerabilities, control effectiveness, and risk levels.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Risk Monitoring",
          definition:
            "The ongoing observation and review of risks, controls, and changing conditions that could affect risk exposure."
        },
        {
          word: "Risk Indicator",
          definition:
            "A measure or observable condition used to help identify changes in risk."
        },
        {
          word: "Key Risk Indicator (KRI)",
          definition:
            "A metric used to signal increasing or changing exposure to a particular risk."
        },
        {
          word: "Continuous Monitoring",
          definition:
            "An ongoing process of collecting and evaluating information about security posture, controls, and risks at an appropriate frequency."
        }
      ],

      video: [
        {
          title: "Risk Monitoring (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Keeping Risk Information Current",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Risk assessments can become outdated as systems, threats, business operations, and suppliers change. Risk monitoring helps organizations detect new exposure, verify control performance, and decide when reassessment is necessary."
            },
            {
              type: "heading",
              level: 3,
              text: "What Should Be Monitored?"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "New vulnerabilities and relevant threat intelligence.",
                "Security incidents, suspicious activity, and near misses.",
                "Control failures and overdue remediation actions.",
                "Changes to systems, configurations, and dependencies.",
                "Third-party security incidents and service changes.",
                "Changes in legal requirements and business priorities."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Example Risk Indicators"
            },
            {
              type: "table",
              headers: ["Indicator", "What It May Signal"],
              rows: [
                [
                  "Increasing unresolved critical vulnerabilities",
                  "Growing exposure to known weaknesses"
                ],
                [
                  "Repeated failed login attempts",
                  "Possible credential attacks or misconfiguration"
                ],
                [
                  "Frequent service interruptions",
                  "Availability or resilience problems"
                ],
                [
                  "Overdue access reviews",
                  "Potentially excessive or outdated permissions"
                ]
              ]
            },
            {
              type: "callout",
              variant: "tip",
              title: "Close the loop",
              text:
                "Monitoring should lead to action. Assign responsibility for reviewing indicators, investigating significant changes, updating risk records, and escalating issues when thresholds are exceeded."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 3.12
    // ==========================================
    {
      id: "ias-m03-l12",
      lessonNo: "3.12",
      title: "Third-Party Risk Management",
      description:
        "Assesses security risks associated with vendors, contractors, and service providers.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Third-Party Risk",
          definition:
            "The risk an organization faces through its relationships with external vendors, contractors, suppliers, and service providers."
        },
        {
          word: "Vendor Assessment",
          definition:
            "The evaluation of a supplier's security practices, capabilities, and risks before or during a business relationship."
        },
        {
          word: "Due Diligence",
          definition:
            "Reasonable investigation and evaluation performed before making or continuing a business decision."
        },
        {
          word: "Shared Responsibility",
          definition:
            "The allocation of security duties between parties that provide, operate, or use a service."
        },
        {
          word: "Supply-Chain Risk",
          definition:
            "Risk arising from dependencies on suppliers, products, services, and associated delivery processes."
        }
      ],

      video: [
        {
          title: "Third-Party Risk Management (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Managing Risks from External Providers",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Organizations often rely on external providers for cloud hosting, payment processing, software development, data storage, and other essential services. A provider's security weakness or service failure can affect the organization that depends on it."
            },
            {
              type: "heading",
              level: 3,
              text: "Third-Party Risk Management Lifecycle"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Inventory suppliers and the services they provide.",
                "Classify providers according to data access, criticality, and exposure.",
                "Assess security controls, relevant certifications, and incident history.",
                "Define security requirements and responsibilities in contracts.",
                "Monitor provider performance and material changes.",
                "Plan for incidents, service interruptions, and contract termination."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Example: Cloud Service Provider"
            },
            {
              type: "paragraph",
              text:
                "A company stores customer records with a cloud provider. Before adoption, it evaluates access controls, encryption, incident notification procedures, data location, backup capabilities, and service continuity. During the relationship, it reviews significant changes and confirms that contractual security requirements remain appropriate."
            },
            {
              type: "heading",
              level: 3,
              text: "Important Considerations"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Limit provider access to what is necessary.",
                "Clarify responsibility for incident reporting and response.",
                "Understand subcontractor and dependency risks.",
                "Verify backup, recovery, and data-return arrangements.",
                "Reassess providers when services or risk conditions change."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Key takeaway",
              text:
                "Using an external provider does not automatically remove the organization's responsibility for managing its information security risks. Responsibilities should be clearly defined and monitored throughout the relationship."
            }
          ]
        }
      ]
    }
  ],

  references: [
    {
      title: "Guide for Conducting Risk Assessments (NIST SP 800-30 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2012,
      accessedAt: "2026-10-23"
    },
    {
      title: "Risk Management Framework for Information Systems and Organizations (NIST SP 800-37 Rev. 2)",
      url: "https://csrc.nist.gov/pubs/sp/800/37/r2/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2018,
      accessedAt: "2026-10-23"
    },
    {
      title: "Guide for Applying the Risk Management Framework to Federal Information Systems (NIST SP 800-39)",
      url: "https://csrc.nist.gov/pubs/sp/800/39/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2011,
      accessedAt: "2026-10-23"
    },
    {
      title: "Contingency Planning Guide for Federal Information Systems (NIST SP 800-34 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2010,
      accessedAt: "2026-10-23"
    },
    {
      title: "Developing Cyber-Resilient Systems: A Systems Security Engineering Approach (NIST SP 800-160 Vol. 2 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2021,
      accessedAt: "2026-10-23"
    },
    {
      title: "Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations (NIST SP 800-161 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2024,
      accessedAt: "2026-10-23"
    },
    {
      title: "Cybersecurity Framework 2.0",
      url: "https://www.nist.gov/cyberframework",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2024,
      accessedAt: "2026-10-23"
    },
    {
      title: "Cybersecurity and Infrastructure Security Agency",
      url: "https://www.cisa.gov/",
      organization: "Cybersecurity and Infrastructure Security Agency",
      accessedAt: "2026-10-23"
    }
  ],

  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z"
};

export default iasModule03;
