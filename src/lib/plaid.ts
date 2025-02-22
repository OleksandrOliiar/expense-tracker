import { Configuration, PlaidEnvironments, PlaidApi } from "plaid";

const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(plaidConfig);
