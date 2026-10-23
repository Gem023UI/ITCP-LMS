
import type { CloudComputingChapter } from "../../types/modules";

const cloudImage1 =
  "https://imgs.search.brave.com/Usib799dLoQ_cyg_LG-px2TiDKQmawxSLQAGUWAiyDI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MzQ5MzQ0Ni9waG90/by9kaWdpdGFsLWNs/b3VkLWNvbmNlcHQt/YmFja2dyb3VuZC1j/bG91ZC1jb21wdXRp/bmctc29sdXRpb25z/LWFuZC1ldm9sdXRp/b24tZnV0dXJpc3Rp/Yy1jbG91ZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TkxI/cnA2aXFYYlVOVXpw/RVNjNE1SdmctNGJZ/NDdZOFlWM0dVR0tK/OFFRUT0";

const cloudImage2 =
  "https://imgs.search.brave.com/NEBpERNUNhwK5ZOGyvGNcF0N7W-xat8HpOAOZLsbHt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/NDkxMjgwNy9waG90/by9jbG91ZC1jb21w/dXRpbmctY29uY2Vw/dC1kaWdpdGFsLWNs/b3VkLXNvbHV0aW9u/cy1vbi1wY2ItZnV0/dXJpc3RpYy1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1nTjJz/aUtNdUU5Y0JISnhu/Q1NlSTJHT3lVc3Fs/bVBQRmFSY2lka0VG/MzVBPQ";

