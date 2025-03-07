import { CreditCard, Landmark, PiggyBank } from "lucide-react";
import PlaidLink from "./PlaidLink";

const NoBanksMessage = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Landmark className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">
            No banks connected
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Start managing your finances by connecting your preferred bank.
          </p>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
          <PlaidLink />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
          <div className="bg-muted/60 rounded-lg p-4 text-left">
            <PiggyBank className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Manage Your Accounts</h4>
            <p className="text-sm text-muted-foreground">
              Keep track of your bank accounts and stay informed about your
              financial status.
            </p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <CreditCard className="h-5 w-5 mb-4 text-primary" />
            <h4 className="font-medium mb-1">Streamline Your Banking</h4>
            <p className="text-sm text-muted-foreground">
              Simplify your banking experience by connecting all your accounts
              in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoBanksMessage;
