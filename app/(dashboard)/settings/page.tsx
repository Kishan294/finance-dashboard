"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Download,
  Trash2,
  Save,
  RefreshCw,
  Check,
  X,
  Loader2,
  MapPin,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useGetUserSettings } from "@/features/settings/api/use-get-user-settings";
import { useUpdateUserSettings } from "@/features/settings/api/use-update-user-settings";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsPage = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const {
    data: userSettings,
    isLoading: settingsLoading,
    error: settingsError,
  } = useGetUserSettings();
  const updateSettings = useUpdateUserSettings();

  const [localSettings, setLocalSettings] = useState({
    currency: "usd",
    dateFormat: "mm-dd-yyyy",
    fiscalYear: "january",
    theme: "light",
    chartStyle: "modern",
    notificationTransactions: 1,
    notificationBudgets: 1,
    notificationReports: 0,
    twoFactorEnabled: 0,
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Update local settings when server settings are loaded
  useEffect(() => {
    if (userSettings) {
      setLocalSettings({
        currency: userSettings.currency || "usd",
        dateFormat: userSettings.dateFormat || "mm-dd-yyyy",
        fiscalYear: userSettings.fiscalYear || "january",
        theme: userSettings.theme || "light",
        chartStyle: userSettings.chartStyle || "modern",
        notificationTransactions: userSettings.notificationTransactions ?? 1,
        notificationBudgets: userSettings.notificationBudgets ?? 1,
        notificationReports: userSettings.notificationReports ?? 0,
        twoFactorEnabled: userSettings.twoFactorEnabled ?? 0,
      });
    }
  }, [userSettings]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const updateSetting = (key: string, value: any) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync(localSettings);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // In a real app, this would call an API to export user data
      const data = {
        user: {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.primaryEmailAddress?.emailAddress,
        },
        settings: localSettings,
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `finance-data-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Data exported successfully!");
    } catch (error) {
      toast.error("Failed to export data.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      // Simulate backup creation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Backup created successfully!");
    } catch (error) {
      toast.error("Failed to create backup.");
    } finally {
      setIsBackingUp(false);
    }
  };

  const toggleTwoFactor = () => {
    const newValue = localSettings.twoFactorEnabled === 1 ? 0 : 1;
    updateSetting("twoFactorEnabled", newValue);
    toast.success(
      newValue === 1
        ? "Two-factor authentication enabled"
        : "Two-factor authentication disabled",
    );
  };

  const toggleNotification = (type: string) => {
    const currentValue = localSettings[
      type as keyof typeof localSettings
    ] as number;
    const newValue = currentValue === 1 ? 0 : 1;
    updateSetting(type, newValue);
    const notificationType = type.replace("notification", "").toLowerCase();
    toast.success(
      `${notificationType} notifications ${newValue === 1 ? "enabled" : "disabled"}`,
    );
  };

  // Loading state
  if (!userLoaded || settingsLoading) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <div className="space-y-6">
          <Card className="border-none drop-shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
          </Card>
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="border-none drop-shadow-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (settingsError) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardContent className="p-6">
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <p className="mb-2 text-red-600">Failed to load settings</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <div className="space-y-6">
        {/* Header */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Settings</CardTitle>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </CardHeader>
        </Card>

        {/* Profile Settings - Real Clerk Data */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Your profile information from Clerk authentication
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={user?.firstName || ""}
                  placeholder="Not set"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={user?.lastName || ""}
                  placeholder="Not set"
                  disabled
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={user?.primaryEmailAddress?.emailAddress || ""}
                placeholder="No email set"
                disabled
              />
              <p className="text-muted-foreground text-sm">
                Profile information is managed through Clerk authentication
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Account Created</Label>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>User ID</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="font-mono text-xs">
                    {user?.id?.substring(0, 12)}...
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Preferences */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Financial Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select
                  value={localSettings.currency}
                  onValueChange={(value) => updateSetting("currency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                    <SelectItem value="cad">CAD (C$)</SelectItem>
                    <SelectItem value="aud">AUD (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select
                  value={localSettings.dateFormat}
                  onValueChange={(value) => updateSetting("dateFormat", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscalYear">Fiscal Year Start</Label>
              <Select
                value={localSettings.fiscalYear}
                onValueChange={(value) => updateSetting("fiscalYear", value)}
              >
                <SelectTrigger className="md:w-[200px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Transaction Alerts</Label>
                  <p className="text-muted-foreground text-sm">
                    Get notified about new transactions
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleNotification("notificationTransactions")}
                  className={`${
                    localSettings.notificationTransactions === 1
                      ? "border-green-200 bg-green-50 text-green-700"
                      : ""
                  }`}
                >
                  {localSettings.notificationTransactions === 1 ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <X className="mr-2 h-4 w-4" />
                  )}
                  {localSettings.notificationTransactions === 1
                    ? "Enabled"
                    : "Disabled"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Budget Warnings</Label>
                  <p className="text-muted-foreground text-sm">
                    Alert when approaching budget limits
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleNotification("notificationBudgets")}
                  className={`${
                    localSettings.notificationBudgets === 1
                      ? "border-green-200 bg-green-50 text-green-700"
                      : ""
                  }`}
                >
                  {localSettings.notificationBudgets === 1 ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <X className="mr-2 h-4 w-4" />
                  )}
                  {localSettings.notificationBudgets === 1
                    ? "Enabled"
                    : "Disabled"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Monthly Reports</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive monthly financial summaries
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleNotification("notificationReports")}
                  className={`${
                    localSettings.notificationReports === 1
                      ? "border-green-200 bg-green-50 text-green-700"
                      : ""
                  }`}
                >
                  {localSettings.notificationReports === 1 ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <X className="mr-2 h-4 w-4" />
                  )}
                  {localSettings.notificationReports === 1
                    ? "Enabled"
                    : "Disabled"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={localSettings.theme}
                  onValueChange={(value) => updateSetting("theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chartStyle">Chart Style</Label>
                <Select
                  value={localSettings.chartStyle}
                  onValueChange={(value) => updateSetting("chartStyle", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chart style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-muted-foreground text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant={
                    localSettings.twoFactorEnabled === 1 ? "default" : "outline"
                  }
                  size="sm"
                  onClick={toggleTwoFactor}
                >
                  {localSettings.twoFactorEnabled === 1 ? "Disable" : "Enable"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Manage Account (Clerk)</Label>
                  <p className="text-muted-foreground text-sm">
                    Update password, email, and other account settings
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // In a real app, this would redirect to Clerk's user management
                    toast.info(
                      "Account management handled by Clerk authentication",
                    );
                  }}
                >
                  Manage Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Data</Label>
                  <p className="text-muted-foreground text-sm">
                    Download all your financial data and settings
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Backup</Label>
                  <p className="text-muted-foreground text-sm">
                    Create a backup of your account data
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackup}
                  disabled={isBackingUp}
                >
                  {isBackingUp ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  {isBackingUp ? "Creating..." : "Backup"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-red-600">Delete Account</Label>
                  <p className="text-muted-foreground text-sm">
                    Account deletion is managed through Clerk
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        Account deletion is handled through Clerk authentication
                        system. This action will permanently delete your account
                        and all associated data.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          toast.error(
                            "Account deletion must be done through Clerk dashboard",
                          )
                        }
                      >
                        Understood
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          {hasUnsavedChanges && (
            <p className="flex items-center text-sm text-orange-600">
              <RefreshCw className="mr-2 h-4 w-4" />
              You have unsaved changes
            </p>
          )}
          <Button
            onClick={handleSave}
            disabled={updateSettings.isPending || !hasUnsavedChanges}
            className={`w-full sm:w-auto ${hasUnsavedChanges ? "" : "ml-auto"}`}
          >
            {updateSettings.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
