import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ArrowUpRight, CalendarDays, CircleUserRound, LogOut } from "lucide-react";

export default async function MemberHomePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
  const { data: roleRows } = await supabase.from("role_assignments").select("role").eq("user_id", user.id);
  const roles = (roleRows ?? []).map((row) => row.role as string);
  if (roles.includes("owner") || roles.includes("management")) redirect("/app/management");
  if (roles.some((role) => ["trainer", "reception", "staff"].includes(role))) redirect("/app/staff");

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "there";

  async function signOut() {
    "use server";
    const client = await createClient();
    await client.auth.signOut();
    redirect("/login");
  }

  return <main className="min-h-screen bg-[#faf9f7]"><header className="border-b border-black/10"><div className="container-wide flex h-20 items-center justify-between"><Link href="/" className="display-font text-2xl font-black tracking-[-.09em]">KINETIC<span className="text-[#ee7640]">.</span></Link><form action={signOut}><button className="flex items-center gap-2 text-xs font-bold"><LogOut size={16}/> SIGN OUT</button></form></div></header><div className="container-wide py-12 md:py-20"><p className="section-label text-[#ee7640]">YOUR KINETIC SPACE</p><h1 className="display-font mt-4 text-4xl font-black tracking-[-.07em] md:text-6xl">GOOD TO HAVE<br/>YOU HERE, {String(displayName).split(" ")[0].toUpperCase()}.</h1><p className="mt-6 max-w-xl text-sm leading-7 text-black/55">Your account is ready. As the gym confirms its services and policies, your membership, classes, and training tools will appear here.</p><div className="mt-12 grid gap-4 md:grid-cols-3"><div className="rounded-[24px] bg-white p-7"><CircleUserRound className="text-[#ee7640]" size={24}/><h2 className="mt-6 font-bold">Your profile</h2><p className="mt-2 text-sm leading-6 text-black/50">Your personal details and fitness preferences will live here.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-black/40">COMING NEXT <ArrowUpRight size={14}/></span></div><div className="rounded-[24px] bg-white p-7"><CalendarDays className="text-[#ee7640]" size={24}/><h2 className="mt-6 font-bold">Classes and sessions</h2><p className="mt-2 text-sm leading-6 text-black/50">Explore the schedule and manage bookings when enabled by the gym.</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-black/40">COMING NEXT <ArrowUpRight size={14}/></span></div><div className="rounded-[24px] bg-[#161616] p-7 text-white"><div className="display-font text-3xl font-black text-[#ee7640]">01</div><h2 className="mt-6 font-bold">Your next step</h2><p className="mt-2 text-sm leading-6 text-white/55">We’ll add onboarding so you can set goals and preferences that suit you.</p></div></div><p className="mt-10 text-xs text-black/35">Signed in as {user.email}</p></div></main>;
}
