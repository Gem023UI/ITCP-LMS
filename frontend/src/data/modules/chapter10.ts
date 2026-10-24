
import type { CloudComputingChapter } from "../../types/modules";

const cloudImage1 =
  "https://imgs.search.brave.com/Usib799dLoQ_cyg_LG-px2TiDKQmawxSLQAGUWAiyDI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMjE2MzQ5MzQ0Ni9waG90by9kaWdpdGFsLWNs/b3VkLWNvbmNlcHQtYmFja2dyb3VuZC1jbG91ZC1jb21wdXRpbmctc29sdXRpb25zLWFuZC1ldm9sdXRpb24tZnV0dXJpc3RpYy1jbG91ZC5qcGc_/cz02MTJ4NjEyJnc9MCZrPTIwJmM9TkxIcnA2aXFYYlVOVXpwRVNjNE1SdmctNGJZNDdZOFlWM0dVR0tKOFFRUT0";

const cloudImage2 =
  "https://imgs.search.brave.com/NEBpERNUNhwK5ZOGyvGNcF0N7W-xat8HpOAOZLsbHt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTQ4NDkxMjgwNy9waG90/by9jbG91ZC1jb21wdXRpbmctY29uY2VwdC1kaWdpdGFsLWNsb3VkLXNvbHV0aW9ucy1vbi1wY2ItZnV0dXJpc3RpYy1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1nTjJz/aUtNdUU5Y0JISnhu/Q1NlSTJHT3lVc3Fs/bVBQRmFSY2lka0VG/MzVBPQ";

const timestamp = "2026-10-24T00:00:00.000Z";

