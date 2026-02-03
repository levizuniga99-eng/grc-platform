"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface EvidenceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  controlName: string;
  onSubmit: (message: string) => void;
}

export function EvidenceRequestDialog({
  open,
  onOpenChange,
  controlName,
  onSubmit,
}: EvidenceRequestDialogProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Request Additional Evidence
          </DialogTitle>
          <DialogDescription>
            Provide details about what additional evidence is needed for <strong>{controlName}</strong>.
            This will create a task for the client and be recorded in the control&apos;s message history.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="evidence-message">What evidence is needed?</Label>
            <Textarea
              id="evidence-message"
              placeholder="Please provide documentation showing... Include details about the format, time period, and specific information required."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Be specific about what documentation is required and any formatting requirements.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!message.trim()}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
