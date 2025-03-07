import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserBank } from "../actions/getUserBanks";
import DeactivateBankButton from "./DeactivateBankButton";

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

  return (
    <Card className="min-w-[250px] flex-1 overflow-hidden">
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
          <Badge variant="secondary" className="text-xs font-normal">
            {bank.accountsCount}{" "}
            {bank.accountsCount === 1 ? "account" : "accounts"}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
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

          <DeactivateBankButton itemId={bank.itemId} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BankCard;
