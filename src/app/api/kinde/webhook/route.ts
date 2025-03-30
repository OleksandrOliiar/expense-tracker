import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createAccount } from "./actions/createAccount";

// Define interfaces for the Kinde webhook event
interface KindeEventData {
  user: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface KindeEvent extends JwtPayload {
  type: string;
  data: KindeEventData;
}

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: Request) {
  try {
    const token = await req.text();

    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header) {
      throw new Error("Invalid token");
    }
    
    const { kid } = decoded.header;

    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey) as KindeEvent;

    switch (event?.type) {
      case "user.created":
        const id = event.data.user.id;
        await createAccount(id);
        break;
      default:
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }

  return NextResponse.json({ status: 200, statusText: "success" });
}
