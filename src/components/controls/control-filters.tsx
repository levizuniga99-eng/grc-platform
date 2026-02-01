"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControlCategory, ControlStatus } from "@/types";

interface ControlFiltersProps {
  statusFilter: string;
  categoryFilter: string;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const statuses: ControlStatus[] = [
  "Needs Review",
  "Additional Evidence Needed",
  "Accepted",
  "Not Applicable",
];

const categories: ControlCategory[] = [
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

export function ControlFilters({
  statusFilter,
  categoryFilter,
  onStatusChange,
  onCategoryChange,
}: ControlFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
