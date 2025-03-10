import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Building,
  ExternalLink,
  CreditCard,
  Wallet,
  TrendingUp,
  CircleDollarSign,
  FileBox,
  ListFilter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserBank } from "../actions/getUserBanks";
import DeactivateBankDialog from "./DeactivateBankDialog";

type BankCardProps = {
  bank: UserBank;
};

const BankCard = ({ bank }: BankCardProps) => {
  const formatLogoUrl = (logo: string | null) => {
    if (!logo) return null;

    if (logo.startsWith("data:") || logo.startsWith("http")) {
      return logo;
    }

    return `data:image/png;base64,${logo}`;
  };

  // Format account type for display
  const formatAccountType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Group accounts by type
  const groupedAccounts = bank.accounts.reduce((acc, account) => {
    const type = formatAccountType(account.type);
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(account);
    return acc;
  }, {} as Record<string, typeof bank.accounts>);

  // Get account type icon
  const getAccountTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "investment":
      case "brokerage":
        return <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />;
      case "credit":
        return <CreditCard className="h-4 w-4 mr-2 text-blue-500" />;
      case "depository":
        return <Wallet className="h-4 w-4 mr-2 text-amber-500" />;
      case "loan":
        return <CircleDollarSign className="h-4 w-4 mr-2 text-red-500" />;
      case "other":
        return <FileBox className="h-4 w-4 mr-2 text-purple-500" />;
      default:
        return <Building className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };

  return (
    <Card className="min-w-[300px] max-w-[400px] flex-1 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {bank.logo ? (
            <div className="h-10 w-10 overflow-hidden rounded-full bg-primary/10">
              <Image
                src={formatLogoUrl(bank.logo) ?? ""}
                alt={bank.bankName || "Bank logo"}
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
          )}
          <CardTitle className="text-lg font-medium">
            {bank.bankName || "Unknown Bank"}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center mt-1">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span>
                  {bank.accounts.length}{" "}
                  {bank.accounts.length === 1 ? "Account" : "Accounts"}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto" side="right">
              <SheetHeader>
                <SheetTitle>
                  {bank.bankName || "Unknown Bank"} Accounts
                </SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(groupedAccounts).map(([type, accounts]) => (
                    <div
                      key={type}
                      className="space-y-2 bg-muted/60 dark:bg-muted/30 p-3 rounded-lg"
                    >
                      <h4 className="text-xs font-medium text-muted-foreground flex items-center border-b pb-1.5">
                        {getAccountTypeIcon(type)}
                        {type} ({accounts.length})
                      </h4>
                      <div className="space-y-1.5 overflow-y-auto pr-1">
                        {accounts.map((account) => (
                          <div
                            key={account.id}
                            className="text-sm py-2 px-4 rounded-md bg-secondary transition-colors"
                          >
                            <span className="font-medium">{account.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2">
          {bank.url ? (
            <Link
              href={bank.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              Visit Website <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">
              No website available
            </span>
          )}

          <DeactivateBankDialog bankId={bank.itemId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BankCard;
