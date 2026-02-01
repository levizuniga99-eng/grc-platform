import { Framework } from "@/types";

export const frameworks: Framework[] = [
  // ============================================================
  // SOC 2 Type II - Full Detailed Categories & Requirements
  // ============================================================
  {
    id: "soc2-type2",
    name: "SOC 2 Type II",
    fullName: "SOC 2 Type II - Trust Services Criteria",
    description:
      "Evaluates the operating effectiveness of controls over a period of time (typically 6-12 months). Covers security, availability, processing integrity, confidentiality, and privacy.",
    totalRequirements: 64,
    satisfiedRequirements: 56,
    readinessPercentage: 87,
    status: "In Progress",
    lastAssessed: "2026-01-15",
    nextAuditDate: "2026-04-01",
    categories: [
      {
        id: "soc2-cc1",
        name: "CC1 - Control Environment",
        description:
          "The entity demonstrates a commitment to integrity and ethical values.",
        requirements: [
          {
            id: "req-soc2-cc1-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC1.1",
            title: "Commitment to Integrity and Ethical Values",
            description:
              "The entity demonstrates a commitment to integrity and ethical values through its organizational structure, code of conduct, and whistleblower policies.",
            status: "Satisfied",
            mappedControlIds: ["CTL-045", "CTL-046"],
            evidenceIds: ["EV-029", "EV-030"],
          },
          {
            id: "req-soc2-cc1-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC1.2",
            title: "Board Oversight Responsibility",
            description:
              "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048"],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-soc2-cc1-3",
            frameworkId: "soc2-type2",
            referenceCode: "CC1.3",
            title: "Management Authority and Accountability",
            description:
              "Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048"],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-soc2-cc1-4",
            frameworkId: "soc2-type2",
            referenceCode: "CC1.4",
            title: "Competent Workforce",
            description:
              "The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-045", "CTL-046", "CTL-047"],
            evidenceIds: ["EV-029", "EV-030", "EV-031"],
          },
          {
            id: "req-soc2-cc1-5",
            frameworkId: "soc2-type2",
            referenceCode: "CC1.5",
            title: "Accountability for Internal Control",
            description:
              "The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-047"],
            evidenceIds: ["EV-031"],
          },
        ],
      },
      {
        id: "soc2-cc2",
        name: "CC2 - Communication and Information",
        description:
          "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.",
        requirements: [
          {
            id: "req-soc2-cc2-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC2.1",
            title: "Information Quality for Internal Control",
            description:
              "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.",
            status: "Satisfied",
            mappedControlIds: ["CTL-020", "CTL-021"],
            evidenceIds: ["EV-014", "EV-015"],
          },
          {
            id: "req-soc2-cc2-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC2.2",
            title: "Internal Communication of Control Information",
            description:
              "The entity internally communicates information, including objectives and responsibilities for internal control, necessary to support the functioning of internal control.",
            status: "Satisfied",
            mappedControlIds: ["CTL-045"],
            evidenceIds: ["EV-029"],
          },
          {
            id: "req-soc2-cc2-3",
            frameworkId: "soc2-type2",
            referenceCode: "CC2.3",
            title: "External Communication",
            description:
              "The entity communicates with external parties regarding matters affecting the functioning of internal control.",
            status: "Satisfied",
            mappedControlIds: ["CTL-027"],
            evidenceIds: ["EV-023"],
          },
        ],
      },
      {
        id: "soc2-cc3",
        name: "CC3 - Risk Assessment",
        description:
          "The entity identifies risks to the achievement of its objectives and analyzes risks as a basis for determining how the risks should be managed.",
        requirements: [
          {
            id: "req-soc2-cc3-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC3.1",
            title: "Objective Specification",
            description:
              "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048"],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-soc2-cc3-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC3.2",
            title: "Risk Identification and Analysis",
            description:
              "The entity identifies risks to the achievement of its objectives across the entity and analyzes risks as a basis for determining how the risks should be managed.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048", "CTL-033"],
            evidenceIds: ["EV-033", "EV-019"],
          },
          {
            id: "req-soc2-cc3-3",
            frameworkId: "soc2-type2",
            referenceCode: "CC3.3",
            title: "Fraud Risk Assessment",
            description:
              "The entity considers the potential for fraud in assessing risks to the achievement of objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048"],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-soc2-cc3-4",
            frameworkId: "soc2-type2",
            referenceCode: "CC3.4",
            title: "Significant Change Identification",
            description:
              "The entity identifies and assesses changes that could significantly impact the system of internal control.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-029", "CTL-030"],
            evidenceIds: ["EV-025"],
          },
        ],
      },
      {
        id: "soc2-cc4",
        name: "CC4 - Monitoring Activities",
        description:
          "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.",
        requirements: [
          {
            id: "req-soc2-cc4-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC4.1",
            title: "Ongoing and Separate Evaluations",
            description:
              "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.",
            status: "Satisfied",
            mappedControlIds: ["CTL-020", "CTL-021", "CTL-023"],
            evidenceIds: ["EV-014", "EV-015"],
          },
          {
            id: "req-soc2-cc4-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC4.2",
            title: "Deficiency Evaluation and Communication",
            description:
              "The entity evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-023", "CTL-021"],
            evidenceIds: ["EV-015"],
          },
        ],
      },
      {
        id: "soc2-cc5",
        name: "CC5 - Control Activities",
        description:
          "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.",
        requirements: [
          {
            id: "req-soc2-cc5-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC5.1",
            title: "Control Activity Selection and Development",
            description:
              "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.",
            status: "Satisfied",
            mappedControlIds: ["CTL-001", "CTL-009", "CTL-015"],
            evidenceIds: ["EV-001", "EV-005", "EV-010"],
          },
          {
            id: "req-soc2-cc5-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC5.2",
            title: "Technology General Controls",
            description:
              "The entity also selects and develops general control activities over technology to support the achievement of objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-006", "CTL-007", "CTL-031"],
            evidenceIds: ["EV-004", "EV-026"],
          },
          {
            id: "req-soc2-cc5-3",
            frameworkId: "soc2-type2",
            referenceCode: "CC5.3",
            title: "Policy-Based Control Deployment",
            description:
              "The entity deploys control activities through policies that establish what is expected and in procedures that put policies into action.",
            status: "Satisfied",
            mappedControlIds: ["CTL-003", "CTL-029"],
            evidenceIds: ["EV-003", "EV-025"],
          },
        ],
      },
      {
        id: "soc2-cc6",
        name: "CC6 - Logical and Physical Access Controls",
        description:
          "The entity restricts logical and physical access to information assets using security software, infrastructure, and architectures.",
        requirements: [
          {
            id: "req-soc2-cc6-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC6.1",
            title: "Logical Access Security",
            description:
              "The entity implements logical access security software, infrastructure, and architectures over protected information assets.",
            status: "Satisfied",
            mappedControlIds: ["CTL-001", "CTL-002", "CTL-006"],
            evidenceIds: ["EV-001", "EV-002", "EV-004"],
          },
          {
            id: "req-soc2-cc6-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC6.2",
            title: "User Authentication Prior to Access",
            description:
              "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users.",
            status: "Satisfied",
            mappedControlIds: ["CTL-001", "CTL-002", "CTL-003"],
            evidenceIds: ["EV-001", "EV-002", "EV-003"],
          },
          {
            id: "req-soc2-cc6-3",
            frameworkId: "soc2-type2",
            referenceCode: "CC6.3",
            title: "Role-Based Access and Least Privilege",
            description:
              "The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles and responsibilities.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-003", "CTL-005", "CTL-008"],
            evidenceIds: ["EV-003", "EV-009"],
          },
          {
            id: "req-soc2-cc6-4",
            frameworkId: "soc2-type2",
            referenceCode: "CC6.4",
            title: "Physical Access Restriction",
            description:
              "The entity restricts physical access to facilities and protected information assets to authorized personnel.",
            status: "Satisfied",
            mappedControlIds: ["CTL-043", "CTL-044"],
            evidenceIds: ["EV-028"],
          },
          {
            id: "req-soc2-cc6-5",
            frameworkId: "soc2-type2",
            referenceCode: "CC6.5",
            title: "Asset Disposal and Destruction",
            description:
              "The entity discontinues logical and physical protections over physical assets only after the ability to read or recover data and software from those assets has been diminished.",
            status: "Satisfied",
            mappedControlIds: ["CTL-038"],
            evidenceIds: ["EV-027"],
          },
        ],
      },
      {
        id: "soc2-cc7",
        name: "CC7 - System Operations",
        description:
          "The entity monitors system components and the operation of those components for anomalies.",
        requirements: [
          {
            id: "req-soc2-cc7-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC7.1",
            title: "Detection of Configuration Changes",
            description:
              "To meet its objectives, the entity uses detection and monitoring procedures to identify changes to configurations that result in the introduction of new vulnerabilities.",
            status: "Satisfied",
            mappedControlIds: ["CTL-016", "CTL-020", "CTL-033"],
            evidenceIds: ["EV-011", "EV-014", "EV-019"],
          },
          {
            id: "req-soc2-cc7-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC7.2",
            title: "Anomaly Monitoring in Operations",
            description:
              "The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors affecting the entity's ability to meet its objectives.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-021", "CTL-023"],
            evidenceIds: ["EV-015"],
          },
          {
            id: "req-soc2-cc7-3",
            frameworkId: "soc2-type2",
            referenceCode: "CC7.3",
            title: "Security Event Evaluation",
            description:
              "The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives (security incidents) and, if so, takes actions to prevent or address such failures.",
            status: "Satisfied",
            mappedControlIds: ["CTL-025", "CTL-028"],
            evidenceIds: ["EV-022", "EV-024"],
          },
          {
            id: "req-soc2-cc7-4",
            frameworkId: "soc2-type2",
            referenceCode: "CC7.4",
            title: "Incident Response and Recovery",
            description:
              "The entity responds to identified security incidents by executing a defined incident response program to understand, contain, remediate, and communicate security incidents.",
            status: "Satisfied",
            mappedControlIds: ["CTL-025", "CTL-026", "CTL-027"],
            evidenceIds: ["EV-022", "EV-023"],
          },
          {
            id: "req-soc2-cc7-5",
            frameworkId: "soc2-type2",
            referenceCode: "CC7.5",
            title: "Incident Recovery Procedures",
            description:
              "The entity identifies, develops, and implements activities to recover from identified security incidents.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-026", "CTL-040", "CTL-041"],
            evidenceIds: ["EV-022", "EV-032"],
          },
        ],
      },
      {
        id: "soc2-cc8",
        name: "CC8 - Change Management",
        description:
          "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures.",
        requirements: [
          {
            id: "req-soc2-cc8-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC8.1",
            title: "Change Management Process",
            description:
              "The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-029", "CTL-030", "CTL-031", "CTL-032"],
            evidenceIds: ["EV-025", "EV-026"],
          },
        ],
      },
      {
        id: "soc2-cc9",
        name: "CC9 - Risk Mitigation",
        description:
          "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.",
        requirements: [
          {
            id: "req-soc2-cc9-1",
            frameworkId: "soc2-type2",
            referenceCode: "CC9.1",
            title: "Risk Mitigation Identification",
            description:
              "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.",
            status: "Satisfied",
            mappedControlIds: ["CTL-040", "CTL-041", "CTL-042"],
            evidenceIds: ["EV-032", "EV-033"],
          },
          {
            id: "req-soc2-cc9-2",
            frameworkId: "soc2-type2",
            referenceCode: "CC9.2",
            title: "Vendor and Business Partner Risk",
            description:
              "The entity assesses and manages risks associated with vendors and business partners.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: ["EV-035"],
          },
        ],
      },
      {
        id: "soc2-avail",
        name: "Availability",
        description:
          "The system is available for operation and use as committed or agreed.",
        requirements: [
          {
            id: "req-soc2-a1-1",
            frameworkId: "soc2-type2",
            referenceCode: "A1.1",
            title: "System Availability Commitments",
            description:
              "The entity maintains, monitors, and evaluates current processing capacity and use of system components to manage capacity demand and to enable the implementation of additional capacity to help meet its objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-020", "CTL-023"],
            evidenceIds: ["EV-014"],
          },
          {
            id: "req-soc2-a1-2",
            frameworkId: "soc2-type2",
            referenceCode: "A1.2",
            title: "Environmental Protections",
            description:
              "The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections, software, data backup processes, and recovery infrastructure.",
            status: "Satisfied",
            mappedControlIds: ["CTL-013", "CTL-041"],
            evidenceIds: ["EV-008", "EV-032"],
          },
          {
            id: "req-soc2-a1-3",
            frameworkId: "soc2-type2",
            referenceCode: "A1.3",
            title: "Recovery Plan Testing",
            description:
              "The entity tests recovery plan procedures supporting system recovery to meet its objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-041"],
            evidenceIds: ["EV-032"],
          },
        ],
      },
      {
        id: "soc2-confid",
        name: "Confidentiality",
        description:
          "Information designated as confidential is protected as committed or agreed.",
        requirements: [
          {
            id: "req-soc2-c1-1",
            frameworkId: "soc2-type2",
            referenceCode: "C1.1",
            title: "Confidential Information Identification",
            description:
              "The entity identifies and maintains confidential information to meet the entity's objectives related to confidentiality.",
            status: "Satisfied",
            mappedControlIds: ["CTL-011"],
            evidenceIds: ["EV-007"],
          },
          {
            id: "req-soc2-c1-2",
            frameworkId: "soc2-type2",
            referenceCode: "C1.2",
            title: "Confidential Information Disposal",
            description:
              "The entity disposes of confidential information to meet the entity's objectives related to confidentiality.",
            status: "Satisfied",
            mappedControlIds: ["CTL-011", "CTL-038"],
            evidenceIds: ["EV-007", "EV-027"],
          },
        ],
      },
      {
        id: "soc2-pi",
        name: "Processing Integrity",
        description:
          "System processing is complete, valid, accurate, timely, and authorized to meet the entity's objectives.",
        requirements: [
          {
            id: "req-soc2-pi1-1",
            frameworkId: "soc2-type2",
            referenceCode: "PI1.1",
            title: "Processing Accuracy and Completeness",
            description:
              "The entity implements policies and procedures over system processing to result in products, services, and reporting to meet the entity's objectives.",
            status: "Satisfied",
            mappedControlIds: ["CTL-022", "CTL-030"],
            evidenceIds: ["EV-016", "EV-026"],
          },
          {
            id: "req-soc2-pi1-2",
            frameworkId: "soc2-type2",
            referenceCode: "PI1.2",
            title: "Error and Exception Handling",
            description:
              "The entity implements policies and procedures to address processing errors and exceptions identified in system processing.",
            status: "Satisfied",
            mappedControlIds: ["CTL-025", "CTL-032"],
            evidenceIds: ["EV-022"],
          },
        ],
      },
      {
        id: "soc2-priv",
        name: "Privacy",
        description:
          "Personal information is collected, used, retained, disclosed, and disposed of to meet the entity's objectives.",
        requirements: [
          {
            id: "req-soc2-p1-1",
            frameworkId: "soc2-type2",
            referenceCode: "P1.1",
            title: "Privacy Notice and Consent",
            description:
              "The entity provides notice to data subjects about its privacy practices to meet the entity's objectives related to privacy.",
            status: "Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-soc2-p1-2",
            frameworkId: "soc2-type2",
            referenceCode: "P1.2",
            title: "Choice and Consent Mechanisms",
            description:
              "The entity communicates choices available regarding the collection, use, retention, disclosure, and disposal of personal information.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-soc2-p1-3",
            frameworkId: "soc2-type2",
            referenceCode: "P1.3",
            title: "Personal Information Collection Limitation",
            description:
              "The entity collects personal information only for the purposes identified in the notice to data subjects.",
            status: "Satisfied",
            mappedControlIds: ["CTL-012"],
            evidenceIds: [],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SOC 2 Type I
  // ============================================================
  {
    id: "soc2-type1",
    name: "SOC 2 Type I",
    fullName: "SOC 2 Type I - Trust Services Criteria (Point-in-Time)",
    description:
      "Evaluates the design and implementation of controls at a specific point in time. Validates that controls are suitably designed to meet trust services criteria.",
    totalRequirements: 52,
    satisfiedRequirements: 49,
    readinessPercentage: 94,
    status: "Audit Ready",
    lastAssessed: "2026-01-20",
    nextAuditDate: "2026-02-15",
    categories: [
      {
        id: "soc2t1-cc",
        name: "Common Criteria (CC1-CC9)",
        description:
          "Consolidated common criteria covering control environment, communication, risk assessment, monitoring, and control activities.",
        requirements: [
          {
            id: "req-soc2t1-cc-1",
            frameworkId: "soc2-type1",
            referenceCode: "CC1-CC5",
            title: "Control Environment & Risk Assessment",
            description:
              "Design of controls supporting integrity, ethical values, risk assessment, and organizational structure.",
            status: "Satisfied",
            mappedControlIds: ["CTL-045", "CTL-046", "CTL-048"],
            evidenceIds: ["EV-029", "EV-030", "EV-033"],
          },
          {
            id: "req-soc2t1-cc-2",
            frameworkId: "soc2-type1",
            referenceCode: "CC6",
            title: "Logical and Physical Access Design",
            description:
              "Design of logical and physical access controls to protect information assets.",
            status: "Satisfied",
            mappedControlIds: [
              "CTL-001",
              "CTL-002",
              "CTL-003",
              "CTL-006",
              "CTL-043",
              "CTL-044",
            ],
            evidenceIds: ["EV-001", "EV-002", "EV-003", "EV-004", "EV-028"],
          },
          {
            id: "req-soc2t1-cc-3",
            frameworkId: "soc2-type1",
            referenceCode: "CC7",
            title: "System Operations Design",
            description:
              "Design of monitoring and incident response controls for system operations.",
            status: "Satisfied",
            mappedControlIds: ["CTL-020", "CTL-021", "CTL-025"],
            evidenceIds: ["EV-014", "EV-015", "EV-022"],
          },
          {
            id: "req-soc2t1-cc-4",
            frameworkId: "soc2-type1",
            referenceCode: "CC8-CC9",
            title: "Change Management & Risk Mitigation Design",
            description:
              "Design of change management and risk mitigation processes.",
            status: "Satisfied",
            mappedControlIds: ["CTL-029", "CTL-030", "CTL-040"],
            evidenceIds: ["EV-025", "EV-026", "EV-032"],
          },
        ],
      },
      {
        id: "soc2t1-security",
        name: "Security",
        description:
          "Design of security controls protecting against unauthorized access.",
        requirements: [
          {
            id: "req-soc2t1-sec-1",
            frameworkId: "soc2-type1",
            referenceCode: "S1.1",
            title: "Data Encryption Design",
            description:
              "Design of encryption controls for data at rest and in transit.",
            status: "Satisfied",
            mappedControlIds: ["CTL-009", "CTL-010", "CTL-014"],
            evidenceIds: ["EV-005", "EV-006", "EV-034"],
          },
          {
            id: "req-soc2t1-sec-2",
            frameworkId: "soc2-type1",
            referenceCode: "S1.2",
            title: "Network Security Design",
            description:
              "Design of network security controls including firewalls, IDS, and segmentation.",
            status: "Satisfied",
            mappedControlIds: ["CTL-015", "CTL-016", "CTL-017", "CTL-018"],
            evidenceIds: ["EV-010", "EV-011", "EV-012", "EV-013"],
          },
          {
            id: "req-soc2t1-sec-3",
            frameworkId: "soc2-type1",
            referenceCode: "S1.3",
            title: "Vulnerability Management Design",
            description:
              "Design of vulnerability management program including scanning and patching.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-033", "CTL-034", "CTL-035", "CTL-036"],
            evidenceIds: ["EV-019", "EV-020", "EV-021"],
          },
        ],
      },
      {
        id: "soc2t1-availability",
        name: "Availability & Continuity",
        description:
          "Design of controls ensuring system availability and business continuity.",
        requirements: [
          {
            id: "req-soc2t1-avail-1",
            frameworkId: "soc2-type1",
            referenceCode: "A1.1-A1.3",
            title: "Business Continuity and Disaster Recovery Design",
            description:
              "Design of BCP, DR, and backup procedures.",
            status: "Satisfied",
            mappedControlIds: ["CTL-013", "CTL-040", "CTL-041", "CTL-042"],
            evidenceIds: ["EV-008", "EV-032"],
          },
        ],
      },
    ],
  },

  // ============================================================
  // HIPAA - Full Detailed Categories & Requirements
  // ============================================================
  {
    id: "hipaa",
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description:
      "Federal law requiring privacy and security protections for protected health information (PHI). Applicable to covered entities and business associates handling electronic PHI (ePHI).",
    totalRequirements: 48,
    satisfiedRequirements: 37,
    readinessPercentage: 78,
    status: "In Progress",
    lastAssessed: "2026-01-10",
    nextAuditDate: "2026-06-01",
    categories: [
      {
        id: "hipaa-admin",
        name: "Administrative Safeguards",
        description:
          "Administrative actions, policies, and procedures to manage the selection, development, implementation, and maintenance of security measures to protect ePHI.",
        requirements: [
          {
            id: "req-hipaa-admin-1",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(1)",
            title: "Security Management Process",
            description:
              "Implement policies and procedures to prevent, detect, contain, and correct security violations. Includes risk analysis and risk management.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048", "CTL-033"],
            evidenceIds: ["EV-033", "EV-019"],
          },
          {
            id: "req-hipaa-admin-2",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(2)",
            title: "Assigned Security Responsibility",
            description:
              "Identify the security official who is responsible for the development and implementation of the policies and procedures.",
            status: "Satisfied",
            mappedControlIds: [],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-hipaa-admin-3",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(3)",
            title: "Workforce Security",
            description:
              "Implement policies and procedures to ensure that all members of its workforce have appropriate access to ePHI and to prevent unauthorized access.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-003", "CTL-005", "CTL-008", "CTL-047"],
            evidenceIds: ["EV-003", "EV-009", "EV-031"],
          },
          {
            id: "req-hipaa-admin-4",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(4)",
            title: "Information Access Management",
            description:
              "Implement policies and procedures for authorizing access to ePHI consistent with the Privacy Rule.",
            status: "Satisfied",
            mappedControlIds: ["CTL-003", "CTL-004", "CTL-008"],
            evidenceIds: ["EV-003"],
          },
          {
            id: "req-hipaa-admin-5",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(5)",
            title: "Security Awareness and Training",
            description:
              "Implement a security awareness and training program for all members of the workforce including management.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-045"],
            evidenceIds: ["EV-029"],
          },
          {
            id: "req-hipaa-admin-6",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(6)",
            title: "Security Incident Procedures",
            description:
              "Implement policies and procedures to address security incidents. Identify and respond to suspected or known security incidents.",
            status: "Satisfied",
            mappedControlIds: ["CTL-025", "CTL-026", "CTL-028"],
            evidenceIds: ["EV-022", "EV-024"],
          },
          {
            id: "req-hipaa-admin-7",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(7)",
            title: "Contingency Plan",
            description:
              "Establish and implement policies and procedures for responding to an emergency or other occurrence that damages systems containing ePHI.",
            status: "Satisfied",
            mappedControlIds: ["CTL-013", "CTL-040", "CTL-041", "CTL-042"],
            evidenceIds: ["EV-008", "EV-032"],
          },
          {
            id: "req-hipaa-admin-8",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(a)(8)",
            title: "Evaluation",
            description:
              "Perform a periodic technical and nontechnical evaluation based on standards implemented under the security rule.",
            status: "Satisfied",
            mappedControlIds: ["CTL-035", "CTL-048"],
            evidenceIds: ["EV-020", "EV-033"],
          },
          {
            id: "req-hipaa-admin-9",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.308(b)(1)",
            title: "Business Associate Contracts",
            description:
              "A covered entity may permit a business associate to create, receive, maintain, or transmit ePHI only if satisfactory assurances are obtained via a written contract (BAA).",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: ["EV-035"],
          },
        ],
      },
      {
        id: "hipaa-physical",
        name: "Physical Safeguards",
        description:
          "Physical measures, policies, and procedures to protect electronic information systems and related buildings and equipment from natural and environmental hazards and unauthorized intrusion.",
        requirements: [
          {
            id: "req-hipaa-phys-1",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.310(a)(1)",
            title: "Facility Access Controls",
            description:
              "Implement policies and procedures to limit physical access to electronic information systems and the facilities in which they are housed.",
            status: "Satisfied",
            mappedControlIds: ["CTL-043", "CTL-044"],
            evidenceIds: ["EV-028"],
          },
          {
            id: "req-hipaa-phys-2",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.310(b)",
            title: "Workstation Use",
            description:
              "Implement policies and procedures that specify the proper functions to be performed and the manner in which those functions are to be performed.",
            status: "Satisfied",
            mappedControlIds: ["CTL-037", "CTL-039"],
            evidenceIds: ["EV-027"],
          },
          {
            id: "req-hipaa-phys-3",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.310(c)",
            title: "Workstation Security",
            description:
              "Implement physical safeguards for all workstations that access ePHI to restrict access to authorized users.",
            status: "Satisfied",
            mappedControlIds: ["CTL-037", "CTL-038"],
            evidenceIds: ["EV-027"],
          },
          {
            id: "req-hipaa-phys-4",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.310(d)(1)",
            title: "Device and Media Controls",
            description:
              "Implement policies and procedures that govern the receipt and removal of hardware and electronic media that contain ePHI.",
            status: "Satisfied",
            mappedControlIds: ["CTL-038"],
            evidenceIds: ["EV-027"],
          },
        ],
      },
      {
        id: "hipaa-technical",
        name: "Technical Safeguards",
        description:
          "The technology and the policy and procedures for its use that protect ePHI and control access to it.",
        requirements: [
          {
            id: "req-hipaa-tech-1",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.312(a)(1)",
            title: "Access Control",
            description:
              "Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to authorized persons or software programs.",
            status: "Satisfied",
            mappedControlIds: ["CTL-001", "CTL-002", "CTL-003", "CTL-004"],
            evidenceIds: ["EV-001", "EV-002", "EV-003"],
          },
          {
            id: "req-hipaa-tech-2",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.312(b)",
            title: "Audit Controls",
            description:
              "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-020", "CTL-021", "CTL-022", "CTL-024"],
            evidenceIds: ["EV-014", "EV-015", "EV-016", "EV-017"],
          },
          {
            id: "req-hipaa-tech-3",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.312(c)(1)",
            title: "Integrity",
            description:
              "Implement policies and procedures to protect ePHI from improper alteration or destruction.",
            status: "Satisfied",
            mappedControlIds: ["CTL-022", "CTL-013"],
            evidenceIds: ["EV-016", "EV-008"],
          },
          {
            id: "req-hipaa-tech-4",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.312(d)",
            title: "Person or Entity Authentication",
            description:
              "Implement procedures to verify that a person or entity seeking access to ePHI is the one claimed.",
            status: "Satisfied",
            mappedControlIds: ["CTL-001", "CTL-002"],
            evidenceIds: ["EV-001", "EV-002"],
          },
          {
            id: "req-hipaa-tech-5",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.312(e)(1)",
            title: "Transmission Security",
            description:
              "Implement technical security measures to guard against unauthorized access to ePHI being transmitted over an electronic communications network.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-010", "CTL-018"],
            evidenceIds: ["EV-006", "EV-013"],
          },
        ],
      },
      {
        id: "hipaa-org",
        name: "Organizational Requirements",
        description:
          "Requirements for covered entities to have business associate agreements and organizational policies.",
        requirements: [
          {
            id: "req-hipaa-org-1",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.314(a)",
            title: "Business Associate Agreements",
            description:
              "Covered entity must obtain satisfactory assurances that business associates will appropriately safeguard ePHI. Must have written BAA contracts.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: ["EV-035"],
          },
          {
            id: "req-hipaa-org-2",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.314(b)",
            title: "Group Health Plan Requirements",
            description:
              "Group health plan requirements for plan sponsors regarding ePHI safeguards.",
            status: "Not Applicable",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-hipaa-org-3",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.316(a)",
            title: "Policies and Procedures Documentation",
            description:
              "Implement reasonable and appropriate policies and procedures to comply with the security standards. Maintain written documentation of policies.",
            status: "Satisfied",
            mappedControlIds: [],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-hipaa-org-4",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.316(b)",
            title: "Documentation Retention",
            description:
              "Retain documentation for 6 years from the date of creation or the date when it last was in effect, whichever is later.",
            status: "Satisfied",
            mappedControlIds: ["CTL-024"],
            evidenceIds: ["EV-017"],
          },
        ],
      },
      {
        id: "hipaa-breach",
        name: "Breach Notification",
        description:
          "Requirements for notification in the case of a breach of unsecured protected health information.",
        requirements: [
          {
            id: "req-hipaa-breach-1",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.404",
            title: "Individual Notification of Breach",
            description:
              "A covered entity shall notify each individual whose unsecured PHI has been, or is reasonably believed to have been, accessed, acquired, used, or disclosed as a result of a breach.",
            status: "Satisfied",
            mappedControlIds: ["CTL-027"],
            evidenceIds: ["EV-023"],
          },
          {
            id: "req-hipaa-breach-2",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.406",
            title: "Media Notification of Breach",
            description:
              "For breaches affecting more than 500 residents of a state or jurisdiction, the covered entity shall notify prominent media outlets.",
            status: "Satisfied",
            mappedControlIds: ["CTL-027"],
            evidenceIds: ["EV-023"],
          },
          {
            id: "req-hipaa-breach-3",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.408",
            title: "Secretary Notification",
            description:
              "A covered entity shall notify the Secretary of HHS following the discovery of a breach of unsecured PHI.",
            status: "Satisfied",
            mappedControlIds: ["CTL-027"],
            evidenceIds: ["EV-023"],
          },
          {
            id: "req-hipaa-breach-4",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.410",
            title: "Business Associate Breach Notification",
            description:
              "A business associate shall notify the covered entity following the discovery of a breach of unsecured PHI.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-hipaa-breach-5",
            frameworkId: "hipaa",
            referenceCode: "\u00A7164.414",
            title: "Administrative Requirements for Breach Notification",
            description:
              "Burden of proof rests on the covered entity to demonstrate that all notifications were made or that the use or disclosure did not constitute a breach.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-022", "CTL-025"],
            evidenceIds: ["EV-016", "EV-022"],
          },
        ],
      },
    ],
  },

  // ============================================================
  // ISO 27001 - Summary (2-3 categories, few requirements)
  // ============================================================
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "ISO/IEC 27001:2022 - Information Security Management System",
    description:
      "International standard for establishing, implementing, maintaining, and continually improving an information security management system (ISMS). Provides a systematic approach to managing sensitive company information.",
    totalRequirements: 114,
    satisfiedRequirements: 74,
    readinessPercentage: 65,
    status: "In Progress",
    lastAssessed: "2025-12-01",
    nextAuditDate: "2026-09-01",
    categories: [
      {
        id: "iso-a5",
        name: "A.5 - Organizational Controls",
        description:
          "Policies for information security, organization roles, contact with authorities, and threat intelligence.",
        requirements: [
          {
            id: "req-iso-a5-1",
            frameworkId: "iso27001",
            referenceCode: "A.5.1",
            title: "Policies for Information Security",
            description:
              "Information security policy and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel.",
            status: "Satisfied",
            mappedControlIds: [],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-iso-a5-2",
            frameworkId: "iso27001",
            referenceCode: "A.5.2",
            title: "Information Security Roles and Responsibilities",
            description:
              "Information security roles and responsibilities shall be defined and allocated.",
            status: "Satisfied",
            mappedControlIds: ["CTL-048"],
            evidenceIds: ["EV-033"],
          },
          {
            id: "req-iso-a5-3",
            frameworkId: "iso27001",
            referenceCode: "A.5.23",
            title: "Information Security for Use of Cloud Services",
            description:
              "Processes for acquisition, use, management, and exit from cloud services shall be established in accordance with the organization's information security requirements.",
            status: "Partially Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
        ],
      },
      {
        id: "iso-a8",
        name: "A.8 - Technological Controls",
        description:
          "Controls relating to technology including endpoint devices, access rights, malware protection, and encryption.",
        requirements: [
          {
            id: "req-iso-a8-1",
            frameworkId: "iso27001",
            referenceCode: "A.8.1",
            title: "User Endpoint Devices",
            description:
              "Information stored on, processed by, or accessible via user endpoint devices shall be protected.",
            status: "Satisfied",
            mappedControlIds: ["CTL-037", "CTL-038", "CTL-039"],
            evidenceIds: ["EV-027"],
          },
          {
            id: "req-iso-a8-2",
            frameworkId: "iso27001",
            referenceCode: "A.8.5",
            title: "Secure Authentication",
            description:
              "Secure authentication technologies and procedures shall be established and implemented based on information access restrictions.",
            status: "Satisfied",
            mappedControlIds: ["CTL-001", "CTL-002", "CTL-006"],
            evidenceIds: ["EV-001", "EV-002", "EV-004"],
          },
          {
            id: "req-iso-a8-3",
            frameworkId: "iso27001",
            referenceCode: "A.8.24",
            title: "Use of Cryptography",
            description:
              "Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.",
            status: "Satisfied",
            mappedControlIds: ["CTL-009", "CTL-010", "CTL-014"],
            evidenceIds: ["EV-005", "EV-006", "EV-034"],
          },
          {
            id: "req-iso-a8-4",
            frameworkId: "iso27001",
            referenceCode: "A.8.8",
            title: "Management of Technical Vulnerabilities",
            description:
              "Information about technical vulnerabilities of information systems in use shall be obtained, the organization's exposure evaluated, and appropriate measures taken.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-033", "CTL-034", "CTL-036"],
            evidenceIds: ["EV-019", "EV-021"],
          },
        ],
      },
      {
        id: "iso-a6",
        name: "A.6 - People Controls",
        description:
          "Controls for people including screening, terms and conditions of employment, awareness, and disciplinary process.",
        requirements: [
          {
            id: "req-iso-a6-1",
            frameworkId: "iso27001",
            referenceCode: "A.6.1",
            title: "Screening",
            description:
              "Background verification checks on all candidates for employment shall be carried out prior to joining the organization.",
            status: "Satisfied",
            mappedControlIds: ["CTL-046"],
            evidenceIds: ["EV-030"],
          },
          {
            id: "req-iso-a6-2",
            frameworkId: "iso27001",
            referenceCode: "A.6.3",
            title: "Information Security Awareness, Education and Training",
            description:
              "Personnel of the organization and relevant interested parties shall receive appropriate information security awareness education and training.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-045"],
            evidenceIds: ["EV-029"],
          },
        ],
      },
    ],
  },

  // ============================================================
  // GDPR - Summary (2-3 categories, few requirements)
  // ============================================================
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation (EU) 2016/679",
    description:
      "European Union regulation on data protection and privacy. Applies to the processing of personal data of individuals in the EU/EEA. Imposes strict requirements on data controllers and processors.",
    totalRequirements: 72,
    satisfiedRequirements: 42,
    readinessPercentage: 58,
    status: "Not Started",
    lastAssessed: "2025-11-15",
    nextAuditDate: null,
    categories: [
      {
        id: "gdpr-principles",
        name: "Principles of Processing",
        description:
          "Core principles for processing personal data including lawfulness, fairness, transparency, purpose limitation, and data minimization.",
        requirements: [
          {
            id: "req-gdpr-art5-1",
            frameworkId: "gdpr",
            referenceCode: "Art. 5(1)(a)",
            title: "Lawfulness, Fairness and Transparency",
            description:
              "Personal data shall be processed lawfully, fairly and in a transparent manner in relation to the data subject.",
            status: "Partially Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-gdpr-art5-2",
            frameworkId: "gdpr",
            referenceCode: "Art. 5(1)(b)",
            title: "Purpose Limitation",
            description:
              "Personal data shall be collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-gdpr-art5-3",
            frameworkId: "gdpr",
            referenceCode: "Art. 5(1)(f)",
            title: "Integrity and Confidentiality",
            description:
              "Personal data shall be processed in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction or damage.",
            status: "Satisfied",
            mappedControlIds: ["CTL-009", "CTL-010", "CTL-015"],
            evidenceIds: ["EV-005", "EV-006", "EV-010"],
          },
        ],
      },
      {
        id: "gdpr-rights",
        name: "Data Subject Rights",
        description:
          "Rights of data subjects including access, rectification, erasure, data portability, and objection.",
        requirements: [
          {
            id: "req-gdpr-art15",
            frameworkId: "gdpr",
            referenceCode: "Art. 15",
            title: "Right of Access",
            description:
              "The data subject shall have the right to obtain from the controller confirmation as to whether personal data concerning him or her are being processed.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-gdpr-art17",
            frameworkId: "gdpr",
            referenceCode: "Art. 17",
            title: "Right to Erasure (Right to be Forgotten)",
            description:
              "The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
          {
            id: "req-gdpr-art20",
            frameworkId: "gdpr",
            referenceCode: "Art. 20",
            title: "Right to Data Portability",
            description:
              "The data subject shall have the right to receive the personal data concerning him or her in a structured, commonly used and machine-readable format.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
        ],
      },
      {
        id: "gdpr-security",
        name: "Security of Processing",
        description:
          "Requirements for implementing appropriate technical and organizational measures to ensure security of processing.",
        requirements: [
          {
            id: "req-gdpr-art32",
            frameworkId: "gdpr",
            referenceCode: "Art. 32",
            title: "Security of Processing",
            description:
              "The controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk.",
            status: "Partially Satisfied",
            mappedControlIds: ["CTL-009", "CTL-010", "CTL-015", "CTL-020"],
            evidenceIds: ["EV-005", "EV-006", "EV-010", "EV-014"],
          },
          {
            id: "req-gdpr-art33",
            frameworkId: "gdpr",
            referenceCode: "Art. 33",
            title: "Notification of Personal Data Breach",
            description:
              "In the case of a personal data breach, the controller shall without undue delay notify the personal data breach to the supervisory authority within 72 hours.",
            status: "Satisfied",
            mappedControlIds: ["CTL-025", "CTL-027"],
            evidenceIds: ["EV-022", "EV-023"],
          },
          {
            id: "req-gdpr-art35",
            frameworkId: "gdpr",
            referenceCode: "Art. 35",
            title: "Data Protection Impact Assessment",
            description:
              "Where processing is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall carry out an assessment of the impact.",
            status: "Not Satisfied",
            mappedControlIds: [],
            evidenceIds: [],
          },
        ],
      },
    ],
  },
];
