"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { LoginLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

type RedirectButtonProps = {
  href: string;
  title: string;
} & ButtonProps;

const RedirectButton = ({ href, title, ...props }: RedirectButtonProps) => {
  const router = useRouter();
  const { isAuthenticated } = useKindeAuth();

  if (isAuthenticated) {
    return (
      <Button size="lg" onClick={() => router.push(href)} {...props}>
        {title}
      </Button>
    );
  }

  return (
    <LoginLink>
      <Button size="lg" {...props}>
        {title}
      </Button>
    </LoginLink>
  );
};

export default RedirectButton;
