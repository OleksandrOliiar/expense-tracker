import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Authentication = async () => {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return (
      <LogoutLink>
        <Button>Logout</Button>
      </LogoutLink>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <LoginLink>Login</LoginLink>
      <RegisterLink>Register</RegisterLink>
    </div>
  );
};

export default Authentication