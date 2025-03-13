import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import ModeToggler from "./ModeToggler";
import { Skeleton } from "@/components/ui/skeleton";

const NavbarActions = () => {
  const { isAuthenticated, isLoading } = useKindeAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2">
        <ModeToggler />
        <Skeleton className="w-full h-8 lg:w-[106px]" />
        <Skeleton className="w-full h-8 lg:w-[106px]" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2">
        <ModeToggler />
        <Link href="/dashboard" className="w-full lg:w-auto">
          <Button variant="outline" className="w-full lg:w-auto">
            Dashboard
          </Button>
        </Link>
        <LogoutLink className="w-full lg:w-auto">
          <Button className="w-full lg:w-auto">Logout</Button>
        </LogoutLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2">
      <ModeToggler />
      <LoginLink className="w-full lg:w-auto">
        <Button className="w-full lg:w-auto">Login</Button>
      </LoginLink>
      <RegisterLink className="w-full lg:w-auto">
        <Button className="w-full lg:w-auto">Register</Button>
      </RegisterLink>
    </div>
  );
};

export default NavbarActions;
