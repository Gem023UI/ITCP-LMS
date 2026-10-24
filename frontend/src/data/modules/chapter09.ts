
import type { CloudComputingChapter } from "../../types/modules";

const cloudImage1 =
  "https://imgs.search.brave.com/Usib799dLoQ_cyg_LG-px2TiDKQmawxSLQAGUWAiyDI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE2/MzQ5MzQ0Ni9waG90/by9kaWdpdGFsLWNs/b3VkLWNvbmNlcHQt/YmFja2dyb3VuZC1j/bG91ZC1jb21wdXRp/bmctc29sdXRpb25z/LWFuZC1ldm9sdXRp/b24tZnV0dXJpc3Rp/Yy1jbG91ZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TkxI/cnA2aXFYYlVOVXpw/RVNjNE1SdmctNGJZ/NDdZOFlWM0dVR0tK/OFFRUT0";

const cloudImage2 =
  "https://imgs.search.brave.com/NEBpERNUNhwK5ZOGyvGNcF0N7W-xat8HpOAOZLsbHt4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ4/NDkxMjgwNy9waG90/by9jbG91ZC1jb21w/dXRpbmctY29uY2Vw/dC1kaWdpdGFsLWNs/b3VkLXNvbHV0aW9u/cy1vbi1wY2ItZnV0/dXJpc3RpYy1iYWNr/Z3JvdW5kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1nTjJz/aUtNdUU5Y0JISnhu/Q1NlSTJHT3lVc3Fs/bVBQRmFSY2lka0VG/MzVBPQ";

