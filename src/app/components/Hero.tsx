import { Star } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import StartTrackingButton from "./StartTrackingButton";
import RedirectButton from "./RedirectButton";

const Hero = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">
            Take Control of Your Financial Future Now
          </h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            Track expenses, set budgets, and achieve your financial goals with
            our intuitive finance tracking platform. Get a clear picture of your
            money in one place.
          </p>
        </div>
        <div className="mt-10">
          <RedirectButton href="/dashboard" title="Start Tracking for Free" />
        </div>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://shadcnblocks.com/images/block/avatar-1.webp"
                alt="satisfied user"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://shadcnblocks.com/images/block/avatar-2.webp"
                alt="satisfied user"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://shadcnblocks.com/images/block/avatar-3.webp"
                alt="satisfied user"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://shadcnblocks.com/images/block/avatar-4.webp"
                alt="satisfied user"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://shadcnblocks.com/images/block/avatar-5.webp"
                alt="satisfied user"
              />
            </Avatar>
          </span>
          <div>
            <div className="flex items-center gap-1">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">5.0</span>
            </div>
            <p className="text-left font-medium text-muted-foreground">
              from 200+ happy users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
