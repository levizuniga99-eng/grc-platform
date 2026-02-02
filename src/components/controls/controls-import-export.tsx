"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Control } from "@/types";
import {
  exportControlsToCSV,
  exportControlsToJSON,
  exportControlsToExcel,
  downloadFile,
  downloadExcelFile,
  parseCSVControls,
  parseJSONControls,
  parseExcelControls,
  generateControlsTemplateCSV,
} from "@/lib/controls-io";
import { Download, Upload, FileSpreadsheet, FileJson, AlertCircle, CheckCircle2, Table, FileDown } from "lucide-react";

interface ControlsImportExportProps {
  controls: Control[];
  onImport: (controls: Control[]) => void;
}

export function ControlsImportExport({ controls, onImport }: ControlsImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: boolean;
    message: string;
    controls?: Control[];
  } | null>(null);

  const handleExportCSV = () => {
    const csv = exportControlsToCSV(controls);
    const date = new Date().toISOString().split("T")[0];
    downloadFile(csv, `controls-export-${date}.csv`, "text/csv");
  };

  const handleExportJSON = () => {
    const json = exportControlsToJSON(controls);
    const date = new Date().toISOString().split("T")[0];
    downloadFile(json, `controls-export-${date}.json`, "application/json");
  };

  const handleExportExcel = () => {
    const excelData = exportControlsToExcel(controls);
    const date = new Date().toISOString().split("T")[0];
    downloadExcelFile(excelData, `controls-export-${date}.xlsx`);
  };

  const handleDownloadTemplate = () => {
    const csv = generateControlsTemplateCSV();
    downloadFile(csv, "controls-import-template.csv", "text/csv");
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

    if (isExcel) {
      // Read Excel file as ArrayBuffer
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result as ArrayBuffer;
          const parsedControls = parseExcelControls(data);
          setImportResult({
            success: true,
            message: `Successfully parsed ${parsedControls.length} controls from ${file.name}`,
            controls: parsedControls,
          });
          setImportDialogOpen(true);
        } catch (error) {
          setImportResult({
            success: false,
            message: error instanceof Error ? error.message : "Failed to parse Excel file",
          });
          setImportDialogOpen(true);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // Read text files (CSV, JSON)
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          let parsedControls: Control[];

          if (file.name.endsWith(".csv")) {
            parsedControls = parseCSVControls(content);
          } else if (file.name.endsWith(".json")) {
            parsedControls = parseJSONControls(content);
          } else {
            throw new Error("Unsupported file format. Please use Excel (.xlsx), CSV, or JSON.");
          }

          setImportResult({
            success: true,
            message: `Successfully parsed ${parsedControls.length} controls from ${file.name}`,
            controls: parsedControls,
          });
          setImportDialogOpen(true);
        } catch (error) {
          setImportResult({
            success: false,
            message: error instanceof Error ? error.message : "Failed to parse file",
          });
          setImportDialogOpen(true);
        }
      };
      reader.readAsText(file);
    }

    // Reset input so same file can be selected again
    event.target.value = "";
  };

  const handleConfirmImport = () => {
    if (importResult?.controls) {
      onImport(importResult.controls);
    }
    setImportDialogOpen(false);
    setImportResult(null);
  };

  return (
    <>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportExcel}>
              <Table className="h-4 w-4 mr-2" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportCSV}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportJSON}>
              <FileJson className="h-4 w-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownloadTemplate}
          title="Download import template"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Template
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv,.json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {importResult?.success ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              {importResult?.success ? "Import Preview" : "Import Error"}
            </DialogTitle>
            <DialogDescription>
              {importResult?.message}
            </DialogDescription>
          </DialogHeader>

          {importResult?.success && importResult.controls && (
            <div className="max-h-[300px] overflow-y-auto border rounded-md">
              <table className="w-full text-sm">
                <thead className="bg-muted sticky top-0">
                  <tr>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {importResult.controls.slice(0, 10).map((control) => (
                    <tr key={control.id} className="border-t">
                      <td className="p-2 font-mono text-xs">{control.id}</td>
                      <td className="p-2">{control.name}</td>
                      <td className="p-2">{control.status}</td>
                    </tr>
                  ))}
                  {importResult.controls.length > 10 && (
                    <tr className="border-t">
                      <td colSpan={3} className="p-2 text-center text-muted-foreground">
                        ... and {importResult.controls.length - 10} more controls
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
            {importResult?.success && (
              <Button onClick={handleConfirmImport}>
                Import {importResult.controls?.length} Controls
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
