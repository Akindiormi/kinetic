import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserRoles, hasAnyRole } from "@/lib/auth/roles";
import { ArrowLeft, Settings2, ShieldCheck, ChartNoAxesCombined } from "lucide-react";

export default async function ManagementHomePage() {
  const { user, roles } = await getCurrentUserRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, ["management", "owner"])) redirect("/app/staff");

  return <main className="min-h-screen bg-[#faf9f7]"><header className="border-b border-black/10"><div className="container-wide flex h-20 items-center justify-between"><Link href="/" className="display-font text-2xl font-black tracking-[-.09em]">KINETIC<span className="text-[#ee7640]">.</span></Link><span className="section-label text-black/45">MANAGEMENT</span></div></header><div className="container-wide py-14"><Link href="/app" className="inline-flex items-center gap-2 text-xs font-bold text-black/50"><ArrowLeft size={14}/> MEMBER HOME</Link><p className="section-label mt-10 text-[#ee7640]">GYM OVERVIEW</p><h1 className="display-font mt-4 text-5xl font-black tracking-[-.08em]">RUN THE<br/>BIG PICTURE.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-black/55">Management tools will be enabled as the gym confirms its operating rules, reporting needs, and staff permissions. No sample figures are presented as real business data.</p><div className="mt-10 grid gap-4 md:grid-cols-3"><article className="rounded-[24px] bg-white p-7"><ChartNoAxesCombined className="text-[#ee7640]"/><h2 className="mt-6 font-bold">Business overview</h2><p className="mt-2 text-sm leading-6 text-black/50">Membership, attendance, bookings, and payment reporting.</p></article><article className="rounded-[24px] bg-white p-7"><ShieldCheck className="text-[#ee7640]"/><h2 className="mt-6 font-bold">Staff access</h2><p className="mt-2 text-sm leading-6 text-black/50">Role assignments and least-privilege access controls.</p></article><article className="rounded-[24px] bg-white p-7"><Settings2 className="text-[#ee7640]"/><h2 className="mt-6 font-bold">Gym settings</h2><p className="mt-2 text-sm leading-6 text-black/50">Owner-configurable policies, services, and communication settings.</p></article></div><p className="mt-8 text-xs text-black/35">Signed in as {user.email} · Access: {roles.join(", ")}</p></div></main>;
}
