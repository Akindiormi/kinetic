import { Suspense } from "react";
import { AuthForm } from "../(auth)/auth-form";

export default function RegisterPage() {
  return <main className="min-h-screen bg-[#faf9f7]"><div className="grid min-h-screen lg:grid-cols-[1fr_.9fr]"><section className="flex items-center justify-center px-6 py-16 md:px-12"><Suspense fallback={<p className="text-sm text-black/50">Loading registration…</p>}><AuthForm mode="register" /></Suspense></section><aside className="relative hidden overflow-hidden bg-[#ee7640] p-12 text-white lg:flex lg:flex-col lg:justify-between"><span className="section-label text-white/70">KINETIC / START HERE</span><div><p className="section-label text-white/70">A GOOD PLACE TO BEGIN</p><h2 className="display-font mt-6 text-6xl font-black leading-[1.05] tracking-[-.08em]">SMALL<br/>STEPS.<br/>REAL<br/>MOMENTUM.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-white/80">Start with what matters to you. Your profile and preferences can grow and change as your routine does.</p></div><p className="text-xs text-white/60">MOVE WITH PURPOSE.</p></aside></div></main>;
}