export const cloudComputingChapter10: CloudComputingChapter = {
  chapterId: "cloud-computing-chapter-10",
  title: "Major Cloud Platforms",
  description:
    "Explores major cloud service providers, including Amazon Web Services (AWS), Microsoft Azure, and Google Cloud. Learners examine their core services, infrastructure, security capabilities, management tools, pricing considerations, and approaches to migration and platform selection.",
  durationMinutes: 30,
  objectives: [
    {
      objective:
        "Identify the major cloud providers and explain their roles in the cloud computing ecosystem.",
    },
    {
      objective:
        "Describe the core computing, storage, networking, database, and application services offered by AWS, Microsoft Azure, and Google Cloud.",
    },
    {
      objective:
        "Compare cloud platforms according to technical requirements, operational needs, security, availability, and cost.",
    },
    {
      objective:
        "Explain common identity, access management, monitoring, governance, and security capabilities across cloud providers.",
    },
    {
      objective:
        "Recognize the challenges of cloud migration, interoperability, vendor lock-in, and multi-cloud operations.",
    },
    {
      objective:
        "Develop a reasoned approach to selecting a cloud platform based on workload requirements and organizational constraints.",
    },
  ],

  videoUrl: "https://www.youtube.com/embed/ICbgrmoB5ZE",

  slideUrl:
    "https://docs.google.com/presentation/d/e/2PACX-1vRjqCgBlndvDgCVkiESdvF_FZFd3C1itCK6MNStjFZ5AHyz356QNrziUR2k40BLXA/pubembed?start=false&loop=false&delayms=3000",

  sections: [
    {
      sectionNo: "10.1",
      header: "Overview of Major Cloud Platforms",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with an appropriately licensed illustration of cloud provider infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "A cloud platform is a collection of infrastructure, managed services, development tools, security controls, and operational capabilities delivered by a cloud provider. Organizations use these platforms to deploy applications, store and process data, operate networks, develop software, and scale workloads without purchasing and maintaining all the underlying physical infrastructure themselves. The provider operates the cloud infrastructure, while customers remain responsible for configuring and using services appropriately according to the chosen service model.",
        },
        {
          paragraph:
            "Amazon Web Services (AWS), Microsoft Azure, and Google Cloud are major public cloud platforms. They provide overlapping capabilities such as virtual machines, object storage, managed databases, networking, identity management, analytics, artificial intelligence services, containers, and serverless computing. However, their service names, configuration methods, integrations, geographic availability, and pricing structures differ. A service that performs a similar function across two providers does not necessarily have identical features or operating requirements.",
        },
        {
          paragraph:
            "Cloud providers typically organize resources using logical scopes such as accounts, subscriptions, projects, regions, and zones. A region is a geographic area containing cloud infrastructure, while an availability zone is an isolated infrastructure location within a region, where supported by the provider. These concepts help organizations plan resource placement, latency, resilience, and data residency. Exact resource hierarchies and terminology vary by platform, so administrators must understand the provider's own resource organization model.",
        },
        {
          paragraph:
            "Cloud platforms are not simply collections of virtual machines. They also offer managed capabilities that reduce the amount of infrastructure customers must administer. For example, a managed database service can handle some combination of backups, patching, monitoring, and failover, depending on its configuration and service tier. Organizations should evaluate both the technical capability of a service and the operational responsibilities that remain with the customer.",
        },
      ],
    },

    {
      sectionNo: "10.2",
      header: "Amazon Web Services (AWS)",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with an appropriately licensed AWS architecture or service-category illustration.",
        },
      ],
      content: [
        {
          paragraph:
            "Amazon Web Services, commonly called AWS, is a cloud platform offering services for computing, storage, networking, databases, analytics, security, application integration, and more. AWS resources are commonly organized through AWS accounts, with AWS Organizations providing centralized management for multiple accounts. AWS Regions contain multiple Availability Zones, which are designed to provide infrastructure isolation and support resilient application architectures. Actual service availability and architectural capabilities should be verified for the selected Region.",
        },
        {
          paragraph:
            "Amazon Elastic Compute Cloud (Amazon EC2) provides resizable virtual computing capacity. Customers select instance families and sizes according to requirements such as general-purpose processing, memory, storage, or accelerated computing. Amazon Simple Storage Service (Amazon S3) provides object storage for files, backups, logs, static assets, and data lakes. Amazon Elastic Block Store (Amazon EBS) provides block storage volumes commonly attached to EC2 instances, while Amazon Elastic File System (Amazon EFS) provides managed elastic file storage for supported workloads.",
        },
        {
          paragraph:
            "AWS also offers managed database services. Amazon Relational Database Service (Amazon RDS) simplifies the operation of supported relational database engines, while Amazon DynamoDB provides a managed NoSQL database service. Amazon Elastic Container Service (Amazon ECS) and Amazon Elastic Kubernetes Service (Amazon EKS) support containerized applications. AWS Lambda allows developers to run functions in response to events without managing the underlying servers directly, although functions still operate within provider-defined execution limits and configuration requirements.",
        },
        {
          paragraph:
            "AWS provides identity and security capabilities through services such as AWS Identity and Access Management (IAM), which controls access to AWS resources using identities, policies, roles, and permissions. Amazon CloudWatch supports monitoring and observability, while AWS CloudTrail records account activity and API events. AWS Config helps assess resource configurations against desired rules, and AWS Cost Explorer helps analyze historical costs and usage. These services serve different purposes and may require additional configuration, permissions, retention settings, or charges.",
        },
        {
          paragraph:
            "AWS is often considered when teams need a broad range of infrastructure and managed services, granular resource configuration, or established integrations with AWS-native tooling. Its extensive service catalog can also create complexity: teams must understand account structure, permissions, networking, service limits, pricing, and operational practices. The appropriate choice depends on workload needs and team capabilities rather than the provider's popularity alone.",
        },
      ],
    },

    {
      sectionNo: "10.3",
      header: "Microsoft Azure",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with an appropriately licensed Azure architecture or cloud service illustration.",
        },
      ],
      content: [
        {
          paragraph:
            "Microsoft Azure is Microsoft's cloud platform for hosting applications, virtual infrastructure, data services, analytics, identity, and enterprise workloads. Azure organizes resources using concepts such as Microsoft Entra tenants, management groups, subscriptions, resource groups, and individual resources. Resource groups provide a logical container for resources that can be managed together, while subscriptions establish an important scope for access control, governance, usage tracking, and billing. The exact management design should reflect an organization's administrative and compliance requirements.",
        },
        {
          paragraph:
            "Azure Virtual Machines provide virtualized compute capacity, while Azure Blob Storage offers object storage for unstructured data. Azure Managed Disks provide persistent block storage for virtual machines, and Azure Files offers managed file shares. Azure Virtual Network provides private network connectivity for supported Azure resources. Azure SQL Database is a managed relational database service, while Azure Cosmos DB is a globally distributed, multi-model database service with supported APIs and consistency options that depend on the selected configuration.",
        },
        {
          paragraph:
            "Azure supports modern application deployment through services such as Azure Kubernetes Service (AKS) for managed Kubernetes and Azure Functions for event-driven serverless execution. Azure App Service provides a managed environment for hosting supported web applications and APIs. These services reduce some infrastructure management tasks, but developers still need to configure application settings, identity, network access, monitoring, scaling, and other operational requirements appropriately.",
        },
        {
          paragraph:
            "Microsoft Entra ID provides identity and access capabilities for users, applications, and supported resources. Azure role-based access control (Azure RBAC) assigns permissions within Azure's resource hierarchy. Microsoft Defender for Cloud provides security posture management and workload protection capabilities, while Azure Monitor collects and analyzes telemetry from supported resources. Microsoft Cost Management helps organizations review cloud spending, budgets, and cost allocation. These products complement one another; no single service automatically establishes complete security or governance.",
        },
        {
          paragraph:
            "Azure can be particularly relevant to organizations that rely on Microsoft technologies, enterprise identity systems, Windows workloads, Microsoft development tools, or integrated hybrid-cloud management. Nevertheless, compatibility and licensing benefits should be verified for the actual environment. Azure services, capabilities, regional availability, and charges can differ by region, service tier, and configuration.",
        },
      ],
    },

    {
      sectionNo: "10.4",
      header: "Google Cloud",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with an appropriately licensed Google Cloud architecture or service illustration.",
        },
      ],
      content: [
        {
          paragraph:
            "Google Cloud is Google's cloud platform for infrastructure, application hosting, data analytics, databases, artificial intelligence, networking, and security. Google Cloud resources are organized through a hierarchy that includes an organization node when configured, folders, projects, and individual resources. Projects are a central scope for enabling APIs, organizing resources, assigning permissions, and associating usage with billing. Organizations should establish a clear project structure and access policy before deploying production workloads.",
        },
        {
          paragraph:
            "Compute Engine provides virtual machines, while Cloud Storage provides object storage for files, backups, data pipelines, and other unstructured data. Persistent Disk and Hyperdisk provide block-storage options for supported workloads. Google Cloud VPC networks provide networking capabilities, and Cloud Load Balancing distributes traffic across supported backends. Cloud SQL provides managed relational databases, while Firestore and other Google Cloud database products address different application and data requirements.",
        },
        {
          paragraph:
            "Google Kubernetes Engine (GKE) provides managed Kubernetes capabilities for containerized applications. Cloud Run can run containerized applications without requiring customers to manage the underlying server infrastructure directly. Cloud Functions, now offered within Google's evolving serverless product ecosystem, supports event-driven function workloads according to the currently available product configuration. Cloud Run and function-oriented deployments can reduce infrastructure management, but developers must still plan authentication, concurrency, resource limits, event delivery, dependencies, and failure handling.",
        },
        {
          paragraph:
            "Google Cloud provides identity and security capabilities through Cloud Identity integrations, Identity and Access Management (IAM), organization policies, and other security services. Cloud Monitoring and Cloud Logging help teams observe resource behavior and investigate events. Security Command Center provides security posture and risk-management capabilities according to the enabled features and service tier. Cloud Billing reports and cost-management tools help teams understand resource usage and expenditure. Correct configuration, access control, monitoring, and incident-response procedures remain necessary.",
        },
        {
          paragraph:
            "Google Cloud can be attractive for workloads involving data analytics, machine learning, Kubernetes, containerized applications, and integration with Google's data and AI ecosystem. These are evaluation considerations rather than guarantees of superior performance. Teams should validate actual workload performance, service availability, data movement costs, compliance requirements, support needs, and operational expertise before committing to a platform.",
        },
      ],
    },

    {
      sectionNo: "10.5",
      header: "Comparing Core Cloud Services",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with a service comparison diagram showing equivalent cloud service categories.",
        },
      ],
      content: [
        {
          paragraph:
            "Comparing cloud platforms is more useful when services are grouped by function instead of compared only by product name. Compute services run application code; storage services retain data; networking services connect resources and control traffic; database services manage structured or specialized data; and application services support deployment, integration, and automation. For example, Amazon EC2, Azure Virtual Machines, and Google Compute Engine all provide virtual machines, but their available instance families, configuration options, pricing models, and associated tools are not identical.",
        },
        {
          paragraph:
            "The following examples illustrate common functional counterparts. They are starting points for research, not a guarantee that each product has identical features or is suitable for every workload.",
        },
        {
          paragraph:
            "Virtual machines: Amazon EC2, Azure Virtual Machines, and Google Compute Engine. Object storage: Amazon S3, Azure Blob Storage, and Google Cloud Storage. Managed relational databases: Amazon RDS, Azure SQL Database, and Cloud SQL. Kubernetes: Amazon EKS, Azure Kubernetes Service (AKS), and Google Kubernetes Engine (GKE). Serverless application execution: AWS Lambda, Azure Functions, and Google Cloud Run or function-oriented services, depending on the workload. These examples differ in supported runtimes, scaling behavior, integration options, and operational responsibility.",
        },
        {
          paragraph:
            "Storage selection requires distinguishing object, block, and file storage. Object storage is suitable for unstructured objects accessed through APIs, block storage provides volumes for systems that need block devices, and file storage exposes shared file-system semantics. Similarly, managed databases should be selected according to data model, transaction requirements, consistency, query patterns, backup and recovery needs, and application compatibility. Choosing services solely because their names appear equivalent can produce architectural mismatches.",
        },
        {
          paragraph:
            "Networking comparisons should examine virtual network design, subnets, routing, firewalls, private connectivity, load balancing, DNS, and hybrid connectivity. Observability comparisons should consider metrics, logs, traces, alerting, retention, and integrations. Security comparisons should include identity federation, least-privilege access, encryption, audit records, vulnerability management, and incident-response support. A platform evaluation should assess the complete architecture rather than one isolated service.",
        },
        {
          paragraph:
            "Pricing comparisons must use a realistic workload estimate. Relevant factors can include compute duration, instance size, storage capacity, storage operations, requests, data transfer, database throughput, licensing, support, and regional differences. Free tiers and promotional credits may not reflect production costs. Use the providers' current pricing calculators and documentation, and validate estimates against expected utilization, scaling behavior, redundancy, and backup requirements.",
        },
      ],
    },

    {
      sectionNo: "10.6",
      header:
        "Identity, Security, Networking, and Governance Across Platforms",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with a cloud security architecture showing identity, network boundaries, logging, and policy controls.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud security is a shared responsibility between the provider and the customer. The provider is responsible for security of the underlying cloud infrastructure, while customers retain responsibilities that depend on the service model and configuration. Customers commonly need to protect identities, assign permissions, configure network access, classify and protect data, secure applications, monitor activity, and maintain recovery plans. Managed services can reduce infrastructure-management responsibilities, but they do not eliminate the need for secure configuration and oversight.",
        },
        {
          paragraph:
            "Identity and access management is central to cloud security. AWS IAM, Azure role-based access control and Microsoft Entra capabilities, and Google Cloud IAM provide mechanisms for controlling access to resources. Administrators should apply least privilege, use role-based access where appropriate, avoid unnecessary long-lived credentials, protect privileged accounts with strong authentication, and review access regularly. Workload identities and temporary credentials are generally preferable to embedding permanent secrets in source code or application images.",
        },
        {
          paragraph:
            "Network security requires deliberate control over which resources can communicate. Organizations should use appropriately scoped network rules, private connectivity where required, secure administrative access, and controlled ingress and egress. Public exposure should be intentional rather than the default. Segmentation can reduce the potential impact of a compromised resource, but it must be paired with identity controls, application security, monitoring, and tested incident-response procedures.",
        },
        {
          paragraph:
            "Encryption protects data in transit and at rest. Cloud providers offer encryption capabilities and key-management services, but the customer must select appropriate settings, control key permissions, and understand how keys are backed up, rotated, and recovered. Data residency, privacy, retention, and regulatory requirements can influence service and region selection. Organizations should verify the specific controls and contractual terms relevant to their use case instead of assuming every service provides the same compliance properties.",
        },
        {
          paragraph:
            "Governance defines how cloud resources are provisioned, accessed, monitored, and paid for. Common practices include establishing account, subscription, or project structures; enforcing resource policies; tagging resources for ownership and cost allocation; defining approved regions and services; recording audit events; and reviewing security posture. Automated policy checks and infrastructure as code can make environments more consistent, provided that policy rules are maintained and exceptions are controlled.",
        },
        {
          paragraph:
            "Operational monitoring should combine resource metrics, application logs, audit records, alerting, and incident-response processes. AWS CloudTrail, Azure activity logs, and Google Cloud Audit Logs are examples of audit capabilities that help record administrative and resource activity. These records complement performance monitoring and application logs rather than replacing them. Retention, access restrictions, alert thresholds, and response ownership should be defined according to operational and compliance needs.",
        },
      ],
    },

    {
      sectionNo: "10.7",
      header:
        "Migration, Interoperability, and Multi-Cloud Considerations",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with a cloud migration diagram illustrating assessment, migration, validation, and optimization.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud migration is the process of moving applications, data, and operational capabilities from existing environments into a cloud platform. A successful migration begins with discovery and assessment: teams inventory applications, dependencies, databases, network connections, licensing, performance requirements, security constraints, and recovery objectives. This assessment helps determine whether a workload should be moved with minimal changes, modified to use managed services, redesigned, retained in its current environment, or retired.",
        },
        {
          paragraph:
            "Migration strategies are often described using categories such as rehosting, replatforming, refactoring, repurchasing, retaining, and retiring. Rehosting moves a workload with limited architectural change, while replatforming introduces selected optimizations without completely redesigning the application. Refactoring changes the architecture to use cloud-native capabilities more extensively. Repurchasing replaces an existing system with a different product, retaining keeps a workload where it is for a justified reason, and retiring removes an unnecessary workload. The best approach depends on business value, technical feasibility, risk, cost, and time.",
        },
        {
          paragraph:
            "Migration planning must account for data transfer, downtime, network connectivity, identity integration, application dependencies, testing, rollback, and user communication. Large datasets may require significant transfer time or incur data movement charges. Database migrations must preserve data integrity and consider compatibility, schema differences, transaction behavior, and synchronization during cutover. Teams should validate functionality, performance, security controls, backups, and recovery procedures before treating a migration as complete.",
        },
        {
          paragraph:
            "Interoperability is the ability of systems and services to exchange data and work together. Open standards, portable data formats, documented APIs, containers, and automation can help reduce some forms of dependency on a single provider. However, portability is not automatic. Applications may rely on provider-specific databases, event systems, identity services, networking features, or managed AI APIs. Replacing these dependencies can require significant code changes, operational redesign, testing, and additional cost.",
        },
        {
          paragraph:
            "A multi-cloud strategy uses services from more than one cloud provider. Organizations may adopt it to address specific regulatory needs, access specialized capabilities, support acquisitions, or reduce dependence on a single provider. It also introduces complexity in identity federation, monitoring, networking, cost allocation, incident response, skills, and consistent governance. Operating several providers is not inherently more resilient; resilience depends on architecture, failure isolation, data replication, tested recovery, and the ability to operate during an outage.",
        },
        {
          paragraph:
            "Hybrid cloud combines cloud environments with on-premises infrastructure or other environments. It can support gradual migration, low-latency local processing, data residency constraints, or systems that cannot easily move. Hybrid architectures require reliable connectivity, consistent identity and security policies, careful data synchronization, and clear responsibility boundaries. Organizations should adopt hybrid or multi-cloud designs to satisfy defined requirements, not simply because using more platforms appears more flexible.",
        },
      ],
    },

    {
      sectionNo: "10.8",
      header:
        "Selecting a Platform and Applying Best Practices",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "Placeholder cloud computing concept image; replace with a cloud platform selection framework or architecture decision diagram.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud platform selection should begin with workload requirements rather than brand preference. Define the application's purpose, expected traffic, performance targets, availability requirements, data sensitivity, recovery objectives, integration needs, and budget. Identify applicable laws, contractual obligations, data residency constraints, and organizational security standards. These requirements establish the criteria against which candidate platforms and services can be evaluated objectively.",
        },
        {
          paragraph:
            "Technical evaluation should include supported runtimes, operating systems, database engines, networking options, regional availability, scalability, observability, backup and recovery, and compatibility with existing systems. Operational evaluation should consider team experience, documentation, support plans, automation, deployment workflows, and incident-response capabilities. A provider with many features may still be a poor fit if the organization cannot operate the selected architecture reliably.",
        },
        {
          paragraph:
            "Financial evaluation should compare total cost of ownership rather than only the advertised price of one resource. Include compute, storage, network traffic, managed services, backups, monitoring, support, licensing, staffing, migration, and training. Estimate ordinary and peak usage, consider discounts and commitment-based pricing carefully, and account for data transfer or exit costs. Apply budgets, alerts, resource labels or tags, rightsizing, lifecycle policies, and scheduled shutdowns for non-production resources where appropriate.",
        },
        {
          paragraph:
            "A practical selection process can use a weighted decision matrix. For example, an organization might score candidate platforms on workload compatibility, security and compliance, cost, reliability, integration, team skills, and regional requirements. Assign weights based on business priorities, gather evidence from documentation and proof-of-concept testing, and record assumptions. The matrix supports transparent decision-making but does not replace technical validation or risk assessment.",
        },
        {
          paragraph:
            "Before production deployment, build a small proof of concept using representative workloads and data. Test expected traffic, failure scenarios, monitoring, access controls, backup restoration, deployment automation, and estimated costs. Document architectural decisions and define measurable acceptance criteria. If requirements change, repeat the assessment rather than assuming the original choice remains optimal.",
        },
        {
          paragraph:
            "After deployment, cloud operations remain continuous. Review access permissions, audit logs, security findings, service health, resource utilization, cost trends, and recovery readiness. Maintain infrastructure as code where suitable, patch systems that remain customer-managed, test incident procedures, and track provider service changes. Effective cloud adoption combines appropriate technology with skilled people, governance, documented processes, and ongoing evaluation.",
        },
      ],
    },
  ],

  keyTerms: [
    {
      word: "Cloud Platform",
      definition:
        "A collection of cloud infrastructure, managed services, tools, and interfaces used to deploy and operate applications and workloads.",
      source: "NIST SP 800-145",
    },
    {
      word: "Cloud Provider",
      definition:
        "An organization that offers cloud computing resources and services to customers.",
      source: "NIST SP 800-145",
    },
    {
      word: "Region",
      definition:
        "A geographic area in which a cloud provider operates infrastructure and offers supported services.",
      source: "AWS Global Infrastructure Documentation",
    },
    {
      word: "Availability Zone",
      definition:
        "An isolated infrastructure location within a cloud region, intended to help support resilient deployments.",
      source: "AWS Global Infrastructure Documentation",
    },
    {
      word: "Amazon EC2",
      definition:
        "An AWS service that provides configurable virtual computing capacity.",
      source: "AWS EC2 Documentation",
    },
    {
      word: "Amazon S3",
      definition:
        "An AWS object storage service for storing and retrieving data.",
      source: "AWS S3 Documentation",
    },
    {
      word: "AWS IAM",
      definition:
        "An AWS service for managing identities and controlling access to AWS resources.",
      source: "AWS IAM Documentation",
    },
    {
      word: "Microsoft Azure",
      definition:
        "Microsoft's cloud platform for infrastructure, application hosting, data services, and related capabilities.",
      source: "Microsoft Azure Documentation",
    },
    {
      word: "Azure Virtual Machines",
      definition:
        "An Azure service for provisioning and managing virtualized computing instances.",
      source: "Azure Virtual Machines Documentation",
    },
    {
      word: "Azure Blob Storage",
      definition:
        "Azure object storage designed for large amounts of unstructured data.",
      source: "Azure Blob Storage Documentation",
    },
    {
      word: "Azure RBAC",
      definition:
        "Azure role-based access control, which uses role assignments to manage permissions to Azure resources.",
      source: "Azure RBAC Documentation",
    },
    {
      word: "Google Cloud",
      definition:
        "Google's cloud platform for computing, storage, networking, databases, analytics, and other services.",
      source: "Google Cloud Documentation",
    },
    {
      word: "Compute Engine",
      definition:
        "A Google Cloud service for creating and managing virtual machines.",
      source: "Compute Engine Documentation",
    },
    {
      word: "Cloud Storage",
      definition:
        "Google Cloud's object storage service for storing and retrieving data.",
      source: "Cloud Storage Documentation",
    },
    {
      word: "Google Cloud IAM",
      definition:
        "A permission-management system that determines who can perform which actions on Google Cloud resources.",
      source: "Google Cloud IAM Documentation",
    },
    {
      word: "Managed Service",
      definition:
        "A service in which the provider operates or maintains specified parts of the underlying technology, reducing some customer administration tasks.",
      source: "NIST SP 800-145",
    },
    {
      word: "Shared Responsibility Model",
      definition:
        "A model that divides security and operational responsibilities between the cloud provider and the customer.",
      source: "AWS Shared Responsibility Model",
    },
    {
      word: "Cloud Migration",
      definition:
        "The process of moving applications, data, or workloads from an existing environment to a cloud environment or between cloud environments.",
      source: "AWS Cloud Adoption Framework",
    },
    {
      word: "Interoperability",
      definition:
        "The ability of systems or services to exchange information and work together.",
      source: "NIST Cloud Computing Standards Roadmap",
    },
    {
      word: "Vendor Lock-In",
      definition:
        "A condition in which switching providers or technologies becomes difficult or costly because of dependencies, proprietary services, or migration constraints.",
      source: "NIST Cloud Computing Standards Roadmap",
    },
    {
      word: "Multi-Cloud",
      definition:
        "An architecture or operating strategy that uses services from more than one cloud provider.",
      source: "Google Cloud Architecture Framework",
    },
    {
      word: "Hybrid Cloud",
      definition:
        "A cloud environment that combines distinct infrastructure environments, such as public cloud and private or on-premises infrastructure, with technology that enables data or application portability.",
      source: "NIST SP 800-145",
    },
    {
      word: "Total Cost of Ownership",
      definition:
        "An estimate of the full cost of acquiring, migrating, operating, securing, and maintaining a system over a defined period.",
      source: "AWS Pricing Documentation",
    },
    {
      word: "Proof of Concept",
      definition:
        "A limited implementation used to test feasibility, validate assumptions, and evaluate whether a proposed solution meets important requirements.",
      source: "Cloud architecture evaluation practice",
    },
  ],

  references: [
    {
      author: "Amazon Web Services",
      link: "https://docs.aws.amazon.com/",
    },
    {
      author: "Amazon Web Services",
      link: "https://aws.amazon.com/about-aws/global-infrastructure/",
    },
    {
      author: "Amazon Web Services",
      link: "https://aws.amazon.com/architecture/",
    },
    {
      author: "Amazon Web Services",
      link: "https://aws.amazon.com/iam/",
    },
    {
      author: "Amazon Web Services",
      link: "https://aws.amazon.com/pricing/",
    },
    {
      author: "Microsoft",
      link: "https://learn.microsoft.com/en-us/azure/",
    },
    {
      author: "Microsoft",
      link: "https://learn.microsoft.com/en-us/azure/architecture/",
    },
    {
      author: "Microsoft",
      link: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview",
    },
    {
      author: "Microsoft",
      link: "https://azure.microsoft.com/en-us/pricing/",
    },
    {
      author: "Google Cloud",
      link: "https://cloud.google.com/docs",
    },
    {
      author: "Google Cloud",
      link: "https://cloud.google.com/architecture",
    },
    {
      author: "Google Cloud",
      link: "https://cloud.google.com/iam/docs/overview",
    },
    {
      author: "Google Cloud",
      link: "https://cloud.google.com/pricing",
    },
    {
      author: "National Institute of Standards and Technology",
      link: "https://csrc.nist.gov/pubs/sp/800/145/final",
    },
    {
      author: "National Institute of Standards and Technology",
      link: "https://www.nist.gov/publications/nist-cloud-computing-standards-roadmap",
    },
  ],

  createdAt: timestamp,
  updatedAt: timestamp,
};
