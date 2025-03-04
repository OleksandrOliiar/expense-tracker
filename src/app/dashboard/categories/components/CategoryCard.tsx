import { Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CategoryCardMenu from "./CategoryCardMenu";
import { useRouter } from "next/navigation";

type CategoryCardProps = {
  id: string;
  name: string;
  transactionsCount: number;
};

const CategoryCard = ({ id, name, transactionsCount }: CategoryCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/transactions?categories=${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="min-w-[250px] flex-1 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden group "
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/15 transition-colors">
            <Folder className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{name}</h3>
            <div className="flex items-center mt-1">
              <Badge variant="secondary" className="text-xs font-normal">
                {transactionsCount} transactions
              </Badge>
            </div>
          </div>
          <CategoryCardMenu id={id} name={name} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
