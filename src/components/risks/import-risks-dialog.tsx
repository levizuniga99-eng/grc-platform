"use client";

import { useState, useRef } from "react";
import { Risk, RiskSeverity, RiskStatus, RiskCategory, RiskLikelihood, RiskImpact } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImportRisksDialogProps {
  onImportRisks: (risks: Risk[]) => void;
}

interface ParsedRow {
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  likelihood: string;
  impact: string;
  owner: string;
  ownerEmail?: string;
  treatmentPlan?: string;
}

const validCategories: RiskCategory[] = ["Operational", "Technical", "Compliance", "Strategic", "Financial", "Reputational"];
const validSeverities: RiskSeverity[] = ["Critical", "High", "Medium", "Low"];
const validStatuses: RiskStatus[] = ["Open", "In Treatment", "Mitigated", "Accepted"];

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));
  const rows: ParsedRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    rows.push({
      title: row.title || row.name || "",
      description: row.description || "",
      category: row.category || "Operational",
      severity: row.severity || "Medium",
      status: row.status || "Open",
      likelihood: row.likelihood || "3",
      impact: row.impact || "3",
      owner: row.owner || "",
      ownerEmail: row.owneremail || row.email || "",
      treatmentPlan: row.treatmentplan || row.treatment || "",
    });
  }

  return rows;
}

function validateAndConvertRisk(row: ParsedRow, index: number): { risk?: Risk; error?: string } {
  if (!row.title) {
    return { error: `Row ${index + 1}: Title is required` };
  }
  if (!row.owner) {
    return { error: `Row ${index + 1}: Owner is required` };
  }

  const category = validCategories.find((c) => c.toLowerCase() === row.category.toLowerCase());
  if (!category) {
    return { error: `Row ${index + 1}: Invalid category "${row.category}"` };
  }

  const severity = validSeverities.find((s) => s.toLowerCase() === row.severity.toLowerCase());
  if (!severity) {
    return { error: `Row ${index + 1}: Invalid severity "${row.severity}"` };
  }

  const status = validStatuses.find((s) => s.toLowerCase() === row.status.toLowerCase());
  if (!status) {
    return { error: `Row ${index + 1}: Invalid status "${row.status}"` };
  }

  const likelihood = parseInt(row.likelihood);
  if (isNaN(likelihood) || likelihood < 1 || likelihood > 5) {
    return { error: `Row ${index + 1}: Likelihood must be 1-5` };
  }

  const impact = parseInt(row.impact);
  if (isNaN(impact) || impact < 1 || impact > 5) {
    return { error: `Row ${index + 1}: Impact must be 1-5` };
  }

  const risk: Risk = {
    id: `RISK-${String(Date.now()).slice(-6)}-${index}`,
    title: row.title,
    description: row.description || "",
    category: category as RiskCategory,
    severity: severity as RiskSeverity,
    status: status as RiskStatus,
    likelihood: likelihood as RiskLikelihood,
    impact: impact as RiskImpact,
    riskScore: likelihood * impact,
    owner: row.owner,
    ownerEmail: row.ownerEmail || "",
    treatmentPlan: row.treatmentPlan || "",
    mitigatingControls: [],
    dateIdentified: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    lastReviewed: new Date().toISOString().split("T")[0],
  };

  return { risk };
}

export function ImportRisksDialog({ onImportRisks }: ImportRisksDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ParsedRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [validCount, setValidCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const text = await selectedFile.text();
    const rows = parseCSV(text);
    setPreview(rows);

    const validationErrors: string[] = [];
    let valid = 0;

    rows.forEach((row, index) => {
      const result = validateAndConvertRisk(row, index);
      if (result.error) {
        validationErrors.push(result.error);
      } else {
        valid++;
      }
    });

    setErrors(validationErrors);
    setValidCount(valid);
  };

  const handleImport = () => {
    const risks: Risk[] = [];

    preview.forEach((row, index) => {
      const result = validateAndConvertRisk(row, index);
      if (result.risk) {
        risks.push(result.risk);
      }
    });

    onImportRisks(risks);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setFile(null);
    setPreview([]);
    setErrors([]);
    setValidCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Risks</DialogTitle>
          <DialogDescription>
            Upload a CSV file with risks to import into the register.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="risk-file-input"
            />
            <label htmlFor="risk-file-input" className="cursor-pointer">
              <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">
                {file ? file.name : "Click to upload CSV file"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                or drag and drop
              </p>
            </label>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm font-medium mb-2">Required CSV columns:</p>
            <p className="text-xs text-muted-foreground font-mono">
              title, description, category, severity, status, likelihood, impact, owner
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Optional: ownerEmail, treatmentPlan
            </p>
          </div>

          {preview.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm">{validCount} valid risks found</span>
              </div>

              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium">{errors.length} validation errors:</p>
                    <ul className="list-disc list-inside mt-1 text-xs">
                      {errors.slice(0, 5).map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                      {errors.length > 5 && (
                        <li>...and {errors.length - 5} more</li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={validCount === 0}>
            Import {validCount} Risks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
