
import type { CloudComputingChapter } from "../../types/modules";

const cloudImage1 =
  "https://imgs.search.brave.com/Usib799dLoQ_cyg_LG-px2TiDKQmawxSLQAGUWAiyDI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MzQ5MzQ0Ni9waG90/by9kaWdpdGFsLWNs/b3VkLWNvbmNlcHQt/YmFja2dyb3VuZC1j/bG91ZC1jb21wdXRp/bmctc29sdXRpb25z/LWFuZC1ldm9sdXRp/b24tZnV0dXJpc3Rp/Yy1jbG91ZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TkxI/cnA2aXFYYlVOVXpw/RVNjNE1SdmctNGJZ/NDdZOFlWM0dVR0tK/OFFRUT0";

const cloudImage2 =
  "https://imgs.search.brave.com/NEBpERNUNhwK5ZOGyvGNcF0N7W-xat8HpOAOZLsbHt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/NDkxMjgwNy9waG90/by9jbG91ZC1jb21w/dXRpbmctY29uY2Vw/dC1kaWdpdGFsLWNs/b3VkLXNvbHV0aW9u/cy1vbi1wY2ItZnV0/dXJpc3RpYy1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1nTjJz/aUtNdUU5Y0JISnhu/Q1NlSTJHT3lVc3Fs/bVBQRmFSY2lka0VG/MzVBPQ";

