import { Button } from "@/components/ui/button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

const Authentication = () => {
  const { isAuthenticated } = useKindeAuth();

  if (isAuthenticated) {
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