export const cloudComputingChapter06: CloudComputingChapter = {
  chapterId: "cloud-computing-chapter-06",
  title: "Cloud Storage and Data Management",
  description:
    "Explores how cloud platforms store, organize, protect, process, and manage data. Covers cloud storage types, databases, data lifecycle management, durability, availability, backup and recovery, security, performance, cost optimization, and data migration.",

  objectives: [
    {
      objective:
        "Explain the role of cloud storage and data management in modern cloud computing environments.",
    },
    {
      objective:
        "Differentiate object, block, and file storage based on architecture, access methods, performance, and use cases.",
    },
    {
      objective:
        "Describe data lifecycle management and explain how retention, archival, and deletion policies support efficient storage.",
    },
    {
      objective:
        "Compare relational and NoSQL databases and identify suitable data services for different application requirements.",
    },
    {
      objective:
        "Explain data durability, availability, replication, backup, and disaster recovery, including their differences.",
    },
    {
      objective:
        "Identify cloud data security controls, including encryption, identity and access management, and data classification.",
    },
    {
      objective:
        "Evaluate storage performance, scalability, and cost considerations when selecting cloud storage solutions.",
    },
    {
      objective:
        "Describe the major steps and risks involved in migrating data to the cloud and applying effective data governance.",
    },
  ],

  videoUrl: "https://www.youtube.com/embed/ICbgrmoB5ZE",

  slideUrl:
    "https://docs.google.com/presentation/d/e/2PACX-1vRjqCgBlndvDgCVkiESdvF_FZFd3C1itCK6MNStjFZ5AHyz356QNrziUR2k40BLXA/pubembed?start=false&loop=false&delayms=3000",

  sections: [
    {
      sectionNo: "6.1",
      header: "Introduction to Cloud Storage and Data Management",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background illustrating cloud computing solutions and infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud storage is a service that allows individuals and organizations to store and retrieve digital information using infrastructure managed by a cloud provider. Instead of purchasing and maintaining all storage hardware locally, customers provision storage resources over a network and manage them through web consoles, APIs, command-line tools, or applications. Depending on the service, capacity can be provisioned or expanded without physically installing additional drives.",
        },
        {
          paragraph:
            "Cloud data management encompasses the practices and technologies used to organize, access, protect, maintain, and govern data throughout its lifecycle. It includes data classification, metadata management, access control, backup, replication, retention, recovery, and deletion. Storage provides the underlying capacity, while data management determines how information is handled and maintained so that it remains useful, secure, and appropriately controlled.",
        },
        {
          paragraph:
            "Cloud storage is commonly used for application files, images, videos, documents, database data, analytics datasets, backups, and long-term archives. For example, an online learning management system may store user-uploaded assignments as objects, keep course enrollment records in a database, and preserve backups separately for recovery. These components work together but serve different purposes and may require different storage technologies.",
        },
        {
          paragraph:
            "Choosing a storage solution requires balancing several requirements: capacity, access speed, availability, durability, security, regulatory obligations, and cost. Frequently accessed application data may need low-latency storage, whereas records that must be retained for years but are rarely accessed may be better suited to archival storage. A good design starts with the data's purpose and access patterns rather than selecting a storage service solely because it offers a large capacity.",
        },
        {
          paragraph:
            "Cloud storage does not automatically guarantee that data is secure, correctly backed up, or recoverable. Responsibilities vary by service model and provider. Organizations must understand the provider's capabilities, configure access permissions correctly, define retention and recovery requirements, and test whether their chosen architecture meets business needs.",
        },
      ],
    },

    {
      sectionNo: "6.2",
      header: "Object, Block, and File Storage",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept showing digital cloud solutions on a printed circuit board background.",
        },
      ],
      content: [
        {
          paragraph:
            "Object, block, and file storage are three major storage approaches used in cloud environments. They differ in how data is organized, addressed, and accessed. Understanding these differences helps architects match storage technology to application requirements instead of assuming that every type of data should be stored in the same way.",
        },
        {
          paragraph:
            "Object storage stores information as individual objects containing the data itself, associated metadata, and a unique identifier within a storage namespace or bucket. Applications commonly access objects through HTTP-based APIs. Object storage is suitable for images, videos, documents, static website assets, backups, logs, and large unstructured datasets. It can scale to very large volumes of data, although its access behavior and performance characteristics differ from those of a traditional disk or shared filesystem.",
        },
        {
          paragraph:
            "Block storage divides data into fixed-sized blocks that a system can address and manage as a logical storage device. Cloud virtual machines commonly attach block volumes and format them with a filesystem or use them for database storage. Block storage is useful for operating system disks, transactional applications, and workloads requiring predictable, low-latency access. Performance depends on the selected volume type, provisioned capacity or performance tier, workload pattern, and provider limits.",
        },
        {
          paragraph:
            "File storage organizes information in files and directories within a hierarchical namespace. It is commonly accessed through filesystem protocols such as NFS or SMB. Multiple application servers may use shared file storage when they need to access the same directory structure. Typical examples include shared departmental files, content management systems, user home directories, and applications designed to work with conventional filesystems.",
        },
        {
          paragraph:
            "Consider a media-sharing application. Uploaded photographs and videos could be stored in object storage, the application's virtual machine could use block storage for its operating system, and a shared file service could provide a common workspace for tools that require directory-based access. This combination illustrates that storage types can complement one another within a single system.",
        },
        {
          paragraph:
            "A useful selection process evaluates access method, latency, throughput, sharing requirements, data size, update patterns, compatibility, and cost. Object storage is not simply a cheaper version of block storage, and file storage is not always the best choice for shared data. Each service has specific capabilities and limitations that must be verified against the intended workload.",
        },
      ],
    },

    {
      sectionNo: "6.3",
      header: "Storage Architecture and the Data Lifecycle",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background representing cloud storage infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud storage architecture describes how data is placed, accessed, protected, and maintained across the components of a cloud environment. A typical architecture may include client applications, network connections, storage APIs, access policies, storage resources, monitoring services, and backup or replication mechanisms. The exact arrangement depends on the selected service and the provider's underlying implementation.",
        },
        {
          paragraph:
            "Metadata provides information that helps describe, identify, organize, and manage stored data. Depending on the system, metadata can include a filename, object identifier, creation timestamp, content type, owner, classification, retention requirement, or application-specific attributes. Accurate metadata supports search, lifecycle automation, auditing, and governance. Sensitive information should not be placed in metadata fields without understanding how those fields are exposed and protected.",
        },
        {
          paragraph:
            "The data lifecycle begins with data creation or collection and continues through processing, active use, sharing, retention, archival, and eventual deletion. Different stages can have different storage and protection requirements. Recently uploaded course materials may need frequent access, while older administrative records may be retained in a lower-cost storage tier until their retention period expires.",
        },
        {
          paragraph:
            "Lifecycle policies automate actions such as transitioning eligible data between storage classes, expiring temporary objects, or deleting information after an approved retention period. Such policies can reduce manual work and storage expenses. However, a poorly configured rule can remove information that is still required for business operations, legal obligations, audits, or disaster recovery. Lifecycle rules should therefore be documented, tested, and reviewed before they are applied to important data.",
        },
        {
          paragraph:
            "Storage classes or tiers often differ in retrieval latency, minimum storage duration, retrieval charges, and availability characteristics. Frequently accessed data may be kept in a performance-oriented tier, while infrequently accessed data may be placed in a lower-cost tier. Archive services can be economical for long-term retention but may require additional time or charges to retrieve information. Exact tier names and conditions vary by provider.",
        },
        {
          paragraph:
            "A complete lifecycle plan defines who owns the data, how it is classified, where it may be stored, who may access it, how long it must be retained, how it will be recovered, and when it may be deleted. Deletion also requires attention to replicas, backups, cached copies, and retention locks. In some environments, immediate physical erasure may not be possible because storage is managed across distributed systems; organizations should understand the provider's documented deletion and retention behavior.",
        },
      ],
    },

    {
      sectionNo: "6.4",
      header: "Databases and Managed Data Services",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud solutions on a circuit-board background.",
        },
      ],
      content: [
        {
          paragraph:
            "Applications often need more than file storage: they need structured ways to insert, retrieve, update, and relate records. Databases provide mechanisms for organizing and querying data, enforcing rules, and supporting concurrent users. Cloud providers offer managed database services that can automate some operational tasks, including provisioning, routine maintenance, patching, monitoring, backups, and availability configuration. The exact responsibilities retained by the customer depend on the service.",
        },
        {
          paragraph:
            "Relational databases organize data into tables made up of rows and columns, with relationships commonly represented through primary keys and foreign keys. They typically use Structured Query Language (SQL) and can enforce constraints that preserve data consistency. Relational databases are appropriate for many transactional systems, such as student enrollment, financial records, inventory, and order processing, where relationships and transaction integrity are important.",
        },
        {
          paragraph:
            "NoSQL is a broad category of database technologies that use data models other than, or in addition to, the traditional relational table model. Common categories include key-value, document, wide-column, and graph databases. These technologies serve different needs: key-value systems can support rapid lookups, document databases store flexible document-shaped records, wide-column systems support particular large-scale access patterns, and graph databases represent relationships among entities. NoSQL does not automatically mean schema-free, faster, or more scalable in every situation.",
        },
        {
          paragraph:
            "Managed relational database services and managed NoSQL services reduce some administrative work, but they do not remove the need for sound data modeling, query design, access control, capacity planning, and cost monitoring. A poorly indexed query or unsuitable partition key can still create performance problems. Database operators must understand service quotas, backup policies, replication behavior, maintenance windows, and the provider's recovery options.",
        },
        {
          paragraph:
            "Database selection should begin with application requirements: the structure of the data, transaction and consistency needs, expected read and write patterns, query complexity, growth rate, latency targets, availability requirements, and operational skills. A relational database may be appropriate for a university registration system that must preserve relationships between students and courses. A document database may suit a catalog whose product attributes vary substantially. Neither choice is universally superior.",
        },
        {
          paragraph:
            "Organizations should distinguish database replication from backup. Replication can keep multiple database copies synchronized and support availability, but an accidental deletion or malicious update may also propagate to replicas. Independent backups and tested recovery procedures provide a separate protection mechanism. Database security should also include least-privilege permissions, secure connections, appropriate encryption, auditing, and careful handling of credentials.",
        },
      ],
    },

    {
      sectionNo: "6.5",
      header: "Data Durability, Availability, Backup, and Recovery",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background representing distributed cloud infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Durability and availability are related but distinct properties of cloud storage. Durability describes the likelihood that stored data will remain intact and not be lost. Availability describes whether a service or data can be accessed when needed. A storage service may offer strong durability while still experiencing a temporary outage that prevents users from retrieving data.",
        },
        {
          paragraph:
            "Cloud providers use different mechanisms to protect data, such as replication, redundancy, integrity checks, and geographically separated infrastructure. Replication creates additional copies of data, while redundancy helps a system continue operating when a component fails. These mechanisms can improve resilience, but their protection depends on configuration, failure domains, consistency behavior, and the provider's documented service design.",
        },
        {
          paragraph:
            "A backup is a recoverable copy of data maintained so that information can be restored after loss, corruption, accidental deletion, or another disruptive event. Backups may be full, incremental, or differential, depending on how each backup captures data changed since an earlier point. Cloud backup services can automate schedules and retention, but organizations still need to verify that the right data is included, that backup copies are protected, and that restoration works.",
        },
        {
          paragraph:
            "Replication is not a complete substitute for backup. If an administrator accidentally deletes a record, ransomware corrupts accessible files, or an application writes incorrect data, those changes may be replicated. A separate backup strategy can provide recovery points from before the incident. Stronger protection may include isolated or immutable backups, separate access permissions, retention controls, and monitoring of backup operations.",
        },
        {
          paragraph:
            "Disaster recovery planning establishes how systems and data will be restored after a major disruption. Two important metrics are the Recovery Point Objective (RPO) and Recovery Time Objective (RTO). RPO describes the maximum tolerable amount of data loss measured in time, while RTO describes the target time for restoring a service. For example, an RPO of 15 minutes means the organization aims to limit data loss to approximately the preceding 15 minutes; it does not guarantee that this target will be achieved under every failure condition.",
        },
        {
          paragraph:
            "Recovery plans should define recovery priorities, responsible personnel, backup locations, access procedures, communication methods, and validation steps. Regular restoration exercises reveal problems that a successful backup status alone cannot prove. Tests should confirm not only that files can be restored but also that databases are consistent, application dependencies work, credentials are available, and business users can resume essential operations.",
        },
        {
          paragraph:
            "Service-level agreements and provider durability or availability figures should be interpreted carefully. A published service target is not a promise that every application will achieve the same end-to-end result. Application design, network access, identity services, dependencies, configuration, and regional failure scenarios can affect actual service availability. Organizations should design and test resilience according to their own recovery requirements.",
        },
      ],
    },

    {
      sectionNo: "6.6",
      header: "Data Security, Encryption, Access Control, and Privacy",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept representing connected digital infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud data security protects information against unauthorized disclosure, alteration, destruction, and access. Security planning commonly addresses confidentiality, integrity, and availability. Confidentiality limits access to authorized parties; integrity helps preserve correctness and detect unauthorized changes; and availability ensures that data and services can be accessed when required. Effective protection combines technical controls, operational procedures, and organizational policies.",
        },
        {
          paragraph:
            "Encryption transforms readable information into a protected form using cryptographic algorithms and keys. Encryption at rest protects stored data, while encryption in transit protects data moving across networks. Cloud services may offer provider-managed encryption by default or configurable encryption options. Some services also support customer-managed keys. Key ownership, rotation, access permissions, recovery, and revocation require careful management because losing access to a necessary key can make protected data unusable.",
        },
        {
          paragraph:
            "Identity and Access Management (IAM) determines which users, groups, applications, and services may perform specific actions on cloud resources. The principle of least privilege means granting only the permissions necessary for a defined task. Role-based access, multi-factor authentication, temporary credentials, and periodic permission reviews can reduce the risk of unauthorized access. Broad permissions and publicly accessible storage resources should be avoided unless they are explicitly required and properly controlled.",
        },
        {
          paragraph:
            "Access policies should consider both identity-based permissions and resource-level controls. For example, a student may be permitted to upload an assignment without being allowed to read another student's submission. An application service account may be allowed to retrieve particular objects but not change storage security settings. Explicitly separating these permissions reduces the impact of compromised accounts or application defects.",
        },
        {
          paragraph:
            "Data classification helps determine the controls appropriate for different information types. Public course descriptions may require fewer restrictions than student records, financial information, authentication secrets, or confidential business documents. Organizations should identify sensitive information, minimize unnecessary collection, restrict access, define retention periods, and avoid exposing confidential values in application logs or public storage locations.",
        },
        {
          paragraph:
            "Privacy and compliance obligations depend on the type of data, the people affected, the organization's role, and the applicable laws and contracts. Organizations operating in the Philippines should evaluate relevant requirements, including the Data Privacy Act of 2012 and applicable National Privacy Commission guidance, where personal data is involved. They should also consider contractual terms, data location, cross-border transfers, breach response, and the responsibilities of cloud providers and customers.",
        },
        {
          paragraph:
            "Security monitoring and auditing help detect unusual access, configuration changes, failed authorization attempts, and potentially harmful activity. Useful practices include enabling appropriate audit logs, protecting those logs from unauthorized alteration, configuring alerts, reviewing public-access settings, and testing incident-response procedures. Encryption alone is insufficient if an attacker has valid credentials or if permissions allow inappropriate access to decrypted information.",
        },
      ],
    },

    {
      sectionNo: "6.7",
      header: "Storage Performance, Scalability, and Cost Optimization",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud background representing scalable computing solutions.",
        },
      ],
      content: [
        {
          paragraph:
            "Storage performance affects how quickly applications can read and write data and how many operations they can handle. Important measurements include latency, throughput, and input/output operations per second (IOPS). Latency is the time required for an operation to complete, throughput measures the amount of data transferred over time, and IOPS measures the number of input/output operations performed per second. These metrics describe different aspects of performance and should not be treated as interchangeable.",
        },
        {
          paragraph:
            "Workload characteristics influence storage selection. A transactional database may generate many small, latency-sensitive reads and writes. A video-processing pipeline may transfer large files and require high throughput. An archive may prioritize low storage cost over immediate retrieval. Performance planning should therefore consider file or object size, request frequency, concurrency, access patterns, network conditions, and the application's tolerance for delays.",
        },
        {
          paragraph:
            "Scalability is the ability of a storage system to handle increasing data volumes or workload demands. Cloud services can provide mechanisms to expand capacity, distribute requests, or adjust provisioned performance. However, scalability is not always automatic or unlimited. Quotas, partition design, request limits, database throughput settings, application bottlenecks, and network capacity may constrain growth. Monitoring actual workload behavior helps identify when changes are necessary.",
        },
        {
          paragraph:
            "Cloud storage costs can include stored capacity, request or transaction charges, data retrieval, network transfer, replication, backup retention, and provisioned performance. The pricing model varies by service and provider. An apparently inexpensive storage tier may become costly if data is retrieved frequently or transferred across regions. Before choosing a tier, estimate both storage expenses and the likely costs of accessing and protecting the data.",
        },
        {
          paragraph:
            "Cost optimization begins with visibility. Teams should monitor storage growth, identify unused volumes and duplicate data, review access patterns, and apply lifecycle policies where appropriate. Compression and deduplication can reduce capacity requirements in supported workloads, but their benefits depend on the data and service. Deleting or archiving data must follow approved retention and legal requirements rather than being driven by cost alone.",
        },
        {
          paragraph:
            "Performance and cost decisions should be evaluated together. Provisioning more IOPS or choosing a higher-performance tier may reduce application latency but increase expenditure. Moving data to a colder tier can lower storage costs but introduce retrieval delays or charges. A useful approach is to define performance objectives, measure the current workload, test candidate configurations, and compare total operating cost against business requirements.",
        },
        {
          paragraph:
            "Capacity planning should also include backup growth, temporary processing files, logs, replicas, and retained versions. These items can consume substantial capacity even when the primary dataset appears stable. Alerts for unexpected growth, budget thresholds, resource tagging, and regular reviews help teams identify cost problems early while maintaining required reliability and protection.",
        },
      ],
    },

    {
      sectionNo: "6.8",
      header: "Data Migration, Governance, and Best Practices",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept illustrating digital cloud services and infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Cloud data migration is the process of transferring data from an existing environment to a cloud service or moving it between cloud environments. Migration may involve files, object collections, databases, backups, and application dependencies. The appropriate method depends on data volume, network bandwidth, downtime tolerance, compatibility, security requirements, and the amount of transformation needed.",
        },
        {
          paragraph:
            "A migration project should begin with discovery and assessment. Teams identify data sources, formats, ownership, dependencies, volume, quality issues, access patterns, sensitivity, and retention requirements. They then select target storage services and define the migration sequence, security controls, validation approach, rollback plan, and acceptable service interruption. Unknown dependencies or undocumented data formats can cause delays and failures if they are not discovered early.",
        },
        {
          paragraph:
            "Common migration strategies include transferring data over a network, using provider-supported transfer tools, replicating changes while systems remain operational, or using physical transfer appliances for very large datasets or limited-connectivity environments. Database migrations may require schema conversion, data transformation, application changes, or replication before cutover. The best method is determined by measured constraints and tested procedures rather than data size alone.",
        },
        {
          paragraph:
            "Data validation is essential after transfer. Validation can compare record counts, file sizes, checksums, metadata, database constraints, and application-level results. A checksum can help determine whether file contents changed during transfer, while application testing confirms that the migrated data remains usable. Teams should preserve the source until the target has been validated and authorized for production use, subject to the project's retention and security requirements.",
        },
        {
          paragraph:
            "Data governance establishes the policies, responsibilities, and decision-making processes that guide data throughout its lifecycle. It addresses ownership, classification, quality, permitted use, access, retention, lineage, and accountability. Data owners determine business requirements, while technical custodians and administrators implement controls. Clear ownership makes it easier to resolve questions about who may access information, how errors should be corrected, and when data can be archived or deleted.",
        },
        {
          paragraph:
            "Data quality includes accuracy, completeness, consistency, timeliness, and validity. Poor-quality data can undermine reporting, analytics, machine learning, and operational decisions even when the storage infrastructure performs correctly. Governance practices may define validation rules, naming conventions, metadata standards, data dictionaries, and procedures for correcting errors. Where datasets are shared across teams, consistent definitions reduce conflicting interpretations.",
        },
        {
          paragraph:
            "Practical cloud data management combines secure defaults, least-privilege access, encryption, monitoring, documented lifecycle policies, appropriate redundancy, independent backups, tested recovery, and cost visibility. Teams should periodically review service configurations, access permissions, retention rules, and recovery objectives. Policies must be adapted to the data's sensitivity and business purpose rather than applied identically to every dataset.",
        },
        {
          paragraph:
            "Consider a university migrating student records to a managed cloud database. The team would first classify the records, confirm applicable privacy obligations, map the existing schema, identify authorized users, and select a suitable database service. It would transfer and validate the data, test application functions, configure encryption and auditing, establish backup and recovery procedures, and plan a controlled cutover. After migration, governance reviews and monitoring would help maintain data quality, security, availability, and cost effectiveness.",
        },
      ],
    },
  ],

  keyTerms: [
    {
      word: "Cloud Storage",
      definition:
        "A cloud service that stores digital information on infrastructure managed by a provider and makes it available through supported network access methods.",
      source: "https://csrc.nist.gov/pubs/sp/800/145/final",
    },
    {
      word: "Data Management",
      definition:
        "The practices used to organize, protect, maintain, govern, and make data available for its intended purposes throughout its lifecycle.",
      source: "https://www.nist.gov/privacy-framework",
    },
    {
      word: "Object Storage",
      definition:
        "A storage approach that manages data as objects containing content, metadata, and identifiers, commonly accessed through service APIs.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
    },
    {
      word: "Block Storage",
      definition:
        "A storage approach that exposes data as addressable blocks, commonly presented to a server as a logical storage volume.",
      source: "https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html",
    },
    {
      word: "File Storage",
      definition:
        "A storage approach that organizes information into files and directories and commonly supports shared access through filesystem protocols.",
      source: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
    },
    {
      word: "Metadata",
      definition:
        "Information that describes other data, such as its format, owner, creation time, classification, or retention requirements.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html",
    },
    {
      word: "Data Lifecycle Management",
      definition:
        "The management of data from creation and active use through retention, archival, and eventual deletion according to defined policies.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
    },
    {
      word: "Relational Database",
      definition:
        "A database that organizes data into related tables and commonly uses SQL to query and manipulate records.",
      source: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
    },
    {
      word: "NoSQL Database",
      definition:
        "A broad category of databases using models such as key-value, document, wide-column, or graph to support different data and access patterns.",
      source: "https://aws.amazon.com/nosql/",
    },
    {
      word: "Durability",
      definition:
        "The ability of a storage system to preserve data without loss over time, subject to its design and stated reliability characteristics.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html",
    },
    {
      word: "Availability",
      definition:
        "The extent to which a system or service is operational and accessible when it is needed.",
      source: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
    },
    {
      word: "Replication",
      definition:
        "The process of maintaining additional copies of data across storage resources or locations to support requirements such as availability, distribution, or recovery.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html",
    },
    {
      word: "Backup",
      definition:
        "A separate, recoverable copy of data maintained so that information can be restored after deletion, corruption, or another disruptive event.",
      source: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html",
    },
    {
      word: "Recovery Point Objective (RPO)",
      definition:
        "The maximum targeted amount of data loss measured in time that an organization is prepared to tolerate following a disruption.",
      source: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
    },
    {
      word: "Recovery Time Objective (RTO)",
      definition:
        "The targeted duration within which a system or service should be restored after a disruption.",
      source: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
    },
    {
      word: "Encryption at Rest",
      definition:
        "The use of cryptographic protection for data stored on storage media or within a storage service.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html",
    },
    {
      word: "Encryption in Transit",
      definition:
        "The protection of information while it moves between systems or services, commonly using protocols such as TLS.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryptionInTransit.html",
    },
    {
      word: "Identity and Access Management (IAM)",
      definition:
        "A system of identities, permissions, and policies used to control who or what can access cloud resources and which actions are permitted.",
      source: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
    },
    {
      word: "Data Classification",
      definition:
        "The process of categorizing data according to attributes such as sensitivity, business value, and applicable handling requirements.",
      source: "https://www.nist.gov/privacy-framework",
    },
    {
      word: "Data Migration",
      definition:
        "The process of transferring data between storage systems, platforms, or environments while preserving its required meaning, integrity, and usability.",
      source: "https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets",
    },
    {
      word: "Data Governance",
      definition:
        "The policies, responsibilities, standards, and oversight processes used to manage data quality, access, ownership, protection, and appropriate use.",
      source: "https://www.nist.gov/privacy-framework",
    },
    {
      word: "Latency",
      definition:
        "The time taken for an operation or request to complete or produce a response.",
      source: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-performance.html",
    },
    {
      word: "Throughput",
      definition:
        "The amount of data transferred or processed over a given period of time.",
      source: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-performance.html",
    },
    {
      word: "IOPS",
      definition:
        "Input/output operations per second, a measure of how many storage read or write operations a system performs per second.",
      source: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-performance.html",
    },
    {
      word: "Storage Tier",
      definition:
        "A category of storage with particular cost, performance, availability, and retrieval characteristics designed for specific access patterns.",
      source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    },
  ],

  references: [
    {
      author: "National Institute of Standards and Technology (NIST). Cloud Computing Definition (SP 800-145).",
      link: "https://csrc.nist.gov/pubs/sp/800/145/final",
    },
    {
      author: "Amazon Web Services. What Is Amazon S3?",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
    },
    {
      author: "Amazon Web Services. Amazon EBS User Guide.",
      link: "https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html",
    },
    {
      author: "Amazon Web Services. Amazon EFS User Guide.",
      link: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html",
    },
    {
      author: "Amazon Web Services. Amazon S3 Storage Classes.",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html",
    },
    {
      author: "Amazon Web Services. Managing the Amazon S3 Object Lifecycle.",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html",
    },
    {
      author: "Amazon Web Services. Amazon RDS User Guide.",
      link: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html",
    },
    {
      author: "Amazon Web Services. AWS Backup Developer Guide.",
      link: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html",
    },
    {
      author: "Amazon Web Services. Encrypting Data with Amazon S3.",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html",
    },
    {
      author: "Amazon Web Services. Protecting Data in Transit.",
      link: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryptionInTransit.html",
    },
    {
      author: "Amazon Web Services. AWS Identity and Access Management User Guide.",
      link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
    },
    {
      author: "National Institute of Standards and Technology (NIST). Contingency Planning Guide for Federal Information Systems (SP 800-34 Rev. 1).",
      link: "https://csrc.nist.gov/pubs/sp/800/34/r1/final",
    },
    {
      author: "National Institute of Standards and Technology (NIST). NIST Privacy Framework.",
      link: "https://www.nist.gov/privacy-framework",
    },
    {
      author: "Google Cloud. Transferring Large Datasets to Google Cloud.",
      link: "https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets",
    },
    {
      author: "National Privacy Commission, Philippines. Data Privacy Act of 2012 (Republic Act No. 10173).",
      link: "https://privacy.gov.ph/data-privacy-act/",
    },
  ],

  createdAt: "2026-10-24T00:00:00.000Z",
  updatedAt: "2026-10-24T00:00:00.000Z",
};
