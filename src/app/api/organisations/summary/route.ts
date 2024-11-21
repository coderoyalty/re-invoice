import { fetchInvoiceSummary } from "@/lib/dashboard/data";

export async function GET(_req: Request) {
  const invoiceSummary = await fetchInvoiceSummary();

  return Response.json(invoiceSummary);
}
