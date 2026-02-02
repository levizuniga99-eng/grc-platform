"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Bell,
  Shield,
  Key,
  Building2,
  FileText,
  UserPlus,
  Trash2,
  Check,
} from "lucide-react";
import { useSettings } from "@/contexts/settings-context";
import { useAuth } from "@/contexts/auth-context";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "auditor" | "viewer";
  status: "active" | "pending";
}

const mockTeamMembers: TeamMember[] = [
  { id: "1", name: "John Smith", email: "john@audit.com", role: "admin", status: "active" },
  { id: "2", name: "Sarah Johnson", email: "sarah@audit.com", role: "auditor", status: "active" },
  { id: "3", name: "Mike Chen", email: "mike@audit.com", role: "viewer", status: "pending" },
];

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { user } = useAuth();
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [saved, setSaved] = useState(false);

  const isClient = user?.role === "client";

  // Local form state for organization settings
  const [orgName, setOrgName] = useState(settings.organizationName);
  const [scopeName, setScopeName] = useState(settings.scopeName);
  const [auditName, setAuditName] = useState(settings.auditName);
  const [industry, setIndustry] = useState(settings.industry);
  const [timezone, setTimezone] = useState(settings.timezone);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [controlUpdates, setControlUpdates] = useState(true);
  const [evidenceUploads, setEvidenceUploads] = useState(true);
  const [statusChanges, setStatusChanges] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Access settings
  const [requireMFA, setRequireMFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [ipRestriction, setIpRestriction] = useState(false);

  // Audit settings
  const [autoArchive, setAutoArchive] = useState(true);
  const [retentionPeriod, setRetentionPeriod] = useState("7");
  const [requireApproval, setRequireApproval] = useState(true);

  const handleSaveOrganization = () => {
    updateSettings({
      organizationName: orgName,
      scopeName: scopeName,
      auditName: auditName,
      industry: industry,
      timezone: timezone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Settings" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your platform settings, team access, and notifications.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Client/Organization Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Organization</CardTitle>
              </div>
              <CardDescription>
                Manage organization details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  disabled={!isClient}
                  className={!isClient ? "bg-muted" : ""}
                />
                {!isClient && (
                  <p className="text-xs text-muted-foreground">Only clients can edit this field</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="scopeName">Scope Name</Label>
                <Input
                  id="scopeName"
                  value={scopeName}
                  onChange={(e) => setScopeName(e.target.value)}
                  placeholder="e.g., Platform or application name"
                  disabled={!isClient}
                  className={!isClient ? "bg-muted" : ""}
                />
                {!isClient && (
                  <p className="text-xs text-muted-foreground">Only clients can edit this field</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="auditName">Audit Name</Label>
                <Input
                  id="auditName"
                  value={auditName}
                  onChange={(e) => setAuditName(e.target.value)}
                  placeholder="e.g., SOC 2 Type II Audit 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full gap-2" onClick={handleSaveOrganization}>
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Control Updates</Label>
                  <p className="text-xs text-muted-foreground">When control status changes</p>
                </div>
                <Switch checked={controlUpdates} onCheckedChange={setControlUpdates} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Evidence Uploads</Label>
                  <p className="text-xs text-muted-foreground">When new evidence is uploaded</p>
                </div>
                <Switch checked={evidenceUploads} onCheckedChange={setEvidenceUploads} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Status Changes</Label>
                  <p className="text-xs text-muted-foreground">When requirement status changes</p>
                </div>
                <Switch checked={statusChanges} onCheckedChange={setStatusChanges} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-xs text-muted-foreground">Summary of weekly activity</p>
                </div>
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
              </div>
            </CardContent>
          </Card>

          {/* Security & Access Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Security & Access</CardTitle>
              </div>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require MFA</Label>
                  <p className="text-xs text-muted-foreground">Enforce multi-factor authentication</p>
                </div>
                <Switch checked={requireMFA} onCheckedChange={setRequireMFA} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Restriction</Label>
                  <p className="text-xs text-muted-foreground">Limit access to specific IPs</p>
                </div>
                <Switch checked={ipRestriction} onCheckedChange={setIpRestriction} />
              </div>
              {ipRestriction && (
                <div className="space-y-2">
                  <Label htmlFor="allowedIps">Allowed IP Addresses</Label>
                  <Input id="allowedIps" placeholder="e.g., 192.168.1.0/24" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Audit Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Audit Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure audit workflow and retention policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Archive Completed Audits</Label>
                  <p className="text-xs text-muted-foreground">Automatically archive after completion</p>
                </div>
                <Switch checked={autoArchive} onCheckedChange={setAutoArchive} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Evidence Retention Period</Label>
                <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="7">7 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Approval for Status Changes</Label>
                  <p className="text-xs text-muted-foreground">Manager approval needed</p>
                </div>
                <Switch checked={requireApproval} onCheckedChange={setRequireApproval} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Access Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Team Access</CardTitle>
                  <CardDescription>
                    Manage team members and their permissions
                  </CardDescription>
                </div>
              </div>
              <Button size="sm" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                    <Select defaultValue={member.role}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="auditor">Auditor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API & Integrations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-base">API Access</CardTitle>
                <CardDescription>
                  Manage API keys and integration settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Production API Key</p>
                <p className="text-sm text-muted-foreground font-mono">grc_prod_****************************</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Reveal</Button>
                <Button variant="outline" size="sm">Regenerate</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Test API Key</p>
                <p className="text-sm text-muted-foreground font-mono">grc_test_****************************</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Reveal</Button>
                <Button variant="outline" size="sm">Regenerate</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
