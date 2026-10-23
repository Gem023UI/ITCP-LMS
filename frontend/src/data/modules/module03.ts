
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

const module3: IASModule = {
  unitId: "ias-module-01",
  moduleId: "03",
  title: "Information Security Risk Management",
  description:
    "Teaches learners to identify, analyze, prioritize, treat, and monitor risks to organizational information systems. The module introduces practical risk assessment methods, vulnerability analysis, threat modeling, business impact analysis, residual risk, and third-party risk management to support informed security decisions.",
  objectives: [
    "Identify information assets, threats, vulnerabilities, and conditions that may affect organizational objectives.",
    "Explain how likelihood and impact contribute to information security risk analysis.",
    "Distinguish qualitative and quantitative risk assessment methods.",
    "Evaluate and prioritize risks according to severity and organizational priorities.",
    "Compare risk avoidance, mitigation, transfer, and acceptance.",
    "Explain how vulnerability assessments and threat modeling support risk reduction.",
    "Describe the purpose of business impact analysis and residual risk evaluation.",
    "Explain how continuous risk monitoring supports effective security management.",
    "Identify methods for assessing and managing third-party security risks.",
  ],
  lessons: [
    {
      id: "ias-m03-l01",
      lessonNo: "3.1",
      title: "Risk Identification",
      description:
        "Identifies information assets, potential threats, vulnerabilities, and operating conditions that could affect organizational objectives and information security.",
      keyTerms: [
        {
          word: "Risk Identification",
          definition:
            "The process of recognizing and documenting potential sources of risk, their causes, and the assets or objectives they may affect.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Asset Inventory",
          definition:
            "A documented record of organizational resources, such as information, hardware, software, systems, and services that require protection.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Risk Register",
          definition:
            "A record of identified risks and their relevant details, which may include causes, impacts, owners, responses, and current status.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Identifying Assets and Potential Risks",
          "Risk identification begins by understanding what an organization needs to protect and what could interfere with its objectives. Assets may include databases, applications, networks, devices, personnel, facilities, and essential services. After identifying assets, analysts examine possible threats, existing vulnerabilities, dependencies, and operational conditions. For example, a university enrollment system may face risks from stolen credentials, outdated software, accidental deletion, and power interruptions. Identifying these possibilities provides the foundation for determining which risks require further analysis.",
        ),
        createSection(
          "02",
          "Documenting Risk Scenarios",
          "A useful risk scenario connects a potential cause with an event and its consequences. For example, an attacker could exploit an unpatched server vulnerability to access confidential student records, resulting in privacy violations and operational disruption. Risk documentation should identify the affected asset, relevant threat, vulnerability, possible consequences, and existing safeguards. A risk register helps teams maintain a consistent record, assign responsibility, and track progress. Risk identification should be revisited when systems change, new threats emerge, or organizational priorities are updated.",
        ),
      ],
    },
    {
      id: "ias-m03-l02",
      lessonNo: "3.2",
      title: "Risk Analysis",
      description:
        "Explains how analysts estimate the likelihood and consequences of security incidents to understand the level of risk facing information systems and organizational operations.",
      keyTerms: [
        {
          word: "Risk Analysis",
          definition:
            "The process of examining identified risks to understand their likelihood, consequences, and other characteristics relevant to decision-making.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Likelihood",
          definition:
            "An estimate of the chance that a particular threat event will occur or successfully produce an adverse outcome within a specified context.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Impact",
          definition:
            "The magnitude of harm or adverse consequences that an event could cause to an organization, its operations, assets, or individuals.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Estimating Likelihood and Impact",
          "Risk analysis examines how likely a security incident is and how serious its consequences could be. Likelihood may depend on the presence of exploitable vulnerabilities, attacker capability, exposure, and the effectiveness of existing controls. Impact may involve financial losses, data exposure, service disruption, legal consequences, or reputational damage. Analysts should consider both direct and indirect consequences. For instance, a compromised student database could require incident investigation, system restoration, affected-person notifications, and additional protective measures.",
        ),
        createSection(
          "02",
          "Using Evidence to Analyze Risk",
          "Risk estimates should be based on available evidence rather than assumptions alone. Useful evidence includes incident history, vulnerability reports, system configurations, threat intelligence, audit findings, and interviews with system owners. Analysts should document assumptions, uncertainty, and limitations because information about future events is rarely complete. Existing security controls must also be considered when estimating how likely an incident is to succeed and how much harm it could cause. A well-documented analysis allows decision-makers to understand why a risk receives a particular rating.",
        ),
      ],
    },
    {
      id: "ias-m03-l03",
      lessonNo: "3.3",
      title: "Qualitative Risk Assessment",
      description:
        "Uses descriptive categories such as low, medium, high, and critical to evaluate and communicate risk when precise numerical estimates are unavailable or unnecessary.",
      keyTerms: [
        {
          word: "Qualitative Risk Assessment",
          definition:
            "A risk assessment approach that uses descriptive categories, expert judgment, and defined criteria to characterize likelihood, impact, or overall risk.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Risk Matrix",
          definition:
            "A visual tool that combines likelihood and impact ratings to classify risks according to an established rating scheme.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Risk Rating",
          definition:
            "A classification representing the assessed significance of a risk according to defined organizational criteria.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Assigning Descriptive Risk Ratings",
          "Qualitative assessment describes likelihood and impact using categories such as low, medium, high, and critical. Organizations define what each category means so different analysts can evaluate risks consistently. For example, a high-impact event might expose thousands of confidential records or interrupt a critical service for an extended period. A likelihood rating may consider exposure, known exploitation activity, and current safeguards. These descriptive ratings are especially useful when detailed financial data is unavailable or when an organization needs an initial assessment of many risks.",
        ),
        createSection(
          "02",
          "Using a Risk Matrix",
          "A risk matrix combines likelihood and impact ratings to assign an overall risk level. A scenario with high likelihood and high impact would generally receive greater attention than one with low likelihood and low impact, subject to the organization's defined criteria. The matrix helps teams communicate priorities and identify risks requiring additional treatment. However, qualitative ratings can be subjective, and different teams may interpret categories differently. Documented rating definitions, consistent assessment procedures, and periodic reviews improve reliability. A matrix supports judgment; it does not replace careful analysis.",
        ),
      ],
    },
    {
      id: "ias-m03-l04",
      lessonNo: "3.4",
      title: "Quantitative Risk Assessment",
      description:
        "Uses numerical estimates, probabilities, frequencies, and financial values to estimate risk exposure and support decisions about security investments.",
      keyTerms: [
        {
          word: "Quantitative Risk Assessment",
          definition:
            "A risk assessment approach that uses numerical values to estimate likelihood, consequences, or potential losses associated with risk scenarios.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Single Loss Expectancy (SLE)",
          definition:
            "An estimate of the financial loss associated with one occurrence of a specific risk event.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Annualized Loss Expectancy (ALE)",
          definition:
            "An estimate of expected annual financial loss for a risk scenario, often calculated as single loss expectancy multiplied by annualized rate of occurrence.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Expressing Risk in Numerical Terms",
          "Quantitative assessment expresses risk using numbers, such as estimated annual incident frequency, recovery costs, or financial losses. One commonly taught model calculates single loss expectancy (SLE) by multiplying asset value by the estimated exposure factor. Annualized loss expectancy (ALE) can then be estimated by multiplying SLE by the annualized rate of occurrence. For example, if an incident could cause an estimated ₱100,000 loss and is expected to occur 0.2 times per year, the modeled annualized loss expectancy is ₱20,000. These are estimates, not guaranteed future losses.",
        ),
        createSection(
          "02",
          "Interpreting Quantitative Estimates",
          "Numerical estimates can help compare risks and evaluate whether a proposed safeguard is financially justified. However, results depend on the quality of the input data, assumptions about incident frequency, and estimates of direct and indirect costs. Rare events may have limited historical data, while privacy or reputational consequences can be difficult to express in money. Analysts should communicate uncertainty and avoid presenting estimated losses as precise predictions. Quantitative analysis is most useful when its assumptions are transparent and the results are considered alongside operational, legal, and human consequences.",
        ),
      ],
    },
    {
      id: "ias-m03-l05",
      lessonNo: "3.5",
      title: "Risk Evaluation and Prioritization",
      description:
        "Ranks identified risks according to severity, likelihood, business impact, and organizational priorities so resources can be directed toward the most significant exposures.",
      keyTerms: [
        {
          word: "Risk Evaluation",
          definition:
            "The process of comparing analyzed risk results against established criteria to determine whether risks require treatment or further action.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Risk Appetite",
          definition:
            "The broad amount and type of risk an organization is willing to pursue or retain in achieving its objectives.",
          source: "NIST IR 8286 Series — https://csrc.nist.gov/projects/risk-management/about-rmf",
        },
        {
          word: "Risk Tolerance",
          definition:
            "The acceptable variation in risk exposure around organizational objectives or established risk limits.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Evaluating Risks Against Organizational Criteria",
          "After analysis, risks are compared against criteria such as impact thresholds, legal requirements, service criticality, and approved risk limits. A risk with a moderate likelihood may still require immediate attention if it could expose highly sensitive data or interrupt an essential service. Conversely, a low-impact issue may be scheduled for later treatment if more serious exposures exist. Evaluation determines whether a risk is acceptable, requires additional controls, or needs escalation to management. Decisions should reflect the organization's objectives and obligations, not just technical severity scores.",
        ),
        createSection(
          "02",
          "Prioritizing Limited Security Resources",
          "Organizations rarely have unlimited time and funding to address every risk simultaneously. Prioritization helps allocate resources to the exposures that could cause the greatest harm or violate critical requirements. Teams may consider exploitability, affected assets, exposure to external threats, existing safeguards, recovery difficulty, and the cost of treatment. A documented priority list should identify risk owners, planned actions, deadlines, and escalation requirements. Priorities must be reviewed as conditions change, because a newly exploited vulnerability or critical service dependency can quickly make a previously moderate risk urgent.",
        ),
      ],
    },
    {
      id: "ias-m03-l06",
      lessonNo: "3.6",
      title: "Risk Treatment",
      description:
        "Explores the main strategies for responding to identified risks: avoidance, mitigation, transfer, and acceptance, including how organizations select and document appropriate responses.",
      keyTerms: [
        {
          word: "Risk Avoidance",
          definition:
            "A risk response that stops or does not undertake an activity when the associated risk is considered unacceptable.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Risk Mitigation",
          definition:
            "A response that introduces or improves safeguards to reduce the likelihood or impact of a risk.",
          source: "NIST SP 800-53 Rev. 5 — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
        },
        {
          word: "Risk Transfer",
          definition:
            "A response that shifts or shares specified financial or operational consequences with another party through arrangements such as insurance or contracts, without necessarily eliminating the underlying risk.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Four Common Risk Treatment Strategies",
          "Risk avoidance eliminates exposure by stopping an activity or choosing a safer alternative. Risk mitigation reduces risk through safeguards such as patching, encryption, monitoring, or access restrictions. Risk transfer shifts or shares some consequences through insurance, contracts, or service arrangements, although responsibility and residual exposure may remain. Risk acceptance means knowingly retaining a risk within approved limits. For example, an organization may mitigate a database vulnerability through patching, transfer certain financial consequences through insurance, or accept a low-level residual risk after evaluation and approval.",
        ),
        createSection(
          "02",
          "Selecting and Documenting a Risk Response",
          "The appropriate response depends on the potential consequences, treatment cost, legal obligations, operational requirements, and organizational risk tolerance. Some situations require multiple strategies. A company may mitigate a cloud service risk through access controls while transferring specified financial losses through insurance and accepting a remaining low-level exposure. Risk owners should document the selected response, supporting rationale, responsible parties, deadlines, and expected residual risk. Acceptance should be authorized by an appropriate decision-maker and should never be used to bypass mandatory security or legal requirements.",
        ),
      ],
    },
    {
      id: "ias-m03-l07",
      lessonNo: "3.7",
      title: "Vulnerability Assessment",
      description:
        "Explains how organizations identify, evaluate, validate, and prioritize technical weaknesses in systems, applications, networks, and configurations.",
      keyTerms: [
        {
          word: "Vulnerability Assessment",
          definition:
            "A systematic process for identifying, analyzing, and prioritizing weaknesses that could be exploited to compromise systems or information.",
          source: "NIST SP 800-115 — https://csrc.nist.gov/pubs/sp/800/115/final",
        },
        {
          word: "Vulnerability Scanner",
          definition:
            "A tool that examines systems or applications for known weaknesses, insecure configurations, missing updates, or other detectable security issues.",
          source: "NIST SP 800-115 — https://csrc.nist.gov/pubs/sp/800/115/final",
        },
        {
          word: "Common Vulnerability Scoring System (CVSS)",
          definition:
            "A standardized framework for describing the characteristics and severity of software vulnerabilities through numerical scores and related metrics.",
          source: "FIRST CVSS — https://www.first.org/cvss/",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Identifying and Evaluating Vulnerabilities",
          "Vulnerability assessments examine systems for weaknesses such as outdated software, insecure configurations, unnecessary services, weak access controls, and known software flaws. Assessments may use automated scanning, manual configuration reviews, dependency analysis, and interviews with system administrators. Results should be validated because automated tools can produce false positives or miss issues that require contextual investigation. Testing must be authorized and scoped appropriately to avoid disrupting production systems. An assessment provides a view of known weaknesses, but it cannot guarantee that every vulnerability has been discovered.",
        ),
        createSection(
          "02",
          "Prioritizing Remediation",
          "Vulnerability severity scores provide useful technical context, but remediation priorities should also consider exploit availability, active exploitation, system exposure, asset criticality, and potential impact. A moderately scored vulnerability on a public-facing system containing sensitive records may deserve urgent attention. Remediation can include applying patches, changing configurations, removing unnecessary services, or introducing compensating controls when a fix is unavailable. After remediation, teams should verify that the weakness has been addressed and update their records. Continuous vulnerability management helps prevent known weaknesses from remaining unaddressed.",
        ),
      ],
    },
    {
      id: "ias-m03-l08",
      lessonNo: "3.8",
      title: "Threat Modeling",
      description:
        "Analyzes how attackers or other adverse events could compromise a system by examining assets, trust boundaries, entry points, attack paths, and suitable defensive measures.",
      keyTerms: [
        {
          word: "Threat Modeling",
          definition:
            "A structured process for identifying potential threats to a system, analyzing attack scenarios, and determining appropriate security requirements or mitigations.",
          source: "OWASP Threat Modeling — https://owasp.org/www-community/Threat_Modeling",
        },
        {
          word: "Attack Surface",
          definition:
            "The set of points through which an attacker could attempt to enter, interact with, or affect a system.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Trust Boundary",
          definition:
            "A boundary between components or environments with different security assumptions, privileges, or levels of trust.",
          source: "OWASP Threat Modeling — https://owasp.org/www-community/Threat_Modeling",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Modeling Assets, Entry Points, and Threats",
          "Threat modeling examines how a system could be attacked or otherwise harmed before or during development. Analysts identify important assets, system components, data flows, external interfaces, and trust boundaries. They then consider threats such as unauthorized access, data tampering, service disruption, and misuse of privileges. Frameworks such as STRIDE provide a structured way to consider categories of threats, including spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege. A diagram of system components and data flows can help teams discover risks that may be difficult to see from individual components alone.",
        ),
        createSection(
          "02",
          "Turning Threat Models into Defenses",
          "Once threats are identified, teams select controls that address the relevant attack paths and security requirements. For example, a public-facing application may need strong authentication, server-side authorization, input validation, encrypted communications, secure session handling, and audit logging. Threat models should be updated when architecture, dependencies, or business requirements change. The process is most effective when developers, security specialists, operators, and product owners contribute their knowledge. Threat modeling does not predict every possible attack; it provides a systematic way to identify plausible risks and design proportionate defenses.",
        ),
      ],
    },
    {
      id: "ias-m03-l09",
      lessonNo: "3.9",
      title: "Business Impact Analysis",
      description:
        "Evaluates how disruptions affect critical business functions, information resources, dependencies, and service recovery requirements to support continuity planning.",
      keyTerms: [
        {
          word: "Business Impact Analysis (BIA)",
          definition:
            "A process for determining the effects of disruptions on organizational activities and identifying the resources and recovery priorities needed to sustain or restore them.",
          source: "NIST SP 800-34 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        },
        {
          word: "Recovery Time Objective (RTO)",
          definition:
            "The target time within which a business process or system should be restored after a disruption.",
          source: "NIST SP 800-34 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        },
        {
          word: "Recovery Point Objective (RPO)",
          definition:
            "The point in time to which data must be recoverable after a disruption, indicating the maximum tolerable amount of data loss measured in time.",
          source: "NIST SP 800-34 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Understanding Business Impact",
          "A business impact analysis identifies essential activities and evaluates the consequences of their interruption. Impacts may include lost revenue, delayed services, legal obligations, damaged reputation, and harm to customers or employees. The analysis also identifies dependencies such as databases, communication systems, personnel, facilities, and external providers. For example, a university may determine that enrollment, payroll, and student-record services have different recovery priorities. Understanding these dependencies helps organizations decide which services require the fastest restoration and which resources must be available during a disruption.",
        ),
        createSection(
          "02",
          "Establishing Recovery Requirements",
          "Business impact analysis helps establish recovery time objectives and recovery point objectives. The RTO identifies the target time for restoring a process or service, while the RPO describes the acceptable data-loss window measured in time. A system with an RPO of one hour should be recoverable to a point no more than approximately one hour before the disruption, subject to the recovery design and business requirements. These objectives guide backup frequency, redundancy, recovery architecture, and testing. They should be realistic, approved by business owners, and reviewed when operational requirements change.",
        ),
      ],
    },
    {
      id: "ias-m03-l10",
      lessonNo: "3.10",
      title: "Residual Risk",
      description:
        "Explains the risk that remains after safeguards and treatment measures have been implemented, including how organizations evaluate and formally accept remaining exposure.",
      keyTerms: [
        {
          word: "Residual Risk",
          definition:
            "The risk that remains after security controls and other risk responses have been applied.",
          source: "NIST CSRC Glossary — https://csrc.nist.gov/glossary",
        },
        {
          word: "Inherent Risk",
          definition:
            "The level of risk associated with an activity or situation before considering the effect of relevant controls.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
        {
          word: "Risk Acceptance",
          definition:
            "An informed decision by an authorized person or organization to retain a particular level of risk within applicable requirements and approved limits.",
          source: "NIST SP 800-30 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/30/r1/final",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Why Risk Remains After Controls",
          "Security controls reduce risk but rarely eliminate it entirely. Residual risk may remain because controls have limitations, new threats emerge, human error continues to be possible, or some safeguards are too costly or disruptive to implement. Inherent risk describes exposure before considering controls, while residual risk reflects the exposure remaining after relevant safeguards and responses are considered. For example, multifactor authentication can reduce account-compromise risk but may not prevent every incident involving stolen sessions or compromised devices. Understanding residual risk helps organizations avoid assuming that implementing a control makes a system completely safe.",
        ),
        createSection(
          "02",
          "Evaluating and Accepting Residual Risk",
          "After implementing a risk response, organizations should reassess the remaining likelihood and impact and determine whether the result falls within approved limits. If residual risk is still too high, additional safeguards or alternative responses may be necessary. If it is acceptable, an authorized risk owner should document the decision, supporting rationale, limitations, and conditions for future review. Risk acceptance must respect legal, regulatory, contractual, and policy requirements. It should not be treated as permanent because changes in threats, system exposure, or organizational priorities can make previously acceptable risk unacceptable.",
        ),
      ],
    },
    {
      id: "ias-m03-l11",
      lessonNo: "3.11",
      title: "Risk Monitoring",
      description:
        "Tracks changes in threats, vulnerabilities, control effectiveness, and risk levels to ensure that security decisions remain appropriate as systems and operating conditions evolve.",
      keyTerms: [
        {
          word: "Risk Monitoring",
          definition:
            "The ongoing process of observing risk conditions, reassessing exposure, and checking whether risk responses and security controls remain effective.",
          source: "NIST SP 800-137 — https://csrc.nist.gov/pubs/sp/800/137/final",
        },
        {
          word: "Continuous Monitoring",
          definition:
            "An ongoing strategy for collecting and analyzing security-related information to maintain awareness of system security and support timely decisions.",
          source: "NIST SP 800-137 — https://csrc.nist.gov/pubs/sp/800/137/final",
        },
        {
          word: "Key Risk Indicator (KRI)",
          definition:
            "A measurable signal used to help identify changes in risk exposure or the likelihood that an adverse event may occur.",
          source: "NIST IR 8286 Series — https://csrc.nist.gov/projects/risk-management/about-rmf",
        },
      ],
      durationMinutes: 15,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Monitoring Changes in Risk",
          "Risk changes as organizations deploy new applications, adopt cloud services, discover vulnerabilities, or encounter new attack methods. Monitoring helps identify these changes before they cause significant harm. Useful information includes security alerts, vulnerability findings, incident reports, access logs, control-test results, and changes in supplier status. Key risk indicators can help teams recognize concerning trends, such as increasing unresolved vulnerabilities or repeated failed authentication attempts. Monitoring should focus on information relevant to organizational priorities rather than collecting data without a clear purpose.",
        ),
        createSection(
          "02",
          "Reviewing Controls and Updating Risk Decisions",
          "Effective monitoring checks whether security controls continue to operate as intended and whether the remaining risk is within approved limits. Teams should establish responsibilities, reporting schedules, escalation thresholds, and procedures for responding to significant changes. For example, a newly disclosed vulnerability affecting an exposed service may require immediate reassessment and emergency mitigation. Monitoring results should update the risk register and inform management decisions. Regular reviews, technical alerts, independent assessments, and lessons learned from incidents help organizations adjust safeguards as conditions evolve.",
        ),
      ],
    },
    {
      id: "ias-m03-l12",
      lessonNo: "3.12",
      title: "Third-Party Risk Management",
      description:
        "Assesses and manages security risks associated with vendors, contractors, cloud providers, software suppliers, and other external parties that access organizational information or support essential services.",
      keyTerms: [
        {
          word: "Third-Party Risk",
          definition:
            "The risk to an organization arising from the products, services, access, operations, or security practices of an external organization or provider.",
          source: "NIST SP 800-161 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
        },
        {
          word: "Supply Chain Risk Management",
          definition:
            "The process of identifying, assessing, and mitigating risks associated with products, services, suppliers, and the systems and processes through which they are provided.",
          source: "NIST SP 800-161 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
        },
        {
          word: "Due Diligence",
          definition:
            "The process of examining relevant information about a prospective or existing provider to assess its suitability, capabilities, and associated risks.",
          source: "NIST SP 800-161 Rev. 1 — https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
        },
      ],
      durationMinutes: 18,
      video: [{ ...placeholderVideo }],
      sections: [
        createSection(
          "01",
          "Identifying Risks from External Providers",
          "Organizations depend on external providers for cloud hosting, payment processing, software development, technical support, and other services. A provider's security failure can expose customer information, interrupt operations, or introduce compromised software into the organization's environment. Third-party risk assessment considers the sensitivity of shared data, access privileges, service criticality, subcontractor relationships, incident history, and the provider's security practices. A cloud service that stores sensitive records may require more extensive assessment than a supplier with no access to organizational systems or information.",
        ),
        createSection(
          "02",
          "Assessing, Contracting, and Monitoring Providers",
          "Third-party risk management begins before engagement and continues throughout the relationship. Organizations may review security documentation, conduct assessments, define access restrictions, and establish contractual requirements for incident notification, data protection, availability, and secure disposal. Provider access should be limited to what is necessary and reviewed periodically. Ongoing monitoring may include reassessments, audit reports, vulnerability disclosures, and changes in subcontractors or service arrangements. Organizations should also plan for provider outages, security incidents, and contract termination so that essential information and services can be protected or recovered.",
        ),
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
      title: "Security and Privacy Controls for Information Systems and Organizations (SP 800-53 Rev. 5)",
      url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
      author: "Joint Task Force",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Technical Guide to Information Security Testing and Assessment (SP 800-115)",
      url: "https://csrc.nist.gov/pubs/sp/800/115/final",
      author: "Karen Scarfone, Murugiah Souppaya, Amanda Cody, and Angela Orebaugh",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Common Vulnerability Scoring System (CVSS)",
      url: "https://www.first.org/cvss/",
      author: "Forum of Incident Response and Security Teams",
      organization: "FIRST",
    },
    {
      title: "Threat Modeling",
      url: "https://owasp.org/www-community/Threat_Modeling",
      author: "OWASP Foundation",
      organization: "OWASP",
    },
    {
      title: "Contingency Planning Guide for Federal Information Systems (SP 800-34 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "Information Security Continuous Monitoring (ISCM) for Federal Information Systems and Organizations (SP 800-137)",
      url: "https://csrc.nist.gov/pubs/sp/800/137/final",
      author: "Karen Scarfone, Murugiah Souppaya, and Paul Hoffman",
      organization: "National Institute of Standards and Technology (NIST)",
    },
    {
      title: "Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations (SP 800-161 Rev. 1)",
      url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
    {
      title: "Integrating Cybersecurity and Enterprise Risk Management (NIST IR 8286 Series)",
      url: "https://csrc.nist.gov/projects/risk-management/about-rmf",
      author: "National Institute of Standards and Technology",
      organization: "NIST",
    },
  ],
  createdAt: "2026-10-23T00:00:00.000Z",
  updatedAt: "2026-10-23T00:00:00.000Z",
};

export default module3;
