import { Control, ControlStatus, ControlCategory } from "@/types";

export interface ExportedControl {
  id: string;
  name: string;
  description: string;
  category: ControlCategory;
  status: ControlStatus;
  type: "Automated" | "Manual";
  owner: string;
  ownerEmail: string;
  frameworks: string;
  lastTested: string;
  nextReview: string;
  testFrequency: string;
  implementationDetails: string;
  failureReason?: string;
}

export function exportControlsToCSV(controls: Control[]): string {
  const headers = [
    "ID",
    "Name",
    "Description",
    "Category",
    "Status",
    "Type",
    "Owner",
    "Owner Email",
    "Frameworks",
    "Last Tested",
    "Next Review",
    "Test Frequency",
    "Implementation Details",
    "Failure Reason",
  ];

  const rows = controls.map((control) => [
    control.id,
    `"${control.name.replace(/"/g, '""')}"`,
    `"${control.description.replace(/"/g, '""')}"`,
    control.category,
    control.status,
    control.type,
    control.owner,
    control.ownerEmail,
    control.frameworkIds.join("; "),
    control.lastTested,
    control.nextReview,
    control.testFrequency,
    `"${control.implementationDetails.replace(/"/g, '""')}"`,
    control.failureReason ? `"${control.failureReason.replace(/"/g, '""')}"` : "",
  ]);

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export function exportControlsToJSON(controls: Control[]): string {
  const exportData = controls.map((control) => ({
    id: control.id,
    name: control.name,
    description: control.description,
    category: control.category,
    status: control.status,
    type: control.type,
    owner: control.owner,
    ownerEmail: control.ownerEmail,
    frameworks: control.frameworkIds,
    lastTested: control.lastTested,
    nextReview: control.nextReview,
    testFrequency: control.testFrequency,
    implementationDetails: control.implementationDetails,
    failureReason: control.failureReason,
  }));

  return JSON.stringify(exportData, null, 2);
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const validStatuses: ControlStatus[] = [
  "Needs Review",
  "Additional Evidence Needed",
  "Accepted",
  "Not Applicable",
];

const validCategories: ControlCategory[] = [
  "Access Control",
  "Data Protection",
  "Network Security",
  "Incident Response",
  "Change Management",
  "Business Continuity",
  "Vulnerability Management",
  "Logging & Monitoring",
  "Endpoint Security",
  "Physical Security",
  "Human Resources",
  "Risk Management",
];

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

export function parseCSVControls(csvContent: string): Control[] {
  const lines = csvContent.split("\n").filter((line) => line.trim());
  if (lines.length < 2) {
    throw new Error("CSV file must have a header row and at least one data row");
  }

  const controls: Control[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 12) continue;

    const [
      id,
      name,
      description,
      category,
      status,
      type,
      owner,
      ownerEmail,
      frameworks,
      lastTested,
      nextReview,
      testFrequency,
      implementationDetails,
      failureReason,
    ] = values;

    const validStatus = validStatuses.includes(status as ControlStatus)
      ? (status as ControlStatus)
      : "Needs Review";

    const validCategory = validCategories.includes(category as ControlCategory)
      ? (category as ControlCategory)
      : "Access Control";

    const control: Control = {
      id: id || `CTL-${String(i).padStart(3, "0")}`,
      name: name || "Unnamed Control",
      description: description || "",
      category: validCategory,
      status: validStatus,
      type: type === "Automated" ? "Automated" : "Manual",
      owner: owner || "Unassigned",
      ownerEmail: ownerEmail || "",
      frameworkIds: frameworks ? frameworks.split(";").map((f) => f.trim()) : [],
      lastTested: lastTested || new Date().toISOString().split("T")[0],
      nextReview: nextReview || new Date().toISOString().split("T")[0],
      testFrequency: testFrequency || "Monthly",
      implementationDetails: implementationDetails || "",
      evidenceIds: [],
      ...(failureReason && { failureReason }),
    };

    controls.push(control);
  }

  return controls;
}

export function parseJSONControls(jsonContent: string): Control[] {
  const data = JSON.parse(jsonContent);

  if (!Array.isArray(data)) {
    throw new Error("JSON must be an array of controls");
  }

  return data.map((item, index) => {
    const validStatus = validStatuses.includes(item.status)
      ? item.status
      : "Needs Review";

    const validCategory = validCategories.includes(item.category)
      ? item.category
      : "Access Control";

    return {
      id: item.id || `CTL-${String(index + 1).padStart(3, "0")}`,
      name: item.name || "Unnamed Control",
      description: item.description || "",
      category: validCategory,
      status: validStatus,
      type: item.type === "Automated" ? "Automated" : "Manual",
      owner: item.owner || "Unassigned",
      ownerEmail: item.ownerEmail || "",
      frameworkIds: Array.isArray(item.frameworks) ? item.frameworks : [],
      lastTested: item.lastTested || new Date().toISOString().split("T")[0],
      nextReview: item.nextReview || new Date().toISOString().split("T")[0],
      testFrequency: item.testFrequency || "Monthly",
      implementationDetails: item.implementationDetails || "",
      evidenceIds: item.evidenceIds || [],
      ...(item.failureReason && { failureReason: item.failureReason }),
    } as Control;
  });
}
