import { createSession } from "@/app/(auth)/dataAccess/session";
import { db } from "@/db";
import { oauthAccountTable, userTable } from "@/db/schema";
import { google } from "@/lib/auth/oauth";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface UserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const codeVerifier = cookies().get("codeVerifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  if (savedState !== state) {
    return NextResponse.json({ message: "Invalid state" }, { status: 400 });
  }

  try {
    const { accessToken, accessTokenExpiresAt, refreshToken } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userInfo: UserInfo = await googleResponse.json();

    const transactionResult = await db.transaction(async (transaction) => {
      const existingUser = await transaction.query.user.findFirst({
        where: ({ id: dbId, email: dbEmail }, { eq, or }) =>
          or(eq(dbId, userInfo.id), eq(dbEmail, userInfo.email)),
      });

      if (!existingUser) {
        const userId = generateId(15);

        const user = await transaction.insert(userTable).values({
          id: userId,
          email: userInfo.email,
          emailVerified: userInfo.verified_email,
        });

        if (user.length === 0) {
          return {
            success: false,
            message: "Failed to create user",
          };
        }

        const oauthAccount = await transaction
          .insert(oauthAccountTable)
          .values({
            accessToken,
            expiresAt: accessTokenExpiresAt,
            provider: "google",
            providerUserId: userInfo.id,
            refreshToken,
            userId: userId,
            id: generateId(15),
          });

        if (oauthAccount.length === 0) {
          return {
            success: false,
            message: "Failed to create oauth account",
          };
        }

        return {
          success: true,
          data: {
            userId,
          },
        };
      } else {
        const updatedOauthAccount = await transaction
          .update(oauthAccountTable)
          .set({
            accessToken,
            expiresAt: accessTokenExpiresAt,
            refreshToken,
          })
          .where(eq(oauthAccountTable.providerUserId, userInfo.id));

        if (updatedOauthAccount.length === 0) {
          return {
            success: false,
            message: "Failed to update oauth account",
          };
        }
      }

      return {
        success: true,
        data: {
          userId: existingUser.id,
        },
      };
    });

    if (!transactionResult.success) {
      throw new Error(transactionResult.message);
    }

    await createSession(transactionResult.data?.userId!);

    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      {
        status: 302,
      }
    );
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
};
