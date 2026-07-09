"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardCheck, Loader2 } from "lucide-react";
import Image from "next/image";

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
        // Redirect based on role
        if (selectedRole === "auditor") {
          router.push("/audit-hub");
        } else {
          router.push("/dashboard");
        }
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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Cornerstone GRC"
              width={320}
              height={160}
              priority
              unoptimized
            />
          </div>
          <p className="text-slate-300">
            Governance, Risk & Compliance Management
          </p>
        </div>

        <Card className="bg-zinc-900 border-zinc-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-zinc-100">Sign In</CardTitle>
            <CardDescription className="text-zinc-400">
              Select your portal and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Portal Selection */}
              <div className="space-y-3">
                <Label className="text-zinc-300">Select Portal</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("client")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === "client"
                        ? "border-zinc-400 bg-zinc-800"
                        : "border-zinc-700 hover:border-zinc-500 bg-zinc-800/50"
                    }`}
                  >
                    <Users className={`h-6 w-6 mb-2 ${selectedRole === "client" ? "text-zinc-200" : "text-zinc-500"}`} />
                    <p className="font-medium text-zinc-200">Client Portal</p>
                    <p className="text-xs text-zinc-500">
                      Manage your compliance
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("auditor")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRole === "auditor"
                        ? "border-zinc-400 bg-zinc-800"
                        : "border-zinc-700 hover:border-zinc-500 bg-zinc-800/50"
                    }`}
                  >
                    <ClipboardCheck className={`h-6 w-6 mb-2 ${selectedRole === "auditor" ? "text-zinc-200" : "text-zinc-500"}`} />
                    <p className="font-medium text-zinc-200">Audit Hub</p>
                    <p className="text-xs text-zinc-500">
                      Review & audit clients
                    </p>
                  </button>
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
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
              <div className="rounded-lg bg-zinc-800 border border-zinc-700 p-3 text-sm">
                <p className="font-medium mb-1 text-zinc-300">Demo Credentials:</p>
                <p className="text-zinc-500 text-xs">
                  Client: client@company.com / demo123
                </p>
                <p className="text-zinc-500 text-xs">
                  Auditor: auditor@auditfirm.com / demo123
                </p>
                <p className="text-zinc-500 text-xs mt-1 italic">
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
