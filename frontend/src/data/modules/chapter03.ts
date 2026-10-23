
import type { CloudComputingChapter } from "../../types/modules";

const cloudImage1 =
  "https://imgs.search.brave.com/Usib799dLoQ_cyg_LG-px2TiDKQmawxSLQAGUWAiyDI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MzQ5MzQ0Ni9waG90/by9kaWdpdGFsLWNs/b3VkLWNvbmNlcHQt/YmFja2dyb3VuZC1j/bG91ZC1jb21wdXRp/bmctc29sdXRpb25z/LWFuZC1ldm9sdXRp/b24tZnV0dXJpc3Rp/Yy1jbG91ZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TkxI/cnA2aXFYYlVOVXpw/RVNjNE1SdmctNGJZ/NDdZOFlWM0dVR0tK/OFFRUT0";

const cloudImage2 =
  "https://imgs.search.brave.com/NEBpERNUNhwK5ZOGyvGNcF0N7W-xat8HpOAOZLsbHt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/NDkxMjgwNy9waG90/by9jbG91ZC1jb21w/dXRpbmctY29uY2Vw/dC1kaWdpdGFsLWNs/b3VkLXNvbHV0aW9u/cy1vbi1wY2ItZnV0/dXJpc3RpYy1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1nTjJz/aUtNdUU5Y0JISnhu/Q1NlSTJHT3lVc3Fs/bVBQRmFSY2lka0VG/MzVBPQ";

