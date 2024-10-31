import { fetchInvoiceSummary } from "@/lib/dashboard/data";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const orgId = searchParams.get("currentOrg");
  const invoiceSummary = await fetchInvoiceSummary(orgId);
  return Response.json(invoiceSummary);
}
