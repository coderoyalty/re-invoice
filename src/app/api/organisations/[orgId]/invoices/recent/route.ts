import { fetchRecentInvoices } from "@/lib/dashboard/data";
import { NextRequest } from "next/server";

interface URLParam {
  params: { orgId: string };
}

export async function GET(req: NextRequest, { params }: URLParam) {
  const result = await fetchRecentInvoices(params.orgId);

  return Response.json(result);
}

export const revalidate = 3600;