export const cloudComputingChapter09: CloudComputingChapter = {
  chapterId: "cloud-computing-chapter-09",
  title: "Containers and Serverless Computing",
  cardImage: "../../../public/chapters/09.png",
  description:
    "Explores modern cloud application deployment approaches, including containerization, container images, registries, orchestration, and serverless computing. Explains how these technologies support portability, automated deployment, scalability, and efficient resource use, while examining their architecture, limitations, security concerns, and appropriate use cases.",
  durationMinutes: 30,
  objectives: [
    {
      objective:
        "Explain containerization and distinguish containers from virtual machines in terms of architecture, isolation, portability, and resource usage.",
    },
    {
      objective:
        "Describe container images, registries, runtimes, and the steps involved in building and running a containerized application.",
    },
    {
      objective:
        "Explain the role of container orchestration in scheduling, scaling, networking, service discovery, and application recovery.",
    },
    {
      objective:
        "Define serverless computing and explain how Function as a Service (FaaS) and managed backend services support cloud applications.",
    },
    {
      objective:
        "Describe event-driven execution, triggers, stateless functions, and the integration of serverless components.",
    },
    {
      objective:
        "Compare containers and serverless computing based on control, operational responsibility, scaling, execution patterns, and cost considerations.",
    },
    {
      objective:
        "Identify container and serverless security risks and recommend appropriate protective controls.",
    },
    {
      objective:
        "Select suitable container or serverless approaches for practical application scenarios and justify the design choice.",
    },
  ],

  videoUrl: "https://www.youtube.com/embed/ICbgrmoB5ZE",

  slideUrl:
    "https://docs.google.com/presentation/d/e/2PACX-1vRjqCgBlndvDgCVkiESdvF_FZFd3C1itCK6MNStjFZ5AHyz356QNrziUR2k40BLXA/pubembed?start=false&loop=false&delayms=3000",

  sections: [
    {
      sectionNo: "9.1",
      header: "Introduction to Containers and Serverless Computing",
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
            "Cloud applications can be deployed using several approaches, ranging from virtual machines to containers and serverless services. These approaches differ in how applications are packaged, how execution environments are provided, and how much infrastructure the development team must manage. Containers package applications and their dependencies into standardized units, while serverless computing allows developers to run code or use managed services without directly managing the underlying servers.",
        },
        {
          paragraph:
            "Containerization addresses the problem of differences between development, testing, and production environments. An application may work on a developer's computer but fail elsewhere because of different library versions, runtime settings, or operating system dependencies. A container image packages the application and many of its required components into a reproducible artifact, helping the application behave consistently across compatible environments.",
        },
        {
          paragraph:
            "Serverless computing addresses a different operational concern: the need to provision and manage infrastructure for application functionality. A cloud provider operates the underlying servers and execution platform, while developers focus on application code, configuration, and service integration. Depending on the service, billing may be based on requests, execution duration, provisioned capacity, or other resource dimensions.",
        },
        {
          paragraph:
            "Containers and serverless computing are not mutually exclusive. A containerized application can run on an orchestrated cluster, a managed container service, or a platform that abstracts infrastructure management. Serverless applications can combine functions with managed databases, object storage, message queues, and authentication services. Some platforms also run containers using serverless-style infrastructure management.",
        },
        {
          paragraph:
            "These technologies can improve deployment consistency, scaling, and operational efficiency, but they introduce design decisions. Teams must consider application workload, performance requirements, state management, security, observability, operational skills, and cost. An application that runs continuously with predictable demand may benefit from a different design than a small function that executes only when a user uploads a file.",
        },
        {
          paragraph:
            "Understanding the distinction between application code and its execution environment is essential. Containers package and isolate application processes using operating-system features, whereas serverless services abstract much of the infrastructure and execution lifecycle. Both still rely on physical computing resources, networks, storage, identity controls, and provider-managed systems.",
        },
        {
          paragraph:
            "The best deployment model is the one that meets the application's functional and operational requirements. Teams should evaluate not only initial development speed but also maintenance, security, monitoring, reliability, portability, and long-term cost. Choosing a technology because it is popular does not guarantee that it is suitable for every workload.",
        },
      ],
    },

    {
      sectionNo: "9.2",
      header: "Container Fundamentals and Container Architecture",
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
            "A container is an isolated execution environment for one or more application processes. Containers commonly use operating-system mechanisms such as namespaces to isolate views of system resources and control groups to account for or limit resource consumption. Unlike a conventional virtual machine, a container generally does not include a separate guest operating system kernel. Containers running on a host typically share the host kernel, which makes them comparatively lightweight but means their isolation model differs from that of virtual machines.",
        },
        {
          paragraph:
            "A container image is a packaged, largely immutable template used to create containers. It typically includes application files, runtime components, libraries, and configuration defaults. Images are commonly constructed from layers, allowing unchanged layers to be reused and reducing repeated downloads. When a container starts, the runtime creates a container instance from an image and supplies the required execution settings.",
        },
        {
          paragraph:
            "A container runtime is responsible for tasks such as creating, starting, stopping, and managing container processes. Tools in the container ecosystem may also handle image storage, networking, logging, and orchestration. Docker is a widely used container development platform, while containerd and CRI-O are examples of runtimes used in container environments. The precise components vary by platform and deployment architecture.",
        },
        {
          paragraph:
            "A container registry stores and distributes container images. Registries may be public or private and can support version tags, access controls, image scanning, and artifact management. Teams should obtain images from trusted sources and control who can publish or modify production images. An image tag such as latest is convenient but does not always identify an immutable version; digest-based references can provide more precise identification of an image artifact.",
        },
        {
          paragraph:
            "A Dockerfile is a set of instructions used by Docker-compatible build tools to construct a container image. Common instructions identify a base image, copy application files, install dependencies, configure a working directory, and specify the command used to start the application. Good image-building practices include using trusted base images, minimizing unnecessary packages, avoiding embedded secrets, and separating build-time requirements from runtime requirements when appropriate.",
        },
        {
          paragraph:
            "Containers are usually designed around clearly defined application processes. For example, a web application, background worker, and database may run in separate containers so they can be configured and scaled independently. This separation can simplify deployment and troubleshooting, but it also means that applications must communicate through appropriate network interfaces or shared services.",
        },
        {
          paragraph:
            "Containers are often described as ephemeral because an individual container instance can be replaced during deployment, scaling, or recovery. Important application data should therefore be stored in persistent storage or managed external services rather than assumed to remain inside a replaceable container's writable layer. Logs, uploaded files, and database records need deliberate storage and retention designs.",
        },
        {
          paragraph:
            "Container portability has limits. Images depend on compatible operating-system kernels, processor architectures, runtime behavior, and external services. An image built for one processor architecture may not run natively on another, and an application can still depend on environment variables, credentials, network rules, or cloud-specific APIs. Containerization improves packaging consistency but does not make every application universally portable without additional work.",
        },
      ],
    },

    {
      sectionNo: "9.3",
      header: "Container Deployment, Networking, and Orchestration",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background representing cloud infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Running one container on a developer's computer is relatively straightforward, but production environments may require many containers across multiple machines. Container orchestration automates the deployment and lifecycle management of containerized workloads. Orchestrators can schedule workloads onto suitable nodes, maintain desired replica counts, replace failed instances, coordinate updates, and provide mechanisms for service discovery and networking.",
        },
        {
          paragraph:
            "Kubernetes is a widely used container orchestration platform. Its API allows users and automation systems to declare the desired state of an application. Controllers continuously compare the actual state with the desired state and take actions to reconcile differences. For example, if a deployment specifies three replicas and one fails, Kubernetes can attempt to create a replacement to restore the desired number.",
        },
        {
          paragraph:
            "In Kubernetes, a Pod is the smallest deployable unit and can contain one or more closely related containers that share certain resources. A Deployment manages a set of replicated Pods and supports declarative updates. A Service provides a stable way to reach a group of Pods, while an Ingress resource or Gateway-based configuration can help manage external HTTP access when supported by the installed networking implementation.",
        },
        {
          paragraph:
            "Container networking enables services to communicate with other containers, internal resources, and external clients. Depending on the platform, communication may use virtual networks, service discovery, network policies, load balancers, or service meshes. Network rules should restrict unnecessary communication and separate public-facing components from sensitive internal services. A container should not be considered secure merely because it runs inside a cluster.",
        },
        {
          paragraph:
            "Orchestrators can support horizontal scaling by adjusting the number of application instances. Scaling decisions may be based on metrics such as CPU utilization, memory use, queue depth, or application-specific measurements. Automatic scaling requires sensible thresholds and sufficient capacity; otherwise, it may respond too slowly, oscillate between states, or create unnecessary cost. Applications must also tolerate multiple instances running at the same time.",
        },
        {
          paragraph:
            "Rolling updates replace application instances gradually so that a deployment can proceed without stopping the entire service. Readiness checks help determine whether an instance can receive traffic, while liveness checks can help identify processes that are no longer functioning correctly. Poorly configured health checks can cause healthy workloads to restart repeatedly or route requests to instances that are not ready.",
        },
        {
          paragraph:
            "High availability depends on more than having several containers. Replicas placed on the same failed node or within the same failure domain may all become unavailable together. Production designs should consider node distribution, capacity, dependency availability, storage resilience, regional architecture, and recovery objectives. The required level of redundancy should match the business importance of the service.",
        },
        {
          paragraph:
            "Managed container services reduce the amount of infrastructure administration performed by application teams, but their responsibilities differ. Some services manage the control plane while customers manage worker nodes; others abstract more of the runtime infrastructure. Teams should understand which components they must patch, configure, monitor, and recover rather than assuming that a managed label eliminates operational responsibility.",
        },
      ],
    },

    {
      sectionNo: "9.4",
      header: "Serverless Computing and Function as a Service",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept illustrating digital cloud solutions.",
        },
      ],
      content: [
        {
          paragraph:
            "Serverless computing is a cloud execution model in which the provider manages much of the underlying server infrastructure and dynamically allocates resources for supported services. The term does not mean that servers do not exist. Instead, developers generally interact with a higher-level service interface and have less direct responsibility for provisioning, maintaining, and scaling the underlying machines.",
        },
        {
          paragraph:
            "Function as a Service (FaaS) allows developers to deploy individual functions that execute in response to events or requests. Examples include processing an uploaded image, validating a submitted form, responding to an API request, or handling a message from a queue. The platform manages function execution and may scale instances according to incoming demand and service-specific limits.",
        },
        {
          paragraph:
            "A serverless function typically includes code, a configured runtime, permissions, environment settings, and event-handling logic. When a trigger occurs, the platform invokes the function with an event or request payload. The function processes the input and may return a result or interact with other services. Supported languages, runtime versions, memory limits, execution durations, and concurrency behavior depend on the chosen provider.",
        },
        {
          paragraph:
            "Function as a Service is one part of serverless computing. Serverless architectures can also use managed databases, object storage, authentication services, event buses, message queues, API gateways, and workflow orchestration. These services reduce infrastructure administration but require careful integration, permission management, monitoring, and service-limit planning.",
        },
        {
          paragraph:
            "Serverless applications commonly use short-lived, stateless functions. Statelessness means that an invocation should not depend on unrecorded local state left by a previous invocation. Persistent information should be stored in a suitable database, object store, or other managed service. Although an execution environment may sometimes be reused, developers should not rely on reuse for correctness or durable state.",
        },
        {
          paragraph:
            "Event-driven architecture connects components through events that represent something that has happened, such as a file upload, an order being placed, or a message entering a queue. Producers emit events, and consumers react to them. This loose coupling can help teams develop and scale components independently, but systems must account for delivery semantics, duplicate events, ordering constraints, retries, and failures.",
        },
        {
          paragraph:
            "Serverless platforms often provide automatic scaling, but scaling is subject to concurrency quotas, regional capacity, downstream service limits, and provider-specific behavior. A sudden burst of requests can overwhelm a database or third-party API even when the function platform can start more executions. Architects should use appropriate concurrency limits, queues, backpressure, connection management, and load testing.",
        },
        {
          paragraph:
            "Serverless billing may depend on request count, execution duration, allocated memory or compute capacity, data transfer, and the cost of integrated services. It can be economical for intermittent or unpredictable workloads because customers may avoid paying for continuously running application servers. For high-volume or long-running workloads, costs must be compared with alternative architectures using realistic usage estimates.",
        },
      ],
    },

    {
      sectionNo: "9.5",
      header: "Serverless Architecture, Integration, and Event Processing",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud concept background illustrating interconnected cloud services.",
        },
      ],
      content: [
        {
          paragraph:
            "A serverless application is usually a collection of cooperating managed services rather than one isolated function. A typical request may pass through an API gateway, invoke a function, read or write a database, and return a response. A separate event-driven workflow may place a message on a queue and invoke another function to perform background processing. This architecture separates concerns and can reduce the need to maintain a permanently running application server.",
        },
        {
          paragraph:
            "API gateways provide a managed entry point for application programming interfaces. Depending on the platform, they may support routing, authentication integration, throttling, request validation, and monitoring. The application must still enforce appropriate authorization and validate inputs. A gateway's authentication feature does not automatically establish that every authenticated caller may access every requested record.",
        },
        {
          paragraph:
            "Message queues help decouple producers from consumers. Instead of requiring a producer to wait until all processing finishes, it can publish a message for later handling. Queues can absorb temporary workload spikes and allow consumers to process work at a controlled rate. Applications should define retry behavior, visibility or acknowledgement settings, message retention, and handling for messages that repeatedly fail.",
        },
        {
          paragraph:
            "Event delivery is not always equivalent to exactly-once business processing. A function may execute more than once because of retries, timeouts, or delivery behavior. Idempotent processing means that repeating the same operation produces an acceptable result rather than creating duplicate effects. For example, an order-processing function can use a unique transaction identifier and conditional database updates to avoid charging or recording the same order repeatedly.",
        },
        {
          paragraph:
            "Retries can improve resilience when failures are temporary, but uncontrolled retries can amplify an outage. Systems should use bounded retry policies, suitable delays, and dead-letter handling where available. A dead-letter queue or equivalent mechanism can retain messages that could not be processed successfully, allowing investigation and controlled replay after the underlying issue is resolved.",
        },
        {
          paragraph:
            "Workflow orchestration coordinates multiple tasks, decisions, and error-handling steps. A workflow may validate a request, reserve inventory, request payment, and notify a user. The design should consider partial failure: if payment succeeds but inventory reservation fails, the system may need a compensating action or reconciliation process. Distributed workflows cannot always rely on a single database transaction spanning every service.",
        },
        {
          paragraph:
            "Observability is essential in distributed serverless systems. A single user action may trigger multiple functions and managed services, each producing separate logs and metrics. Correlation identifiers and distributed tracing can help connect events across components. Useful monitoring includes invocation counts, error rates, duration, throttling, queue depth, dependency latency, and failed workflow executions.",
        },
        {
          paragraph:
            "Serverless systems must also account for execution limits and startup behavior. Some platforms impose maximum execution durations, request-size limits, or concurrency quotas. A cold start occurs when a platform needs to initialize an execution environment before handling a request, which can add latency. Provisioned capacity, runtime choices, code size, and initialization work can affect performance, but the available mitigation options and pricing vary by provider.",
        },
      ],
    },

    {
      sectionNo: "9.6",
      header: "Container and Serverless Security Best Practices",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept representing digital infrastructure and connected services.",
        },
      ],
      content: [
        {
          paragraph:
            "Containers and serverless services introduce different execution models, but both require secure identities, protected data, safe application code, and controlled access to cloud resources. A managed platform can reduce certain infrastructure responsibilities without eliminating the customer's responsibility for application vulnerabilities, configuration errors, secrets, or permissions.",
        },
        {
          paragraph:
            "Container image security begins with trustworthy base images and controlled dependencies. Teams should use maintained images, scan images for known vulnerabilities, remove unnecessary packages, and rebuild images when important fixes become available. Image provenance and integrity checks can help establish where an image came from and whether it has been altered. Vulnerability scans should be combined with prioritization and remediation because scan results alone do not make an image safe.",
        },
        {
          paragraph:
            "Container workloads should run with the minimum privileges required. Where supported, teams should avoid privileged containers, restrict unnecessary Linux capabilities, use read-only filesystems when practical, and apply resource limits. Kubernetes environments should also restrict access to the API, protect secrets, apply appropriate network policies, and use role-based permissions for cluster resources. Configuration should be validated against the requirements of the actual workload.",
        },
        {
          paragraph:
            "Serverless security requires restrictive execution roles and carefully managed triggers. A function that only needs to read an object should not receive broad permissions to delete storage resources or administer the entire account. Public endpoints should have appropriate authentication, authorization, validation, and abuse protection. Event sources should be reviewed to ensure that untrusted users cannot invoke privileged functions with attacker-controlled input.",
        },
        {
          paragraph:
            "Secrets such as API keys, database passwords, and signing credentials should not be embedded in container images or application source code. Instead, applications should retrieve secrets through an approved secrets-management mechanism with tightly scoped permissions. Secret access should be monitored, and exposed credentials should be revoked or rotated as appropriate. Environment variables can be useful for configuration but should not automatically be treated as a secure secret store.",
        },
        {
          paragraph:
            "Network isolation limits the possible movement of an attacker between workloads and services. Containers should communicate only with the resources they require, and serverless functions should have network access appropriate to their role. Private connectivity can reduce public exposure, but private placement is not a replacement for identity checks, authorization, encryption, and secure application logic.",
        },
        {
          paragraph:
            "Supply-chain security covers the components used to build and deploy an application, including source code, libraries, build tools, base images, and deployment pipelines. Teams should protect repositories and build credentials, review third-party dependencies, restrict publishing permissions, and keep deployment artifacts traceable. Automated pipelines should use scoped identities and prevent untrusted changes from deploying directly to sensitive environments.",
        },
        {
          paragraph:
            "Security monitoring should cover container events, orchestration activity, function invocations, identity activity, configuration changes, and access to sensitive resources. Alerts can identify suspicious privilege changes, unusual execution patterns, unexpected network access, or repeated failures. Incident-response procedures should explain how to isolate workloads, disable compromised identities, preserve evidence, deploy trusted replacements, and verify recovery.",
        },
      ],
    },

    {
      sectionNo: "9.7",
      header: "Performance, Reliability, Scaling, and Cost Management",
      imageUrl: [{ url: cloudImage1 }],
      imageSource: [
        {
          source:
            "iStock — Digital cloud computing background representing scalable infrastructure.",
        },
      ],
      content: [
        {
          paragraph:
            "Performance evaluation should reflect how an application behaves under realistic workloads. Useful measurements include response time, throughput, error rate, resource utilization, startup latency, and dependency performance. Containers and serverless functions may have different performance characteristics depending on resource allocation, runtime, concurrency, network paths, and the behavior of databases or external APIs.",
        },
        {
          paragraph:
            "Containerized applications can scale horizontally by running additional replicas or vertically by increasing the resources available to an instance. Horizontal scaling is useful when work can be distributed across instances, but it requires attention to shared state, session handling, database connections, and coordination. Scaling the application tier may not improve performance if a database or external dependency is already saturated.",
        },
        {
          paragraph:
            "Serverless platforms can adjust execution capacity as requests or events arrive. This can simplify response to variable demand, but scaling behavior is bounded by service quotas and downstream capacity. A large number of concurrent functions can exhaust database connections, hit API rate limits, or increase costs. Queue-based buffering and concurrency controls can help match processing demand to the capacity of dependent systems.",
        },
        {
          paragraph:
            "Reliability depends on detecting failures and recovering within acceptable limits. Health checks, timeouts, retries, circuit breakers, redundant instances, and well-designed dependency boundaries can reduce the impact of individual failures. Retries should be limited and carefully configured because repeating an operation that is not safe to repeat can create duplicate transactions or worsen an outage.",
        },
        {
          paragraph:
            "Container platforms may require planning for node capacity, image distribution, persistent storage, orchestration overhead, and cluster upgrades. Serverless systems may require planning for execution quotas, maximum runtime, startup latency, event delivery, and service integration limits. Both approaches need monitoring and recovery testing; neither automatically guarantees availability merely because it supports scaling.",
        },
        {
          paragraph:
            "Container costs can include compute instances, cluster management, storage, networking, image registries, logging, and operational labor. Serverless costs can include invocations, execution time, allocated memory or compute, API requests, event processing, storage, network transfer, and integrated managed services. Pricing structures differ across providers, so an architecture should be evaluated using current pricing and workload-specific estimates.",
        },
        {
          paragraph:
            "Cost optimization should be based on measured usage rather than assumptions. Teams can right-size container resources, scale workloads according to demand, remove unused resources, optimize image sizes and startup work, and review log retention. For serverless systems, teams can reduce unnecessary invocations, improve function efficiency, control excessive retries, and monitor downstream service costs. Cost alerts and budgets can help detect unexpected spending, although alerts do not always stop resources from incurring charges.",
        },
        {
          paragraph:
            "The appropriate choice depends on the workload. Containers may suit long-running services, applications needing a controlled runtime environment, or workloads requiring specialized configuration. Serverless functions may suit event-driven tasks, intermittent requests, and independent units of processing. Hybrid designs are common: a containerized core service can coexist with serverless event handlers and managed storage, allowing each component to use an execution model appropriate to its requirements.",
        },
      ],
    },

    {
      sectionNo: "9.8",
      header: "Choosing a Deployment Approach and Applying Best Practices",
      imageUrl: [{ url: cloudImage2 }],
      imageSource: [
        {
          source:
            "iStock — Cloud computing concept illustrating digital cloud solutions on a connected platform.",
        },
      ],
      content: [
        {
          paragraph:
            "Selecting containers, serverless computing, or a combination of both should begin with the application's requirements. Important factors include expected traffic, execution duration, latency, dependencies, portability, compliance, data handling, recovery objectives, team expertise, and operational capacity. A technology decision should explain how the selected approach satisfies these requirements and what trade-offs it introduces.",
        },
        {
          paragraph:
            "Consider a web application with a continuously running API, background workers, and a database. Containers may provide a consistent runtime for the API and workers, while a managed database stores durable records. If the application also needs to generate thumbnails when images are uploaded, a serverless function triggered by object-storage events may be an efficient addition. This design uses different execution models for different workload patterns.",
        },
        {
          paragraph:
            "A container-based design is often appropriate when teams need greater control over runtime configuration, require long-running processes, or want a consistent packaging method across several environments. However, the team must understand the responsibilities for image updates, resource allocation, orchestration, networking, observability, and recovery. Managed container platforms can reduce some of this work but may introduce platform-specific constraints.",
        },
        {
          paragraph:
            "A serverless design is often appropriate when processing is triggered by events, traffic varies substantially, or individual tasks can be expressed within the platform's execution limits. It can reduce infrastructure administration, but developers must design around execution constraints, event-delivery behavior, distributed failures, service quotas, and potential vendor-specific dependencies.",
        },
        {
          paragraph:
            "Deployment pipelines should make application releases repeatable and verifiable. A typical pipeline builds an artifact, runs tests and security checks, publishes a versioned image or function package, deploys to a test environment, and promotes an approved release. Production deployments should support monitoring and rollback or recovery procedures. Build credentials and deployment identities should be protected with least-privilege permissions.",
        },
        {
          paragraph:
            "Configuration should be managed consistently across environments. Application settings, resource limits, scaling policies, network rules, and service permissions should be documented and reviewed. Sensitive values should be handled separately from ordinary configuration. Infrastructure as Code can help make deployments reproducible and reviewable, while policy checks can identify risky settings before resources are created or changed.",
        },
        {
          paragraph:
            "Operational readiness includes logs, metrics, alerts, dashboards, incident-response procedures, and tested recovery methods. Teams should know how to identify failed deployments, trace requests, investigate suspicious behavior, restore persistent data, and control unexpected costs. Monitoring should reflect service-level objectives, such as acceptable latency or availability, rather than collecting metrics without an operational purpose.",
        },
        {
          paragraph:
            "A practical selection process compares at least two viable approaches using the same workload assumptions. A small proof of concept can test deployment effort, response times, scaling behavior, failure handling, security controls, and estimated costs. The final decision should document assumptions, constraints, and future migration options. Containerization and serverless computing are tools for solving deployment problems, not universal replacements for every other cloud architecture.",
        },
      ],
    },
  ],

  keyTerms: [
    {
      word: "Container",
      definition:
        "An isolated execution environment for application processes that typically shares the host operating system kernel.",
      source: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/",
    },
    {
      word: "Container Image",
      definition:
        "A packaged, reusable artifact containing the filesystem layers and configuration needed to create a container.",
      source: "https://docs.docker.com/get-started/docker-concepts/building-images/",
    },
    {
      word: "Container Runtime",
      definition:
        "Software responsible for running containers and managing their execution lifecycle.",
      source: "https://containerd.io/",
    },
    {
      word: "Container Registry",
      definition:
        "A service for storing, managing, and distributing container images.",
      source: "https://docs.docker.com/docker-hub/",
    },
    {
      word: "Dockerfile",
      definition:
        "A text file containing instructions used by a build tool to create a container image.",
      source: "https://docs.docker.com/reference/dockerfile/",
    },
    {
      word: "Containerization",
      definition:
        "The practice of packaging an application and its dependencies into a container image for consistent execution across compatible environments.",
      source: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/",
    },
    {
      word: "Container Orchestration",
      definition:
        "The automated deployment, scheduling, scaling, networking, and lifecycle management of containerized workloads.",
      source: "https://kubernetes.io/docs/concepts/overview/",
    },
    {
      word: "Kubernetes",
      definition:
        "An open-source platform for automating the deployment, scaling, and management of containerized applications.",
      source: "https://kubernetes.io/docs/concepts/overview/",
    },
    {
      word: "Pod",
      definition:
        "The smallest deployable unit in Kubernetes, consisting of one or more containers that share certain resources.",
      source: "https://kubernetes.io/docs/concepts/workloads/pods/",
    },
    {
      word: "Deployment",
      definition:
        "A Kubernetes resource that manages replicated application Pods and supports controlled updates.",
      source: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    },
    {
      word: "Service Discovery",
      definition:
        "The process of locating services or application instances so that components can communicate with them.",
      source: "https://kubernetes.io/docs/concepts/services-networking/service/",
    },
    {
      word: "Horizontal Scaling",
      definition:
        "Increasing or decreasing the number of application instances or replicas to respond to workload demand.",
      source: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
    },
    {
      word: "Serverless Computing",
      definition:
        "A cloud computing model in which the provider manages much of the underlying infrastructure and customers focus on code or managed services.",
      source: "https://aws.amazon.com/serverless/",
    },
    {
      word: "Function as a Service (FaaS)",
      definition:
        "A cloud service model that executes developer-provided functions in response to requests or events without requiring customers to manage the underlying servers.",
      source: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    },
    {
      word: "Event-Driven Architecture",
      definition:
        "An architecture in which components produce, transmit, and respond to events representing changes or occurrences in a system.",
      source: "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven",
    },
    {
      word: "Stateless Function",
      definition:
        "A function designed so that an invocation does not depend on persistent local state left by an earlier invocation.",
      source: "https://docs.aws.amazon.com/lambda/latest/dg/concepts-application-design.html",
    },
    {
      word: "Cold Start",
      definition:
        "Additional startup latency that may occur when a serverless platform initializes an execution environment to handle a request.",
      source: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html",
    },
    {
      word: "API Gateway",
      definition:
        "A managed entry point that can route API requests and provide capabilities such as authentication integration, throttling, and monitoring.",
      source: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html",
    },
    {
      word: "Message Queue",
      definition:
        "A mechanism for storing messages until consumers process them, helping producers and consumers operate independently.",
      source: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    },
    {
      word: "Idempotency",
      definition:
        "A property of an operation that allows repeated execution with the same input to produce an equivalent intended result without unwanted duplicate effects.",
      source: "https://docs.aws.amazon.com/lambda/latest/dg/concepts-application-design.html",
    },
    {
      word: "Dead-Letter Queue",
      definition:
        "A queue or equivalent destination that retains messages that could not be processed successfully for later investigation or handling.",
      source: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
    },
    {
      word: "Observability",
      definition:
        "The ability to understand a system's internal behavior through outputs such as logs, metrics, and traces.",
      source: "https://opentelemetry.io/docs/concepts/observability-primer/",
    },
    {
      word: "Least Privilege",
      definition:
        "The principle of granting identities and workloads only the permissions needed to perform their authorized tasks.",
      source: "https://csrc.nist.gov/glossary/term/least_privilege",
    },
    {
      word: "Image Vulnerability Scanning",
      definition:
        "The examination of container images and their components for known security vulnerabilities and other policy violations.",
      source: "https://docs.docker.com/scout/",
    },
    {
      word: "Infrastructure as Code",
      definition:
        "The practice of defining and managing infrastructure through machine-readable configuration and repeatable automation.",
      source: "https://developer.hashicorp.com/terraform/intro",
    },
    {
      word: "Vendor Lock-In",
      definition:
        "A situation in which switching providers or technologies becomes difficult or costly because of dependencies on proprietary services, interfaces, or operational practices.",
      source: "https://cloud.google.com/architecture/framework",
    },
  ],

  references: [
    {
      author: "Docker. What Is a Container?",
      link: "https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/",
    },
    {
      author: "Docker. Building Images.",
      link: "https://docs.docker.com/get-started/docker-concepts/building-images/",
    },
    {
      author: "Docker. Dockerfile Reference.",
      link: "https://docs.docker.com/reference/dockerfile/",
    },
    {
      author: "containerd. Container Runtime Documentation.",
      link: "https://containerd.io/",
    },
    {
      author: "Kubernetes. Kubernetes Overview.",
      link: "https://kubernetes.io/docs/concepts/overview/",
    },
    {
      author: "Kubernetes. Pods.",
      link: "https://kubernetes.io/docs/concepts/workloads/pods/",
    },
    {
      author: "Kubernetes. Deployments.",
      link: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    },
    {
      author: "Kubernetes. Services, Load Balancing, and Networking.",
      link: "https://kubernetes.io/docs/concepts/services-networking/service/",
    },
    {
      author: "Kubernetes. Horizontal Pod Autoscaling.",
      link: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
    },
    {
      author: "Amazon Web Services. What Is Serverless Computing?",
      link: "https://aws.amazon.com/serverless/",
    },
    {
      author: "Amazon Web Services. AWS Lambda Developer Guide.",
      link: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
    },
    {
      author: "Amazon Web Services. Serverless Application Design.",
      link: "https://docs.aws.amazon.com/lambda/latest/dg/concepts-application-design.html",
    },
    {
      author: "Amazon Web Services. Lambda Runtime Environment.",
      link: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html",
    },
    {
      author: "Amazon Web Services. Amazon API Gateway Developer Guide.",
      link: "https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html",
    },
    {
      author: "Amazon Web Services. Amazon Simple Queue Service Developer Guide.",
      link: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
    },
    {
      author: "Amazon Web Services. Amazon SQS Dead-Letter Queues.",
      link: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html",
    },
    {
      author: "OpenTelemetry. Observability Primer.",
      link: "https://opentelemetry.io/docs/concepts/observability-primer/",
    },
    {
      author: "National Institute of Standards and Technology. Computer Security Resource Center Glossary.",
      link: "https://csrc.nist.gov/glossary",
    },
    {
      author: "HashiCorp. Introduction to Terraform.",
      link: "https://developer.hashicorp.com/terraform/intro",
    },
    {
      author: "Google Cloud. Google Cloud Architecture Framework.",
      link: "https://cloud.google.com/architecture/framework",
    },
  ],

  createdAt: "2026-10-24T00:00:00.000Z",
  updatedAt: "2026-10-24T00:00:00.000Z",
};
