import { plaidClient } from "@/lib/plaid";
import { sleep } from "../utils/sleep";
import { Transaction } from "plaid";

type FetchNewSyncDataProps = {
  accessToken: string;
  initialCursor: string;
  retriesLeft?: number;
};

export const fetchNewSyncData = async ({
  accessToken,
  initialCursor,
  retriesLeft = 3,
}: FetchNewSyncDataProps): Promise<{
  added: Transaction[];
  nextCursor: string;
}> => {
  const allData = {
    added: [] as Transaction[],
    nextCursor: initialCursor,
  };

  if (retriesLeft === 0) {
    console.error("Too many retries!");
    return allData;
  }

  try {
    let hasMore = false;

    do {
      const result = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor: allData.nextCursor,
        options: {
          include_original_description: true,
        },
      });


      allData.added = allData.added.concat(result.data.added);
    } while (hasMore);

    return allData;
  } catch (error) {
    console.log("Failed to fetch new sync data");

    await sleep(1000);

    return fetchNewSyncData({
      accessToken,
      initialCursor,
      retriesLeft: retriesLeft - 1,
    });
  }
};
