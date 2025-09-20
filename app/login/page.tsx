"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Users, Lock, Building } from "lucide-react";

export default function LoginPage() {
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const [hrCredentials, setHrCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Static credentials
  const ADMIN_CREDENTIALS = { username: "admin", password: "admin123" };
  const HR_CREDENTIALS = { username: "hr", password: "hr123" };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      adminCredentials.username === ADMIN_CREDENTIALS.username &&
      adminCredentials.password === ADMIN_CREDENTIALS.password
    ) {
      // Store login state
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin");
    } else {
      setError("Invalid admin credentials");
    }
    setLoading(false);
  };

  const handleHRLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      hrCredentials.username === HR_CREDENTIALS.username &&
      hrCredentials.password === HR_CREDENTIALS.password
    ) {
      // Store login state
      localStorage.setItem("userRole", "hr");
      localStorage.setItem("isLoggedIn", "true");
      router.push("/hr");
    } else {
      setError("Invalid HR credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Physiograph</h1>
          <p className="text-gray-600">Admin & HR Portal Login</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="hr" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  HR
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Username</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      placeholder="Enter admin username"
                      value={adminCredentials.username}
                      onChange={(e) =>
                        setAdminCredentials({
                          ...adminCredentials,
                          username: e.target.value,
                        })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminCredentials.password}
                      onChange={(e) =>
                        setAdminCredentials({
                          ...adminCredentials,
                          password: e.target.value,
                        })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Sign in as Admin
                      </div>
                    )}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium">
                    Demo Credentials:
                  </p>
                  <p className="text-sm text-blue-700">Username: admin</p>
                  <p className="text-sm text-blue-700">Password: admin123</p>
                </div>
              </TabsContent>

              <TabsContent value="hr">
                <form onSubmit={handleHRLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hr-username">Username</Label>
                    <Input
                      id="hr-username"
                      type="text"
                      placeholder="Enter HR username"
                      value={hrCredentials.username}
                      onChange={(e) =>
                        setHrCredentials({
                          ...hrCredentials,
                          username: e.target.value,
                        })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hr-password">Password</Label>
                    <Input
                      id="hr-password"
                      type="password"
                      placeholder="Enter HR password"
                      value={hrCredentials.password}
                      onChange={(e) =>
                        setHrCredentials({
                          ...hrCredentials,
                          password: e.target.value,
                        })
                      }
                      required
                      className="h-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Sign in as HR
                      </div>
                    )}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    Demo Credentials:
                  </p>
                  <p className="text-sm text-green-700">Username: hr</p>
                  <p className="text-sm text-green-700">Password: hr123</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 Physiograph. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
