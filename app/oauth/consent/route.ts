import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `oklch(0.65 0.2 ${hue})`;
}

export async function GET(request: Request) {
  // eslint-disable-next-line no-restricted-syntax -- Server-side URL parsing with full URL string
  const requestUrl = new URL(request.url);
  const { searchParams, origin } = requestUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Check if member already exists
        const { data: existingMember } = await supabase
          .from("members")
          .select("id")
          .eq("user_id", user.id)
          .single();

        // If no member exists, create one
        if (!existingMember) {
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "Anonymous";

          const avatarUrl =
            user.user_metadata?.avatar_url || user.user_metadata?.picture;

          // Create the member
          const { data: newMember } = await supabase
            .from("members")
            .insert({
              user_id: user.id,
              name,
              avatar_url: avatarUrl,
              color: generateRandomColor(),
            })
            .select("id")
            .single();

          // Create initial benefit history entry at 0
          if (newMember) {
            await supabase.from("benefit_history").insert({
              member_id: newMember.id,
              amount: 0,
            });
          }
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
