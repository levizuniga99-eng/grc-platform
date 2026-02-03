"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Evidence, EvidenceType } from "@/types";
import { Upload, File, X } from "lucide-react";

interface EvidenceUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  controlId: string;
  controlName: string;
  onUpload: (evidence: Evidence) => void;
  userName: string;
}

const evidenceTypes: EvidenceType[] = [
  "Screenshot",
  "Document",
  "Report",
  "Certificate",
  "API",
  "Automated",
  "Population",
];

const EVIDENCE_STORAGE_KEY = "grc-evidence";
const EVIDENCE_FILES_KEY = "grc-evidence-files";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function EvidenceUploadDialog({
  open,
  onOpenChange,
  controlId,
  controlName,
  onUpload,
  userName,
}: EvidenceUploadDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<EvidenceType>("Document");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!name) {
        setName(file.name.replace(/\.[^/.]+$/, "")); // Use filename without extension as default name
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !selectedFile) return;

    setIsUploading(true);

    // Read file as base64
    const fileContent = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(selectedFile);
    });

    const evidenceId = `EV-${Date.now()}`;

    // Create evidence object
    const newEvidence: Evidence = {
      id: evidenceId,
      name: name.trim(),
      description: description.trim(),
      type,
      status: "Pending Review",
      controlIds: [controlId],
      uploadedBy: userName,
      uploadedDate: new Date().toISOString().split("T")[0],
      expirationDate: null,
      fileSize: formatFileSize(selectedFile.size),
      mimeType: selectedFile.type || "application/octet-stream",
    };

    // Save evidence metadata to localStorage
    try {
      const saved = localStorage.getItem(EVIDENCE_STORAGE_KEY);
      const existingEvidence: Evidence[] = saved ? JSON.parse(saved) : [];
      const updated = [...existingEvidence, newEvidence];
      localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(updated));

      // Save file content separately (to avoid bloating evidence metadata)
      const savedFiles = localStorage.getItem(EVIDENCE_FILES_KEY);
      const existingFiles: Record<string, { content: string; filename: string }> = savedFiles ? JSON.parse(savedFiles) : {};
      existingFiles[evidenceId] = {
        content: fileContent,
        filename: selectedFile.name,
      };
      localStorage.setItem(EVIDENCE_FILES_KEY, JSON.stringify(existingFiles));

      // Trigger storage event for other tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: EVIDENCE_STORAGE_KEY,
          newValue: JSON.stringify(updated),
        })
      );
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: EVIDENCE_FILES_KEY,
          newValue: JSON.stringify(existingFiles),
        })
      );
    } catch {
      // Ignore storage errors
    }

    // Call the onUpload callback
    onUpload(newEvidence);

    // Reset form
    setName("");
    setDescription("");
    setType("Document");
    setSelectedFile(null);
    setIsUploading(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setType("Document");
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Evidence
          </DialogTitle>
          <DialogDescription>
            Upload evidence for <strong>{controlName}</strong>. The file will be linked to this control.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>File</Label>
            {selectedFile ? (
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to select a file or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, PNG, JPG, XLSX, or other documents
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx,.xls,.csv,.json,.txt"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="evidence-name">Name</Label>
            <Input
              id="evidence-name"
              placeholder="Evidence name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as EvidenceType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {evidenceTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="evidence-description">Description (optional)</Label>
            <Textarea
              id="evidence-description"
              placeholder="Describe what this evidence demonstrates..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Evidence"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
