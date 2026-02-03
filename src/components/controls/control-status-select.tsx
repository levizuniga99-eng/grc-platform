"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControlStatus } from "@/types";
import { CheckCircle, FileQuestion, AlertTriangle, MinusCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface ControlStatusSelectProps {
  value: ControlStatus;
  onValueChange: (value: ControlStatus) => void;
}

const statusOptions: { value: ControlStatus; label: string; icon: typeof CheckCircle; color: string }[] = [
  {
    value: "Accepted",
    label: "Accepted",
    icon: CheckCircle,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    value: "Needs Review",
    label: "Needs Review",
    icon: FileQuestion,
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    value: "Additional Evidence Needed",
    label: "Evidence Needed",
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400"
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
    icon: MinusCircle,
    color: "text-gray-600 dark:text-gray-400"
  },
];

export function ControlStatusSelect({ value, onValueChange }: ControlStatusSelectProps) {
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const isAccepted = value === "Accepted";

  // Clients cannot change status if already Accepted
  const isDisabled = isClient && isAccepted;

  // Clients cannot set status to "Accepted" or "Additional Evidence Needed" - only auditors can
  const availableOptions = isClient
    ? statusOptions.filter((opt) => opt.value !== "Accepted" && opt.value !== "Additional Evidence Needed")
    : statusOptions;

  const currentOption = statusOptions.find((opt) => opt.value === value);
  const CurrentIcon = currentOption?.icon || CheckCircle;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={isDisabled}>
      <SelectTrigger
        className={`w-[180px] h-8 ${isDisabled ? "opacity-70 cursor-not-allowed" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <SelectValue>
          <div className="flex items-center gap-2">
            <CurrentIcon className={`h-4 w-4 ${currentOption?.color}`} />
            <span className="text-sm">{currentOption?.label || value}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent onClick={(e) => e.stopPropagation()}>
        {availableOptions.map((option) => {
          const Icon = option.icon;
          return (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${option.color}`} />
                <span>{option.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
