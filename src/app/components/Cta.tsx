import { Button } from "@/components/ui/button";
import RedirectButton from "./RedirectButton";

const CTA = () => {
  return (
    <section className="py-32 px-4">
      <div className="container mx-auto">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              Ready to Transform Your Finances?
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              Join thousands of users who have already taken control of their
              financial future. Start tracking your money today and make smarter
              financial decisions.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline">View Demo</Button>
            <RedirectButton
              size="default"
              href="/dashboard"
              title="Get Started Free"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
