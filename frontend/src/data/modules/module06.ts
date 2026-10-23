
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

const module6: IASModule = {
  unitId: "ias-module-02",
  moduleId: "06",
  title: "Identity and Access Management",
  description:
    "Teaches how systems identify users, verify their identities, enforce permissions, and record access-related activities.",
  objectives: [
    "Differentiate identification, authentication, authorization, and accounting.",
    "Explain common access control models and their appropriate uses.",
    "Describe the identity and access management life cycle.",
    "Explain how multi-factor authentication and single sign-on work.",
    "Identify practices for protecting privileged accounts and applying least privilege.",
    "Explain how separation of duties and Zero Trust reduce access-related risks.",
    "Describe biometric authentication and secure password management practices.",
  ],
  lessons: [
    {
      id: "ias-m06-l01",
      lessonNo: "6.1",
      title: "Identification",
      description:
        "Explains how users or devices claim an identity, such as through a username or device identifier.",
      keyTerms: [
        {
          word: "Identification",
          definition:
            "The process by which a user, device, or other entity claims a particular identity.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Identifier",
          definition:
            "A value used to distinguish an entity from others, such as a username or account ID.",
          source: "NIST SP 800-63A",
        },
        {
          word: "Digital Identity",
          definition:
            "A collection of attributes that represents an individual or entity in a digital interaction.",
          source: "NIST SP 800-63-4",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Purpose of Identification",
          "Identification is the first stage of many access processes. A person may enter a username, an employee number, or another assigned identifier to claim an identity. Devices and services can also use identifiers when connecting to systems. An identifier helps a system locate the relevant account or identity record, but it does not by itself prove that the claimant is genuine.",
        ),
        createSection(
          "02",
          "Identifiers and Identity Records",
          "Organizations assign and manage identifiers to distinguish accounts and reduce ambiguity. A system may associate an identifier with a person's role, department, approved devices, and permissions. Identifiers should be unique where required, managed consistently, and protected from misuse. After an identity is claimed, authentication mechanisms must verify the claimant before access is granted.",
        ),
      ],
    },
    {
      id: "ias-m06-l02",
      lessonNo: "6.2",
      title: "Authentication",
      description:
        "Verifies identity using passwords, security keys, biometrics, or other credentials.",
      keyTerms: [
        {
          word: "Authentication",
          definition:
            "The process of establishing confidence that a claimant controls one or more authenticators associated with an identity.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Authenticator",
          definition:
            "Something a claimant possesses or controls and uses to demonstrate control of an account or identity.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Credential",
          definition:
            "Evidence or information used to establish an association between an identity and an authenticator or authentication process.",
          source: "NIST SP 800-63-4",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "How Authentication Works",
          "Authentication verifies a claimed identity before a system permits access to protected resources. Common methods include passwords, cryptographic security keys, authenticator applications, and biometric verification. A system checks the presented authenticator using its authentication process and grants access only when the required verification succeeds. Authentication requirements should reflect the sensitivity of the resources and the risks of unauthorized access.",
        ),
        createSection(
          "02",
          "Authentication Strength and Security",
          "Authentication mechanisms vary in their resistance to theft, guessing, replay, phishing, and impersonation. Password-only authentication can be vulnerable to reused or stolen passwords, while phishing-resistant security keys can provide stronger protection against credential theft. Organizations should protect authenticators, use secure authentication protocols, rate-limit failed attempts where appropriate, and provide secure recovery procedures.",
        ),
      ],
    },
    {
      id: "ias-m06-l03",
      lessonNo: "6.3",
      title: "Authorization",
      description:
        "Determines which resources and actions an authenticated entity is permitted to use.",
      keyTerms: [
        {
          word: "Authorization",
          definition:
            "The process of determining whether an entity is permitted to perform a requested action on a resource.",
          source: "NIST SP 800-53",
        },
        {
          word: "Permission",
          definition:
            "An allowed action or operation associated with a resource, such as reading, editing, or deleting data.",
          source: "NIST SP 800-53",
        },
        {
          word: "Access Policy",
          definition:
            "A set of rules used to determine which subjects may perform which actions on specified resources.",
          source: "NIST SP 800-162",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Authentication Versus Authorization",
          "Authentication answers the question, 'Who or what is making this request?' Authorization answers, 'What is this entity allowed to do?' After a user signs in, a system may permit viewing a profile but restrict editing grades or managing other accounts. Successful authentication does not automatically grant unrestricted access; each requested action must comply with the applicable access policy.",
        ),
        createSection(
          "02",
          "Enforcing Access Decisions",
          "Authorization rules can consider the user's role, assigned permissions, resource ownership, device status, location, and other relevant attributes. Systems should enforce these rules consistently on the server or trusted enforcement point rather than relying only on hidden interface elements. Permissions should be reviewed regularly, and denied requests should be handled safely and logged when appropriate.",
        ),
      ],
    },
    {
      id: "ias-m06-l04",
      lessonNo: "6.4",
      title: "Accounting and Auditing",
      description:
        "Records user activities to support accountability and investigation.",
      keyTerms: [
        {
          word: "Accounting",
          definition:
            "The recording and tracking of activities associated with an identity, account, or system.",
          source: "NIST SP 800-53",
        },
        {
          word: "Audit Log",
          definition:
            "A record of events that supports review, accountability, troubleshooting, or investigation.",
          source: "NIST SP 800-92",
        },
        {
          word: "Audit Trail",
          definition:
            "A chronological record that helps reconstruct activities and establish how events occurred.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Recording Access-Related Activities",
          "Accounting captures activities such as successful and failed sign-ins, permission changes, administrative actions, and access to sensitive records. Useful event records typically include a timestamp, account or service identity, action, affected resource, and result. Logging should be proportionate to organizational needs and privacy obligations, and systems should avoid recording passwords, secret keys, or unnecessary sensitive information.",
        ),
        createSection(
          "02",
          "Auditing and Accountability",
          "Auditing involves reviewing records and other evidence to determine whether activities followed policy and whether suspicious behavior occurred. Logs can help investigators reconstruct an incident, identify affected accounts, and establish when permissions changed. Organizations should restrict access to logs, protect their integrity, synchronize system clocks where practical, define retention periods, and monitor important events.",
        ),
      ],
    },
    {
      id: "ias-m06-l05",
      lessonNo: "6.5",
      title: "Access Control Models",
      description:
        "Introduces discretionary, mandatory, role-based, and attribute-based access control.",
      keyTerms: [
        {
          word: "Discretionary Access Control (DAC)",
          definition:
            "An access control model in which resource owners or authorized subjects can grant permissions to other subjects.",
          source: "NIST SP 800-192",
        },
        {
          word: "Mandatory Access Control (MAC)",
          definition:
            "An access control model in which centrally defined rules and security labels govern access decisions.",
          source: "NIST SP 800-192",
        },
        {
          word: "Role-Based Access Control (RBAC)",
          definition:
            "An access control model that assigns permissions to roles and associates users with those roles.",
          source: "NIST RBAC Project",
        },
        {
          word: "Attribute-Based Access Control (ABAC)",
          definition:
            "An access control model that evaluates attributes of subjects, objects, requested operations, and environmental conditions.",
          source: "NIST SP 800-162",
        },
      ],
      durationMinutes: 30,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "DAC and MAC",
          "Discretionary Access Control allows resource owners or authorized users to grant permissions, such as sharing a document with a colleague. Mandatory Access Control relies on centrally established rules, often using security labels and clearance levels. MAC is suited to environments requiring tightly controlled information flows, while DAC offers flexibility but requires careful management of delegated permissions.",
        ),
        createSection(
          "02",
          "RBAC and ABAC",
          "Role-Based Access Control grants permissions through organizational roles, such as instructor, registrar, or system administrator. Attribute-Based Access Control evaluates attributes such as department, data classification, device condition, and time of access. RBAC is often easier to administer when responsibilities are stable, while ABAC supports more contextual decisions. Organizations may combine approaches to meet their access requirements.",
        ),
      ],
    },
    {
      id: "ias-m06-l06",
      lessonNo: "6.6",
      title: "Identity and Access Management",
      description:
        "Covers the creation, modification, review, and removal of digital identities and permissions.",
      keyTerms: [
        {
          word: "Identity and Access Management (IAM)",
          definition:
            "The policies, processes, and technologies used to manage identities and control access to resources.",
          source: "NIST SP 800-53",
        },
        {
          word: "Provisioning",
          definition:
            "The process of creating or configuring an account and assigning the access needed for an approved purpose.",
          source: "NIST SP 800-53",
        },
        {
          word: "Deprovisioning",
          definition:
            "The process of disabling or removing identities, accounts, and access when they are no longer required.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "The Identity Life Cycle",
          "IAM manages identities from creation through modification, review, suspension, and eventual removal. When an employee joins an organization, approved processes establish the account and grant role-appropriate access. Transfers and role changes require permissions to be updated. When a person leaves, access should be revoked promptly, including remote access, application accounts, tokens, and privileged credentials where applicable.",
        ),
        createSection(
          "02",
          "Access Reviews and Governance",
          "IAM processes should connect access requests to approval, business need, and accountable ownership. Periodic reviews help identify dormant accounts, excessive permissions, conflicting roles, and access that no longer matches a person's responsibilities. Automated provisioning can improve consistency, but exceptions, service accounts, emergency access, and third-party identities still require appropriate oversight and documentation.",
        ),
      ],
    },
    {
      id: "ias-m06-l07",
      lessonNo: "6.7",
      title: "Multi-Factor Authentication",
      description:
        "Requires multiple independent authentication factors to strengthen identity verification.",
      keyTerms: [
        {
          word: "Multi-Factor Authentication (MFA)",
          definition:
            "Authentication that requires two or more distinct types of authentication factors.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Knowledge Factor",
          definition:
            "An authentication factor based on something a claimant knows, such as a password or PIN.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Possession Factor",
          definition:
            "An authentication factor based on something a claimant possesses or controls, such as a security key.",
          source: "NIST SP 800-63B",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Authentication Factors",
          "Authentication factors are commonly grouped into something you know, something you have, and something you are. MFA combines distinct factor types, such as a password and a hardware security key. Two passwords are not two different factor types. Combining independent factors makes a stolen password less likely to be sufficient for account compromise.",
        ),
        createSection(
          "02",
          "Deploying MFA Securely",
          "Organizations should prioritize MFA for administrators, remote access, sensitive systems, and accounts with access to valuable information. Phishing-resistant methods, such as appropriately implemented security keys, provide stronger protection against credential phishing than methods that can be intercepted or socially engineered. Enrollment, lost-device recovery, backup methods, and account recovery must also be secured so attackers cannot bypass the primary authentication process.",
        ),
      ],
    },
    {
      id: "ias-m06-l08",
      lessonNo: "6.8",
      title: "Single Sign-On",
      description:
        "Allows users to access multiple applications through a shared authentication process.",
      keyTerms: [
        {
          word: "Single Sign-On (SSO)",
          definition:
            "An authentication arrangement that allows a user to access multiple applications through a shared sign-in process.",
          source: "NIST SP 800-63C",
        },
        {
          word: "Identity Provider (IdP)",
          definition:
            "A service that authenticates users and provides identity information or assertions to relying applications.",
          source: "NIST SP 800-63C",
        },
        {
          word: "Federation",
          definition:
            "An arrangement that enables identity and authentication information to be trusted across separate security domains.",
          source: "NIST SP 800-63C",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "How SSO Works",
          "Single Sign-On lets users authenticate through a trusted identity provider and then access multiple connected applications without independently entering credentials into every application. Depending on the implementation, systems may use protocols such as SAML or OpenID Connect to exchange authentication or identity information. Each application still makes its own authorization decisions based on the user's permissions and its security requirements.",
        ),
        createSection(
          "02",
          "Benefits and Security Considerations",
          "SSO can reduce password fatigue, simplify account management, and centralize authentication policies. However, a compromised identity provider or central account may affect access to many applications. Organizations should protect identity provider accounts with strong authentication, restrict administrative privileges, monitor sign-in activity, manage sessions carefully, and plan for outages and account recovery.",
        ),
      ],
    },
    {
      id: "ias-m06-l09",
      lessonNo: "6.9",
      title: "Privileged Access Management",
      description:
        "Secures administrator accounts and other identities with elevated permissions.",
      keyTerms: [
        {
          word: "Privileged Account",
          definition:
            "An account with elevated permissions that can perform sensitive administrative or security-related actions.",
          source: "NIST SP 800-53",
        },
        {
          word: "Privileged Access Management (PAM)",
          definition:
            "Policies and technologies used to control, monitor, and protect privileged accounts and sessions.",
          source: "NIST SP 800-53",
        },
        {
          word: "Just-in-Time Access",
          definition:
            "A practice of granting elevated permissions for a limited period when a specific authorized task requires them.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Risks of Privileged Accounts",
          "Administrator and service accounts can change configurations, manage users, access sensitive data, and disable safeguards. If compromised, these accounts may allow an attacker to cause extensive damage. Organizations should inventory privileged identities, restrict who can use them, separate administrative accounts from everyday accounts, and protect credentials with strong authentication and secure storage.",
        ),
        createSection(
          "02",
          "PAM Controls and Monitoring",
          "Privileged Access Management can include approval workflows, time-limited access, credential vaulting, session recording, and alerts for unusual administrative actions. Organizations should review privileged permissions regularly, remove unnecessary rights, and protect emergency accounts through documented procedures. Administrative activity should be logged and reviewed, with stronger oversight for actions that affect critical systems or security controls.",
        ),
      ],
    },
    {
      id: "ias-m06-l10",
      lessonNo: "6.10",
      title: "Principle of Least Privilege",
      description:
        "Limits permissions to those necessary for assigned responsibilities.",
      keyTerms: [
        {
          word: "Least Privilege",
          definition:
            "The principle of granting only the minimum access and permissions necessary to perform assigned tasks.",
          source: "NIST SP 800-53",
        },
        {
          word: "Privilege Creep",
          definition:
            "The gradual accumulation of permissions that are no longer necessary as roles and responsibilities change.",
          source: "NIST SP 800-53",
        },
        {
          word: "Need to Know",
          definition:
            "A restriction limiting access to information to people who require it for an authorized purpose.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Applying Least Privilege",
          "Least privilege limits what an account can read, change, execute, or administer. For example, a student may view their own grades, an instructor may update grades for assigned classes, and only designated administrators may manage system-wide settings. Restricting permissions reduces the opportunities for accidental damage, insider misuse, and the impact of compromised accounts.",
        ),
        createSection(
          "02",
          "Maintaining Appropriate Permissions",
          "Organizations should grant access based on documented responsibilities, review it periodically, and remove rights that are no longer needed. Temporary elevation can be used for approved tasks instead of granting permanent administrator privileges. Access reviews should also examine inherited permissions, shared accounts, service identities, and role changes to prevent privilege creep over time.",
        ),
      ],
    },
    {
      id: "ias-m06-l11",
      lessonNo: "6.11",
      title: "Separation of Duties",
      description:
        "Divides sensitive responsibilities to reduce errors, fraud, and misuse.",
      keyTerms: [
        {
          word: "Separation of Duties",
          definition:
            "A control that divides sensitive tasks among different individuals or roles to reduce the risk of abuse or error.",
          source: "NIST SP 800-53",
        },
        {
          word: "Dual Authorization",
          definition:
            "A requirement for two authorized individuals or approvals before a sensitive action can proceed.",
          source: "NIST SP 800-53",
        },
        {
          word: "Conflict of Interest",
          definition:
            "A situation in which responsibilities or incentives may compromise impartial decision-making or proper control.",
          source: "NIST SP 800-53",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Why Separation of Duties Matters",
          "Separation of duties prevents a single person from having unchecked control over an entire sensitive process. For example, one employee may request a payment while another approves it. In IT operations, a developer may create a change while a separate authorized reviewer approves deployment to production. Dividing responsibilities reduces the likelihood of undetected mistakes, fraud, or intentional misuse.",
        ),
        createSection(
          "02",
          "Implementing and Reviewing Duty Separation",
          "Organizations should identify critical activities, determine incompatible permissions, and assign responsibilities so that one person cannot bypass essential checks. Access control systems can enforce approval workflows or prevent conflicting role assignments. Where staffing constraints make full separation difficult, compensating controls such as independent reviews, transaction limits, and detailed monitoring can help reduce risk.",
        ),
      ],
    },
    {
      id: "ias-m06-l12",
      lessonNo: "6.12",
      title: "Zero Trust",
      description:
        "Applies explicit verification, least privilege, and ongoing evaluation rather than implicit trust.",
      keyTerms: [
        {
          word: "Zero Trust",
          definition:
            "A security approach that avoids granting implicit trust based solely on network location or prior access and instead evaluates access requests explicitly.",
          source: "NIST SP 800-207",
        },
        {
          word: "Policy Enforcement Point",
          definition:
            "A component that enables, monitors, and terminates access between a subject and a resource according to policy decisions.",
          source: "NIST SP 800-207",
        },
        {
          word: "Continuous Evaluation",
          definition:
            "The repeated evaluation of relevant identity, device, session, and risk information as conditions change.",
          source: "NIST SP 800-207",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Core Principles of Zero Trust",
          "Zero Trust assumes that network location alone is not sufficient evidence of trust. Access decisions should explicitly consider the identity of the user or service, device condition, requested resource, and applicable policy. Access is limited to the minimum necessary, and trust decisions may be reevaluated as conditions change. Zero Trust is an architectural approach, not a single product or a claim that every request can be made risk-free.",
        ),
        createSection(
          "02",
          "Applying Zero Trust in Practice",
          "An organization can implement Zero Trust through strong identity verification, device security checks, segmented resources, least-privilege permissions, and centralized policy enforcement. For example, a staff member accessing a sensitive application from an unmanaged device may be denied or required to satisfy additional conditions. Effective implementation also requires asset visibility, monitoring, incident response, and policies appropriate to each resource.",
        ),
      ],
    },
    {
      id: "ias-m06-l13",
      lessonNo: "6.13",
      title: "Biometric Authentication",
      description:
        "Uses characteristics such as fingerprints or facial features for identity verification.",
      keyTerms: [
        {
          word: "Biometric Characteristic",
          definition:
            "A measurable physical or behavioral characteristic used as part of a biometric recognition process.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Biometric Matching",
          definition:
            "The comparison of a captured biometric sample with a stored reference or enrolled template to evaluate similarity.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Presentation Attack",
          definition:
            "An attempt to interfere with a biometric system by presenting an artifact or characteristic intended to impersonate a legitimate user.",
          source: "ISO/IEC 30107-1",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Types and Operation of Biometric Authentication",
          "Biometric authentication may use fingerprints, facial characteristics, iris patterns, or certain behavioral characteristics. During enrollment, a system captures a sample and creates a reference representation. During verification, a new sample is compared with that reference and the system evaluates whether the match meets its decision threshold. Biometric matching is probabilistic, so it can produce false acceptance and false rejection outcomes.",
        ),
        createSection(
          "02",
          "Privacy, Reliability, and Secure Deployment",
          "Biometric systems require careful handling because biometric characteristics cannot be changed as easily as passwords if compromised. Organizations should protect biometric data, limit collection and retention, evaluate accuracy across relevant user groups, and consider presentation attacks. Biometrics are often used with a secure device or cryptographic authenticator rather than treated as a secret by themselves. Appropriate fallback and recovery options are also important.",
        ),
      ],
    },
    {
      id: "ias-m06-l14",
      lessonNo: "6.14",
      title: "Password Management",
      description:
        "Covers secure password creation, storage, handling, and authentication practices.",
      keyTerms: [
        {
          word: "Password",
          definition:
            "A memorized secret used as an authentication factor to demonstrate knowledge of a value associated with an account.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Password Manager",
          definition:
            "A tool that securely stores and helps generate or retrieve unique credentials for different accounts.",
          source: "NIST SP 800-63B",
        },
        {
          word: "Password Hashing",
          definition:
            "The use of a one-way cryptographic function, typically with a unique salt and an appropriate password-hashing scheme, to protect stored passwords.",
          source: "NIST SP 800-63B",
        },
      ],
      durationMinutes: 25,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Creating and Handling Strong Passwords",
          "Users should create passwords that are sufficiently long, unique to each service, and difficult to guess. Password reuse increases risk because a breach at one service may expose other accounts. A password manager can generate and store unique passwords, reducing the need to memorize many credentials. Users should never share passwords or disclose them in response to unexpected requests, and organizations should support secure account recovery.",
        ),
        createSection(
          "02",
          "Secure Storage and Verification",
          "Systems should not store passwords in plaintext or rely on reversible encryption as a substitute for appropriate password storage. Passwords should be processed using a suitable password-hashing scheme with unique salts and appropriately configured work factors. Authentication services should protect credentials in transit, screen new passwords against commonly used or compromised values where appropriate, limit online guessing attempts, and monitor suspicious activity. Password policies should follow current guidance rather than forcing arbitrary periodic changes without evidence of compromise.",
        ),
      ],
    },
  ],
  references: [
    {
      title: "SP 800-63-4: Digital Identity Guidelines",
      url: "https://doi.org/10.6028/NIST.SP.800-63-4",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-63A-4: Digital Identity Guidelines — Identity Proofing and Enrollment",
      url: "https://doi.org/10.6028/NIST.SP.800-63A-4",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-63B-4: Digital Identity Guidelines — Authentication and Authenticator Management",
      url: "https://doi.org/10.6028/NIST.SP.800-63B-4",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-63C-4: Digital Identity Guidelines — Federation and Assertions",
      url: "https://doi.org/10.6028/NIST.SP.800-63C-4",
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
      title: "SP 800-92: Guide to Computer Security Log Management",
      url: "https://doi.org/10.6028/NIST.SP.800-92",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-162: Guide to Attribute Based Access Control (ABAC) Definition and Considerations",
      url: "https://doi.org/10.6028/NIST.SP.800-162",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-192: Verification and Test Methods for Access Control Policies/Models",
      url: "https://doi.org/10.6028/NIST.SP.800-192",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "NIST/ANSI INCITS 359-2004: Role Based Access Control",
      url: "https://csrc.nist.gov/projects/role-based-access-control",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-207: Zero Trust Architecture",
      url: "https://doi.org/10.6028/NIST.SP.800-207",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "SP 800-63B: Digital Identity Guidelines — Authentication and Lifecycle Management",
      url: "https://pages.nist.gov/800-63-3/sp800-63b.html",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "ISO/IEC 30107-1: Information Technology — Biometric Presentation Attack Detection",
      url: "https://www.iso.org/standard/53227.html",
      author: "International Organization for Standardization",
      organization: "ISO/IEC",
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default module6;
