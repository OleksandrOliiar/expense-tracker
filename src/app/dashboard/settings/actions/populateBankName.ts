import { plaidClient } from "@/lib/plaid";
import { CountryCode } from "plaid";
import { addBankForItem } from "./addBankForItem";

type PopulateBankNameProps = {
  itemId: string;
  accessToken: string;
};

export const populateBankName = async ({
  itemId,
  accessToken,
}: PopulateBankNameProps) => {
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
    });

    const institutionName = institutionResponse.data.institution.name;

    await addBankForItem({
      itemId,
      institutionName,
    });
  } catch (error) {
    console.log("Error populating bank name", error);
    throw error;
  }
};
