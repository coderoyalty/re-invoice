import { fetchInvoiceSummary } from "@/lib/dashboard/data";

interface GetParam {
  params: {
    orgId: string;
  };
}

export async function GET(_req: Request, { params }: GetParam) {
  const invoiceSummary = await fetchInvoiceSummary(params.orgId);

  return Response.json(invoiceSummary);
}
