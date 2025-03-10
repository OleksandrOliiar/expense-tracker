import { plaidClient } from "@/lib/plaid";
import { CountryCode } from "plaid";
import { createItem } from "./createItem";

type PopulateBankDataProps = {
  userId: string;
  itemId: string;
  accessToken: string;
};

export const populateBankData = async ({
  userId,
  itemId,
  accessToken,
}: PopulateBankDataProps) => {
  try {
    const itemResponse = await plaidClient.itemGet({
      access_token: accessToken,
    });

    const institutionId = itemResponse.data.item.institution_id;

    if (institutionId == null) {
      return;
    }

    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: [CountryCode.Us],
      options: {
        // @ts-ignore
        include_display_data: true,
      },
    });

    const institutionName = institutionResponse.data.institution.name;
    const logo = institutionResponse.data.institution.logo;
    const url = institutionResponse.data.institution.url;

    const resultItemId = await createItem({
      itemId,
      institutionName,
      logo,
      url,
      institutionId,
      accessToken,
      userId,
    });

    return resultItemId;
  } catch (error) {
    console.log("Error populating bank data", error);
    throw error;
  }
};
