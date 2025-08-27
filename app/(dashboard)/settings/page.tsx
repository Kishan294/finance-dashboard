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
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Download,
  Trash2,
  Save,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

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

        {/* Profile Settings */}
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                disabled
              />
              <p className="text-muted-foreground text-sm">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="min-h-[100px]"
              />
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select>
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
              <Select>
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
                <Badge variant="secondary">Email</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Budget Warnings</Label>
                  <p className="text-muted-foreground text-sm">
                    Alert when approaching budget limits
                  </p>
                </div>
                <Badge variant="secondary">Push</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Monthly Reports</Label>
                  <p className="text-muted-foreground text-sm">
                    Receive monthly financial summaries
                  </p>
                </div>
                <Badge variant="secondary">Email</Badge>
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
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select>
                <SelectTrigger className="md:w-[200px]">
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
              <Select>
                <SelectTrigger className="md:w-[200px]">
                  <SelectValue placeholder="Select chart style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
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
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Active Sessions</Label>
                  <p className="text-muted-foreground text-sm">
                    Manage devices that are signed in to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Sessions
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Change Password</Label>
                  <p className="text-muted-foreground text-sm">
                    Update your account password
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change
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
                    Download all your financial data as CSV or JSON
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
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
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Backup
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-red-600">Delete Account</Label>
                  <p className="text-muted-foreground text-sm">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
