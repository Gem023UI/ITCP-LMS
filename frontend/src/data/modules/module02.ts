
import type { IASModule } from "../../types/modules";

const placeholderImageUrl =
  "https://imgs.search.brave.com/z4FWaj5duxzaztXq8f_Dw4vp1U2pu0TmMaIYQy-sMWg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5p/c3RvY2twaG90/by5jb20vaWQvMjIxNjQyNjcxMy9waG90/by9mb2N1c2VkLXN5/c3RlbS1hZG1pbmlz/dHJhdG9yLW9yLWNv/bnN1bHRhbnQtbG9v/ay1hdC10aGUtc2Ny/ZWVuLWFuZC1zYXZl/cy1iYWNrdXAtZGF0/YS1pbi1kYXJrLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1y/akpUcGV4TFk2dW4y/U1ZORHZLQzRLNjB2/cTIzTFBtTV9fVzdC/SVJjYXF3PQ";

const placeholderVideo = {
  title: "Introduction to Information Security",
  url: "https://www.youtube.com/embed/X-O1-l0gP5Q?si=WwjFU_8f0WSKrE5_",
  provider: "YouTube",
};

const module2: IASModule = {
  unitId: "ias-module-01",
  moduleId: "02",
  title: "Security Threats, Vulnerabilities, and Attacks",
  description:
    "Explains how security incidents occur, what weaknesses attackers exploit, and how common attack methods affect information systems. Learners examine malicious software, social engineering, credential attacks, service disruption, application vulnerabilities, insider threats, supply-chain risks, and physical security threats.",
  objectives: [
    "Differentiate threats, vulnerabilities, and risks in information systems.",
    "Identify common malware types and explain their potential impact.",
    "Recognize phishing and social engineering techniques and appropriate defensive practices.",
    "Explain common password and credential attacks and methods for reducing their likelihood.",
    "Describe denial-of-service, man-in-the-middle, spoofing, and impersonation attacks.",
    "Evaluate the risks associated with insiders, zero-day vulnerabilities, and advanced persistent threats.",
    "Identify common web application attacks and explain their potential consequences.",
    "Explain how supply-chain compromises and physical security incidents affect information assets.",
    "Recommend appropriate preventive, detective, and corrective measures for common security threats.",
  ],
  lessons: [
    {
      id: "ias-m02-l01",
      lessonNo: "2.1",
      title: "Threats, Vulnerabilities, and Risk",
      description:
        "Differentiates potential sources of harm, weaknesses in systems, and the risks that arise when threats can exploit those weaknesses.",
      keyTerms: [
        {
          word: "Threat",
          definition:
            "A circumstance, event, or actor with the potential to cause harm to an information system or organization.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Vulnerability",
          definition:
            "A weakness in a system, security procedure, implementation, or internal control that could be exploited by a threat.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Risk",
          definition:
            "The possibility of adverse consequences resulting from uncertainty, commonly evaluated through the likelihood and impact of a threat-related event.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Understanding Threats and Vulnerabilities",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Security incidents often occur when a threat encounters an exploitable vulnerability. Threats may come from cybercriminals, malicious insiders, human error, equipment failures, or environmental events. Vulnerabilities are weaknesses such as outdated software, weak passwords, excessive permissions, or missing security procedures. A threat does not automatically result in an incident; the circumstances must allow it to cause harm. Identifying both threats and vulnerabilities helps organizations understand where protection is needed.",
        },
        {
          sectionNo: "02",
          header: "Assessing and Managing Risk",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Risk assessment considers the likelihood of an adverse event and the severity of its consequences. For example, an internet-facing server running outdated software may be exposed to attacks that exploit known flaws. If the server stores sensitive records, a successful attack could cause significant harm. Organizations assess these factors to prioritize patching, access restrictions, monitoring, and recovery planning. Risk can be reduced through safeguards, avoided by changing an activity, transferred where appropriate, or accepted when justified by organizational requirements.",
        },
      ],
    },
    {
      id: "ias-m02-l02",
      lessonNo: "2.2",
      title: "Malware",
      description:
        "Introduces malicious software, including viruses, worms, Trojans, spyware, ransomware, and other programs designed to compromise systems, information, or operations.",
      keyTerms: [
        {
          word: "Malware",
          definition:
            "Software or firmware intended to perform unauthorized processes that compromise the confidentiality, integrity, or availability of information or systems.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Ransomware",
          definition:
            "Malware that prevents access to data or systems, commonly through encryption, and demands payment or another concession to restore access or prevent further harm.",
          source: "CISA StopRansomware — https://www.cisa.gov/stopransomware",
        },
        {
          word: "Trojan Horse",
          definition:
            "Malicious software that disguises its purpose or appears to be legitimate software to persuade users to execute or install it.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Common Types of Malware",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Malware includes several categories with different behaviors. Viruses attach to files or programs and spread when their hosts execute. Worms can spread between systems without requiring a user to manually transfer an infected file. Trojans disguise malicious functionality as legitimate software. Spyware collects information without appropriate authorization, while ransomware can encrypt files or disrupt access to systems. Other malware may create unauthorized remote access, steal credentials, or misuse system resources. Some threats combine multiple behaviors, making classification alone insufficient for determining their full impact.",
        },
        {
          sectionNo: "02",
          header: "How Malware Spreads and How to Respond",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Malware may enter systems through malicious attachments, compromised websites, untrusted downloads, removable media, or exploited software vulnerabilities. Warning signs can include unexpected pop-ups, unusual network activity, missing files, or unfamiliar programs, although some infections remain difficult to detect. Protective measures include maintaining updated software, using reputable security tools, restricting administrative privileges, and maintaining tested backups. If an infection is suspected, users should report it promptly and follow organizational incident-response procedures. Isolating an affected device when safe and instructed can help limit further spread.",
        },
      ],
    },
    {
      id: "ias-m02-l03",
      lessonNo: "2.3",
      title: "Phishing and Social Engineering",
      description:
        "Explains how attackers manipulate trust, urgency, fear, curiosity, and authority to persuade people to disclose information, transfer money, or perform unsafe actions.",
      keyTerms: [
        {
          word: "Phishing",
          definition:
            "A form of social engineering that uses deceptive electronic communications or websites to trick people into revealing sensitive information or performing harmful actions.",
          source: "CISA — https://www.cisa.gov/topics/cyber-threats-and-advisories",
        },
        {
          word: "Social Engineering",
          definition:
            "The use of psychological manipulation to influence people into disclosing information, granting access, or taking actions that compromise security.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Pretexting",
          definition:
            "A social engineering technique in which an attacker invents a plausible scenario or identity to persuade a target to provide information or assistance.",
          source: "NIST Privacy Framework — https://www.nist.gov/privacy-framework",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Recognizing Social Engineering",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Social engineering exploits human behavior rather than relying exclusively on technical weaknesses. Attackers may pretend to be supervisors, technical support personnel, delivery services, or financial institutions. They may create urgency, threaten account suspension, promise rewards, or request secrecy to discourage verification. Phishing commonly uses email or deceptive websites, while smishing uses text messages and vishing uses voice calls. Targeted phishing, sometimes called spear phishing, is customized for a particular person or organization. Recognizing manipulation tactics is an important first step in preventing these incidents.",
        },
        {
          sectionNo: "02",
          header: "Responding Safely to Suspicious Requests",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Users should verify unusual requests through an independent, trusted communication channel instead of relying on contact details provided in the suspicious message. They should inspect unexpected links carefully, avoid opening untrusted attachments, and never share passwords or authentication codes in response to unsolicited requests. Organizations can reduce risk through security awareness training, email filtering, multifactor authentication, and clear reporting procedures. If someone submits credentials to a suspected phishing site, they should report the incident immediately and follow instructions to secure the account and investigate possible unauthorized access.",
        },
      ],
    },
    {
      id: "ias-m02-l04",
      lessonNo: "2.4",
      title: "Password and Credential Attacks",
      description:
        "Covers brute-force attacks, credential stuffing, password spraying, and credential theft, explaining how attackers abuse weak or reused credentials to gain unauthorized access.",
      keyTerms: [
        {
          word: "Brute-Force Attack",
          definition:
            "An attack that systematically attempts possible passwords, keys, or other credentials until a valid match is found or the available attempts are exhausted.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Credential Stuffing",
          definition:
            "An attack that uses previously exposed username-and-password combinations to attempt access to other accounts where the same credentials may have been reused.",
          source: "OWASP Automated Threats to Web Applications — https://owasp.org/www-project-automated-threats-to-web-applications/",
        },
        {
          word: "Password Spraying",
          definition:
            "An attack that tries a small number of commonly used passwords across many accounts to reduce the likelihood of triggering account-specific lockout controls.",
          source: "MITRE ATT&CK — https://attack.mitre.org/techniques/T1110/",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Common Credential Attack Methods",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Credentials are frequent targets because they provide access to email, databases, cloud services, and other valuable resources. Brute-force attacks attempt many possible combinations, while dictionary attacks focus on likely passwords. Credential stuffing relies on passwords exposed through earlier breaches, and password spraying tests a small set of common passwords against multiple accounts. Credentials can also be stolen through phishing, malware, or exposed configuration files. Successful account compromise may allow attackers to steal information, impersonate users, or establish further access within an organization.",
        },
        {
          sectionNo: "02",
          header: "Strengthening Account Security",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Organizations can reduce credential attacks by requiring long, unique passwords and encouraging password managers. Multifactor authentication adds another layer of protection, especially for privileged and remotely accessible accounts. Systems should use secure password storage, monitor unusual login patterns, apply suitable rate limits, and screen new passwords against known compromised-password lists. Login protections must be designed carefully so that attackers cannot easily lock legitimate users out of their accounts. If credentials may have been exposed, users should change affected passwords, revoke compromised sessions where appropriate, and review account activity.",
        },
      ],
    },
    {
      id: "ias-m02-l05",
      lessonNo: "2.5",
      title: "Denial-of-Service Attacks",
      description:
        "Explains how denial-of-service and distributed denial-of-service attacks overwhelm or exhaust system resources, preventing legitimate users from accessing services.",
      keyTerms: [
        {
          word: "Denial of Service (DoS)",
          definition:
            "An attack intended to make a system, network, or service unavailable to legitimate users.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Distributed Denial of Service (DDoS)",
          definition:
            "A denial-of-service attack launched using multiple sources or compromised systems to overwhelm a target or its supporting infrastructure.",
          source: "CISA — https://www.cisa.gov/topics/cyber-threats-and-advisories",
        },
        {
          word: "Availability",
          definition:
            "The property that information and services remain accessible and usable when required by authorized users.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "How DoS and DDoS Attacks Disrupt Services",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "A denial-of-service attack disrupts availability by exhausting resources such as network bandwidth, connection capacity, memory, or application processing time. A basic DoS attack may originate from one source, while a DDoS attack distributes traffic or requests across many systems. Some DDoS attacks use compromised devices that form a botnet. During an incident, users may experience slow responses, connection failures, or complete service outages. Online stores, university portals, banking platforms, and public information services can all be affected, even if their stored data remains intact.",
        },
        {
          sectionNo: "02",
          header: "Detecting and Mitigating Service Disruption",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Defenses include traffic monitoring, rate limiting, network filtering, content delivery networks, and specialized DDoS protection services. Redundant infrastructure and capacity planning can improve resilience, while incident-response plans help teams coordinate during an outage. Administrators should establish normal traffic baselines and investigate sudden changes in request volume, connection patterns, or response times. Blocking traffic indiscriminately may also prevent legitimate users from accessing services, so mitigation requires careful tuning. Organizations should coordinate with their hosting providers and network operators when an attack exceeds local defensive capabilities.",
        },
      ],
    },
    {
      id: "ias-m02-l06",
      lessonNo: "2.6",
      title: "Man-in-the-Middle Attacks",
      description:
        "Describes how attackers intercept or manipulate communications between parties, potentially exposing sensitive information or altering data exchanged between systems.",
      keyTerms: [
        {
          word: "Man-in-the-Middle (MitM) Attack",
          definition:
            "An attack in which an unauthorized party positions itself between communicating entities to observe, intercept, or manipulate their communications.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Encryption",
          definition:
            "The transformation of information into a form that conceals its meaning from unauthorized parties and can be reversed by authorized parties using the appropriate key.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Transport Layer Security (TLS)",
          definition:
            "A cryptographic protocol that helps protect communications against eavesdropping and tampering and can authenticate servers through certificates.",
          source: "IETF TLS 1.3 — https://www.rfc-editor.org/rfc/rfc8446",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Understanding Intercepted Communications",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "In a man-in-the-middle attack, an attacker interferes with communication between two parties that believe they are communicating directly. Depending on the circumstances, the attacker may observe unprotected traffic, steal session information, or alter messages. Risk can increase when users connect to untrusted networks, ignore certificate warnings, or use improperly configured services. For example, a compromised network connection may expose information exchanged with a poorly secured application. Modern encrypted protocols reduce these risks when implemented correctly and when endpoints verify the identities of the systems they contact.",
        },
        {
          sectionNo: "02",
          header: "Protecting Data in Transit",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Use HTTPS and properly configured TLS to protect information exchanged with websites and services. Users should avoid bypassing certificate warnings and should verify that sensitive activities occur on legitimate websites. Organizations should keep cryptographic software updated, validate certificates correctly, and protect session tokens using appropriate application controls. Virtual private networks can protect traffic on certain untrusted networks, but they do not automatically make every destination trustworthy. Encryption also cannot prevent every endpoint compromise, so secure devices, account protection, and monitoring remain important parts of an effective defense.",
        },
      ],
    },
    {
      id: "ias-m02-l07",
      lessonNo: "2.7",
      title: "Spoofing and Impersonation",
      description:
        "Explains how attackers falsify identities, sender information, websites, network addresses, or communications to mislead users and systems.",
      keyTerms: [
        {
          word: "Spoofing",
          definition:
            "The falsification of information about an identity, source, or communication so that it appears to originate from a different or trusted entity.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "IP Spoofing",
          definition:
            "The falsification of source IP address information in network packets to misrepresent where the traffic originated.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Impersonation",
          definition:
            "The act of pretending to be a legitimate person, organization, or system to deceive others or obtain unauthorized access.",
          source: "CISA — https://www.cisa.gov/topics/cyber-threats-and-advisories",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Types of Spoofing and Impersonation",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Spoofing makes a communication or source appear more trustworthy than it is. Email spoofing can falsify sender information, while website spoofing creates deceptive pages that imitate legitimate services. Caller ID spoofing may make a fraudulent phone call appear to come from a familiar number. IP spoofing misrepresents a packet's source address and can be used in certain network attacks. Impersonation can also involve fake employee profiles, fraudulent support representatives, or cloned social media accounts. These techniques frequently support phishing, fraud, unauthorized access, and the theft of sensitive information.",
        },
        {
          sectionNo: "02",
          header: "Verifying Sources and Preventing Deception",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Users should independently verify unusual requests for money, credentials, confidential files, or account changes. Email authentication technologies such as SPF, DKIM, and DMARC help receiving systems assess whether messages are authorized by a domain, although they do not eliminate all deceptive messages. Organizations should protect their domains, monitor suspicious activity, and provide clear procedures for confirming sensitive transactions. A familiar sender name, logo, phone number, or website appearance is not sufficient proof of legitimacy. Verification should rely on trusted channels and appropriate authentication rather than appearance alone.",
        },
      ],
    },
    {
      id: "ias-m02-l08",
      lessonNo: "2.8",
      title: "Insider Threats",
      description:
        "Examines security risks originating from authorized users, including malicious insiders, negligent employees, and legitimate accounts compromised by external attackers.",
      keyTerms: [
        {
          word: "Insider Threat",
          definition:
            "The potential for an individual with authorized access, or knowledge of an organization, to cause harm intentionally or unintentionally.",
          source: "CISA Insider Threat Mitigation — https://www.cisa.gov/topics/physical-security/insider-threat-mitigation",
        },
        {
          word: "Least Privilege",
          definition:
            "The principle of granting only the minimum permissions required to perform an assigned task.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Separation of Duties",
          definition:
            "A control that divides sensitive responsibilities among multiple people or roles to reduce the opportunity for misuse or undetected error.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Malicious, Negligent, and Compromised Insiders",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Insider threats may involve employees, contractors, administrators, or other people with legitimate access to organizational resources. A malicious insider may deliberately steal records or sabotage systems. A negligent insider may expose data by misconfiguring a service, losing a device, or mishandling confidential documents. A compromised insider account may be controlled by an external attacker using stolen credentials. Because authorized users often have access to sensitive systems, insider incidents can be difficult to distinguish from legitimate activity without appropriate controls, monitoring, and contextual investigation.",
        },
        {
          sectionNo: "02",
          header: "Reducing Insider Risk",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Organizations can reduce insider risk through least privilege, separation of duties, periodic access reviews, security awareness training, and appropriate monitoring. Sensitive actions may require approval from another authorized person, while audit records can help identify unusual downloads, permission changes, or access patterns. Access should be updated promptly when responsibilities change or employment ends. Monitoring must be proportionate and respect applicable privacy and employment requirements. Effective insider-risk management combines technical safeguards with clear policies, fair reporting processes, and a workplace culture that encourages responsible security practices.",
        },
      ],
    },
    {
      id: "ias-m02-l09",
      lessonNo: "2.9",
      title: "Zero-Day Vulnerabilities",
      description:
        "Introduces vulnerabilities that are exploited before an effective fix is available to the affected organization, highlighting the importance of exposure reduction and rapid response.",
      keyTerms: [
        {
          word: "Zero-Day Vulnerability",
          definition:
            "A software or hardware flaw for which a relevant fix or effective mitigation is not yet available to the affected party when exploitation occurs.",
          source: "CISA Known Exploited Vulnerabilities Catalog — https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        },
        {
          word: "Exploit",
          definition:
            "A technique or piece of code that takes advantage of a vulnerability to cause unintended behavior or gain an unauthorized capability.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Mitigation",
          definition:
            "An action or safeguard that reduces the likelihood or impact of a threat, vulnerability, or security incident.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Why Zero-Day Vulnerabilities Are Dangerous",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "A zero-day vulnerability presents a challenge because affected organizations may have little or no time to deploy a vendor-provided correction before exploitation begins. Attackers may discover flaws independently, acquire information about them, or exploit weaknesses before defenders understand the threat. Potential consequences include unauthorized access, data theft, service disruption, and further compromise. Not every newly discovered vulnerability is actively exploited, and the term zero-day is used differently across contexts. The key concern is the lack of an available, effective fix or sufficient warning when protection is needed.",
        },
        {
          sectionNo: "02",
          header: "Reducing Exposure Before a Patch Exists",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Organizations cannot always eliminate zero-day risk immediately, but they can reduce exposure. Measures include limiting network access, disabling unnecessary services, applying available vendor mitigations, segmenting critical systems, monitoring suspicious behavior, and maintaining tested recovery procedures. Asset inventories help identify affected software quickly when new advisories appear. Once a security update becomes available, teams should assess its relevance, test it appropriately, and deploy it according to risk and operational requirements. CISA's Known Exploited Vulnerabilities Catalog can help organizations prioritize flaws known to be exploited in real-world attacks.",
        },
      ],
    },
    {
      id: "ias-m02-l10",
      lessonNo: "2.10",
      title: "Advanced Persistent Threats",
      description:
        "Examines targeted, sustained intrusions in which attackers seek persistent access to an organization or pursue long-term objectives such as espionage, data theft, or strategic disruption.",
      keyTerms: [
        {
          word: "Advanced Persistent Threat (APT)",
          definition:
            "A sophisticated, often well-resourced adversary that conducts targeted operations and seeks to maintain access to selected systems over an extended period.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Persistence",
          definition:
            "Techniques used by an attacker to maintain access to a system or environment across interruptions, such as restarts or changes to user sessions.",
          source: "MITRE ATT&CK — https://attack.mitre.org/tactics/TA0003/",
        },
        {
          word: "Lateral Movement",
          definition:
            "Techniques used by an attacker to move from one compromised system or account to other resources within an environment.",
          source: "MITRE ATT&CK — https://attack.mitre.org/tactics/TA0008/",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Characteristics and Objectives of APTs",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Advanced persistent threats are associated with targeted campaigns rather than isolated attempts to compromise a random victim. Their objectives may include intelligence gathering, intellectual property theft, strategic surveillance, or disruption. A campaign may use several techniques, including social engineering, exploitation of vulnerabilities, credential theft, and attempts to maintain access over time. Attackers may move between systems after obtaining an initial foothold and try to avoid detection. The term describes a style of threat activity; it does not mean every targeted intrusion is equally sophisticated or linked to a particular nation or group.",
        },
        {
          sectionNo: "02",
          header: "Detecting and Responding to Persistent Intrusions",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Defending against persistent intrusions requires visibility across endpoints, identity systems, networks, and cloud environments. Useful measures include multifactor authentication, network segmentation, endpoint monitoring, centralized logging, vulnerability management, and reviewing unusual account behavior. Security teams should investigate suspicious persistence mechanisms, unexpected administrative access, and unexplained communication with external systems. If an intrusion is confirmed, response may require isolating affected assets, preserving evidence, removing unauthorized access, restoring trusted systems, and reviewing how the attacker entered. Recovery should include addressing the original weaknesses to reduce the likelihood of reinfection.",
        },
      ],
    },
    {
      id: "ias-m02-l11",
      lessonNo: "2.11",
      title: "Web Application Attacks",
      description:
        "Introduces common application-level attacks, including SQL injection, cross-site scripting, and cross-site request forgery, and explains how secure development practices reduce their impact.",
      keyTerms: [
        {
          word: "SQL Injection",
          definition:
            "An attack in which untrusted input changes the intended meaning of a database query, potentially exposing or modifying data.",
          source: "OWASP SQL Injection Prevention Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
        },
        {
          word: "Cross-Site Scripting (XSS)",
          definition:
            "A vulnerability that allows untrusted content to cause malicious script execution in a user's browser within the security context of a website.",
          source: "OWASP Cross Site Scripting Prevention Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
        },
        {
          word: "Cross-Site Request Forgery (CSRF)",
          definition:
            "An attack that tricks a user's authenticated browser into submitting an unwanted request to a web application.",
          source: "OWASP CSRF Prevention Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
        },
      ],
      durationMinutes: 20,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Common Web Application Vulnerabilities",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Web applications process user input, access databases, and perform actions on behalf of users. SQL injection occurs when unsafe input changes a database query. Cross-site scripting occurs when untrusted content is handled in a way that permits unwanted script execution in a browser. Cross-site request forgery abuses an authenticated browser to submit an action the user did not intend. Other application risks include broken access control, insecure configuration, and weak session management. Depending on the flaw, attackers may access unauthorized records, manipulate application behavior, or perform actions using another user's privileges.",
        },
        {
          sectionNo: "02",
          header: "Secure Development and Application Testing",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Secure applications use parameterized database queries, context-appropriate output encoding, server-side input validation, and authorization checks on every sensitive operation. Anti-CSRF tokens and appropriate cookie settings help protect state-changing requests, while secure session management reduces the risk of session misuse. Developers should avoid relying on client-side validation alone because requests can be modified outside the intended interface. Code review, dependency scanning, security testing, and timely updates help identify weaknesses before deployment. OWASP guidance provides practical recommendations for preventing and testing common web application vulnerabilities.",
        },
      ],
    },
    {
      id: "ias-m02-l12",
      lessonNo: "2.12",
      title: "Supply-Chain Attacks",
      description:
        "Explains how compromised suppliers, software dependencies, service providers, or software delivery processes can introduce security risks into otherwise trusted systems.",
      keyTerms: [
        {
          word: "Supply-Chain Attack",
          definition:
            "An attack that compromises a target indirectly by exploiting weaknesses in its suppliers, service providers, software components, or delivery processes.",
          source: "CISA — https://www.cisa.gov/topics/cyber-threats-and-advisories",
        },
        {
          word: "Software Dependency",
          definition:
            "An external library, package, framework, or component that an application relies on to provide functionality.",
          source: "OWASP Software Component Verification Standard — https://owasp.org/www-project-software-component-verification-standard/",
        },
        {
          word: "Software Bill of Materials (SBOM)",
          definition:
            "A formal record of software components and their relationships that helps organizations understand the contents of a software product.",
          source: "CISA SBOM — https://www.cisa.gov/sbom",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "How Supply-Chain Compromises Occur",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Organizations depend on external software, cloud platforms, hardware manufacturers, contractors, and managed service providers. If one of these trusted parties is compromised, attackers may use that relationship to reach downstream organizations. A malicious software update, a compromised package dependency, or stolen vendor credentials can introduce risks that are difficult to identify through ordinary perimeter defenses. Supply-chain attacks demonstrate that a system's security depends partly on the trustworthiness and security practices of its external dependencies, not just on controls implemented within the organization itself.",
        },
        {
          sectionNo: "02",
          header: "Managing Third-Party and Dependency Risk",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Supply-chain risk management includes evaluating vendors, limiting third-party permissions, reviewing dependency updates, verifying software provenance, and monitoring relevant security advisories. Software bills of materials can help identify affected components when a vulnerability is disclosed. Organizations should obtain software from trusted sources, protect build and release systems, and require appropriate security commitments from suppliers. Vendor access should be restricted to necessary resources and reviewed regularly. Because external compromise cannot always be prevented, organizations should also prepare detection, incident-response, and recovery procedures for incidents involving suppliers or software components.",
        },
      ],
    },
    {
      id: "ias-m02-l13",
      lessonNo: "2.13",
      title: "Physical Security Threats",
      description:
        "Covers physical and environmental threats, including theft, unauthorized entry, tampering, equipment damage, and natural events that can compromise information assets and system availability.",
      keyTerms: [
        {
          word: "Physical Security",
          definition:
            "The protection of people, facilities, equipment, and other tangible assets against unauthorized access, damage, theft, or disruption.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Environmental Threat",
          definition:
            "A natural or facility-related condition, such as fire, flooding, excessive heat, or power failure, that can damage assets or interrupt operations.",
          source: "NIST SP 800-34 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        },
        {
          word: "Physical Access Control",
          definition:
            "A safeguard that restricts entry to buildings, rooms, equipment, or other physical areas to authorized individuals.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        {
          sectionNo: "01",
          header: "Physical and Environmental Risks",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Information assets face physical threats as well as digital attacks. An unauthorized person may steal a laptop, enter a restricted server room, tamper with equipment, or access unattended documents. Environmental incidents such as fire, flooding, excessive heat, and power interruptions can damage hardware or make services unavailable. Lost devices may expose sensitive information when storage is not adequately protected. Physical incidents can also support cyberattacks, such as when an intruder gains direct access to an unattended workstation or network connection.",
        },
        {
          sectionNo: "02",
          header: "Protecting Facilities and Equipment",
          imageUrl: placeholderImageUrl,
          imageSource: "User-provided placeholder image URL.",
          textContent:
            "Physical safeguards include locks, access badges, visitor registration, security cameras where appropriate, equipment inventories, and secure storage for sensitive records. Server rooms may require restricted entry, environmental monitoring, backup power, and suitable fire protection. Organizations should secure portable devices, maintain backups in separate protected locations, and establish procedures for reporting lost equipment or unauthorized entry. Physical security should be incorporated into business continuity and disaster recovery planning. Effective protection combines facility safeguards, responsible user behavior, regular inspections, and documented incident-response procedures.",
        },
      ],
    },
  ],
  references: [
    {
      title: "Guide for Conducting Risk Assessments (SP 800-30 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
      author: "Joint Task Force Transformation Initiative",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "NIST Computer Security Resource Center Glossary",
      url: "https://csrc.nist.gov/glossary",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "StopRansomware",
      url: "https://www.cisa.gov/stopransomware",
      author: "Cybersecurity and Infrastructure Security Agency",
      organization: "CISA",
    },
    {
      title: "Automated Threats to Web Applications",
      url: "https://owasp.org/www-project-automated-threats-to-web-applications/",
      author: "OWASP Foundation",
      organization: "OWASP",
    },
    {
      title: "MITRE ATT&CK: Brute Force",
      url: "https://attack.mitre.org/techniques/T1110/",
      author: "MITRE",
      organization: "MITRE ATT&CK",
    },
    {
      title: "Transport Layer Security (TLS) Protocol Version 1.3",
      url: "https://www.rfc-editor.org/rfc/rfc8446",
      author: "Eric Rescorla",
      organization: "Internet Engineering Task Force (IETF)",
    },
    {
      title: "Insider Threat Mitigation",
      url: "https://www.cisa.gov/topics/physical-security/insider-threat-mitigation",
      author: "Cybersecurity and Infrastructure Security Agency",
      organization: "CISA",
    },
    {
      title: "Known Exploited Vulnerabilities Catalog",
      url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      author: "Cybersecurity and Infrastructure Security Agency",
      organization: "CISA",
    },
    {
      title: "MITRE ATT&CK: Persistence",
      url: "https://attack.mitre.org/tactics/TA0003/",
      author: "MITRE",
      organization: "MITRE ATT&CK",
    },
    {
      title: "MITRE ATT&CK: Lateral Movement",
      url: "https://attack.mitre.org/tactics/TA0008/",
      author: "MITRE",
      organization: "MITRE ATT&CK",
    },
    {
      title: "SQL Injection Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      author: "OWASP Cheat Sheet Series Team",
      organization: "OWASP Foundation",
    },
    {
      title: "Cross Site Scripting Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      author: "OWASP Cheat Sheet Series Team",
      organization: "OWASP Foundation",
    },
    {
      title: "Cross-Site Request Forgery Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
      author: "OWASP Cheat Sheet Series Team",
      organization: "OWASP Foundation",
    },
    {
      title: "Software Component Verification Standard",
      url: "https://owasp.org/www-project-software-component-verification-standard/",
      author: "OWASP Foundation",
      organization: "OWASP",
    },
    {
      title: "Software Bill of Materials",
      url: "https://www.cisa.gov/sbom",
      author: "Cybersecurity and Infrastructure Security Agency",
      organization: "CISA",
    },
    {
      title: "Contingency Planning Guide for Federal Information Systems (SP 800-34 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "Security and Privacy Controls for Information Systems and Organizations (SP 800-53 Rev. 5)",
      url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      author: "Joint Task Force",
      organization: "National Institute of Standards and Technology (NIST)",
    },
  ],
  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z",
};

export default module2;
