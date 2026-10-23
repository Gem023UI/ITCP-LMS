import type { IASModule } from "../../types/modules";

const iasModule01: IASModule = {
  unitId: "ias-module-01",
  moduleId: "01",
  moduleNo: 1,
  title: "Introduction to Information Assurance and Security",
  description:
    "Introduces information assurance, information security, cybersecurity, and the principles used to protect information assets.",

  objectives: [
    "Define information security, information assurance, and cybersecurity.",
    "Identify common information assets, threats, and security controls.",
    "Explain the CIA triad and the principles of authenticity, accountability, and non-repudiation.",
    "Describe privacy protection and responsible data handling.",
    "Evaluate basic security objectives and their trade-offs."
  ],

  lessons: [
    // ==========================================
    // LESSON 1.1
    // ==========================================
    {
      id: "ias-m01-l01",
      lessonNo: "1.1",
      title: "Information Security Fundamentals",
      description:
        "Defines information security, cybersecurity, information assets, and basic methods for protecting systems and information.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Information Security",
          definition:
            "The protection of information and information systems against unauthorized access, use, disclosure, modification, disruption, or destruction.",
          source: "NIST SP 800-12 Rev. 1"
        },
        {
          word: "Cybersecurity",
          definition:
            "The protection and restoration of computers, networks, electronic communications, and the information they contain against cyber threats.",
          source: "NIST CSRC Glossary"
        },
        {
          word: "Information Asset",
          definition:
            "Information or a resource that has value to an individual or organization and requires appropriate protection."
        },
        {
          word: "Security Control",
          definition:
            "A safeguard or countermeasure used to manage risks and protect information systems."
        }
      ],

      video: [
        {
          title: "Introduction to Information Security (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Understanding Information Security",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Information security protects information throughout its lifecycle, whether it is stored digitally, transmitted through a network, or recorded on paper. Its purpose is to reduce the likelihood and impact of unauthorized access, misuse, alteration, loss, or disruption."
            },
            {
              type: "image",
              url: "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
              alt: "System administrator reviewing computer systems and backup data",
              source: "Provided placeholder image URL",
              caption:
                "Information security involves protecting systems, data, and supporting resources."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Information Assets"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Personal information and customer records",
                "Databases, documents, and business transactions",
                "Computers, servers, and network equipment",
                "Applications, credentials, and encryption keys",
                "Backups and recovery resources"
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Basic Protection Methods"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Authentication: verify who or what is requesting access.",
                "Access control: restrict access according to permissions.",
                "Encryption: protect information from unauthorized reading.",
                "Backups: maintain recoverable copies of important data.",
                "Updates: correct known vulnerabilities in software."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Key takeaway",
              text:
                "Security is not limited to preventing hackers. It also addresses human error, equipment failure, accidental disclosure, and other causes of information loss."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.2
    // ==========================================
    {
      id: "ias-m01-l02",
      lessonNo: "1.2",
      title: "Information Assurance Principles",
      description:
        "Explains how security controls, validation, risk management, and recovery help maintain trustworthy information and systems.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Information Assurance",
          definition:
            "The degree of confidence that information and systems are adequately protected and can be relied upon to meet security requirements.",
          source: "NIST SP 800-12 Rev. 1"
        },
        {
          word: "Risk Management",
          definition:
            "The process of identifying, assessing, responding to, and monitoring risks."
        },
        {
          word: "Validation",
          definition:
            "Checking whether a system, process, or result satisfies specified requirements and intended needs."
        },
        {
          word: "Recovery",
          definition:
            "Restoring data, services, or system operations after an interruption or incident."
        }
      ],

      video: [
        {
          title: "Information Assurance Principles (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Building Confidence in Information Systems",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Information assurance focuses on whether information and systems can be trusted to perform as expected. It combines protection, assessment, monitoring, and recovery rather than relying on a single security mechanism."
            },
            {
              type: "heading",
              level: 3,
              text: "Core Assurance Activities"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify important assets and their potential threats.",
                "Assess the likelihood and impact of possible incidents.",
                "Select and implement suitable security controls.",
                "Test controls and validate that they work as intended.",
                "Monitor changes and respond to detected incidents.",
                "Recover operations and improve controls using lessons learned."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Example: Student Records System"
            },
            {
              type: "paragraph",
              text:
                "A school restricts access to student records, validates grade entries, reviews access logs, and maintains tested backups. Together, these measures reduce risk and provide greater confidence in the accuracy, protection, and recoverability of records."
            },
            {
              type: "callout",
              variant: "info",
              title: "Remember",
              text:
                "Assurance provides justified confidence, not an absolute guarantee that a system can never fail or be compromised."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.3
    // ==========================================
    {
      id: "ias-m01-l03",
      lessonNo: "1.3",
      title: "Confidentiality, Integrity, and Availability",
      description:
        "Introduces the CIA triad and its role in preventing unauthorized disclosure, modification, and disruption.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Confidentiality",
          definition:
            "The property that information is not disclosed or made available to unauthorized individuals, entities, or processes.",
          source: "NIST SP 800-12 Rev. 1"
        },
        {
          word: "Integrity",
          definition:
            "The protection of information against improper or unauthorized modification or destruction.",
          source: "NIST SP 800-12 Rev. 1"
        },
        {
          word: "Availability",
          definition:
            "The property that information and services remain accessible and usable when required by authorized users.",
          source: "NIST SP 800-12 Rev. 1"
        }
      ],

      video: [
        {
          title: "The CIA Triad (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "The CIA Triad",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "The CIA triad is a foundational information security model consisting of confidentiality, integrity, and availability. Security policies and controls should address all three objectives according to the system's risks and requirements."
            },
            {
              type: "table",
              headers: ["Principle", "Objective", "Example Control"],
              rows: [
                [
                  "Confidentiality",
                  "Prevent unauthorized disclosure.",
                  "Access permissions and encryption."
                ],
                [
                  "Integrity",
                  "Prevent or detect unauthorized changes.",
                  "Validation, hashes, and audit trails."
                ],
                [
                  "Availability",
                  "Maintain timely access to services and data.",
                  "Backups, redundancy, and recovery plans."
                ]
              ],
              caption: "The three objectives of the CIA triad."
            },
            {
              type: "heading",
              level: 3,
              text: "Applying the CIA Triad"
            },
            {
              type: "paragraph",
              text:
                "For an online enrollment system, confidentiality protects student records from unauthorized viewers, integrity helps ensure enrollment details are not improperly altered, and availability helps students and staff access the system when needed."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Quick distinction",
              text:
                "Disclosure is a confidentiality concern, unauthorized alteration is an integrity concern, and service interruption is an availability concern."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.4
    // ==========================================
    {
      id: "ias-m01-l04",
      lessonNo: "1.4",
      title: "Authenticity",
      description:
        "Explains how to verify that information, users, devices, and communications are genuine.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Authenticity",
          definition:
            "The property of being genuine and capable of being verified as valid.",
          source: "NIST CSRC Glossary"
        },
        {
          word: "Authentication",
          definition:
            "The process of verifying an identity or other claimed attributes of a user, device, or entity.",
          source: "NIST CSRC Glossary"
        },
        {
          word: "Digital Signature",
          definition:
            "A cryptographic mechanism used to verify the origin and integrity of signed digital information and to support evidence of signing."
        },
        {
          word: "Spoofing",
          definition:
            "An attack in which an entity or communication is made to appear to come from a different, trusted source."
        }
      ],

      video: [
        {
          title: "Authenticity and Authentication (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Verifying Genuine Identities and Information",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Authenticity helps establish whether a user, device, message, or document is what it claims to be. Authentication is one important process used to establish authenticity, but authenticity can also involve verifying the source and integrity of information."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Verification Methods"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Passwords and passkeys for account authentication.",
                "Multifactor authentication using independent authentication factors.",
                "Digital certificates for verifying identities in supported systems.",
                "Digital signatures for verifying signed content and detecting changes.",
                "Trusted verification procedures for documents and transactions."
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
                "An employee receives an email that appears to come from the IT department. Before following a password-reset link, the employee verifies the request through an established, trusted channel to reduce the risk of phishing or impersonation."
            },
            {
              type: "callout",
              variant: "warning",
              title: "Important",
              text:
                "A familiar name, logo, or email display name does not prove that a message is genuine."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.5
    // ==========================================
    {
      id: "ias-m01-l05",
      lessonNo: "1.5",
      title: "Accountability",
      description:
        "Describes how actions are recorded and attributed to responsible users, devices, or systems.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Accountability",
          definition:
            "The property that actions can be traced to the entity responsible for performing them.",
          source: "NIST SP 800-12 Rev. 1"
        },
        {
          word: "Audit Log",
          definition:
            "A record of system or user activities maintained for review, monitoring, or investigation."
        },
        {
          word: "Audit Trail",
          definition:
            "A chronological record that helps reconstruct and examine activities or events."
        },
        {
          word: "Least Privilege",
          definition:
            "The principle of granting only the minimum access and permissions needed to perform an assigned task."
        }
      ],

      video: [
        {
          title: "Accountability and Audit Logs (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Tracing Actions to Responsible Entities",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Accountability enables an organization to investigate who performed an action, what happened, and when it occurred. It depends on appropriate identification, reliable records, controlled access, and procedures for reviewing security events."
            },
            {
              type: "heading",
              level: 3,
              text: "Supporting Accountability"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Assign individual accounts instead of sharing credentials.",
                "Record relevant login attempts and administrative actions.",
                "Synchronize system clocks to support event correlation.",
                "Restrict access to logs and protect them against tampering.",
                "Review records for suspicious or policy-violating activity."
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
                "If a student record is changed unexpectedly, authorized administrators can examine audit logs to identify the account used, the time of the change, and the affected record."
            },
            {
              type: "callout",
              variant: "info",
              title: "Interpret evidence carefully",
              text:
                "A log associates an event with an account or system identity. Additional evidence may be needed to establish which person actually performed the action, especially if credentials were compromised."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.6
    // ==========================================
    {
      id: "ias-m01-l06",
      lessonNo: "1.6",
      title: "Non-repudiation",
      description:
        "Explains how evidence can establish that an action or transaction occurred and help prevent its denial.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Non-repudiation",
          definition:
            "A security property that provides evidence supporting the origin or occurrence of an action so that it is difficult to deny later.",
          source: "NIST SP 800-12 Rev. 1"
        },
        {
          word: "Digital Signature",
          definition:
            "A cryptographic signature that supports verification of the signed data and the signer's associated key."
        },
        {
          word: "Timestamp",
          definition:
            "A recorded indication of date and time associated with an event or item of information."
        },
        {
          word: "Evidence",
          definition:
            "Information or records used to support a conclusion about an event, action, or transaction."
        }
      ],

      video: [
        {
          title: "Non-repudiation Fundamentals (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Establishing Evidence of Actions",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Non-repudiation concerns evidence that can help demonstrate the origin, submission, approval, or receipt of information. It is especially relevant to digital transactions, signed documents, and formal communications."
            },
            {
              type: "heading",
              level: 3,
              text: "Mechanisms That Support Non-repudiation"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Digital signatures backed by appropriate key management.",
                "Reliable transaction records and audit trails.",
                "Trusted timestamps and supporting transaction evidence.",
                "Procedures for protecting records and verifying signatures."
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
                "A company uses digital signatures for an electronic agreement. The signature can help verify that the document has not changed since signing and that it was signed using the corresponding private key."
            },
            {
              type: "callout",
              variant: "warning",
              title: "Limitations",
              text:
                "A digital signature alone does not conclusively prove who physically used a key, whether the signer understood the agreement, or whether every legal requirement was met. Key protection and supporting evidence matter."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.7
    // ==========================================
    {
      id: "ias-m01-l07",
      lessonNo: "1.7",
      title: "Privacy",
      description:
        "Introduces the protection of personal information, appropriate data collection, and responsible data handling.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Privacy",
          definition:
            "The protection of individuals' interests concerning how information about them is collected, used, shared, retained, and managed.",
          source: "NIST Privacy Framework"
        },
        {
          word: "Personal Information",
          definition:
            "Information that identifies an individual or can reasonably be linked to an identifiable individual."
        },
        {
          word: "Data Minimization",
          definition:
            "Collecting and retaining only the personal information necessary for a defined purpose."
        },
        {
          word: "Consent",
          definition:
            "An individual's agreement to a specified activity, where consent is an appropriate and applicable basis for that activity."
        }
      ],

      video: [
        {
          title: "Privacy and Responsible Data Handling (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Protecting Personal Information",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Privacy concerns how information about people is handled and how that handling affects their rights and interests. A system can protect data against hackers and still create privacy risks if it collects unnecessary information or uses data in unexpected ways."
            },
            {
              type: "heading",
              level: 3,
              text: "Responsible Data Handling"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Define a legitimate and specific purpose for collection.",
                "Collect only information that is necessary for that purpose.",
                "Explain relevant collection, use, sharing, and retention practices.",
                "Restrict access to authorized individuals.",
                "Apply appropriate safeguards and retention or deletion rules.",
                "Respect applicable rights and legal requirements."
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
                "A school enrollment portal needs a student's identity and enrollment details. Collecting unrelated personal details without a valid need increases privacy risk and should be avoided."
            },
            {
              type: "callout",
              variant: "important",
              title: "Security and privacy are related",
              text:
                "Security helps protect information from unauthorized access or alteration. Privacy additionally addresses whether personal information is collected, used, shared, and retained appropriately."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 1.8
    // ==========================================
    {
      id: "ias-m01-l08",
      lessonNo: "1.8",
      title: "Security Objectives and Trade-offs",
      description:
        "Explores how organizations balance security, usability, cost, performance, and operational needs.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Security Objective",
          definition:
            "A desired security outcome that guides the selection and evaluation of protective measures."
        },
        {
          word: "Risk",
          definition:
            "The potential for an unwanted outcome, commonly assessed through its likelihood and impact."
        },
        {
          word: "Usability",
          definition:
            "The degree to which intended users can use a system effectively and efficiently to achieve their goals."
        },
        {
          word: "Security Trade-off",
          definition:
            "A compromise between competing requirements, such as stronger protection, user convenience, cost, and system performance."
        }
      ],

      video: [
        {
          title: "Security Objectives and Trade-offs (Placeholder)",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm",
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Balancing Security and Operational Needs",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Organizations rarely have unlimited budgets, time, or computing resources. Security decisions therefore require evaluating risks and choosing safeguards that provide appropriate protection without unnecessarily preventing legitimate work."
            },
            {
              type: "table",
              headers: ["Consideration", "Potential Benefit", "Possible Trade-off"],
              rows: [
                [
                  "Stronger authentication",
                  "Reduces account compromise risk.",
                  "May add login steps."
                ],
                [
                  "Encryption",
                  "Helps protect sensitive information.",
                  "Requires key management and computing resources."
                ],
                [
                  "Frequent backups",
                  "Improves recovery options.",
                  "Consumes storage and operational resources."
                ],
                [
                  "Strict access controls",
                  "Reduces unauthorized access.",
                  "May delay legitimate tasks if poorly configured."
                ],
                [
                  "Continuous monitoring",
                  "Improves visibility into suspicious activity.",
                  "Requires tools, staff, and alert management."
                ]
              ],
              caption: "Examples of security benefits and operational trade-offs."
            },
            {
              type: "heading",
              level: 3,
              text: "A Risk-based Approach"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify the assets and business activities that need protection.",
                "Determine relevant threats, vulnerabilities, and potential impacts.",
                "Estimate and prioritize risks.",
                "Select controls appropriate to the risks and requirements.",
                "Evaluate effectiveness, cost, usability, and performance.",
                "Monitor results and adjust controls as circumstances change."
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
                "A banking application may require multifactor authentication for sensitive transactions while allowing lower-risk activities with fewer steps. The controls should reflect the risk rather than applying identical restrictions to every action."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Final principle",
              text:
                "Effective security is risk-based and proportionate. The objective is not to eliminate every possible risk at any cost, but to manage risks in accordance with organizational needs and applicable obligations."
            }
          ]
        }
      ]
    }
  ],

  references: [
    {
      title: "An Introduction to Information Security (NIST SP 800-12 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/12/r1/final",
      author: "Michael Nieles, Kelley Dempsey, Victoria Pillitteri",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2017,
      accessedAt: "2026-10-23"
    },
    {
      title: "Cybersecurity Glossary",
      url: "https://csrc.nist.gov/glossary",
      organization: "National Institute of Standards and Technology",
      accessedAt: "2026-10-23"
    },
    {
      title: "NIST Privacy Framework",
      url: "https://www.nist.gov/privacy-framework",
      organization: "National Institute of Standards and Technology",
      accessedAt: "2026-10-23"
    },
    {
      title: "Data Integrity: Detecting and Responding to Ransomware and Other Destructive Events (NIST SP 1800-26)",
      url: "https://www.nccoe.nist.gov/publication/1800-26/VolA/index.html",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2020,
      accessedAt: "2026-10-23"
    }
  ],

  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z"
};

export default iasModule01;
