import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserRoles, hasAnyRole } from "@/lib/auth/roles";
import { ArrowLeft, ClipboardList, CalendarDays, Users } from "lucide-react";

export default async function StaffWorkspacePage() {
  const { user, roles } = await getCurrentUserRoles();
  if (!user) redirect("/login");
  if (!hasAnyRole(roles, ["trainer", "reception", "staff", "management", "owner"])) redirect("/app");

  return <main className="min-h-screen bg-[#faf9f7]"><header className="border-b border-black/10"><div className="container-wide flex h-20 items-center justify-between"><Link href="/" className="display-font text-2xl font-black tracking-[-.09em]">KINETIC<span className="text-[#ee7640]">.</span></Link><span className="section-label text-black/45">STAFF WORKSPACE</span></div></header><div className="container-wide py-14"><Link href="/app" className="inline-flex items-center gap-2 text-xs font-bold text-black/50"><ArrowLeft size={14}/> MEMBER HOME</Link><p className="section-label mt-10 text-[#ee7640]">YOUR WORKSPACE</p><h1 className="display-font mt-4 text-5xl font-black tracking-[-.08em]">GOOD WORK<br/>STARTS HERE.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-black/55">The staff workspace is being assembled. Your access is based on your assigned gym role.</p><div className="mt-10 grid gap-4 md:grid-cols-3"><WorkspaceCard icon={<CalendarDays/>} title="Schedule" detail="Coach availability and session schedules will appear here."/><WorkspaceCard icon={<Users/>} title="Member support" detail="Member information will be limited to the access your role requires."/><WorkspaceCard icon={<ClipboardList/>} title="Staff tasks" detail="Operational tasks and handover will be added in the next workflow slice."/></div><p className="mt-8 text-xs text-black/35">Signed in as {user.email} · Access: {roles.join(", ")}</p></div></main>;
}

function WorkspaceCard({icon,title,detail}:{icon:React.ReactNode;title:string;detail:string}) {
  return <article className="rounded-[24px] bg-white p-7"><div className="text-[#ee7640]">{icon}</div><h2 className="mt-6 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-black/50">{detail}</p></article>;
}
