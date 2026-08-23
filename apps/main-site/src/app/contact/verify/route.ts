import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

type TurnstileVerificationResponse = {
  success: boolean;
};

function redirectToContact(request: Request) {
  return NextResponse.redirect(new URL("/contact", request.url));
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("cf-turnstile-response");
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (typeof token !== "string" || !token || !secretKey) {
    return redirectToContact(request);
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

  const verifyBody = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ip) {
    verifyBody.set("remoteip", ip);
  }

  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: verifyBody,
      cache: "no-store",
    },
  );

  if (!verifyResponse.ok) {
    return redirectToContact(request);
  }

  const verification =
    (await verifyResponse.json()) as TurnstileVerificationResponse;

  if (!verification.success) {
    return redirectToContact(request);
  }

  const response = NextResponse.redirect(new URL("/contact", request.url));
  response.cookies.set("contact_unlocked", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/contact",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
