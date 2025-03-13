import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RedirectButton from "./RedirectButton";

const Features = () => {
  return (
    <section className="py-32 px-4" id="features">
      <div>
        <div className="container mx-auto flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Powerful Features</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Smart Tools for Financial Success
          </h2>
          <p className="text-muted-foreground">
            Everything you need to manage your money effectively in one place.
          </p>
        </div>
        <div>
          <Tabs defaultValue="tab-1" className="mt-8">
            <TabsList className="container mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
              <TabsTrigger
                value="tab-1"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                <Zap className="h-auto w-4 shrink-0" /> Budget Tracking
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                <Pointer className="h-auto w-4 shrink-0" />
                Goal Setting
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                <Layout className="h-auto w-4 shrink-0" />
                Bank Integration
              </TabsTrigger>
            </TabsList>
            <div className="container mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
              <TabsContent
                value="tab-1"
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Smart Budgeting
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Stay on top of your spending.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Create custom budgets for different categories and track
                    your spending in real-time. Get alerts when you&apos;re
                    approaching your limits and gain insights into your spending
                    habits.
                  </p>
                  <RedirectButton
                    className="mt-2.5 w-fit gap-2"
                    size="lg"
                    href="/dashboard/budgets"
                    title="Create a Budget"
                  />
                </div>
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-dark-1.svg"
                  alt="Budget tracking interface"
                  className="rounded-xl"
                  width={32}
                  height={32}
                />
              </TabsContent>

              <TabsContent
                value="tab-2"
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Financial Goals
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Achieve your financial dreams.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Set personalized savings goals for big purchases, emergency
                    funds, or retirement. Track your progress with visual charts
                    and celebrate milestones along the way.
                  </p>
                  <RedirectButton
                    className="mt-2.5 w-fit gap-2"
                    size="lg"
                    href="/dashboard/goals"
                    title="Set a Goal"
                  />
                </div>
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-dark-2.svg"
                  alt="Goal tracking interface"
                  className="rounded-xl"
                  width={32}
                  height={32}
                />
              </TabsContent>
              <TabsContent
                value="tab-3"
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Seamless Banking
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Connect all your accounts.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Securely link your bank accounts to automatically import
                    transactions. Get a complete view of your finances across
                    multiple accounts and institutions in one dashboard.
                  </p>
                  <RedirectButton
                    className="mt-2.5 w-fit gap-2"
                    size="lg"
                    href="/dashboard/settings"
                    title="Connect Your Bank"
                  />
                </div>
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-dark-3.svg"
                  alt="Bank integration interface"
                  className="rounded-xl"
                  width={32}
                  height={32}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Features;
