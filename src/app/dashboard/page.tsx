"use client";
import SummarySection from "@/components/dashboard/summary-section";
import UserDropDown from "@/components/dashboard/user-dropdown";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Plus, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardNavType } from "@/components/dashboard/nav";
import React from "react";
import Link from "next/link";

const orgs = [
  { id: "default", name: "My Organization" },
  { id: "org1", name: "Client A Inc." },
  { id: "org2", name: "Client B Ltd." },
  { id: "org2", name: "Client C Inc." },
];

const invoices = [
  { id: "#inv-001", status: "pending", client: "TechCorp", amount: 5000 },
  { id: "#inv-002", status: "completed", client: "InnoTech", amount: 3000 },
  { id: "#inv-003", status: "pending", client: "DevSolutions", amount: 4500 },
  { id: "#inv-004", status: "failed", client: "SoftWorks", amount: 1500 },
  {
    id: "#inv-005",
    status: "completed",
    client: "NextGen Systems",
    amount: 2200,
  },
  {
    id: "#inv-006",
    status: "pending",
    client: "Quantum Enterprises",
    amount: 7800,
  },
  { id: "#inv-007", status: "failed", client: "Digital Minds", amount: 3600 },
  {
    id: "#inv-008",
    status: "completed",
    client: "Vertex Solutions",
    amount: 5400,
  },
  { id: "#inv-009", status: "pending", client: "CloudNet", amount: 6700 },
  { id: "#inv-010", status: "failed", client: "SoftPoint", amount: 1200 },
  {
    id: "#inv-011",
    status: "completed",
    client: "AI Innovations",
    amount: 9100,
  },
  { id: "#inv-012", status: "pending", client: "ByteWorks", amount: 2600 },
  { id: "#inv-013", status: "completed", client: "DataFlow", amount: 4900 },
  {
    id: "#inv-014",
    status: "failed",
    client: "Alpha Technologies",
    amount: 3100,
  },
  { id: "#inv-015", status: "pending", client: "HyperNet", amount: 8200 },
];

export default function Dashboard() {
  const [organizations, _setOrganizations] =
    React.useState<DashboardNavType["organizations"]>(orgs);
  const [selectedOrg, setSelectedOrg] = React.useState("default");

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="w-full flex items-center">
          <div className="flex-grow flex flex-col">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <span className="text-muted-foreground">
              Here's an insight of your data for this month
            </span>
          </div>
          {/* avatar */}
          <div className="flex-none">
            <UserDropDown />
          </div>
        </div>
        <SummarySection />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>
                You have created 30 invoices this month for{" "}
                {organizations.find((org) => org.id === selectedOrg)?.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <Link href="">
                        <TableCell className="font-medium">{inv.id}</TableCell>
                      </Link>
                      <TableCell>{inv.status}</TableCell>
                      <TableCell>{inv.client}</TableCell>
                      <TableCell className="text-right">
                        ${inv.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3 self-start lg:top-20 lg:sticky">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage invoices and team for{" "}
                {organizations.find((org) => org.id === selectedOrg)?.name}.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Create New Invoice
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Reports
              </Button>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" /> Invite Team Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
