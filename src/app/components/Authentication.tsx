import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

const Authentication = async () => {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <LoginLink>Login</LoginLink>
      <RegisterLink>Register</RegisterLink>
    </div>
  );
};

export default Authentication;
