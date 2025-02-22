import { qstashClient } from "@/lib/qstash";
import { formatTransactionsData } from "../utils/formatTransactionsData";
import { addTransactions } from "./addTransactions";
import { fetchNewSyncData } from "./fetchNewSyncData";
import { getPlaidItem } from "./getPlaidItem";
import { updateCursorForItem } from "./updateCursorForItem";

export const syncTransactions = async (itemId: string) => {
  try {
    const plaidItem = await getPlaidItem(itemId);

    if (!plaidItem) {
      throw new Error("Plaid item not found");
    }

    const { accessToken, transactionCursor, accountId } = plaidItem;

    if (!accountId) {
      throw new Error("Account ID not found");
    }

    const allData = await fetchNewSyncData({
      accessToken,
      initialCursor: transactionCursor ?? "",
    });

    const { added, nextCursor } = allData;

    const formattedTransactions = formatTransactionsData({
      plaidTransactions: added,
      accountId,
    });

    await addTransactions(formattedTransactions);

    await updateCursorForItem({
      itemId,
      nextCursor,
    });

    await qstashClient.publishJSON({
      url: `https://c05c-213-109-224-158.ngrok-free.app/api/tracker`,
      body: { userId: accountId },
    });
  } catch (error) {
    console.log("Failed to sync transactions", error);
    throw error;
  }
};
