import { syncTransactions } from "@/app/dashboard/settings/actions/syncTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      webhook_type: product,
      webhook_code: code,
      item_id,
    } = await request.json();

    switch (product) {
      case "TRANSACTIONS":
        switch (code) {
          case "SYNC_UPDATES_AVAILABLE":
            syncTransactions(item_id);
            break;
          default:
            break;
        }

        break;
      default:
        break;
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error processing Plaid webhook", error);
    return NextResponse.json(
      { error: "Error processing Plaid webhook" },
      { status: 500 }
    );
  }
}