export const cloudComputingChapter04: CloudComputingChapter = {
  chapterId: "cloud-computing-chapter-04",
  cardImage: "/chapters/04.png",
  title: "Cloud Deployment Models",
  description:
    "Introduces the major cloud deployment models and explains how cloud infrastructure can be organized, owned, managed, and accessed. Learners explore public, private, community, and hybrid clouds, compare their characteristics and trade-offs, and evaluate deployment options based on security, compliance, cost, scalability, control, and organizational requirements.",
  durationMinutes: 30,
  objectives: [
    {
      objective:
        "Define cloud deployment models and distinguish them from cloud service models.",
    },
    {
      objective:
        "Explain the characteristics, advantages, limitations, and common use cases of public cloud.",
    },
    {
      objective:
        "Describe private cloud and identify situations where greater organizational control may be necessary.",
    },
    {
      objective:
        "Explain community cloud and how organizations with shared requirements may use a common cloud environment.",
    },
    {
      objective:
        "Describe hybrid cloud architecture and the considerations involved in integrating separate environments.",
    },
    {
      objective:
        "Compare deployment models based on security, compliance, cost, scalability, management effort, and control.",
    },
    {
      objective:
        "Recommend an appropriate deployment model for a given organizational scenario and justify the choice.",
    },
  ],

  videoUrl: "https://www.youtube.com/embed/ICbgrmoB5ZE",

  slideUrl:
    "https://docs.google.com/presentation/d/e/2PACX-1vRjqCgBlndvDgCVkiESdvF_FZFd3C1itCK6MNStjFZ5AHyz356QNrziUR2k40BLXA/pubembed?start=false&loop=false&delayms=3000",

  sections: [
    {
      sectionNo: "4.1",
      header: "Introduction to Cloud Deployment Models",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "A cloud deployment model describes how a cloud environment is organized and made available to its users. It identifies who can use the infrastructure, how access is restricted, and how the environment relates to the organizations that own, operate, or consume it. Deployment models help organizations determine the level of control, resource sharing, and operational responsibility appropriate for their needs.",
        },
        {
          paragraph:
            "The National Institute of Standards and Technology (NIST) identifies four cloud deployment models: public cloud, private cloud, community cloud, and hybrid cloud. Each model represents a different arrangement of infrastructure, access, and organizational use. These models are conceptual categories; actual commercial offerings may combine characteristics from more than one arrangement.",
        },
        {
          paragraph:
            "A deployment model is different from a cloud service model. Deployment models describe how a cloud environment is organized and who it serves. Service models describe the type of capability provided, such as Infrastructure as a Service (IaaS), Platform as a Service (PaaS), or Software as a Service (SaaS). For example, an organization can consume IaaS from a public cloud provider or operate a private cloud that offers infrastructure services to internal departments.",
        },
        {
          paragraph:
            "Deployment decisions influence more than where servers are located. They affect access policies, infrastructure management, connectivity, disaster recovery, cost structures, data handling, and the skills needed to operate the environment. Organizations should assess their workloads, legal obligations, existing systems, and long-term goals before selecting a model.",
        },
        {
          paragraph:
            "No deployment model is automatically the most secure or cost-effective in every situation. A public cloud can provide strong security capabilities, while a private environment can still be misconfigured or poorly maintained. The outcome depends on architecture, operational practices, access controls, monitoring, governance, and how effectively responsibilities are fulfilled.",
        },
      ],
    },

    {
      sectionNo: "4.2",
      header: "Public Cloud",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "A public cloud is a cloud infrastructure provisioned for open use by the general public. It is typically owned and operated by a cloud service provider, which makes computing resources available to customers over a network. Customers can provision services without having to purchase and operate the provider's physical data-center infrastructure themselves.",
        },
        {
          paragraph:
            "Public cloud customers commonly share the provider's underlying physical infrastructure with other customers, while logical controls are used to separate their resources and data. This arrangement is often called multitenancy. Sharing physical infrastructure does not mean that customers should have access to one another's information; isolation, identity management, network controls, and secure configuration are essential parts of the architecture.",
        },
        {
          paragraph:
            "A major benefit of public cloud is the ability to provision resources quickly and adjust capacity according to demand. Organizations can use computing, storage, databases, analytics, and other services without making the same initial hardware investment required by a privately operated data center. Providers may also offer geographic regions, managed security capabilities, monitoring tools, and resilience options.",
        },
        {
          paragraph:
            "Public cloud can be suitable for web applications, development and testing, online learning systems, backup storage, analytics, and workloads with variable demand. A school, for example, may host a learning application in public cloud infrastructure so that capacity can be adjusted during enrollment periods or examinations.",
        },
        {
          paragraph:
            "Potential challenges include unpredictable costs when resources are not monitored, dependence on provider availability, data-transfer expenses, provider-specific services, and the need to meet applicable regulatory or contractual requirements. Customers remain responsible for understanding where their data is stored, configuring permissions, protecting credentials, and selecting suitable backup and recovery arrangements.",
        },
        {
          paragraph:
            "Examples of public cloud providers include Amazon Web Services (AWS), Microsoft Azure, and Google Cloud. Each offers a broad portfolio of services, but customers should evaluate the specific service, region, contract, security controls, and pricing rather than assuming all offerings have identical capabilities.",
        },
      ],
    },

    {
      sectionNo: "4.3",
      header: "Private Cloud",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "A private cloud is cloud infrastructure provisioned for the exclusive use of one organization, which may consist of multiple departments or business units. It may be owned, managed, and operated by the organization, a third party, or a combination of them. Its infrastructure may be located on the organization's premises or hosted elsewhere.",
        },
        {
          paragraph:
            "Private cloud is intended to provide cloud characteristics within an environment dedicated to one organization. Depending on its design, it may support self-service resource provisioning, pooled resources, automation, and the ability to adjust capacity. Simply owning physical servers or running virtual machines does not automatically make an environment a private cloud; the environment's architecture and service capabilities matter.",
        },
        {
          paragraph:
            "A private cloud can provide greater organizational control over infrastructure configuration, network design, maintenance schedules, and certain data-handling arrangements. It may be appropriate for organizations with specialized technical requirements, strict internal policies, legacy systems, or workloads that require dedicated infrastructure. Some institutions may also use it to support research, internal platforms, or systems with tightly controlled access.",
        },
        {
          paragraph:
            "Private cloud can require substantial investment in hardware, facilities, software, security tools, maintenance, and skilled personnel. The organization or its contracted operator must plan capacity, patch systems, monitor performance, protect facilities, and maintain resilience. Dedicated infrastructure does not automatically provide better security; weak access controls, inadequate monitoring, or delayed patching can still expose systems to threats.",
        },
        {
          paragraph:
            "A private cloud can be operated internally or hosted by a service provider. In a hosted private cloud, the environment is dedicated to one organization even though the provider may manage the physical facilities and infrastructure. Organizations should clarify the management boundary, service-level commitments, data ownership, incident response responsibilities, and exit arrangements.",
        },
        {
          paragraph:
            "Before choosing private cloud, an organization should determine whether its need for control and dedicated resources justifies the associated cost and operational burden. It should also compare private cloud with alternatives such as a public cloud using appropriate security controls, managed hosting, or a hybrid arrangement.",
        },
      ],
    },

    {
      sectionNo: "4.4",
      header: "Community Cloud",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "A community cloud is cloud infrastructure provisioned for the exclusive use of a specific community of consumers from organizations that share common concerns. These concerns may include security requirements, policy objectives, regulatory obligations, or a shared mission. The infrastructure may be owned, managed, and operated by one or more organizations in the community, a third party, or a combination of them.",
        },
        {
          paragraph:
            "Unlike a private cloud, which serves one organization, a community cloud is designed for a defined group of organizations with shared needs. Unlike a public cloud, it is not intended for unrestricted use by the general public. The participating organizations may share infrastructure costs, operational responsibilities, governance arrangements, or specialized capabilities, depending on the design and agreements.",
        },
        {
          paragraph:
            "For example, several healthcare organizations could explore a shared cloud environment designed around common healthcare data-handling requirements. A group of universities might consider a shared research environment with agreed access rules and resource allocation policies. These examples describe possible arrangements; whether a real deployment qualifies as a community cloud depends on its actual ownership, access, and management structure.",
        },
        {
          paragraph:
            "Potential advantages include shared investment, common technical standards, and infrastructure tailored to the needs of participating organizations. A community environment may also make collaboration easier when organizations need to exchange information or use common applications under agreed rules.",
        },
        {
          paragraph:
            "Community cloud also introduces governance challenges. Participants must agree on who may use the environment, how costs are allocated, who makes technical decisions, how incidents are handled, and how disputes or changes in membership are managed. Differing priorities can make coordination difficult, and a shared environment still requires clear security boundaries between participating organizations.",
        },
        {
          paragraph:
            "Organizations considering a community cloud should establish formal agreements covering ownership, service expectations, data access, confidentiality, compliance, incident notification, auditing, and withdrawal from the arrangement. The model is most useful when organizations have genuine shared requirements and are prepared to manage the responsibilities of a common environment.",
        },
      ],
    },

    {
      sectionNo: "4.5",
      header: "Hybrid Cloud",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "A hybrid cloud is a cloud infrastructure arrangement that combines two or more distinct cloud infrastructures—private, community, or public—that remain separate entities but are connected through technology that enables data and application portability. The infrastructures may retain their own management boundaries while being integrated to support a broader workload or business objective.",
        },
        {
          paragraph:
            "Organizations may adopt hybrid cloud to retain selected workloads in a private environment while using public cloud services for other needs. For example, an organization might keep a legacy system in its existing data center while running a customer-facing web application in public cloud infrastructure. A hybrid arrangement can also support cloud bursting, in which compatible workloads use additional public cloud capacity when demand exceeds the resources available in a private environment.",
        },
        {
          paragraph:
            "Hybrid cloud can help organizations modernize gradually, respond to changing demand, and place workloads according to technical or regulatory requirements. It can also allow organizations to reuse existing investments while adopting newer managed services. However, hybrid architecture is not automatically simpler or cheaper; it creates additional integration and operational responsibilities.",
        },
        {
          paragraph:
            "Reliable connectivity is a central requirement. Workloads that communicate across environments may depend on network links, routing, name resolution, identity integration, and consistent security policies. Latency, bandwidth limits, connection failures, and data-transfer charges can affect application performance and operating costs. Architects should decide which components need to communicate and what happens when a connection is unavailable.",
        },
        {
          paragraph:
            "Security across hybrid environments requires consistent identity management, access controls, logging, encryption, configuration standards, and incident response procedures. Teams must understand which environment stores each type of data, how information moves between systems, and how credentials and network access are protected. Misaligned policies can create gaps in visibility or allow access that was not intended.",
        },
        {
          paragraph:
            "Hybrid cloud should not be confused with a multicloud strategy. Hybrid cloud emphasizes integration between distinct cloud infrastructures, often involving private infrastructure and public cloud. Multicloud means using services from more than one cloud provider. An organization can use multiple public cloud providers without having a hybrid cloud architecture, and a hybrid cloud arrangement can use a single public cloud provider alongside private infrastructure.",
        },
      ],
    },

    {
      sectionNo: "4.6",
      header: "Comparing Deployment Models",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "The four deployment models differ primarily in intended use, infrastructure sharing, governance, and the degree of control retained by participating organizations. Public cloud generally serves customers through a provider-operated environment. Private cloud is dedicated to one organization. Community cloud is dedicated to a group of organizations with shared concerns. Hybrid cloud integrates distinct cloud infrastructures to support a coordinated arrangement.",
        },
        {
          paragraph:
            "Public cloud commonly offers rapid access to a broad range of managed services and flexible resource provisioning. Private cloud can provide dedicated use and greater control but may require more investment and operational expertise. Community cloud can distribute costs and support shared requirements, but participating organizations need effective governance. Hybrid cloud can combine the strengths of different environments, although integration and cross-environment management can be complex.",
        },
        {
          paragraph:
            "Security should be evaluated according to actual risks and controls rather than the deployment model's name. A public cloud may offer mature security capabilities, but customers must configure and use them appropriately. A private cloud may offer more direct control, but the organization must operate it securely. Community and hybrid environments add coordination or integration requirements that must be addressed through architecture and governance.",
        },
        {
          paragraph:
            "Cost comparisons should include both direct and indirect expenses. Public cloud may reduce upfront hardware spending but introduces ongoing consumption-based charges. Private cloud may require capital investment, facility costs, and dedicated staff. Community cloud may distribute expenses among participants but requires agreements on contributions. Hybrid cloud may combine different cost structures and introduce network, integration, and duplicated-management expenses.",
        },
        {
          paragraph:
            "Scalability, control, and portability also vary by implementation. Public cloud often provides access to substantial capacity, subject to service quotas and regional availability. Private cloud capacity is limited by the resources and expansion plans available to the operator. Community cloud capacity depends on shared design and governance. Hybrid cloud can use resources from multiple environments, but moving workloads between them requires compatible architectures, connectivity, and operational planning.",
        },
        {
          paragraph:
            "No model is universally best. An organization should match the deployment model to its workload requirements, technical capabilities, risk tolerance, regulatory obligations, budget, and long-term strategy. Some organizations use different models for different workloads rather than forcing every system into one environment.",
        },
      ],
    },

    {
      sectionNo: "4.7",
      header: "Security, Compliance, and Governance Considerations",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "Security and compliance requirements should influence deployment decisions from the beginning. Organizations need to identify what information they process, how sensitive it is, who should access it, and what legal, contractual, or policy obligations apply. Requirements may affect data location, retention, encryption, auditing, recovery, and the use of external service providers.",
        },
        {
          paragraph:
            "Data residency refers to the physical or geographic location where data is stored. Data sovereignty concerns the legal authority and jurisdiction that may apply to data. These concepts are related but not identical. Selecting a cloud region or a dedicated environment does not by itself guarantee compliance; organizations must assess applicable laws, provider arrangements, data flows, and contractual terms.",
        },
        {
          paragraph:
            "The shared responsibility model applies across deployment choices, although the exact boundaries depend on the services and operating arrangements. Organizations should document who manages physical infrastructure, virtualization, operating systems, applications, identity, data protection, monitoring, and incident response. Responsibilities should be explicit when a provider, internal IT team, and other partners work together.",
        },
        {
          paragraph:
            "Governance establishes the policies and decision-making processes that guide cloud use. Effective cloud governance may include approved-service policies, identity standards, resource tagging, data classification, budget controls, change management, security reviews, and periodic access audits. These practices help reduce unmanaged resources, excessive permissions, inconsistent configurations, and unexpected expenses.",
        },
        {
          paragraph:
            "Business continuity and disaster recovery are also essential. Organizations should identify critical workloads, define recovery time objectives (RTOs) and recovery point objectives (RPOs), and test their recovery plans. RTO describes the target time for restoring a service after disruption; RPO describes the acceptable amount of data loss measured in time. Using a cloud provider does not automatically satisfy these objectives—appropriate architecture, backups, replication, and testing are still required.",
        },
        {
          paragraph:
            "Before adopting a deployment model, organizations should review provider security documentation, audit reports, service-level agreements, support arrangements, and data-handling terms. They should also verify that controls work as expected through testing and monitoring. Compliance and security are ongoing activities rather than one-time decisions made when infrastructure is selected.",
        },
      ],
    },

    {
      sectionNo: "4.8",
      header: "Choosing a Deployment Model for Real-World Scenarios",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        { source: "iStockphoto via the provided Brave image URL" },
      ],
      content: [
        {
          paragraph:
            "Selecting a deployment model starts with understanding the workload. Determine its purpose, expected number of users, resource demands, availability requirements, data sensitivity, integration needs, and expected growth. Also identify who will operate the environment, what technical skills are available, and how quickly the organization needs to deploy or change the system.",
        },
        {
          paragraph:
            "Consider a startup building a website whose traffic changes frequently. Public cloud may be a practical option because it can provide rapid provisioning and access to managed services without requiring the startup to operate its own data center. The team must still estimate costs, configure security, and plan for availability and recovery.",
        },
        {
          paragraph:
            "Consider an organization that needs an environment dedicated to its use and has the staff and budget to manage it. A private cloud may be suitable if the required control, architecture, or operating constraints justify the additional responsibility. The organization should compare the full operational cost against public cloud alternatives that may meet the same requirements.",
        },
        {
          paragraph:
            "Consider several institutions that share a research mission and need a common environment under agreed security and governance requirements. A community cloud may be worth evaluating if a shared platform is technically practical and the institutions can establish clear rules for access, costs, ownership, and operations.",
        },
        {
          paragraph:
            "Consider a business that must retain a legacy application in its existing environment but wants to deploy new services in public cloud. A hybrid cloud may support gradual modernization. The design should address network connectivity, identity integration, data synchronization, failure handling, monitoring, and the cost of moving data between environments.",
        },
        {
          paragraph:
            "Use a structured decision process: document requirements, identify candidate models, assess security and compliance, estimate total cost of ownership, evaluate operational skills, test important technical assumptions, and record the reasons for the final choice. Revisit the decision when workload demand, regulations, budgets, or available services change. A well-chosen deployment model supports business goals while making its risks and responsibilities manageable.",
        },
      ],
    },
  ],

  keyTerms: [
    {
      word: "Cloud Deployment Model",
      definition:
        "A way of describing how cloud infrastructure is organized, who it is intended to serve, and how it is made available for use.",
      source: "NIST SP 800-145",
    },
    {
      word: "Public Cloud",
      definition:
        "Cloud infrastructure provisioned for open use by the general public and typically operated by a cloud service provider.",
      source: "NIST SP 800-145",
    },
    {
      word: "Private Cloud",
      definition:
        "Cloud infrastructure provisioned for the exclusive use of one organization, which may contain multiple departments or business units.",
      source: "NIST SP 800-145",
    },
    {
      word: "Community Cloud",
      definition:
        "Cloud infrastructure provisioned for the exclusive use of a specific community of organizations with shared concerns, such as security, policy, or compliance requirements.",
      source: "NIST SP 800-145",
    },
    {
      word: "Hybrid Cloud",
      definition:
        "A composition of two or more distinct cloud infrastructures that remain separate entities but are connected to enable data or application portability.",
      source: "NIST SP 800-145",
    },
    {
      word: "Multitenancy",
      definition:
        "An architecture in which multiple customers or tenants use shared underlying resources while appropriate logical separation protects their workloads and information.",
      source: "Cloud provider architecture and security documentation",
    },
    {
      word: "Data Residency",
      definition:
        "The geographic location where data is stored or processed, which may influence contractual, operational, or legal requirements.",
      source: "Cloud provider data residency documentation",
    },
    {
      word: "Data Sovereignty",
      definition:
        "The principle that data may be subject to the laws and legal authority of the jurisdiction in which it is located or otherwise governed.",
      source: "Cloud governance and data protection guidance",
    },
    {
      word: "Cloud Governance",
      definition:
        "The policies, roles, processes, and controls used to guide cloud adoption and ensure that cloud resources are used securely, consistently, and in alignment with organizational goals.",
      source: "Microsoft Cloud Adoption Framework",
    },
    {
      word: "Shared Responsibility Model",
      definition:
        "A framework that identifies the responsibilities assigned to the cloud provider and the customer for operating and securing a cloud service.",
      source: "AWS Shared Responsibility Model",
    },
    {
      word: "Recovery Time Objective (RTO)",
      definition:
        "The target duration within which a system or service should be restored after a disruption.",
      source: "NIST contingency planning guidance",
    },
    {
      word: "Recovery Point Objective (RPO)",
      definition:
        "The point in time to which data must be recoverable after a disruption, representing the acceptable amount of data loss measured in time.",
      source: "NIST contingency planning guidance",
    },
    {
      word: "Total Cost of Ownership (TCO)",
      definition:
        "An estimate of the complete cost of a solution over its lifecycle, including direct service charges and indirect expenses such as staffing, maintenance, support, and migration.",
      source: "Microsoft Azure TCO guidance",
    },
  ],

  references: [
    {
      author:
        "Mell, P., & Grance, T. (2011). The NIST Definition of Cloud Computing. National Institute of Standards and Technology.",
      link: "https://doi.org/10.6028/NIST.SP.800-145",
    },
    {
      author: "Amazon Web Services. What is Cloud Computing?",
      link: "https://aws.amazon.com/what-is-cloud-computing/",
    },
    {
      author: "Amazon Web Services. AWS Shared Responsibility Model.",
      link: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    },
    {
      author: "Microsoft Azure. What is a Public Cloud?",
      link: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-public-cloud",
    },
    {
      author: "Microsoft Azure. What is a Private Cloud?",
      link: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-private-cloud",
    },
    {
      author: "Microsoft Cloud Adoption Framework. Cloud Adoption Framework.",
      link: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/",
    },
    {
      author:
        "National Institute of Standards and Technology. Contingency Planning Guide for Federal Information Systems.",
      link: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
    },
    {
      author: "Google Cloud. Cloud Architecture Framework.",
      link: "https://cloud.google.com/architecture/framework",
    },
  ],

  createdAt: "2026-10-24T00:00:00.000Z",
  updatedAt: "2026-10-24T00:00:00.000Z",
};
