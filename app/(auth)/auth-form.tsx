"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const supabase = createClient();
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        if (data.session) {
          router.push("/app");
          router.refresh();
        } else {
          setMessage("Check your email for a confirmation link to finish creating your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const next = searchParams.get("next");
        router.push(next?.startsWith("/") ? next : "/app");
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-[460px]">
      <Link href="/" className="display-font text-2xl font-black tracking-[-.09em]">KINETIC<span className="text-[#ee7640]">.</span></Link>
      <p className="section-label mt-16 text-[#ee7640]">{isRegister ? "START YOUR JOURNEY" : "WELCOME BACK"}</p>
      <h1 className="display-font mt-4 text-4xl font-black leading-[1.05] tracking-[-.07em] md:text-5xl">{isRegister ? <>MAKE YOUR<br />MOVE.</> : <>GOOD TO<br />SEE YOU.</>}</h1>
      <p className="mt-5 text-sm leading-6 text-black/55">{isRegister ? "Create an account to keep your fitness experience connected." : "Sign in to continue to your KINETIC space."}</p>

      <form onSubmit={handleSubmit} className="mt-9 space-y-4">
        {isRegister && <label className="block text-xs font-bold">FULL NAME<input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ee7640]" placeholder="Your name" /></label>}
        <label className="block text-xs font-bold">EMAIL ADDRESS<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ee7640]" placeholder="you@example.com" /></label>
        <label className="block text-xs font-bold">PASSWORD<input required minLength={8} type="password" autoComplete={isRegister ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#ee7640]" placeholder="At least 8 characters" /></label>
        {message && <p role="status" className="rounded-xl bg-[#ee7640]/10 p-4 text-sm leading-6 text-[#8b3d1e]">{message}</p>}
        <button disabled={busy} className="orange-button pill flex w-full items-center justify-center gap-3 px-6 py-4 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? <LoaderCircle className="animate-spin" size={17}/> : null}
          {busy ? "PLEASE WAIT" : isRegister ? "CREATE ACCOUNT" : "SIGN IN"}
          {!busy && <ArrowUpRight size={17}/>}
        </button>
      </form>
      <p className="mt-7 text-sm text-black/55">{isRegister ? "Already have an account?" : "New to KINETIC?"} <Link className="font-bold text-black underline decoration-[#ee7640] underline-offset-4" href={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
      <p className="mt-10 text-xs leading-5 text-black/40">By continuing, you agree to the gym’s applicable terms and privacy notice. These will be published here once approved by the gym owner.</p>
    </div>
  );
}
