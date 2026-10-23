
import type { IASModule } from "../../types/modules";

const module1: IASModule = {
  unitId: "ias-module-01",
  moduleId: "01",
  title: "Introduction to Information Assurance and Security",
  description:
    "Introduces information assurance, information security, cybersecurity, and the fundamental principles used to protect information assets. Learners explore the core security objectives, trust mechanisms, accountability, privacy, and the trade-offs involved in securing information systems.",
  objectives: [
    "Define information security, information assurance, cybersecurity, and information assets.",
    "Explain how security controls, validation, risk management, and recovery support information assurance.",
    "Describe the principles of confidentiality, integrity, and availability.",
    "Explain authenticity, accountability, and non-repudiation in information systems.",
    "Identify privacy principles and responsible practices for handling personal information.",
    "Evaluate common trade-offs between security, usability, cost, and system performance.",
  ],
  lessons: [
    {
      id: "ias-m01-l01",
      lessonNo: "1.1",
      title: "Information Security Fundamentals",
      description:
        "Defines information security, cybersecurity, information assets, and the basic concepts used to protect information and systems from unauthorized access, disclosure, alteration, destruction, and disruption.",
      keyTerms: [
        {
          word: "Information Security",
          definition:
            "The protection of information and information systems against unauthorized access, use, disclosure, disruption, modification, or destruction.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Cybersecurity",
          definition:
            "The ability to protect or defend the use of cyberspace from cyberattacks, including threats to systems, networks, and digital information.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Information Asset",
          definition:
            "Information or a resource that has value to an organization, such as customer records, databases, applications, devices, and business documents.",
          source: "NIST SP 800-12 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/12/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Understanding Information Security",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Information is one of the most valuable resources in modern organizations. Student records, financial transactions, research files, and customer databases must be protected against unauthorized access and accidental loss. Information security combines policies, processes, people, and technical controls to reduce these risks. It applies to digital systems as well as physical documents and devices. Cybersecurity focuses on threats involving digital systems and connected environments, making it an important part of the broader information security discipline.",
        },
        {
          sectionNo: "02",
          header: "Information Assets and Common Threats",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Information assets include data, hardware, software, networks, documentation, and services that support organizational activities. Common threats include phishing, malware, stolen credentials, insider misuse, hardware failure, and natural disasters. A vulnerability is a weakness that a threat may exploit, while risk describes the potential for loss or harm under uncertain conditions. Identifying valuable assets and understanding their threats help organizations select appropriate safeguards, such as access controls, encryption, security awareness training, and backups.",
        },
      ],
    },
    {
      id: "ias-m01-l02",
      lessonNo: "1.2",
      title: "Information Assurance Principles",
      description:
        "Explains how security controls, validation, risk management, and recovery help maintain trustworthy information and support the reliable operation of information systems.",
      keyTerms: [
        {
          word: "Information Assurance",
          definition:
            "The practice of managing risks to information and systems so that information remains trustworthy and systems can perform their intended functions.",
          source: "NIST Risk Management Framework — https://csrc.nist.gov/projects/risk-management/about-rmf",
        },
        {
          word: "Security Control",
          definition:
            "A safeguard or countermeasure designed to protect information systems, manage risks, or support compliance with security requirements.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Risk Management",
          definition:
            "The ongoing process of identifying, assessing, responding to, and monitoring risks to organizational operations, assets, and information.",
          source: "NIST Risk Management Framework — https://csrc.nist.gov/projects/risk-management/about-rmf",
        },
      ],
      durationMinutes: 15,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Building Trustworthy Information Systems",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Information assurance extends beyond preventing cyberattacks. It aims to maintain confidence that information is accurate, accessible to authorized users, and handled appropriately throughout its lifecycle. Organizations use administrative controls, such as policies and training; technical controls, such as authentication and encryption; and physical controls, such as locks and restricted facilities. These safeguards work together to reduce risk. Their effectiveness depends on appropriate implementation, regular evaluation, and adaptation to changing threats and business requirements.",
        },
        {
          sectionNo: "02",
          header: "Validation, Risk Management, and Recovery",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Assurance requires evidence that safeguards work as intended. Validation activities include reviewing configurations, testing controls, checking data accuracy, and examining audit records. Risk management helps prioritize these activities according to the likelihood and impact of potential incidents. Recovery measures, including tested backups, documented response procedures, and disaster recovery plans, help restore information and services after failures or attacks. For example, a university can reduce student-record risks by restricting database access, reviewing permissions, testing backups, and periodically checking whether its controls remain effective.",
        },
      ],
    },
    {
      id: "ias-m01-l03",
      lessonNo: "1.3",
      title: "Confidentiality, Integrity, and Availability",
      description:
        "Introduces the CIA triad, the three foundational security objectives used to prevent unauthorized information disclosure, improper modification, and disruption of access to information and services.",
      keyTerms: [
        {
          word: "Confidentiality",
          definition:
            "The property that information is not made available or disclosed to unauthorized individuals, entities, or processes.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Integrity",
          definition:
            "The property that information remains accurate, complete, and protected against unauthorized modification or destruction.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Availability",
          definition:
            "The property that information and services are accessible and usable when required by authorized users or processes.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
      ],
      durationMinutes: 18,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "The Three Pillars of Information Security",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "The CIA triad provides a foundational model for evaluating information security. Confidentiality protects information from unauthorized disclosure. Integrity protects information from unauthorized changes or destruction. Availability ensures that authorized users can access information and services when needed. These objectives are related but distinct: a system may keep information secret while allowing incorrect records, or preserve accurate records while becoming unavailable. Security decisions should therefore consider all three objectives instead of focusing on a single aspect of protection.",
        },
        {
          sectionNo: "02",
          header: "Applying the CIA Triad",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Consider a university enrollment system. Confidentiality is supported by allowing only authorized personnel to view sensitive student records. Integrity is supported by validating grade changes, restricting editing permissions, and recording approved updates. Availability is supported by maintaining reliable infrastructure, backups, and recovery procedures. A denial-of-service attack primarily threatens availability, while an unauthorized grade alteration threatens integrity. Leaked student records threaten confidentiality. Identifying the affected objective helps administrators select suitable controls and assess the consequences of an incident.",
        },
      ],
    },
    {
      id: "ias-m01-l04",
      lessonNo: "1.4",
      title: "Authenticity",
      description:
        "Explains how users, devices, information, and communications can be verified as genuine through identity verification, authentication mechanisms, and integrity-related evidence.",
      keyTerms: [
        {
          word: "Authenticity",
          definition:
            "The property of being genuine and capable of being verified as trustworthy with respect to identity, origin, or source.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Authentication",
          definition:
            "The process of establishing confidence in a claimed identity of a user, device, or other entity.",
          source: "NIST SP 800-63B — https://pages.nist.gov/800-63-4/sp800-63b.html",
        },
        {
          word: "Digital Signature",
          definition:
            "A cryptographic mechanism that can help verify the origin and integrity of signed digital information and provide evidence supporting accountability.",
          source: "NIST Digital Signature Standard — https://csrc.nist.gov/pubs/fips/186-5/final",
        },
      ],
      durationMinutes: 15,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Verifying Genuine Identities and Information",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Authenticity helps determine whether an identity, message, document, or system is genuine. In online environments, attackers may impersonate legitimate users, create fraudulent websites, or send messages that appear to come from trusted organizations. Authentication mechanisms can include passwords, security keys, one-time codes, and biometric checks. Digital signatures and trusted certificates can also help verify the origin of digital communications. These mechanisms provide different forms of evidence, and their effectiveness depends on correct implementation, trustworthy credentials, and appropriate verification procedures.",
        },
        {
          sectionNo: "02",
          header: "Authenticity in Everyday Digital Activities",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Before submitting grades or financial information, a user should verify that the website or application is legitimate. Organizations can strengthen authenticity by using multifactor authentication, certificate validation, approved identity-verification procedures, and signed software updates. However, authentication does not automatically prove that every action is authorized or that all submitted information is truthful. For example, a valid account may still be compromised. Authenticity should therefore be supported by access control, monitoring, and additional checks appropriate to the sensitivity of the activity.",
        },
      ],
    },
    {
      id: "ias-m01-l05",
      lessonNo: "1.5",
      title: "Accountability",
      description:
        "Describes how actions performed by users and systems are recorded, monitored, and attributed to responsible identities through logging, auditing, and access management.",
      keyTerms: [
        {
          word: "Accountability",
          definition:
            "The property that actions within a system can be traced to the individuals, processes, or entities responsible for them.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Audit Log",
          definition:
            "A chronological record of system activities and events that supports monitoring, investigation, and review.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Audit Trail",
          definition:
            "A record of relevant actions and events that allows activities to be reconstructed and examined after they occur.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
      ],
      durationMinutes: 15,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Making System Actions Traceable",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Accountability makes it possible to determine who performed an action, what happened, and when it occurred. Systems support accountability through individual user accounts, access permissions, timestamps, activity logs, and audit reviews. For example, a student information system may record which authorized staff member changed a grade and when the update occurred. Shared accounts weaken accountability because several people may perform actions under the same identity. Organizations should use unique accounts, appropriate privileges, and reliable logging to make investigations more accurate.",
        },
        {
          sectionNo: "02",
          header: "Logging, Monitoring, and Auditing",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Logging captures relevant events, monitoring helps identify suspicious activity, and auditing examines records to determine whether actions followed established rules. Useful logs may include successful and failed logins, permission changes, record updates, and administrative activities. Logs must be protected against unauthorized alteration or deletion, and their collection should respect privacy requirements. Accurate timestamps and consistent identity management improve investigations. Accountability is strongest when technical records are combined with clear responsibilities, documented procedures, and regular review rather than relying on logs alone.",
        },
      ],
    },
    {
      id: "ias-m01-l06",
      lessonNo: "1.6",
      title: "Non-repudiation",
      description:
        "Explains how trustworthy records, digital signatures, and transaction evidence can help establish that an action occurred and make it more difficult for a participant to credibly deny involvement.",
      keyTerms: [
        {
          word: "Non-repudiation",
          definition:
            "A security property that provides evidence supporting the attribution of an action or event to an entity, helping prevent a credible denial of involvement.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Digital Signature",
          definition:
            "A cryptographic value generated using a private key that can be verified with the corresponding public key to support evidence of origin and data integrity.",
          source: "NIST FIPS 186-5 — https://csrc.nist.gov/pubs/fips/186-5/final",
        },
        {
          word: "Transaction Evidence",
          definition:
            "Records such as signed documents, timestamps, receipts, and protected logs that help establish the details of a transaction.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
      ],
      durationMinutes: 15,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Understanding Non-repudiation",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Non-repudiation focuses on evidence that helps establish the origin, participation, or occurrence of a digital action. For example, a digitally signed agreement may provide evidence that a particular signing key was used to approve a document and that the signed content has not changed since signing. This can help resolve disputes involving online transactions or electronic approvals. Non-repudiation depends on reliable identity verification, secure key management, trustworthy records, and appropriate procedures for handling disputes.",
        },
        {
          sectionNo: "02",
          header: "Digital Signatures and Evidentiary Limits",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Digital signatures use cryptographic techniques to help verify that data was signed using a particular private key and has not been altered after signing. However, a signature alone does not prove that the key owner personally performed the action, understood the document, or acted voluntarily. A compromised key or weak identity-verification process can undermine the evidence. Organizations should protect signing keys, validate certificates where applicable, retain relevant transaction records, and follow legal and procedural requirements when relying on electronic evidence.",
        },
      ],
    },
    {
      id: "ias-m01-l07",
      lessonNo: "1.7",
      title: "Privacy",
      description:
        "Introduces the protection of personal information, responsible data handling, and the importance of collecting, using, storing, sharing, and disposing of personal data appropriately.",
      keyTerms: [
        {
          word: "Privacy",
          definition:
            "The interest of individuals in how information about them is collected, used, shared, retained, and otherwise processed.",
          source: "NIST Privacy Framework — https://www.nist.gov/privacy-framework",
        },
        {
          word: "Personally Identifiable Information (PII)",
          definition:
            "Information that can distinguish or trace an individual's identity, either by itself or when combined with other linked or linkable information.",
          source: "NIST SP 800-122 — https://csrc.nist.gov/pubs/sp/800/122/final",
        },
        {
          word: "Data Minimization",
          definition:
            "The practice of limiting personal data collection, use, and retention to what is relevant and necessary for a defined purpose.",
          source: "NIST Privacy Framework — https://www.nist.gov/privacy-framework",
        },
      ],
      durationMinutes: 18,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Protecting Personal Information",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Privacy concerns how information about individuals is collected and handled, while information security provides safeguards that help prevent unauthorized access, disclosure, or alteration. Personal information may include names, addresses, identification numbers, financial records, location data, and other details that can identify someone directly or indirectly. Responsible data handling starts by defining a legitimate purpose, collecting only necessary information, restricting access, and explaining relevant practices to individuals. Strong security is essential to privacy, but privacy also involves appropriate decisions about how data is used and shared.",
        },
        {
          sectionNo: "02",
          header: "Responsible Data Handling Throughout the Lifecycle",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Personal data should be protected throughout collection, storage, use, sharing, retention, and disposal. Practical measures include encryption, access restrictions, retention schedules, secure deletion, and procedures for responding to data breaches. Data minimization reduces unnecessary exposure by avoiding the collection of information that is not needed. For example, an event registration form should request only the details required to organize the event rather than collecting unrelated sensitive information. In the Philippines, organizations handling personal data should also consider their obligations under Republic Act No. 10173, the Data Privacy Act of 2012, and applicable implementing rules.",
        },
      ],
    },
    {
      id: "ias-m01-l08",
      lessonNo: "1.8",
      title: "Security Objectives and Trade-offs",
      description:
        "Explores how organizations balance security objectives with usability, cost, performance, accessibility, and operational needs when selecting and implementing safeguards.",
      keyTerms: [
        {
          word: "Security Trade-off",
          definition:
            "A decision in which improving one security objective or operational requirement may introduce costs, limitations, or competing risks elsewhere.",
          source: "NIST SP 800-12 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/12/r1/final",
        },
        {
          word: "Least Privilege",
          definition:
            "The principle of granting users and processes only the minimum access and permissions necessary to perform their assigned tasks.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Risk-Based Decision",
          definition:
            "A decision that considers the likelihood and potential impact of adverse events when selecting safeguards and allocating resources.",
          source: "NIST Risk Management Framework — https://csrc.nist.gov/projects/risk-management/about-rmf",
        },
      ],
      durationMinutes: 15,
      video: [
        {
          title: "Introduction to Information Security",
          url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
          provider: "YouTube",
        },
      ],
      sections: [
        {
          sectionNo: "01",
          header: "Balancing Security and Usability",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Security measures must protect information without unnecessarily preventing legitimate work. For example, multifactor authentication can reduce account-compromise risks but may add time to the login process. Strict access restrictions can reduce unauthorized access but may delay employees who need information to complete their tasks. Organizations should assess the sensitivity of information, likely threats, user needs, regulatory requirements, implementation cost, and potential operational impact. Effective security does not mean applying the strongest possible control everywhere; it means selecting appropriate controls based on the risks and requirements of each situation.",
        },
        {
          sectionNo: "02",
          header: "Making Risk-Based Security Decisions",
          imageUrl:
            "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIx/NjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ",
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Security decisions should be guided by the value of the information, the likelihood of threats, the consequences of incidents, and available resources. A public information page may require basic protections, while a system containing financial or sensitive personal records may justify stronger authentication, encryption, monitoring, and recovery measures. Organizations must also consider performance, accessibility, maintainability, and applicable laws. Security requirements should be reviewed as threats and operational needs change. The objective is to reduce risk to an acceptable level while preserving the confidentiality, integrity, availability, and responsible use of information.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Computer Security: A Practical Definition and Guide to Managing Security",
      url: "https://csrc.nist.gov/pubs/sp/800/12/r1/final",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "NIST Computer Security Resource Center Glossary",
      url: "https://csrc.nist.gov/glossary",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Security and Privacy Controls for Information Systems and Organizations",
      url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "NIST Risk Management Framework",
      url: "https://csrc.nist.gov/projects/risk-management/about-rmf",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Digital Identity Guidelines: Authentication and Authenticator Management",
      url: "https://pages.nist.gov/800-63-4/sp800-63b.html",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Digital Signature Standard (DSS)",
      url: "https://csrc.nist.gov/pubs/fips/186-5/final",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Guide to Protecting the Confidentiality of Personally Identifiable Information (PII)",
      url: "https://csrc.nist.gov/pubs/sp/800/122/final",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "NIST Privacy Framework",
      url: "https://www.nist.gov/privacy-framework",
      author: "Richard Kissel, editor",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Republic Act No. 10173 — Data Privacy Act of 2012",
      url: "https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html",
      author: "Richard Kissel, editor",
      organization: "Republic of the Philippines",
    },
  ],
  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z",
};

export default module1;
