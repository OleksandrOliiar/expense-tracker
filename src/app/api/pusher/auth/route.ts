import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: Request) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      return NextResponse.json(
        { message: "Failed to authorize pusher client" },
        {
          status: 401,
        }
      );
    }

    const params = new URLSearchParams(await request.text());
    const socket_id = params.get("socket_id");
    const channel_name = params.get("channel_name");

    if (!socket_id) {
      return NextResponse.json(
        { message: "socket_id was not provided" },
        {
          status: 401,
        }
      );
    }

    if (!channel_name) {
      return NextResponse.json(
        { message: "channel_name was not provided" },
        {
          status: 401,
        }
      );
    }

    const user = await getUser();

    const data = {
      user_id: user.id,
    };

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      data
    );

    return NextResponse.json(authResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to authorize pusher client" },
      {
        status: 500,
      }
    );
  }
}
