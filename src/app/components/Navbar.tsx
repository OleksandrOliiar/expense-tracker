"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Authentication from "./Authentication";
import ModeToggler from "./ModeToggler";
import { useState } from "react";

const links = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Features",
    url: "/#features",
  },
  {
    title: "Testimonials",
    url: "/#testimonials",
  },
  {
    title: "Pricing",
    url: "/#pricing",
  },
  {
    title: "FAQ",
    url: "/#faq",
  },
];

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <section className="py-4 z-30 bg-background sticky top-0 px-4">
      <div className=" mx-auto">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-lg font-semibold">
                Finance Tracker
              </Link>
            </div>
            <div className="flex items-center">
              {links.map((link) => (
                <Link
                  key={link.title}
                  className={cn(
                    "text-muted-foreground",
                    navigationMenuTriggerStyle,
                    buttonVariants({
                      variant: "ghost",
                    })
                  )}
                  href={link.url}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggler />
            <Authentication />
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Finance Tracker</span>
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">
                        Finance Tracker
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-6 mt-6 flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.url}
                      className="font-medium"
                      onClick={handleClick}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <Button variant="outline">Log in</Button>
                  <Button>Sign up</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar1;
