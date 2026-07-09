"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddRiskDialogProps {
  onAddRisk: (risk: Risk) => void;
}

const severities: RiskSeverity[] = ["Critical", "High", "Medium", "Low"];
const statuses: RiskStatus[] = ["Open", "In Treatment", "Mitigated", "Accepted"];
const categories: RiskCategory[] = ["Operational", "Technical", "Compliance", "Strategic", "Financial", "Reputational"];
const likelihoodOptions: RiskLikelihood[] = [1, 2, 3, 4, 5];
const impactOptions: RiskImpact[] = [1, 2, 3, 4, 5];

export function AddRiskDialog({ onAddRisk }: AddRiskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<RiskCategory>("Operational");
  const [severity, setSeverity] = useState<RiskSeverity>("Medium");
  const [status, setStatus] = useState<RiskStatus>("Open");
  const [likelihood, setLikelihood] = useState<RiskLikelihood>(3);
  const [impact, setImpact] = useState<RiskImpact>(3);
  const [owner, setOwner] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const riskScore = likelihood * impact;
    const newRisk: Risk = {
      id: `RISK-${String(Date.now()).slice(-6)}`,
      title,
      description,
      category,
      severity,
      status,
      likelihood,
      impact,
      riskScore,
      owner,
      ownerEmail,
      treatmentPlan,
      mitigatingControls: [],
      dateIdentified: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      lastReviewed: new Date().toISOString().split("T")[0],
    };

    onAddRisk(newRisk);
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Operational");
    setSeverity("Medium");
    setStatus("Open");
    setLikelihood(3);
    setImpact(3);
    setOwner("");
    setOwnerEmail("");
    setTreatmentPlan("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Risk</DialogTitle>
            <DialogDescription>
              Document a new risk in the risk register.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Risk Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter risk title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the risk in detail"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as RiskCategory)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Severity</Label>
                <Select value={severity} onValueChange={(v) => setSeverity(v as RiskSeverity)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {severities.map((sev) => (
                      <SelectItem key={sev} value={sev}>{sev}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Likelihood (1-5)</Label>
                <Select value={String(likelihood)} onValueChange={(v) => setLikelihood(Number(v) as RiskLikelihood)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {likelihoodOptions.map((l) => (
                      <SelectItem key={l} value={String(l)}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Impact (1-5)</Label>
                <Select value={String(impact)} onValueChange={(v) => setImpact(Number(v) as RiskImpact)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {impactOptions.map((i) => (
                      <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as RiskStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Risk Score: <span className="font-bold text-foreground">{likelihood * impact}</span> (Likelihood × Impact)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Risk Owner *</Label>
                <Input
                  id="owner"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  placeholder="Owner name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Owner Email</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="owner@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatmentPlan">Treatment Plan</Label>
              <Textarea
                id="treatmentPlan"
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                placeholder="Describe the risk treatment approach"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Risk</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
