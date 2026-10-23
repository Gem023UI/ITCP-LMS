
import type { IASModule } from "../../types/modules";

const VIDEO_URL =
  "https://www.youtube.com/embed/X-O1-l0gP5Q?si=HTjUXXk8qQ7PmpQm";

const IMAGE_URL =
  "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ";

const iasModule02: IASModule = {
  unitId: "ias-module-01",
  moduleId: "02",
  moduleNo: 2,
  title: "Security Threats, Vulnerabilities, and Attacks",
  description:
    "Explains how security incidents occur, what weaknesses attackers exploit, and how common attack methods affect information systems.",

  objectives: [
    "Differentiate threats, vulnerabilities, and risks.",
    "Identify common malware types and social engineering techniques.",
    "Explain common credential, network, and web application attacks.",
    "Describe insider threats, zero-day vulnerabilities, and advanced persistent threats.",
    "Explain supply-chain and physical security threats.",
    "Recognize security practices that help prevent, detect, and mitigate attacks."
  ],

  lessons: [
    // ==========================================
    // LESSON 2.1
    // ==========================================
    {
      id: "ias-m02-l01",
      lessonNo: "2.1",
      title: "Threats, Vulnerabilities, and Risk",
      description:
        "Differentiates potential sources of harm, system weaknesses, and the risks resulting from their interaction.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Threat",
          definition:
            "A circumstance or event with the potential to adversely affect an information system or organization."
        },
        {
          word: "Vulnerability",
          definition:
            "A weakness in a system, security procedure, or control that could be exploited or triggered by a threat."
        },
        {
          word: "Risk",
          definition:
            "The possibility of an adverse outcome, considered in terms of its likelihood and potential impact."
        },
        {
          word: "Exploit",
          definition:
            "A method or technique that takes advantage of a vulnerability."
        }
      ],

      video: [
        {
          title: "Threats, Vulnerabilities, and Risk (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Understanding Security Risk",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Security incidents can occur when threats exploit weaknesses in systems, processes, or human behavior. Understanding the relationship between threats, vulnerabilities, and risk helps organizations decide which protections to prioritize."
            },
            {
              type: "image",
              url: IMAGE_URL,
              alt: "Administrator reviewing computer systems and backup data",
              source: "Provided placeholder image URL",
              caption:
                "Monitoring systems and maintaining backups are examples of risk-reduction measures."
            },
            {
              type: "table",
              headers: ["Concept", "Meaning", "Example"],
              rows: [
                [
                  "Threat",
                  "Potential cause of harm",
                  "A cybercriminal attempting to steal records"
                ],
                [
                  "Vulnerability",
                  "A weakness that can be exploited",
                  "An unpatched application"
                ],
                [
                  "Risk",
                  "Potential for loss or harm",
                  "Records being stolen through the application"
                ],
                [
                  "Control",
                  "A safeguard that reduces risk",
                  "Applying security updates"
                ]
              ],
              caption: "How the main risk concepts differ."
            },
            {
              type: "heading",
              level: 3,
              text: "Managing Risk"
            },
            {
              type: "list",
              style: "ordered",
              items: [
                "Identify valuable information assets.",
                "Identify relevant threats and vulnerabilities.",
                "Assess potential likelihood and impact.",
                "Select appropriate security controls.",
                "Monitor risks and reassess when conditions change."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Key takeaway",
              text:
                "A vulnerability does not automatically mean that an incident will occur. Risk depends on the circumstances, likelihood of exploitation, existing controls, and potential consequences."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.2
    // ==========================================
    {
      id: "ias-m02-l02",
      lessonNo: "2.2",
      title: "Malware",
      description:
        "Introduces viruses, worms, Trojans, spyware, ransomware, and other malicious software.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Malware",
          definition:
            "Software or firmware intended to perform unauthorized processes that adversely affect the confidentiality, integrity, or availability of a system."
        },
        {
          word: "Virus",
          definition:
            "Malware that inserts itself into a file or program and spreads when its infected host is executed."
        },
        {
          word: "Worm",
          definition:
            "Malware capable of self-propagating, often across networks, without requiring a host file."
        },
        {
          word: "Trojan",
          definition:
            "Malware that disguises its malicious purpose by appearing to be legitimate software or content."
        },
        {
          word: "Ransomware",
          definition:
            "Malware that denies access to data or systems, commonly through encryption, and demands payment."
        },
        {
          word: "Spyware",
          definition:
            "Software that secretly monitors activities or collects information without appropriate authorization."
        }
      ],

      video: [
        {
          title: "Malware Fundamentals (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Types and Effects of Malware",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Malware is designed to compromise systems, steal information, disrupt operations, or provide unauthorized access. Different types of malware use different methods to infect devices and achieve their objectives."
            },
            {
              type: "table",
              headers: ["Type", "Behavior", "Potential Impact"],
              rows: [
                [
                  "Virus",
                  "Attaches to files or programs",
                  "Damaged or modified files"
                ],
                [
                  "Worm",
                  "Self-propagates between systems",
                  "Network congestion and widespread infection"
                ],
                [
                  "Trojan",
                  "Masquerades as legitimate software",
                  "Unauthorized access or data theft"
                ],
                [
                  "Ransomware",
                  "Blocks access to data or systems",
                  "Operational disruption and data loss"
                ],
                [
                  "Spyware",
                  "Secretly collects information",
                  "Privacy violations and credential theft"
                ],
                [
                  "Rootkit",
                  "Conceals malicious activity or privileged access",
                  "Difficult detection and persistent compromise"
                ]
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Reducing Malware Risk"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Keep operating systems and applications updated.",
                "Download software from trusted sources.",
                "Use appropriately configured endpoint protection.",
                "Avoid suspicious attachments and unexpected downloads.",
                "Maintain protected backups and test restoration procedures.",
                "Restrict unnecessary privileges."
              ]
            },
            {
              type: "callout",
              variant: "warning",
              title: "Remember",
              text:
                "Malware can enter through malicious downloads, compromised websites, vulnerable services, removable media, and stolen credentials. No single protective tool prevents every infection."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.3
    // ==========================================
    {
      id: "ias-m02-l03",
      lessonNo: "2.3",
      title: "Phishing and Social Engineering",
      description:
        "Explains how attackers manipulate people into disclosing information or performing unsafe actions.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Social Engineering",
          definition:
            "The manipulation of people into revealing information or taking actions that may compromise security."
        },
        {
          word: "Phishing",
          definition:
            "A form of social engineering that uses deceptive electronic communications to obtain information or induce unsafe actions."
        },
        {
          word: "Spear Phishing",
          definition:
            "A targeted phishing attempt tailored to a particular person or organization."
        },
        {
          word: "Pretexting",
          definition:
            "Creating a fabricated scenario or identity to persuade someone to disclose information or perform an action."
        },
        {
          word: "Baiting",
          definition:
            "Using an enticing offer or object to persuade someone to take an unsafe action."
        }
      ],

      video: [
        {
          title: "Phishing and Social Engineering (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "How Attackers Manipulate People",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Social engineering exploits human trust, urgency, fear, curiosity, or a desire to help. Phishing is a common example in which an attacker sends a deceptive email, text message, or other communication that appears trustworthy."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Techniques"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Email phishing: deceptive messages that impersonate trusted organizations.",
                "Spear phishing: targeted messages tailored to a specific victim.",
                "Smishing: phishing through text messages.",
                "Vishing: phishing through voice calls.",
                "Pretexting: fabricated situations used to gain trust.",
                "Baiting: tempting offers or objects used to induce unsafe actions."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Recognizing Suspicious Messages"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Unexpected requests for passwords or verification codes.",
                "Urgent demands to transfer money or bypass procedures.",
                "Links leading to unfamiliar or misleading domains.",
                "Unexpected attachments or unusual file requests.",
                "Requests that conflict with established organizational procedures."
              ]
            },
            {
              type: "paragraph",
              text:
                "For example, an employee receives a message claiming that an account will be disabled unless a password is entered immediately. The employee should independently verify the request through an official channel rather than follow the message's link."
            },
            {
              type: "callout",
              variant: "tip",
              title: "Safer response",
              text:
                "Pause, verify the sender and request independently, avoid sharing authentication codes, and report suspected phishing using the organization's approved procedure."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.4
    // ==========================================
    {
      id: "ias-m02-l04",
      lessonNo: "2.4",
      title: "Password and Credential Attacks",
      description:
        "Covers brute-force attacks, credential stuffing, password spraying, and credential theft.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Credential",
          definition:
            "Information or an authenticator used to establish or verify an identity or access claim."
        },
        {
          word: "Brute-force Attack",
          definition:
            "An attack that systematically tries possible passwords or other secret values until a match is found."
        },
        {
          word: "Credential Stuffing",
          definition:
            "Using previously exposed username and password combinations to attempt access to other services."
        },
        {
          word: "Password Spraying",
          definition:
            "Trying a small number of commonly used passwords across many accounts to reduce the likelihood of triggering account-specific lockouts."
        },
        {
          word: "Multifactor Authentication",
          definition:
            "Authentication that requires evidence from at least two distinct factor categories, such as knowledge, possession, or inherence."
        }
      ],

      video: [
        {
          title: "Password and Credential Attacks (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "How Credentials Are Compromised",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Credential attacks attempt to gain access using guessed, reused, stolen, or otherwise compromised authentication information. Successful attacks can expose sensitive records and allow unauthorized activity under a legitimate account."
            },
            {
              type: "table",
              headers: ["Attack", "How It Works", "Primary Concern"],
              rows: [
                [
                  "Brute force",
                  "Tries many possible secret values.",
                  "Weak or short passwords"
                ],
                [
                  "Credential stuffing",
                  "Reuses credentials exposed in earlier breaches.",
                  "Password reuse across services"
                ],
                [
                  "Password spraying",
                  "Tries a few common passwords across many accounts.",
                  "Common passwords and weak defenses"
                ],
                [
                  "Credential theft",
                  "Obtains credentials through phishing, malware, or other means.",
                  "Stolen authentication information"
                ]
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Defensive Measures"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use long, unique passwords or passkeys where supported.",
                "Enable multifactor authentication.",
                "Use a reputable password manager.",
                "Apply rate limits and appropriate authentication monitoring.",
                "Store passwords using a suitable salted password-hashing scheme.",
                "Protect account recovery and reset procedures."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Key takeaway",
              text:
                "A strong password can still be compromised through phishing or reuse after a breach. Layered authentication and secure account-management practices are essential."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.5
    // ==========================================
    {
      id: "ias-m02-l05",
      lessonNo: "2.5",
      title: "Denial-of-Service Attacks",
      description:
        "Explains how DoS and DDoS attacks disrupt the availability of services.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Denial of Service",
          definition:
            "An attack that prevents or degrades legitimate access to a system, service, or resource."
        },
        {
          word: "Distributed Denial of Service",
          definition:
            "A denial-of-service attack launched from multiple distributed sources."
        },
        {
          word: "Botnet",
          definition:
            "A collection of compromised devices that can be controlled to perform coordinated activities."
        },
        {
          word: "Rate Limiting",
          definition:
            "A control that restricts how frequently requests or operations can be performed."
        }
      ],

      video: [
        {
          title: "Denial-of-Service Attacks (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Disrupting Service Availability",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "A denial-of-service attack overwhelms or exhausts a target's available resources, or otherwise interferes with its ability to serve legitimate users. A distributed denial-of-service attack uses multiple sources, which can make mitigation more difficult."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Effects"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Slow response times or failed requests.",
                "Exhausted network bandwidth, memory, or processing capacity.",
                "Unavailable websites or online services.",
                "Interrupted business operations and financial losses."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Defensive Measures"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use appropriate traffic filtering and rate limiting.",
                "Deploy DDoS protection and upstream traffic-scrubbing services.",
                "Design infrastructure with suitable capacity and redundancy.",
                "Monitor traffic patterns and service health.",
                "Prepare incident-response and service-recovery procedures."
              ]
            },
            {
              type: "callout",
              variant: "info",
              title: "Distinction",
              text:
                "A sudden increase in traffic is not automatically an attack. Legitimate demand spikes and configuration failures can also overload services and should be investigated."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.6
    // ==========================================
    {
      id: "ias-m02-l06",
      lessonNo: "2.6",
      title: "Man-in-the-Middle Attacks",
      description:
        "Describes how attackers intercept or manipulate communications between parties.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Man-in-the-Middle Attack",
          definition:
            "An attack in which an adversary positions themselves between communicating parties to intercept or potentially alter their communications."
        },
        {
          word: "Eavesdropping",
          definition:
            "Secretly observing or intercepting communications to obtain information."
        },
        {
          word: "Encryption",
          definition:
            "Transforming information into a form that cannot be read without the appropriate decryption capability."
        },
        {
          word: "Certificate Validation",
          definition:
            "Checking whether a digital certificate is valid and appropriately associated with the identity being authenticated."
        }
      ],

      video: [
        {
          title: "Man-in-the-Middle Attacks (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Intercepting Communications",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "In a man-in-the-middle attack, an attacker attempts to intercept communications between two parties who believe they are communicating directly. Depending on the circumstances, the attacker may observe information, modify messages, or impersonate one of the parties."
            },
            {
              type: "heading",
              level: 3,
              text: "Potential Attack Scenarios"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "A malicious or compromised network access point.",
                "A fraudulent website that imitates a legitimate service.",
                "An improperly validated connection certificate.",
                "A compromised router or other network intermediary."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Prevention"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use properly configured HTTPS and validate certificates.",
                "Keep browsers, devices, and network equipment updated.",
                "Avoid ignoring certificate warnings.",
                "Use trusted networks and appropriately configured secure remote access.",
                "Apply multifactor authentication and monitor unusual account activity."
              ]
            },
            {
              type: "callout",
              variant: "warning",
              title: "Important",
              text:
                "Encryption alone does not guarantee that you are communicating with the intended party. Correct identity verification and secure configuration are also important."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.7
    // ==========================================
    {
      id: "ias-m02-l07",
      lessonNo: "2.7",
      title: "Spoofing and Impersonation",
      description:
        "Explains the falsification of identities, email addresses, websites, and communications.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Spoofing",
          definition:
            "Falsifying information about an identity, origin, or communication to make it appear more trustworthy or different from reality."
        },
        {
          word: "Impersonation",
          definition:
            "Pretending to be another person, organization, or entity."
        },
        {
          word: "Email Spoofing",
          definition:
            "Falsifying email sender information so that a message appears to originate from another address or domain."
        },
        {
          word: "Domain Spoofing",
          definition:
            "Misrepresenting a domain or using a deceptive domain to imitate a legitimate website or organization."
        }
      ],

      video: [
        {
          title: "Spoofing and Impersonation (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Falsifying Digital Identities",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Spoofing involves falsifying identifying information, while impersonation involves pretending to be a trusted person or organization. These techniques can support phishing, fraud, unauthorized access, and other attacks."
            },
            {
              type: "table",
              headers: ["Technique", "Example", "Potential Risk"],
              rows: [
                [
                  "Email spoofing",
                  "A message displays a forged sender address.",
                  "Fraudulent requests or phishing"
                ],
                [
                  "Website impersonation",
                  "A fake login page resembles a legitimate service.",
                  "Credential theft"
                ],
                [
                  "Caller ID spoofing",
                  "A call appears to come from a trusted number.",
                  "Fraud or disclosure of sensitive information"
                ],
                [
                  "IP address spoofing",
                  "Network packets use a forged source address.",
                  "Abuse of trust or network-based attacks"
                ]
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Reducing Spoofing Risks"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Verify unusual requests through a separate trusted channel.",
                "Inspect domains carefully before entering credentials.",
                "Use multifactor authentication.",
                "Implement SPF, DKIM, and DMARC appropriately for organizational email.",
                "Avoid trusting caller ID or sender display names alone."
              ]
            },
            {
              type: "callout",
              variant: "tip",
              title: "Remember",
              text:
                "A communication can appear to come from a familiar source without actually originating from that source. Verify identity before taking sensitive actions."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.8
    // ==========================================
    {
      id: "ias-m02-l08",
      lessonNo: "2.8",
      title: "Insider Threats",
      description:
        "Examines security risks caused by malicious, negligent, or compromised authorized users.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Insider Threat",
          definition:
            "A risk that originates from someone with authorized access, or from someone who misuses that access directly or through compromise."
        },
        {
          word: "Malicious Insider",
          definition:
            "An authorized individual who intentionally misuses access to harm an organization or its information."
        },
        {
          word: "Negligent Insider",
          definition:
            "An authorized individual whose careless actions or failure to follow procedures create security risks."
        },
        {
          word: "Least Privilege",
          definition:
            "Granting only the access and permissions required to perform assigned responsibilities."
        }
      ],

      video: [
        {
          title: "Insider Threats (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Risks from Trusted Access",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Insider threats involve the misuse of authorized access or the compromise of people who have access to organizational resources. Insiders may act deliberately, make mistakes, or have their accounts taken over by an external attacker."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Categories"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Malicious: deliberately stealing, leaking, or damaging information.",
                "Negligent: accidentally exposing data or ignoring security procedures.",
                "Compromised: an attacker misuses an employee's legitimate account."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Reducing Insider Risk"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Apply least privilege and role-based access controls.",
                "Review permissions when job responsibilities change.",
                "Monitor sensitive actions with appropriate safeguards.",
                "Provide security awareness training.",
                "Establish clear reporting and incident-response procedures.",
                "Revoke access promptly when it is no longer authorized."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Balanced approach",
              text:
                "An unusual action is not proof of malicious intent. Investigations should consider context, evidence, legitimate job duties, and applicable privacy and employment requirements."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.9
    // ==========================================
    {
      id: "ias-m02-l09",
      lessonNo: "2.9",
      title: "Zero-Day Vulnerabilities",
      description:
        "Introduces flaws exploited before an effective patch or fix is available.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Zero-Day Vulnerability",
          definition:
            "A software or hardware weakness for which effective remediation is not yet available to the affected defender when it is relevant to the attack."
        },
        {
          word: "Zero-Day Exploit",
          definition:
            "A technique that takes advantage of a zero-day vulnerability."
        },
        {
          word: "Patch",
          definition:
            "A software update that corrects defects, including security vulnerabilities."
        },
        {
          word: "Mitigation",
          definition:
            "A measure that reduces the likelihood or impact of a vulnerability being exploited."
        }
      ],

      video: [
        {
          title: "Zero-Day Vulnerabilities (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Exploiting Unknown or Unfixed Weaknesses",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "A zero-day vulnerability is a weakness that defenders may not yet have an effective fix for when exploitation becomes possible. Such vulnerabilities can be especially challenging because traditional patching may not immediately be an option."
            },
            {
              type: "heading",
              level: 3,
              text: "Why Zero-Days Are Dangerous"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "A vendor may not yet know about the vulnerability.",
                "An effective patch may not be available.",
                "Existing detection tools may not recognize the exploit.",
                "Successful exploitation may enable data theft or system compromise."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Reducing Exposure"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Minimize unnecessary services and exposed components.",
                "Use defense-in-depth and appropriate application isolation.",
                "Monitor for suspicious behavior and indicators of compromise.",
                "Apply temporary mitigations recommended by trusted vendors.",
                "Deploy tested patches promptly when they become available."
              ]
            },
            {
              type: "callout",
              variant: "info",
              title: "Terminology note",
              text:
                "The term zero-day does not necessarily mean that the vulnerability was discovered that same day. It refers to the lack of an effective fix or preparation time available to defenders in the relevant context."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.10
    // ==========================================
    {
      id: "ias-m02-l10",
      lessonNo: "2.10",
      title: "Advanced Persistent Threats",
      description:
        "Examines targeted, sustained intrusions intended to maintain access or achieve long-term objectives.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Advanced Persistent Threat",
          definition:
            "A sophisticated, targeted threat actor that seeks to establish and maintain unauthorized access to pursue defined objectives over an extended period."
        },
        {
          word: "Persistence",
          definition:
            "An attacker's ability to maintain or regain access to a compromised system."
        },
        {
          word: "Lateral Movement",
          definition:
            "Movement from one compromised system or account to other systems or accounts within an environment."
        },
        {
          word: "Threat Intelligence",
          definition:
            "Analyzed information about threats, threat actors, their capabilities, and relevant indicators or behaviors."
        }
      ],

      video: [
        {
          title: "Advanced Persistent Threats (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Understanding Long-Term Intrusions",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "An advanced persistent threat, or APT, describes a targeted and sustained intrusion in which an attacker seeks to maintain access and pursue longer-term objectives. These campaigns may involve multiple techniques and can remain undetected if monitoring and response are inadequate."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Campaign Characteristics"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Initial access through stolen credentials or exploited vulnerabilities.",
                "Establishing persistence to retain access.",
                "Privilege escalation or lateral movement.",
                "Gathering intelligence or accessing sensitive information.",
                "Maintaining access while attempting to avoid detection."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Defensive Strategies"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use multifactor authentication and least privilege.",
                "Monitor endpoints, accounts, networks, and critical systems.",
                "Investigate suspicious behavior and unusual access patterns.",
                "Segment networks to limit movement between systems.",
                "Maintain tested incident-response and recovery plans."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Key takeaway",
              text:
                "An APT is a description of a sustained, targeted threat or campaign, not simply another name for malware or a single attack."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.11
    // ==========================================
    {
      id: "ias-m02-l11",
      lessonNo: "2.11",
      title: "Web Application Attacks",
      description:
        "Introduces SQL injection, cross-site scripting, CSRF, and other common application-level attack techniques.",
      durationMinutes: 18,

      keyTerms: [
        {
          word: "SQL Injection",
          definition:
            "An attack that interferes with an application's database queries by supplying input that is improperly handled as SQL code."
        },
        {
          word: "Cross-Site Scripting",
          definition:
            "An attack in which untrusted content causes a web application to execute attacker-controlled scripts in a user's browser."
        },
        {
          word: "Cross-Site Request Forgery",
          definition:
            "An attack that tricks an authenticated user's browser into sending an unwanted request to a web application."
        },
        {
          word: "Input Validation",
          definition:
            "Checking that supplied data meets expected requirements before it is processed."
        },
        {
          word: "Parameterized Query",
          definition:
            "A database query that separates SQL instructions from supplied parameter values."
        }
      ],

      video: [
        {
          title: "Web Application Attacks (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Common Application-Level Attacks",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Web applications accept user input, process requests, and access data. Security weaknesses in these operations can expose sensitive records, compromise user sessions, or allow unauthorized actions."
            },
            {
              type: "table",
              headers: ["Attack", "Description", "Primary Defense"],
              rows: [
                [
                  "SQL injection",
                  "Input interferes with database query instructions.",
                  "Parameterized queries and appropriate database permissions."
                ],
                [
                  "Cross-site scripting (XSS)",
                  "Untrusted content executes as script in a user's browser.",
                  "Context-aware output encoding and safe rendering."
                ],
                [
                  "Cross-site request forgery (CSRF)",
                  "A browser submits an unwanted authenticated request.",
                  "Anti-CSRF tokens and appropriate cookie settings."
                ],
                [
                  "Broken access control",
                  "Users access resources or actions beyond their permissions.",
                  "Server-side authorization checks."
                ],
                [
                  "Path traversal",
                  "Input manipulates file paths to access unintended locations.",
                  "Strict path handling and restricted file access."
                ]
              ],
              caption: "Common web application weaknesses and defenses."
            },
            {
              type: "heading",
              level: 3,
              text: "Secure Development Practices"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Validate input and encode output for the correct context.",
                "Use parameterized queries instead of constructing SQL from raw input.",
                "Enforce authorization on the server for every protected operation.",
                "Use secure session management and appropriate cookie settings.",
                "Keep frameworks, libraries, and dependencies updated.",
                "Perform code reviews and security testing before deployment."
              ]
            },
            {
              type: "callout",
              variant: "warning",
              title: "Important",
              text:
                "Client-side validation improves usability but cannot replace server-side validation and authorization. Attackers can bypass browser-based checks."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.12
    // ==========================================
    {
      id: "ias-m02-l12",
      lessonNo: "2.12",
      title: "Supply-Chain Attacks",
      description:
        "Explains how compromised vendors, dependencies, or software delivery processes can affect downstream organizations.",
      durationMinutes: 15,

      keyTerms: [
        {
          word: "Supply-Chain Attack",
          definition:
            "An attack that compromises a product, service, supplier, or delivery process to affect its intended users or downstream organizations."
        },
        {
          word: "Software Dependency",
          definition:
            "An external library, package, component, or service that software relies on to function."
        },
        {
          word: "Software Bill of Materials",
          definition:
            "A structured inventory of software components and dependencies included in a software product."
        },
        {
          word: "Code Signing",
          definition:
            "Using a digital signature to help verify the origin and integrity of software or other digital artifacts."
        }
      ],

      video: [
        {
          title: "Supply-Chain Attacks (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Risks Beyond the Organization",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Organizations depend on vendors, cloud providers, software libraries, hardware manufacturers, and delivery pipelines. If one of these trusted components is compromised, the resulting attack may affect many downstream users."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Supply-Chain Risks"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Malicious code introduced into a software dependency.",
                "Compromised vendor accounts or update infrastructure.",
                "Tampered software packages or build artifacts.",
                "Exposed credentials used in development pipelines.",
                "Third-party services with excessive access privileges."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Reducing Supply-Chain Risk"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Assess suppliers according to their access and risk.",
                "Track dependencies and maintain software inventories.",
                "Verify software sources, signatures, and integrity where supported.",
                "Secure build systems and protect development credentials.",
                "Apply updates through controlled, tested processes.",
                "Limit third-party access and monitor vendor activity."
              ]
            },
            {
              type: "callout",
              variant: "info",
              title: "Key takeaway",
              text:
                "A product from a trusted vendor is not automatically risk-free. Security also depends on the vendor's development, distribution, access-control, and incident-response practices."
            }
          ]
        }
      ]
    },

    // ==========================================
    // LESSON 2.13
    // ==========================================
    {
      id: "ias-m02-l13",
      lessonNo: "2.13",
      title: "Physical Security Threats",
      description:
        "Covers theft, unauthorized entry, tampering, and environmental events that threaten information assets.",
      durationMinutes: 12,

      keyTerms: [
        {
          word: "Physical Security",
          definition:
            "Measures that protect facilities, equipment, people, and physical information assets from unauthorized access, damage, or disruption."
        },
        {
          word: "Unauthorized Access",
          definition:
            "Access to a facility, device, or resource without the required permission."
        },
        {
          word: "Tampering",
          definition:
            "Unauthorized interference with or alteration of equipment, systems, or physical assets."
        },
        {
          word: "Environmental Threat",
          definition:
            "A potentially harmful environmental condition or event, such as fire, flooding, extreme heat, or power failure."
        },
        {
          word: "Disaster Recovery",
          definition:
            "Activities and procedures for restoring information systems and technology services following a disruptive event."
        }
      ],

      video: [
        {
          title: "Physical Security Threats (Placeholder)",
          url: VIDEO_URL,
          provider: "youtube"
        }
      ],

      sections: [
        {
          sectionNo: "01",
          header: "Protecting Physical Information Assets",
          contentBlocks: [
            {
              type: "paragraph",
              text:
                "Information security depends on protecting both digital systems and the physical environments in which they operate. A stolen laptop, an unlocked server room, or a flood affecting a data center can compromise information or interrupt critical services."
            },
            {
              type: "heading",
              level: 3,
              text: "Common Physical Threats"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Theft of laptops, storage devices, or paper records.",
                "Unauthorized entry into offices and server rooms.",
                "Tampering with devices, cables, or network equipment.",
                "Shoulder surfing and viewing unattended screens.",
                "Fire, flooding, extreme temperatures, and other environmental events.",
                "Power outages and failures of cooling or supporting infrastructure."
              ]
            },
            {
              type: "heading",
              level: 3,
              text: "Protective Measures"
            },
            {
              type: "list",
              style: "unordered",
              items: [
                "Use appropriate locks, access badges, and visitor controls.",
                "Secure server rooms and sensitive equipment.",
                "Encrypt portable devices and protect their credentials.",
                "Use suitable fire detection, cooling, and power protection.",
                "Maintain off-site or otherwise resilient backups.",
                "Prepare emergency response and disaster recovery procedures."
              ]
            },
            {
              type: "callout",
              variant: "important",
              title: "Final takeaway",
              text:
                "Digital safeguards cannot fully protect information if physical assets are accessible to unauthorized people or vulnerable to environmental damage. Effective security addresses both physical and logical risks."
            }
          ]
        }
      ]
    }
  ],

  references: [
    {
      title: "Cybersecurity Glossary",
      url: "https://csrc.nist.gov/glossary",
      organization: "National Institute of Standards and Technology",
      accessedAt: "2026-10-23"
    },
    {
      title: "An Introduction to Information Security (NIST SP 800-12 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/12/r1/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2017,
      accessedAt: "2026-10-23"
    },
    {
      title: "Cybersecurity Framework (CSF) 2.0",
      url: "https://www.nist.gov/cyberframework",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2024,
      accessedAt: "2026-10-23"
    },
    {
      title: "Secure Software Development Framework (SSDF), NIST SP 800-218",
      url: "https://csrc.nist.gov/pubs/sp/800/218/final",
      organization: "National Institute of Standards and Technology",
      publishedYear: 2022,
      accessedAt: "2026-10-23"
    },
    {
      title: "OWASP Top 10:2021",
      url: "https://owasp.org/Top10/",
      organization: "OWASP Foundation",
      publishedYear: 2021,
      accessedAt: "2026-10-23"
    },
    {
      title: "Cross-Site Request Forgery Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
      organization: "OWASP Foundation",
      accessedAt: "2026-10-23"
    },
    {
      title: "MITRE ATT&CK",
      url: "https://attack.mitre.org/",
      organization: "MITRE",
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

export default iasModule02;
