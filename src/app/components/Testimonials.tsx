import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonial = () => {
  return (
    <section className="py-32 px-4" id="testimonials">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <p className="mb-16 max-w-4xl px-8 font-medium lg:text-3xl">
            &ldquo;This finance tracker has completely transformed how I manage my money.
            I&apos;ve finally been able to save for my dream vacation and pay off my credit card
            debt. The visual reports make it so easy to understand where my money is going.&rdquo;
          </p>
          <div className="flex items-center gap-2 md:gap-4">
            <Avatar className="size-12 md:size-16">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>Sarah J.</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium md:text-base">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground md:text-base">Small Business Owner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;