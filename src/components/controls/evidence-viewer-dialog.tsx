"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Evidence } from "@/types";
import { Download, FileText, Image, File, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface EvidenceViewerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evidence: Evidence | null;
}

const EVIDENCE_FILES_KEY = "grc-evidence-files";

export function EvidenceViewerDialog({
  open,
  onOpenChange,
  evidence,
}: EvidenceViewerDialogProps) {
  const [fileData, setFileData] = useState<{ content: string; filename: string } | null>(null);

  useEffect(() => {
    if (evidence && open) {
      try {
        const savedFiles = localStorage.getItem(EVIDENCE_FILES_KEY);
        if (savedFiles) {
          const files = JSON.parse(savedFiles);
          if (files[evidence.id]) {
            setFileData(files[evidence.id]);
          } else {
            setFileData(null);
          }
        }
      } catch {
        setFileData(null);
      }
    }
  }, [evidence, open]);

  if (!evidence) return null;

  const isImage = evidence.mimeType.startsWith("image/");
  const isPdf = evidence.mimeType === "application/pdf";

  const handleDownload = () => {
    if (!fileData) return;

    const link = document.createElement("a");
    link.href = fileData.content;
    link.download = fileData.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    if (!fileData) return;

    const newWindow = window.open();
    if (newWindow) {
      if (isImage || isPdf) {
        newWindow.document.write(`
          <html>
            <head><title>${evidence.name}</title></head>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f0f0f0;">
              ${isImage
                ? `<img src="${fileData.content}" style="max-width:100%;max-height:100vh;" />`
                : `<iframe src="${fileData.content}" style="width:100%;height:100vh;border:none;"></iframe>`
              }
            </body>
          </html>
        `);
      } else {
        newWindow.location.href = fileData.content;
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Pending Review":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Expiring Soon":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Expired":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isImage ? (
              <Image className="h-5 w-5" />
            ) : isPdf ? (
              <FileText className="h-5 w-5" />
            ) : (
              <File className="h-5 w-5" />
            )}
            {evidence.name}
          </DialogTitle>
          <DialogDescription>
            Uploaded by {evidence.uploadedBy} on {format(new Date(evidence.uploadedDate), "MMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Status and Type */}
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(evidence.status)}>{evidence.status}</Badge>
            <Badge variant="outline">{evidence.type}</Badge>
            <span className="text-sm text-muted-foreground">{evidence.fileSize}</span>
          </div>

          {/* Description */}
          {evidence.description && (
            <div>
              <p className="text-sm text-muted-foreground">{evidence.description}</p>
            </div>
          )}

          {/* Preview */}
          {fileData && (
            <div className="border rounded-lg overflow-hidden bg-muted/30">
              {isImage ? (
                <img
                  src={fileData.content}
                  alt={evidence.name}
                  className="max-h-[300px] mx-auto object-contain"
                />
              ) : isPdf ? (
                <div className="p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">PDF Document</p>
                  <p className="text-xs text-muted-foreground mt-1">{fileData.filename}</p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <File className="h-16 w-16 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">{evidence.mimeType}</p>
                  <p className="text-xs text-muted-foreground mt-1">{fileData.filename}</p>
                </div>
              )}
            </div>
          )}

          {!fileData && (
            <div className="border rounded-lg p-8 text-center bg-muted/30">
              <File className="h-16 w-16 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                File content not available
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This evidence was created before file storage was enabled
              </p>
            </div>
          )}

          {/* Actions */}
          {fileData && (
            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {(isImage || isPdf) && (
                <Button variant="outline" onClick={handleOpenInNewTab}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
