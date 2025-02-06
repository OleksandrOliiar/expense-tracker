import { createSession } from "@/app/(auth)/dataAccess/session";
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import {
  deleteVerificiationCode,
  getVerificationByCode,
} from "./dataAccess/emailVerification";
import { verifyUserEmail } from "./dataAccess/user";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is missing" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      code: string;
      userId: string;
    };

    const emailVerification = await getVerificationByCode(decoded.code);

    if (!emailVerification) {
      return NextResponse.json(
        { message: "Token is invalid" },
        { status: 400 }
      );
    }

    await verifyUserEmail(decoded.userId);

    await deleteVerificiationCode(emailVerification.id);

    await createSession(decoded.userId);

    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_BASE_URL!),
      302
    );
  } catch (error) {
    return NextResponse.redirect(
      new URL(process.env.NEXT_PUBLIC_BASE_URL! + "/sign-in"),
      302
    );
  }
}