export const cloudComputingChapter03: CloudComputingChapter = {
  chapterId: "cloud-computing-chapter-03",
  title: "Cloud Service Models",
  description:
    "Explores the major cloud service models—Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS)—and explains their characteristics, shared responsibility boundaries, benefits, limitations, use cases, and selection criteria. Learners will understand how service models determine the level of control, flexibility, and operational responsibility retained by cloud customers and provided by cloud providers.",

  objectives: [
    {
      objective:
        "Define cloud service models and explain how they differ from cloud deployment models.",
    },
    {
      objective:
        "Describe the characteristics, components, advantages, limitations, and common use cases of IaaS, PaaS, and SaaS.",
    },
    {
      objective:
        "Compare the responsibilities of cloud providers and customers across different service models.",
    },
    {
      objective:
        "Identify appropriate cloud service models for common personal, educational, and business requirements.",
    },
    {
      objective:
        "Evaluate cloud service models using factors such as control, scalability, cost, maintenance, security, and operational complexity.",
    },
    {
      objective:
        "Recognize additional cloud service categories and understand that real-world cloud offerings may combine multiple service models.",
    },
  ],

  videoUrl: "https://www.youtube.com/embed/ICbgrmoB5ZE",

  slideUrl:
    "https://docs.google.com/presentation/d/e/2PACX-1vRjqCgBlndvDgCVkiESdvF_FZFd3C1itCK6MNStjFZ5AHyz356QNrziUR2k40BLXA/pubembed?start=false&loop=false&delayms=3000",

  sections: [
    {
      sectionNo: "3.1",
      header: "Understanding Cloud Service Models",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "A cloud service model describes the type of computing capability delivered to a customer through a cloud environment and determines which parts of the technology stack the provider manages. Instead of purchasing and operating every computing component independently, customers can consume infrastructure, development platforms, software applications, and other capabilities as services over a network.",
        },
        {
          paragraph:
            "The three commonly recognized foundational cloud service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). They represent different levels of abstraction. IaaS provides relatively flexible computing infrastructure, PaaS provides a managed environment for developing and running applications, and SaaS delivers a ready-to-use application. As customers move from IaaS toward SaaS, the provider generally manages more of the underlying technology stack, while the customer typically has less direct control over it.",
        },
        {
          paragraph:
            "Service models should not be confused with deployment models. A service model describes what capability is provided and how responsibilities are divided. A deployment model describes how cloud infrastructure is organized and made available, such as through public, private, community, or hybrid cloud arrangements. These concepts are related but answer different questions.",
        },
        {
          paragraph:
            "For example, an organization could rent virtual machines through IaaS, deploy its custom application on a PaaS platform, and use a SaaS application for email. All three services could form part of the same organization's cloud strategy. Understanding the differences helps organizations select services that fit their technical skills, business requirements, budget, and security obligations.",
        },
      ],
    },

    {
      sectionNo: "3.2",
      header: "Infrastructure as a Service (IaaS)",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "Infrastructure as a Service (IaaS) provides fundamental computing resources over a network. These commonly include virtual machines, processing capacity, storage, and virtual networking. Customers provision resources when needed rather than purchasing and maintaining all the physical hardware themselves. The cloud provider operates the underlying physical data centers, servers, networking equipment, and virtualization infrastructure.",
        },
        {
          paragraph:
            "With IaaS, customers typically retain substantial control over their operating systems, installed software, application configurations, and data. Depending on the service, customers may also configure virtual networks, access rules, storage settings, and security controls. However, the customer is generally responsible for operating-system updates, application maintenance, identity and access configuration, and securing the workloads they deploy. Exact responsibilities vary by provider and product.",
        },
        {
          paragraph:
            "A typical IaaS deployment might involve creating a virtual machine, selecting its operating system and capacity, attaching storage, configuring network access, installing a web server, and deploying an application. This flexibility is useful for legacy applications, custom server environments, development and testing, and workloads that require operating-system-level control.",
        },
        {
          paragraph:
            "The main advantages of IaaS include flexibility, rapid provisioning, adjustable capacity, and reduced need to purchase physical hardware. Its limitations include the need for infrastructure expertise, continuing system administration, security configuration, and cost monitoring. Renting a virtual machine does not automatically make an application secure, highly available, or inexpensive; customers must design and manage those characteristics.",
        },
        {
          paragraph:
            "Examples include Amazon Elastic Compute Cloud (Amazon EC2), Azure Virtual Machines, and Google Compute Engine. These services provide infrastructure capabilities, although their surrounding managed features can extend into other service categories. When evaluating an offering, examine the actual service and its responsibility model rather than classifying an entire provider as IaaS.",
        },
      ],
    },

    {
      sectionNo: "3.3",
      header: "Platform as a Service (PaaS)",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "Platform as a Service (PaaS) provides a managed environment for building, deploying, and running applications. The provider handles much of the underlying infrastructure and platform maintenance, which may include operating-system management, runtime environments, middleware, and application hosting components. Developers can therefore concentrate more on application code and business logic instead of administering every server component.",
        },
        {
          paragraph:
            "A PaaS workflow may involve connecting a code repository, selecting a programming runtime, defining application settings, and deploying an application. The platform may handle provisioning, runtime execution, health checks, deployment operations, and scaling capabilities. The exact features differ between products; some platforms offer source-code deployment, while others run packaged applications or containers.",
        },
        {
          paragraph:
            "PaaS is useful for web applications, APIs, prototypes, internal business systems, and development teams that want to reduce routine infrastructure management. It can accelerate development and standardize deployment practices. Managed databases, application hosting platforms, and integrated development environments may support PaaS-style workflows, but a particular service should be classified according to its actual capabilities and operating model.",
        },
        {
          paragraph:
            "PaaS typically gives customers less control over the underlying operating system and infrastructure than IaaS. Applications may need to conform to supported runtimes, platform configurations, or deployment conventions. Provider-specific features can also increase migration effort if an application depends heavily on them. Before selecting PaaS, developers should examine supported languages, runtime versions, scaling behavior, service limits, regional availability, monitoring features, and pricing.",
        },
        {
          paragraph:
            "Examples include Azure App Service, Google App Engine, and AWS Elastic Beanstalk. Although these products help manage application deployment, their exact management boundaries and supported capabilities differ. Developers must still secure application code, control access, protect secrets, manage data appropriately, and follow the security guidance for the selected platform.",
        },
      ],
    },

    {
      sectionNo: "3.4",
      header: "Software as a Service (SaaS)",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "Software as a Service (SaaS) delivers a complete software application that customers access over a network, commonly through a web browser or mobile application. The provider operates the application and manages its underlying infrastructure and software environment. Customers generally configure available features, manage users and permissions, and use the application without maintaining the servers on which it runs.",
        },
        {
          paragraph:
            "Common SaaS categories include email and collaboration tools, customer relationship management systems, online office applications, project management platforms, and hosted learning management systems. For example, an educational institution may use a SaaS learning platform to publish lessons, manage learner accounts, collect submissions, and review progress without building and operating the entire application itself.",
        },
        {
          paragraph:
            "SaaS can reduce the effort required to install, update, and maintain software. Providers may deliver updates centrally, offer subscription-based access, and make applications available from multiple locations and device types. These characteristics can simplify adoption and support distributed teams. However, customers should still evaluate service availability, account security, accessibility, data export options, integration capabilities, and the provider's support arrangements.",
        },
        {
          paragraph:
            "SaaS generally offers less control over the application's internal implementation and hosting environment than IaaS or PaaS. Customers may be limited to the application's built-in features and configuration options. They may also face recurring subscription costs, integration constraints, vendor dependency, and challenges when transferring data to another service. A subscription does not eliminate the need for sound governance or responsible data handling.",
        },
        {
          paragraph:
            "Examples include Google Workspace, Microsoft 365, and Salesforce. In these services, the provider manages the core application, but the customer remains responsible for appropriate account administration, access permissions, data classification, and the safe use of the service. Specific security and compliance responsibilities depend on the product, configuration, contract, and applicable requirements.",
        },
      ],
    },

    {
      sectionNo: "3.5",
      header: "Comparing IaaS, PaaS, and SaaS",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "The most important distinction among IaaS, PaaS, and SaaS is the division of management responsibilities. IaaS provides the greatest infrastructure-level flexibility of the three foundational models. PaaS abstracts much of the infrastructure and runtime management so developers can focus on applications. SaaS provides a finished application and abstracts most of the technology stack from the customer.",
        },
        {
          paragraph:
            "In a typical IaaS arrangement, the provider manages physical facilities, physical networking, servers, and the virtualization layer, while the customer manages the guest operating system, installed applications, and data. With PaaS, the provider also manages more of the operating-system and runtime environment. With SaaS, the provider manages the application itself as well as its underlying platform and infrastructure. These are general patterns; specific products and contracts may allocate duties differently.",
        },
        {
          paragraph:
            "Consider an organization that needs to host an online store. With IaaS, its technical team could configure virtual servers, install the operating system and web server, and maintain the application environment. With PaaS, the team could deploy its store application to a managed application platform. With SaaS, the organization could subscribe to an existing e-commerce application and configure its catalog, payment settings, and business workflows.",
        },
        {
          paragraph:
            "The right choice depends on more than the amount of control available. Teams should compare development speed, staff expertise, application requirements, integration needs, performance, portability, security obligations, compliance, availability, and total cost. A highly customizable solution can require more operational work, while a more managed service can reduce maintenance but introduce platform constraints or dependency on a particular provider.",
        },
        {
          paragraph:
            "Remember that shared responsibility does not mean responsibility disappears when moving to a more managed model. The provider secures and operates the service components assigned to it, while the customer must still fulfill the duties assigned to the customer. Identity management, data handling, account configuration, application logic, and access policies remain important even when infrastructure operations are largely abstracted.",
        },
      ],
    },

    {
      sectionNo: "3.6",
      header: "Shared Responsibility and Security Across Service Models",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "Cloud security is commonly described through a shared responsibility model. The cloud provider is responsible for specified parts of the cloud service, while the customer is responsible for other parts. The division depends on the service model, the specific product, contractual terms, and how the customer configures and uses the service. It should never be assumed that a provider automatically handles every aspect of security.",
        },
        {
          paragraph:
            "For IaaS, customers usually have more security duties involving operating systems, installed applications, network rules, workload configuration, and data access. For PaaS, the provider typically manages more of the operating system and application runtime, but the customer still needs to secure application code, credentials, data, and permissions. For SaaS, the provider operates the application, while the customer commonly manages user access, configuration choices, and appropriate use and protection of organizational information.",
        },
        {
          paragraph:
            "Important customer security practices include enabling multifactor authentication where available, applying least-privilege access, protecting credentials and secrets, classifying data, reviewing audit logs, maintaining appropriate backups, and configuring sharing and network access carefully. Organizations should also understand their legal and regulatory obligations, assess vendor assurances, and establish procedures for incidents and service disruptions.",
        },
        {
          paragraph:
            "A useful way to understand the boundary is to ask who controls a component and who is expected to maintain it. For example, if an organization runs an unpatched operating system on an IaaS virtual machine, that is generally a customer-side management issue. If a customer accidentally grants confidential files public access through a cloud application's configuration, the customer may also be responsible even though the provider operates the service.",
        },
        {
          paragraph:
            "Before adopting a cloud service, consult the provider's shared responsibility documentation, security configuration guides, service-level agreement, and compliance information. Confirm which party handles patching, backups, encryption options, identity controls, monitoring, incident notification, and data deletion. Written responsibility assignments help prevent security gaps caused by assumptions.",
        },
      ],
    },

    {
      sectionNo: "3.7",
      header: "Additional Cloud Service Categories",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "IaaS, PaaS, and SaaS are foundational service models, but the cloud market includes many more specialized offerings. These categories describe particular capabilities or delivery approaches. Their names are not always used consistently across providers, so learners should evaluate what a service actually delivers rather than relying on its label alone.",
        },
        {
          paragraph:
            "Function as a Service (FaaS) allows developers to execute individual functions in response to events without directly managing the underlying servers. It is often associated with serverless computing, although serverless is a broader operational approach that can include managed databases, event services, and other resources. Developers still need to manage code behavior, permissions, dependencies, and costs associated with executions and related services.",
        },
        {
          paragraph:
            "Database as a Service (DBaaS) provides managed database capabilities, such as provisioning, maintenance, patching, backups, and monitoring, depending on the offering. Customers typically remain responsible for data modeling, query design, access permissions, and application-level data integrity. Managed databases can reduce administrative work, but backup and recovery requirements should still be verified rather than assumed.",
        },
        {
          paragraph:
            "Storage as a Service provides access to managed storage capabilities, such as object, block, or file storage. The appropriate option depends on how data is accessed and used. Object storage is commonly suited to unstructured files and backups, block storage supports disk-like workloads, and file storage provides shared file-system access. Data durability, availability, access control, lifecycle policies, and retrieval costs differ by service.",
        },
        {
          paragraph:
            "Other commonly encountered labels include Container as a Service (CaaS), Desktop as a Service (DaaS), and AI as a Service. CaaS offerings help customers deploy and manage containerized workloads, DaaS delivers hosted desktop environments, and AI services provide capabilities such as model inference or language processing through managed interfaces. These categories may overlap with IaaS or PaaS and do not replace the need to review a service's actual management responsibilities.",
        },
      ],
    },

    {
      sectionNo: "3.8",
      header: "Selecting the Appropriate Cloud Service Model",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [{ source: "iStockphoto via the provided Brave image URL" }],
      content: [
        {
          paragraph:
            "Selecting a cloud service model begins with identifying the problem to solve. Determine whether the organization needs raw computing resources, a platform for deploying custom software, or a complete application. Then identify functional requirements, performance expectations, data sensitivity, integration needs, availability targets, budget constraints, and the technical expertise available to maintain the solution.",
        },
        {
          paragraph:
            "IaaS may be appropriate when a team needs operating-system control, custom network configurations, or support for software that cannot easily run on a more managed platform. PaaS may be suitable when developers want to deploy applications without taking primary responsibility for servers and operating systems. SaaS may be the best fit when an existing application already meets the organization's needs and the organization wants to avoid developing and maintaining a custom equivalent.",
        },
        {
          paragraph:
            "Total cost of ownership should include more than the advertised subscription or compute price. Consider storage and data transfer charges, support plans, licenses, backups, monitoring, security tooling, engineering time, administration, downtime risk, and potential migration costs. For IaaS, staff time spent patching and operating servers can be significant. For SaaS, subscription tiers, user counts, integrations, and data export charges can affect the long-term cost.",
        },
        {
          paragraph:
            "Portability and vendor lock-in are also important. A service that relies heavily on proprietary APIs, platform-specific databases, or unique workflow features may be more difficult to migrate. Before committing, determine how data can be exported, whether standard interfaces are supported, what happens when a contract ends, and whether the application can be moved or redesigned within acceptable cost and time limits.",
        },
        {
          paragraph:
            "For example, a small student team building a standard web application may prefer PaaS to spend more time on development than server administration. A system that requires specialized operating-system configuration may need IaaS. A university that needs email and collaboration tools may choose SaaS. These are starting points, not universal rules: the best model is the one that satisfies requirements while maintaining acceptable security, operational reliability, flexibility, and cost.",
        },
        {
          paragraph:
            "A practical evaluation should compare at least two viable services, review provider documentation, estimate expected usage, test the solution with a small proof of concept, and document the shared responsibilities. Reassess the decision as usage grows or requirements change. Cloud service selection is an ongoing architectural decision rather than a one-time choice.",
        },
      ],
    },
  ],

  keyTerms: [
    {
      word: "Cloud Service Model",
      definition:
        "A way of categorizing cloud capabilities according to what the provider delivers and how management responsibilities are divided between provider and customer.",
      source: "NIST SP 800-145",
    },
    {
      word: "Infrastructure as a Service (IaaS)",
      definition:
        "A cloud service model that provides fundamental computing resources, such as processing, storage, and networking, while allowing the customer to control operating systems, applications, and selected network configurations.",
      source: "NIST SP 800-145",
    },
    {
      word: "Platform as a Service (PaaS)",
      definition:
        "A cloud service model that allows customers to deploy applications using provider-supported tools and environments without managing the underlying cloud infrastructure.",
      source: "NIST SP 800-145",
    },
    {
      word: "Software as a Service (SaaS)",
      definition:
        "A cloud service model in which customers use a provider's applications running on cloud infrastructure, generally without managing the underlying infrastructure or application platform.",
      source: "NIST SP 800-145",
    },
    {
      word: "Shared Responsibility Model",
      definition:
        "A framework that defines which security and operational responsibilities belong to the cloud provider and which remain with the customer.",
      source: "AWS Shared Responsibility Model",
    },
    {
      word: "Cloud Provider",
      definition:
        "An organization that makes cloud computing capabilities available to customers through a cloud service.",
      source: "NIST SP 800-145",
    },
    {
      word: "Cloud Customer",
      definition:
        "An individual or organization that uses cloud services and fulfills the responsibilities assigned to it by the service and its configuration.",
      source: "NIST SP 800-145 and provider documentation",
    },
    {
      word: "Scalability",
      definition:
        "The ability of a system to accommodate changing workloads by increasing or decreasing its available resources or capacity.",
      source: "Microsoft Azure Architecture Center",
    },
    {
      word: "Vendor Lock-in",
      definition:
        "A situation in which dependence on a provider's technologies, services, or data formats makes moving to another provider or solution difficult or costly.",
      source: "Microsoft Azure Architecture Center",
    },
    {
      word: "Function as a Service (FaaS)",
      definition:
        "A cloud execution model that lets developers run individual functions in response to events without directly managing the underlying servers.",
      source: "AWS Lambda documentation",
    },
    {
      word: "Database as a Service (DBaaS)",
      definition:
        "A managed cloud database offering in which the provider operates many of the underlying database infrastructure and maintenance tasks.",
      source: "Microsoft Azure database documentation",
    },
    {
      word: "Total Cost of Ownership (TCO)",
      definition:
        "An estimate of the full cost of using a solution over time, including direct service charges and indirect costs such as administration, maintenance, support, and migration.",
      source: "Microsoft Azure Total Cost of Ownership guidance",
    },
  ],

  references: [
    {
      author: "Mell, P., & Grance, T. (2011). National Institute of Standards and Technology.",
      link: "https://doi.org/10.6028/NIST.SP.800-145",
    },
    {
      author: "Amazon Web Services. AWS Shared Responsibility Model.",
      link: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    },
    {
      author: "Amazon Web Services. What is IaaS?",
      link: "https://aws.amazon.com/what-is/iaas/",
    },
    {
      author: "Amazon Web Services. What is PaaS?",
      link: "https://aws.amazon.com/what-is/paas/",
    },
    {
      author: "Amazon Web Services. What is SaaS?",
      link: "https://aws.amazon.com/what-is/saas/",
    },
    {
      author: "Microsoft Azure. What is IaaS?",
      link: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-iaas",
    },
    {
      author: "Microsoft Azure. What is PaaS?",
      link: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-paas",
    },
    {
      author: "Microsoft Azure. What is SaaS?",
      link: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-saas",
    },
    {
      author: "Google Cloud. What is cloud computing?",
      link: "https://cloud.google.com/learn/what-is-cloud-computing",
    },
    {
      author: "Amazon Web Services. AWS Lambda Developer Guide.",
      link: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    },
    {
      author: "Microsoft Azure Architecture Center.",
      link: "https://learn.microsoft.com/en-us/azure/architecture/",
    },
  ],

  createdAt: "2026-10-24T00:00:00.000Z",
  updatedAt: "2026-10-24T00:00:00.000Z",
};
