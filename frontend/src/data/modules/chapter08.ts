
import type { CloudComputingChapter } from "../../types/modules";

const cloudImage1 =
  "https://imgs.search.brave.com/Usib799dLoQ_cyg_LG-px2TiDKQmawxSLQAGUWAiyDI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MzQ5MzQ0Ni9waG90/by9kaWdpdGFsLWNs/b3VkLWNvbmNlcHQt/YmFja2dyb3VuZC1j/bG91ZC1jb21wdXRp/bmctc29sdXRpb25z/LWFuZC1ldm9sdXRp/b24tZnV0dXJpc3Rp/Yy1jbG91ZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TkxI/cnA2aXFYYlVOVXpw/RVNjNE1SdmctNGJZ/NDdZOFlWM0dVR0tK/OFFRUT0";

const cloudImage2 =
  "https://imgs.search.brave.com/NEBpERNUNhwK5ZOGyvGNcF0N7W-xat8HpOAOZLsbHt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/NDkxMjgwNy9waG90/by9jbG91ZC1jb21w/dXRpbmctY29uY2Vw/dC1kaWdpdGFsLWNs/b3VkLXNvbHV0aW9u/cy1vbi1wY2ItZnV0/dXJpc3RpYy1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1nTjJz/aUtNdUU5Y0JISnhu/Q1NlSTJHT3lVc3Fs/bVBQRmFSY2lka0VG/MzVBPQ";

