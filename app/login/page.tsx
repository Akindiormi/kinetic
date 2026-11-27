import { Suspense } from "react";
import { AuthForm } from "../(auth)/auth-form";

export default function LoginPage() {
  return <AuthLayout><Suspense fallback={<p className="text-sm text-black/50">Loading sign in…</p>}><AuthForm mode="login" /></Suspense></AuthLayout>;
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#faf9f7]"><div className="grid min-h-screen lg:grid-cols-[1fr_.9fr]"><section className="flex items-center justify-center px-6 py-16 md:px-12">{children}</section><aside className="relative hidden overflow-hidden bg-[#161616] p-12 text-white lg:flex lg:flex-col lg:justify-between"><span className="section-label text-white/40">KINETIC / YOUR SPACE</span><div><p className="section-label text-[#ee7640]">FITNESS THAT FITS REAL LIFE</p><h2 className="display-font mt-6 text-6xl font-black leading-[1.05] tracking-[-.08em]">YOUR<br/>PACE.<br/><span className="text-[#ee7640]">YOUR</span><br/>PROGRESS.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-white/55">A connected place for your plans, your sessions, and the support that helps you keep moving.</p></div><p className="text-xs text-white/30">MOVE WITH PURPOSE.</p></aside></div></main>;
}
