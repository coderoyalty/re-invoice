import { auth } from "@/lib/auth";
import { fetchInvoiceSummary } from "@/lib/dashboard/data";

import { NextResponse } from "next/server";

export type InvoiceSummaryResponse = {
  data: Awaited<ReturnType<typeof fetchInvoiceSummary>>;
};

export async function GET(_req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(null, { status: 401 });
    }

    const invoiceSummary = await fetchInvoiceSummary();

    const response: InvoiceSummaryResponse = { data: invoiceSummary };

    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch invoice summary" },
      { status: 500 }
    );
  }
}
