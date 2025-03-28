// supabase/functions/upgrade-to-premium/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });
  }

  const res = await fetch(Deno.env.get("SUPABASE_URL") + "/rest/v1/user_profiles?email=eq." + email, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
      Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
    },
    body: JSON.stringify({ role: "premium" }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Failed to update role" }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
