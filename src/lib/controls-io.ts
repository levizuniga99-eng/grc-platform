import { Control, ControlStatus, ControlCategory } from "@/types";
import * as XLSX from "xlsx";

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
      testFrequency: (testFrequency || "Monthly") as Control["testFrequency"],
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

// Excel parsing with column mapping
interface ExcelRow {
  [key: string]: string | number | undefined;
}

// Map common header variations to our field names
const headerMappings: Record<string, string[]> = {
  id: ["id", "control id", "control_id", "controlid", "ctrl id", "control #", "control number"],
  name: ["name", "control name", "control_name", "controlname", "title", "control title"],
  description: ["description", "desc", "control description", "details"],
  category: ["category", "domain", "control category", "area", "type"],
  status: ["status", "state", "control status"],
  type: ["control type", "automation", "automated", "manual"],
  owner: ["owner", "control owner", "assigned to", "assignee", "responsible"],
  ownerEmail: ["owner email", "email", "contact email", "owner_email"],
  frameworks: ["framework", "frameworks", "standard", "standards", "compliance framework"],
  lastTested: ["last tested", "last test", "last_tested", "tested date", "test date"],
  nextReview: ["next review", "review date", "next_review", "due date"],
  testFrequency: ["test frequency", "frequency", "testing frequency", "schedule"],
  implementationDetails: ["implementation", "implementation details", "notes", "details", "how implemented"],
  failureReason: ["failure reason", "failure", "issue", "gap", "deficiency"],
};

function findMatchingHeader(headers: string[], fieldName: string): string | null {
  const possibleNames = headerMappings[fieldName] || [fieldName];
  const normalizedHeaders = headers.map(h => String(h).toLowerCase().trim());

  for (const name of possibleNames) {
    const index = normalizedHeaders.findIndex(h => h === name.toLowerCase());
    if (index !== -1) {
      return headers[index];
    }
  }

  // Try partial matching
  for (const name of possibleNames) {
    const index = normalizedHeaders.findIndex(h => h.includes(name.toLowerCase()));
    if (index !== -1) {
      return headers[index];
    }
  }

  return null;
}

export function parseExcelControls(data: ArrayBuffer): Control[] {
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

  if (jsonData.length === 0) {
    throw new Error("Excel file is empty or has no data rows");
  }

  // Get headers from first row
  const headers = Object.keys(jsonData[0]);

  // Build field mapping
  const fieldMap: Record<string, string | null> = {
    id: findMatchingHeader(headers, "id"),
    name: findMatchingHeader(headers, "name"),
    description: findMatchingHeader(headers, "description"),
    category: findMatchingHeader(headers, "category"),
    status: findMatchingHeader(headers, "status"),
    type: findMatchingHeader(headers, "type"),
    owner: findMatchingHeader(headers, "owner"),
    ownerEmail: findMatchingHeader(headers, "ownerEmail"),
    frameworks: findMatchingHeader(headers, "frameworks"),
    lastTested: findMatchingHeader(headers, "lastTested"),
    nextReview: findMatchingHeader(headers, "nextReview"),
    testFrequency: findMatchingHeader(headers, "testFrequency"),
    implementationDetails: findMatchingHeader(headers, "implementationDetails"),
    failureReason: findMatchingHeader(headers, "failureReason"),
  };

  return jsonData.map((row, index) => {
    const getValue = (field: string): string => {
      const header = fieldMap[field];
      if (!header) return "";
      const value = row[header];
      return value !== undefined ? String(value).trim() : "";
    };

    const status = getValue("status");
    const validStatus = validStatuses.includes(status as ControlStatus)
      ? (status as ControlStatus)
      : "Needs Review";

    const category = getValue("category");
    const validCategory = validCategories.includes(category as ControlCategory)
      ? (category as ControlCategory)
      : "Access Control";

    const controlType = getValue("type").toLowerCase();
    const isAutomated = controlType.includes("auto");

    const frameworksStr = getValue("frameworks");
    const frameworkIds = frameworksStr
      ? frameworksStr.split(/[;,]/).map(f => f.trim()).filter(Boolean)
      : [];

    const control: Control = {
      id: getValue("id") || `CTL-${String(index + 1).padStart(3, "0")}`,
      name: getValue("name") || "Unnamed Control",
      description: getValue("description") || "",
      category: validCategory,
      status: validStatus,
      type: isAutomated ? "Automated" : "Manual",
      owner: getValue("owner") || "Unassigned",
      ownerEmail: getValue("ownerEmail") || "",
      frameworkIds,
      lastTested: getValue("lastTested") || new Date().toISOString().split("T")[0],
      nextReview: getValue("nextReview") || new Date().toISOString().split("T")[0],
      testFrequency: (getValue("testFrequency") || "Monthly") as Control["testFrequency"],
      implementationDetails: getValue("implementationDetails") || "",
      evidenceIds: [],
    };

    const failureReason = getValue("failureReason");
    if (failureReason) {
      control.failureReason = failureReason;
    }

    return control;
  });
}

export function exportControlsToExcel(controls: Control[]): XLSX.WorkBook {
  const exportData = controls.map((control) => ({
    "Control ID": control.id,
    "Name": control.name,
    "Description": control.description,
    "Category": control.category,
    "Status": control.status,
    "Type": control.type,
    "Owner": control.owner,
    "Owner Email": control.ownerEmail,
    "Frameworks": control.frameworkIds.join("; "),
    "Last Tested": control.lastTested,
    "Next Review": control.nextReview,
    "Test Frequency": control.testFrequency,
    "Implementation Details": control.implementationDetails,
    "Failure Reason": control.failureReason || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Controls");

  return workbook;
}

export function downloadExcelFile(workbook: XLSX.WorkBook, filename: string) {
  // Use XLSX writeFile which handles browser downloads automatically
  XLSX.writeFile(workbook, filename);
}

export function generateControlsTemplateCSV(): string {
  return `ID,Name,Description,Category,Status,Type,Owner,Owner Email,Frameworks,Last Tested,Next Review,Test Frequency,Implementation Details,Failure Reason
CTL-001,Access Control Policy,Formal access control policy,Access Control,Needs Review,Manual,John Smith,john@company.com,SOC2-CC6.1,2024-01-15,2024-04-15,Quarterly,Policy in SharePoint,
CTL-002,Multi-Factor Authentication,MFA required for all users,Access Control,Accepted,Automated,IT Security,security@company.com,SOC2-CC6.1,2024-01-10,2024-02-10,Monthly,Okta MFA enforced,`;
}
