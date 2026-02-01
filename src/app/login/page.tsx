"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, ClipboardCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select a portal to continue");
      return;
    }

    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold">GRC Platform</h1>
          </div>
          <p className="text-muted-foreground">
            Governance, Risk & Compliance Management
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Select your portal and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Portal Selection */}
              <div className="space-y-3">
                <Label>Select Portal</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("client")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === "client"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Users className={`h-6 w-6 mb-2 ${selectedRole === "client" ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-medium">Client Portal</p>
                    <p className="text-xs text-muted-foreground">
                      Manage your compliance
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("auditor")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === "auditor"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <ClipboardCheck className={`h-6 w-6 mb-2 ${selectedRole === "auditor" ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-medium">Audit Hub</p>
                    <p className="text-xs text-muted-foreground">
                      Review & audit clients
                    </p>
                  </button>
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Demo credentials hint */}
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p className="text-muted-foreground text-xs">
                  Client: client@company.com / demo123
                </p>
                <p className="text-muted-foreground text-xs">
                  Auditor: auditor@auditfirm.com / demo123
                </p>
                <p className="text-muted-foreground text-xs mt-1 italic">
                  Or use any email/password to test
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