export const cloudComputingChapter08: CloudComputingChapter = {
  chapterId: "cloud-computing-chapter-08",
  title: "Cloud Security and Privacy",
  description:
    "Introduces the principles, controls, and practices used to protect cloud infrastructure, applications, identities, and information. Covers the shared responsibility model, identity and access management, data protection, network and workload security, threat detection, privacy, compliance, incident response, and cloud security best practices.",
  durationMinutes: 30,
  objectives: [
    {
      objective:
        "Explain the core principles of cloud security, including confidentiality, integrity, availability, authentication, authorization, and accountability.",
    },
    {
      objective:
        "Describe the cloud shared responsibility model and identify how security responsibilities differ across service models.",
    },
    {
      objective:
        "Apply identity and access management principles, including least privilege, multi-factor authentication, role-based access, and credential protection.",
    },
    {
      objective:
        "Explain how encryption, key management, data classification, backup, and access controls protect cloud data.",
    },
    {
      objective:
        "Identify common cloud threats, misconfigurations, vulnerabilities, and attack techniques, and recommend appropriate mitigations.",
    },
    {
      objective:
        "Describe cloud workload, application, network, and infrastructure security controls.",
    },
    {
      objective:
        "Explain how logging, monitoring, vulnerability management, and incident response support cloud security operations.",
    },
    {
      objective:
        "Distinguish security from privacy and describe how governance, compliance, and responsible data handling protect cloud users and organizations.",
    },
  ],

  videoUrl: "https://www.youtube.com/embed/ICbgrmoB5ZE",

  slideUrl:
    "https://docs.google.com/presentation/d/e/2PACX-1vRjqCgBlndvDgCVkiESdvF_FZFd3C1itCK6MNStjFZ5AHyz356QNrziUR2k40BLXA/pubembed?start=false&loop=false&delayms=3000",

  sections: [
    {
      sectionNo: "8.1",
      header: "Fundamentals of Cloud Security and Privacy",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background representing cloud computing infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud security is the collection of technologies, policies, configurations, and operational practices used to protect cloud-based infrastructure, applications, identities, and information. It addresses risks such as unauthorized access, data exposure, service disruption, malicious activity, and accidental changes. Because cloud environments may contain resources distributed across regions, accounts, services, and networks, security requires a coordinated approach rather than a single protective tool.",
        },
        {
          paragraph:
            "The confidentiality, integrity, and availability (CIA) triad provides a foundational model for understanding information security. Confidentiality ensures that information is accessible only to authorized people and systems. Integrity protects information against unauthorized or inappropriate modification. Availability ensures that systems and data remain accessible when needed. A cloud security design should consider all three objectives because protecting one does not automatically guarantee the others.",
        },
        {
          paragraph:
            "Authentication verifies an identity, such as a user or application, while authorization determines which actions that identity is permitted to perform. Accountability involves being able to associate actions with identities and records through appropriate logging and auditing. For example, a student may authenticate to a learning platform using a verified account, but authorization rules should still prevent that student from accessing another student's private records.",
        },
        {
          paragraph:
            "Cloud security must address both technical and human factors. Weak passwords, exposed credentials, incorrect storage permissions, unpatched software, excessive administrative privileges, and poorly reviewed changes can all introduce risk. Security controls are most effective when supported by secure configuration standards, user awareness, monitoring, documented responsibilities, and regular testing.",
        },
        {
          paragraph:
            "Privacy is related to security but focuses on the appropriate collection, use, sharing, retention, and disposal of information about individuals. A system may encrypt personal data and restrict access yet still violate privacy expectations if it collects unnecessary information or uses it for an undisclosed purpose. Privacy therefore requires decisions about what data is collected, why it is needed, who may use it, how long it is retained, and what rights individuals have.",
        },
        {
          paragraph:
            "Risk-based security starts by identifying assets, threats, vulnerabilities, likelihood, and potential impact. A public course description generally has different confidentiality requirements from student grades, identity documents, or payment records. Security controls should be selected according to the sensitivity of the information, the consequences of a compromise, legal obligations, and the organization's operational needs.",
        },
        {
          paragraph:
            "No single control can eliminate every security risk. Encryption may protect stored data but cannot prevent every misuse by an authorized account. Firewalls can restrict network access but may not stop an attacker who compromises an application account. Effective cloud security combines preventive, detective, and corrective controls so that attacks are harder to execute, suspicious activity can be identified, and systems can recover when incidents occur.",
        },
      ],
    },

    {
      sectionNo: "8.2",
      header: "The Shared Responsibility Model",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept illustrating connected digital services and infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "The shared responsibility model explains how security duties are divided between a cloud provider and its customer. The provider is generally responsible for securing the underlying cloud infrastructure it operates, while the customer is responsible for securing the resources, data, identities, and configurations assigned to them. The exact division depends on the service, contractual terms, and provider-specific design.",
        },
        {
          paragraph:
            "Infrastructure as a Service (IaaS) typically gives customers substantial control over virtual machines, operating systems, installed software, virtual networks, and access policies. Customers therefore commonly manage operating system updates, workload hardening, application security, user permissions, and data protection. The provider manages the underlying physical infrastructure and other service components according to its responsibilities.",
        },
        {
          paragraph:
            "Platform as a Service (PaaS) provides a managed application platform that reduces the customer's responsibility for certain infrastructure and runtime components. The provider may manage operating system maintenance and platform patching, while the customer remains responsible for application code, application identities, data, configuration, and access permissions. Managed services do not make insecure application code or exposed credentials safe.",
        },
        {
          paragraph:
            "Software as a Service (SaaS) generally shifts more infrastructure and application operation to the provider. Customers still commonly manage their users, authentication settings, access permissions, data handling, sharing rules, endpoint security, and appropriate service configuration. For example, a company using a hosted collaboration application may not manage its servers, but it must still control who can access confidential documents.",
        },
        {
          paragraph:
            "Responsibility is not determined by the service label alone. A managed database, serverless function, storage service, and virtual machine may each have different responsibility boundaries. Customers should consult the provider's documentation, identify the controls available to them, and determine which duties remain theirs. The responsibility model should be evaluated for each important service rather than assumed to be identical across an entire cloud account.",
        },
        {
          paragraph:
            "A common security failure occurs when an organization assumes that the provider automatically secures every customer setting. A provider may supply access-control features, encryption capabilities, audit logs, and network restrictions, but the customer may need to enable or configure them correctly. Similarly, provider-managed infrastructure does not remove the customer's responsibility to select suitable recovery requirements or protect sensitive data.",
        },
        {
          paragraph:
            "Organizations can manage shared responsibilities through a documented control matrix. The matrix identifies each security requirement, the responsible party, the implementation method, and the evidence used to verify it. This helps prevent gaps in patching, identity management, incident response, backup, compliance, and data deletion. Responsibility assignments should be reviewed whenever services, contracts, or system architectures change.",
        },
      ],
    },

    {
      sectionNo: "8.3",
      header: "Identity and Access Management",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud background representing connected cloud resources.",
        },
      ],
      content: [
        {
          paragraph:
            "Identity and Access Management (IAM) controls which users, applications, services, and devices can access cloud resources and what actions they can perform. IAM typically includes identities, authentication methods, authorization policies, roles, credentials, and audit records. Effective IAM is essential because a compromised identity with excessive privileges can expose data or modify critical infrastructure without bypassing the cloud platform's normal access mechanisms.",
        },
        {
          paragraph:
            "Authentication verifies an identity using one or more authentication factors. These factors commonly include something the user knows, such as a password; something the user possesses, such as a security key; or something the user is, such as a biometric characteristic. Multi-factor authentication (MFA) combines factors from distinct categories. Requiring an additional factor can reduce the risk associated with stolen passwords, although phishing-resistant methods provide stronger protection against certain attacks than one-time codes alone.",
        },
        {
          paragraph:
            "Authorization determines the actions an authenticated identity may perform. Role-based access control (RBAC) assigns permissions through roles associated with job functions or responsibilities. Attribute-based access control (ABAC) evaluates attributes such as identity properties, resource tags, requested actions, or environmental conditions. Both approaches can support least privilege when policies are designed carefully and reviewed regularly.",
        },
        {
          paragraph:
            "The principle of least privilege requires users and services to receive only the permissions necessary for their intended tasks. A developer who needs to view application logs may not need permission to delete databases or change account-wide security settings. Separating ordinary accounts from privileged administrative accounts, limiting permission scope, and granting temporary elevated access where supported can reduce the impact of account compromise.",
        },
        {
          paragraph:
            "Applications and automated workloads also require identities. Service accounts, managed identities, and workload roles can provide controlled access to APIs and other cloud services. Where possible, organizations should prefer short-lived credentials or provider-managed identity mechanisms over embedded long-lived secrets. Credentials should never be committed to public repositories, placed in client-side code, or copied into logs and documentation.",
        },
        {
          paragraph:
            "Credential management includes secure storage, rotation where appropriate, revocation, recovery, and monitoring. Secrets management services can store sensitive values and provide controlled retrieval to authorized workloads. Organizations should investigate unexpected credential use, disable compromised credentials promptly, and review permissions granted to third-party integrations. Rotation alone is not sufficient if the underlying secret remains exposed or the identity retains excessive privileges.",
        },
        {
          paragraph:
            "IAM policies should be tested for both intended access and prohibited access. A successful test confirms that an authorized user can perform a required task; a negative test confirms that an unauthorized user cannot access a restricted resource. Periodic access reviews, removal of inactive identities, separation of duties, and audit logging help keep permissions aligned with current responsibilities.",
        },
      ],
    },

    {
      sectionNo: "8.4",
      header: "Data Protection, Encryption, and Key Management",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept illustrating digital cloud infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud data protection involves preventing unauthorized access, disclosure, alteration, destruction, and loss of information. Protection should cover data at rest, data in transit, and data while being processed where relevant. The controls required depend on data sensitivity, business value, legal obligations, access patterns, and the consequences of exposure or unavailability.",
        },
        {
          paragraph:
            "Encryption transforms readable data into ciphertext using a cryptographic algorithm and key. Encryption at rest protects stored information, while encryption in transit protects information moving between clients, services, or networks. Secure protocols such as Transport Layer Security (TLS) are commonly used to protect application communication. Encryption is valuable only when cryptographic settings, identities, keys, and access policies are managed appropriately.",
        },
        {
          paragraph:
            "Cloud services may provide default encryption, provider-managed keys, or options for customer-managed keys. With provider-managed keys, the provider handles many key-management tasks. Customer-managed keys can provide additional control over permissions, rotation policies, auditing, and revocation, but they also introduce operational responsibilities. Available options and the division of responsibilities differ by provider and service.",
        },
        {
          paragraph:
            "Key management includes creating or importing keys, restricting access, defining rotation practices, monitoring key usage, and planning for recovery or revocation. A key should not be accessible to every identity that can access the encrypted data. Separating key-management permissions from ordinary data access can reduce the impact of compromised accounts. Organizations must also understand how key deletion or disabling affects the ability to decrypt data and restore backups.",
        },
        {
          paragraph:
            "Data classification assigns categories according to sensitivity, regulatory requirements, or business importance. Public information, internal operational data, confidential business records, and sensitive personal information may require different controls. Classification can guide encryption requirements, access permissions, logging, retention, approved storage locations, and sharing rules. Labels are useful only when they are connected to practical policies and enforced consistently.",
        },
        {
          paragraph:
            "Data minimization reduces the collection and retention of information that is not necessary for a defined purpose. Organizations should collect only the personal information they need, restrict access to appropriate personnel, and remove or anonymize information when retention is no longer justified and applicable requirements permit it. Minimization reduces exposure if a system is compromised and simplifies governance.",
        },
        {
          paragraph:
            "Backups and versioning can help recover data from accidental deletion, corruption, or certain attacks. However, backups also contain sensitive information and require appropriate encryption, access controls, retention, and monitoring. Replication is not equivalent to an independent backup because destructive changes can propagate to replicated copies. Recovery plans should be tested, and backup access should be separated from routine application permissions where feasible.",
        },
        {
          paragraph:
            "Data protection must account for the complete information lifecycle, including creation, use, sharing, export, archival, and deletion. Copies may exist in databases, logs, caches, snapshots, backups, and downstream analytics systems. Organizations should document where sensitive data resides and how each copy is controlled. Deletion procedures must consider legal retention requirements and the behavior of the relevant cloud service.",
        },
      ],
    },

    {
      sectionNo: "8.5",
      header: "Cloud Threats, Vulnerabilities, and Secure Configuration",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background representing cloud infrastructure and connected systems.",
        },
      ],
      content: [
        {
          paragraph:
            "A threat is a potential cause of harm, while a vulnerability is a weakness that could be exploited. Risk depends on factors such as the likelihood of exploitation and the impact if it occurs. In cloud environments, risks may arise from external attackers, malicious insiders, compromised credentials, vulnerable software, accidental configuration changes, or failures in operational processes.",
        },
        {
          paragraph:
            "Misconfiguration is a significant source of cloud security exposure. Examples include publicly accessible storage that should be private, overly permissive firewall rules, unrestricted administrative access, disabled audit logging, excessive IAM permissions, and secrets stored in source code. Cloud resources can be deployed rapidly, so an incorrect configuration may affect many systems before it is noticed. Secure defaults, automated policy checks, and configuration reviews help reduce this risk.",
        },
        {
          paragraph:
            "Credential theft can allow an attacker to operate through legitimate cloud interfaces. Attackers may obtain credentials through phishing, malware, exposed secrets, compromised devices, or vulnerable applications. Defenses include MFA, phishing-resistant authentication where available, short-lived credentials, least privilege, secret scanning, sign-in monitoring, and prompt revocation of compromised access. Unusual identity behavior should be investigated even when the requests use valid credentials.",
        },
        {
          paragraph:
            "Insecure APIs and applications can expose cloud resources through broken authorization, injection flaws, weak validation, insecure dependencies, or insufficient rate limiting. Cloud hosting does not automatically correct application-level vulnerabilities. Secure development practices should include threat modeling, code review, dependency scanning, security testing, input validation, robust authentication, and authorization checks on the server side.",
        },
        {
          paragraph:
            "Distributed denial-of-service (DDoS) attacks attempt to overwhelm a service or its supporting resources with excessive traffic or requests. Mitigation may involve provider protections, traffic filtering, rate limiting, content delivery networks, load balancing, and carefully designed capacity controls. These defenses should be selected according to the service architecture and provider capabilities. Scaling alone is not a complete defense because it can increase costs without restoring service.",
        },
        {
          paragraph:
            "Malware and ransomware can compromise cloud workloads, endpoints, or identities and may encrypt, destroy, or exfiltrate data. Protective measures include supported software versions, timely patching, endpoint and workload monitoring, restricted administrative permissions, segmented networks, protected backups, and rehearsed incident response. Detection and recovery should be designed together because prevention cannot guarantee that every attack will be stopped.",
        },
        {
          paragraph:
            "Vulnerability management identifies, assesses, prioritizes, and remediates weaknesses in systems and applications. Prioritization should consider exploitability, exposure, asset criticality, available mitigations, and potential impact rather than relying only on a numerical severity score. Organizations should track remediation work, verify fixes, and document exceptions with a clear owner and review date.",
        },
        {
          paragraph:
            "A secure configuration baseline defines the minimum approved settings for cloud resources. It may cover identity permissions, encryption, logging, network exposure, software versions, backup requirements, and monitoring. Automated configuration assessment can identify deviations from the baseline. Changes should be reviewed and tested so that security improvements do not unintentionally disrupt required application functionality.",
        },
      ],
    },

    {
      sectionNo: "8.6",
      header: "Workload, Network, and Application Security",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept representing interconnected digital services.",
        },
      ],
      content: [
        {
          paragraph:
            "Workload security protects the compute resources that run applications, including virtual machines, containers, serverless functions, and managed application services. Controls may include hardened configurations, supported software, vulnerability management, restricted permissions, network segmentation, runtime monitoring, and secure deployment processes. The exact controls depend on the workload type and the responsibilities assigned by the provider.",
        },
        {
          paragraph:
            "Virtual machines typically require attention to guest operating system updates, installed packages, host-based security settings, administrative accounts, and application configuration. Managed platforms may reduce the need to maintain the underlying operating system, but customers still need to secure application code, identities, secrets, and service settings. Security responsibilities should be confirmed for each workload rather than assumed from its deployment method.",
        },
        {
          paragraph:
            "Containers package an application and its dependencies into a portable unit, but they do not eliminate security risks. Image vulnerabilities, excessive container privileges, exposed secrets, insecure orchestration settings, and untrusted image sources can compromise workloads. Good practices include using trusted images, scanning dependencies, minimizing image contents, restricting runtime privileges, and applying appropriate isolation and network policies.",
        },
        {
          paragraph:
            "Serverless computing shifts more infrastructure management to the provider, but functions and event-driven applications still require secure code, appropriate permissions, input validation, dependency management, and protected secrets. A function should receive only the permissions needed for its task. Excessively broad execution roles can allow a small application flaw to affect unrelated services or data.",
        },
        {
          paragraph:
            "Network controls should restrict communication to necessary paths. Public-facing components should be separated from sensitive internal resources, and databases should not be publicly accessible unless a carefully justified design requires it. Security groups, network ACLs, firewalls, private endpoints, and routing policies can enforce these boundaries. Administrators should test actual reachability because the presence of a private subnet or firewall alone does not prove that a resource is inaccessible from untrusted networks.",
        },
        {
          paragraph:
            "Application security includes secure authentication, server-side authorization, input validation, output encoding, safe error handling, and protection against common application vulnerabilities. API endpoints should verify that the requesting identity may access the specific record or action requested. Authentication alone does not prove that a user is authorized to access every resource exposed by an application.",
        },
        {
          paragraph:
            "A secure software development lifecycle integrates security into planning, design, implementation, testing, deployment, and maintenance. Threat modeling identifies likely attack paths before implementation. Code analysis, dependency scanning, dynamic testing, and configuration checks can detect different categories of defects. No single testing method finds every vulnerability, so layered verification is preferable.",
        },
        {
          paragraph:
            "Security controls should be validated through authorized testing and continuous monitoring. Teams may test access boundaries, verify that unauthorized requests are rejected, inspect deployed configurations, and confirm that logs and alerts work as intended. Testing should follow approved scope and safeguards to avoid disrupting production systems or accessing data beyond the authorization granted.",
        },
      ],
    },

    {
      sectionNo: "8.7",
      header: "Security Monitoring, Auditing, and Incident Response",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud background illustrating cloud computing systems and infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud security monitoring uses telemetry and analysis to identify suspicious activity, policy violations, vulnerabilities, and unexpected changes. Relevant signals may include authentication events, API activity, network flows, firewall decisions, workload events, storage access, and configuration changes. Monitoring should focus on the assets and risks that matter most instead of collecting large amounts of data without a defined use.",
        },
        {
          paragraph:
            "Audit logs record activities that can support accountability, investigations, compliance, and troubleshooting. Depending on the service, logs may show who performed an action, what resource was affected, when the action occurred, and whether it succeeded. Organizations should enable appropriate audit sources, protect logs from unauthorized modification, restrict access, synchronize timestamps where possible, and define retention periods.",
        },
        {
          paragraph:
            "Security alerts can be triggered by events such as unusual sign-in locations, unexpected privilege escalation, public exposure of sensitive storage, suspicious API activity, or disabled logging. An alert indicates that a condition needs assessment; it does not always prove that an attack occurred. Analysts should validate evidence, consider legitimate operational explanations, and prioritize investigation according to potential impact and urgency.",
        },
        {
          paragraph:
            "A security incident is an event that compromises or threatens the confidentiality, integrity, or availability of information or systems. Incident response commonly includes preparation, detection and analysis, containment, eradication, recovery, and post-incident learning. The sequence may vary according to the incident, and containment actions should account for business impact, legal obligations, and the need to preserve relevant evidence.",
        },
        {
          paragraph:
            "Containment limits the immediate impact of an incident. Actions may include disabling compromised credentials, isolating an affected workload, restricting network paths, blocking malicious activity, or suspending an unsafe deployment. Teams should avoid destroying evidence unnecessarily and should record important decisions and timestamps. The appropriate action depends on the threat, affected resources, and incident-response plan.",
        },
        {
          paragraph:
            "Recovery restores affected services and verifies that they can operate safely. This may require rebuilding compromised workloads from trusted images, restoring clean data, rotating secrets, validating permissions, and monitoring for recurring malicious activity. Simply restarting a compromised system is not enough if the vulnerability or persistence mechanism remains. Recovery should include tests of application behavior and security controls.",
        },
        {
          paragraph:
            "An incident-response plan defines responsibilities, communication channels, escalation paths, decision authority, evidence handling, and coordination with cloud providers or other parties. Teams should know which actions they can perform directly and which require provider support. Contact information, access procedures, and recovery instructions should be available even if the normal collaboration systems are unavailable.",
        },
        {
          paragraph:
            "Post-incident reviews examine the timeline, root and contributing causes, effectiveness of detection, and quality of response. The goal is to identify improvements rather than merely assign blame. Corrective actions may include stronger access controls, better alerts, improved deployment checks, updated documentation, additional training, or architectural changes. Exercises and simulations help teams practice these procedures before a real incident occurs.",
        },
      ],
    },

    {
      sectionNo: "8.8",
      header: "Cloud Privacy, Compliance, and Security Governance",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud computing concept illustrating connected services and infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud privacy concerns how personal information is collected, used, shared, retained, transferred, and deleted. Security controls protect information from unauthorized access or harm, while privacy practices also determine whether information is handled appropriately in the first place. An organization can have strong technical security and still create privacy risks by collecting unnecessary personal information or using it beyond the stated purpose.",
        },
        {
          paragraph:
            "Privacy by design incorporates privacy considerations into system planning and development rather than adding them only after deployment. Teams should identify the purposes of data collection, minimize the information collected, restrict access, define retention periods, and consider privacy risks before introducing new processing activities. Privacy impact assessments or equivalent reviews can help evaluate risks to individuals and determine appropriate safeguards.",
        },
        {
          paragraph:
            "Data residency describes where data is stored or processed, while data sovereignty concerns the legal and governmental authority that may apply to data in a particular context. These concepts can influence cloud architecture, but choosing a geographic region does not by itself resolve every legal obligation. Organizations should evaluate provider terms, applicable laws, cross-border transfers, support access, backup locations, and the locations of relevant subprocessors.",
        },
        {
          paragraph:
            "Compliance refers to meeting applicable laws, regulations, contractual obligations, and organizational requirements. Cloud-related obligations vary according to industry, jurisdiction, data type, and organizational role. Standards and frameworks such as ISO/IEC 27001, the NIST Cybersecurity Framework, and relevant sector-specific requirements can help structure security programs, but adopting a framework does not automatically establish legal compliance or guarantee that every control is effective.",
        },
        {
          paragraph:
            "Organizations in the Philippines handling personal data should assess the requirements of the Data Privacy Act of 2012 (Republic Act No. 10173), its implementing rules, and applicable guidance from the National Privacy Commission. Relevant responsibilities can include lawful and transparent processing, appropriate security safeguards, data-subject rights, retention, and breach-related obligations. The precise obligations depend on the facts and applicable rules; organizations should consult authoritative guidance or qualified legal advice when necessary.",
        },
        {
          paragraph:
            "Security governance defines policies, accountability, decision-making, and oversight for cloud environments. It can establish approved configurations, identity standards, logging requirements, encryption expectations, data-handling rules, and exception procedures. Governance should be practical and risk-based: requirements need clear owners, implementation methods, evidence of compliance, and a process for reviewing changes.",
        },
        {
          paragraph:
            "Third-party risk management evaluates the security and privacy implications of using cloud providers, software vendors, and external service integrations. Review areas may include contractual responsibilities, access to data, incident notification, service availability, data location, subcontractors, deletion procedures, and audit evidence. Provider certifications or assurance reports can support an assessment, but customers must still determine whether the covered services and controls match their own requirements.",
        },
        {
          paragraph:
            "A sustainable cloud security program combines clear ownership, documented policies, secure configuration, identity controls, data protection, monitoring, incident response, and regular review. Organizations should maintain an inventory of important assets, map sensitive data flows, test recovery, assess changes, and track unresolved risks. Security and privacy should be revisited as applications, threats, regulations, and business needs evolve.",
        },
      ],
    },
  ],

  keyTerms: [
    {
      word: "Cloud Security",
      definition:
        "The policies, technologies, configurations, and operational practices used to protect cloud infrastructure, applications, identities, and data.",
      source: "https://csrc.nist.gov/pubs/sp/800/144/final",
    },
    {
      word: "Confidentiality",
      definition:
        "The property that information is not made available or disclosed to unauthorized individuals, entities, or processes.",
      source: "https://csrc.nist.gov/glossary/term/confidentiality",
    },
    {
      word: "Integrity",
      definition:
        "The property that information and systems remain accurate and complete and are protected against improper modification or destruction.",
      source: "https://csrc.nist.gov/glossary/term/integrity",
    },
    {
      word: "Availability",
      definition:
        "The property that information and services are accessible and usable when required by an authorized entity.",
      source: "https://csrc.nist.gov/glossary/term/availability",
    },
    {
      word: "Shared Responsibility Model",
      definition:
        "A model that defines how cloud security responsibilities are divided between a cloud provider and its customer according to the services used.",
      source: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    },
    {
      word: "Authentication",
      definition:
        "The process of verifying a claimed identity before allowing access to a system or resource.",
      source: "https://csrc.nist.gov/glossary/term/authentication",
    },
    {
      word: "Authorization",
      definition:
        "The process of determining whether an authenticated identity is permitted to perform a particular action or access a resource.",
      source: "https://csrc.nist.gov/glossary/term/authorization",
    },
    {
      word: "Identity and Access Management (IAM)",
      definition:
        "The policies and mechanisms used to manage identities, authenticate users or services, and control access to resources.",
      source: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
    },
    {
      word: "Multi-Factor Authentication (MFA)",
      definition:
        "An authentication method requiring two or more distinct authentication factors to establish a user's identity.",
      source: "https://pages.nist.gov/800-63-4/sp800-63b.html",
    },
    {
      word: "Least Privilege",
      definition:
        "The security principle of granting only the access and permissions necessary to perform an authorized task.",
      source: "https://csrc.nist.gov/glossary/term/least_privilege",
    },
    {
      word: "Role-Based Access Control (RBAC)",
      definition:
        "An access-control approach in which permissions are associated with roles and users or other identities are assigned those roles.",
      source: "https://csrc.nist.gov/pubs/ir/6192/final",
    },
    {
      word: "Encryption",
      definition:
        "The cryptographic transformation of information into a form intended to prevent its meaning from being understood without the appropriate key or process.",
      source: "https://csrc.nist.gov/glossary/term/encryption",
    },
    {
      word: "Encryption at Rest",
      definition:
        "Cryptographic protection applied to data stored on persistent media or within a storage service.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html",
    },
    {
      word: "Encryption in Transit",
      definition:
        "Cryptographic protection of information while it is transmitted between systems, services, or endpoints.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryptionInTransit.html",
    },
    {
      word: "Key Management",
      definition:
        "The processes and controls for creating, protecting, using, rotating, revoking, and retiring cryptographic keys.",
      source: "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final",
    },
    {
      word: "Data Classification",
      definition:
        "The categorization of information according to sensitivity, business value, or handling requirements to guide protective controls.",
      source: "https://csrc.nist.gov/pubs/sp/800/60/v1/r1/final",
    },
    {
      word: "Vulnerability",
      definition:
        "A weakness in a system, process, or control that a threat source could exploit or trigger.",
      source: "https://csrc.nist.gov/glossary/term/vulnerability",
    },
    {
      word: "Threat",
      definition:
        "A circumstance or event with the potential to adversely affect operations, assets, individuals, or systems.",
      source: "https://csrc.nist.gov/glossary/term/threat",
    },
    {
      word: "Misconfiguration",
      definition:
        "An incorrect or insecure resource setting that may expose a system to unintended access, behavior, or risk.",
      source: "https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-standards-fsbp-controls.html",
    },
    {
      word: "Security Monitoring",
      definition:
        "The collection and analysis of events, logs, and other signals to detect suspicious activity and assess the security state of systems.",
      source: "https://csrc.nist.gov/pubs/sp/800/137/final",
    },
    {
      word: "Audit Log",
      definition:
        "A record of system or user activity that supports accountability, investigation, compliance review, and troubleshooting.",
      source: "https://csrc.nist.gov/pubs/sp/800/92/final",
    },
    {
      word: "Incident Response",
      definition:
        "The organized process of preparing for, detecting, analyzing, containing, recovering from, and learning from security incidents.",
      source: "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
    },
    {
      word: "Privacy by Design",
      definition:
        "An approach that incorporates privacy considerations and safeguards into the design and operation of systems and processes.",
      source: "https://www.nist.gov/privacy-framework",
    },
    {
      word: "Data Residency",
      definition:
        "The geographic location in which data is stored or processed, as defined by the system architecture and applicable service arrangements.",
      source: "https://learn.microsoft.com/en-us/azure/security/fundamentals/data-residency",
    },
    {
      word: "Data Governance",
      definition:
        "The policies, responsibilities, and oversight processes that guide data ownership, quality, access, protection, and appropriate use.",
      source: "https://www.nist.gov/privacy-framework",
    },
    {
      word: "Data Privacy Act of 2012",
      definition:
        "A Philippine law establishing rules and protections concerning the processing of personal information and the rights of data subjects.",
      source: "https://privacy.gov.ph/data-privacy-act/",
    },
  ],

  references: [
    {
      author:
        "National Institute of Standards and Technology (NIST). Guidelines on Security and Privacy in Public Cloud Computing (SP 800-144).",
      link: "https://csrc.nist.gov/pubs/sp/800/144/final",
    },
    {
      author:
        "Amazon Web Services. AWS Shared Responsibility Model.",
      link: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Computer Security Resource Center Glossary.",
      link: "https://csrc.nist.gov/glossary",
    },
    {
      author:
        "Amazon Web Services. AWS Identity and Access Management User Guide.",
      link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Digital Identity Guidelines: Authentication and Lifecycle Management (SP 800-63B).",
      link: "https://pages.nist.gov/800-63-4/sp800-63b.html",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Recommendation for Key Management: Part 1 — General (SP 800-57 Part 1 Rev. 5).",
      link: "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final",
    },
    {
      author:
        "Amazon Web Services. Protecting Data with Amazon S3 Encryption.",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html",
    },
    {
      author:
        "Amazon Web Services. Protecting Data in Transit.",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryptionInTransit.html",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Guide for Mapping Types of Information and Information Systems to Security Categories (SP 800-60).",
      link: "https://csrc.nist.gov/pubs/sp/800/60/v1/r1/final",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Information Security Continuous Monitoring (SP 800-137).",
      link: "https://csrc.nist.gov/pubs/sp/800/137/final",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Guide to Computer Security Log Management (SP 800-92).",
      link: "https://csrc.nist.gov/pubs/sp/800/92/final",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile (SP 800-61 Rev. 3).",
      link: "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). NIST Privacy Framework.",
      link: "https://www.nist.gov/privacy-framework",
    },
    {
      author:
        "National Institute of Standards and Technology (NIST). NIST Cybersecurity Framework.",
      link: "https://www.nist.gov/cyberframework",
    },
    {
      author:
        "Microsoft. Azure Data Residency.",
      link: "https://learn.microsoft.com/en-us/azure/security/fundamentals/data-residency",
    },
    {
      author:
        "National Privacy Commission, Philippines. Data Privacy Act of 2012.",
      link: "https://privacy.gov.ph/data-privacy-act/",
    },
    {
      author:
        "National Privacy Commission, Philippines. Implementing Rules and Regulations of the Data Privacy Act of 2012.",
      link: "https://privacy.gov.ph/implementing-rules-regulations-data-privacy-act-2012/",
    },
  ],

  createdAt: "2026-10-24T00:00:00.000Z",
  updatedAt: "2026-10-24T00:00:00.000Z",
};
