import Link from "next/link";
import { ArrowDown, ArrowUpRight, Menu, MoveUpRight } from "lucide-react";

const classes = [
  { title: "PERSONAL TRAINING", detail: "Coaching built around your goals", tone: "bg-[#f0d8cc]" },
  { title: "GROUP TRAINING", detail: "Find your people. Find your pace.", tone: "bg-[#e4e4e1]" },
  { title: "STRENGTH", detail: "Build confidence, one session at a time", tone: "bg-[#dedbd5]" },
  { title: "MOBILITY", detail: "Move better, feel ready", tone: "bg-[#f2e4dc]" },
];

const steps = [
  ["01", "FIND YOUR FOCUS", "Tell us what matters to you."],
  ["02", "MAKE A PLAN", "Explore coaching and classes."],
  ["03", "SHOW UP YOUR WAY", "Train in the gym or wherever life takes you."],
  ["04", "KEEP MOVING", "Get support that fits your routine."],
];

export default function HomePage() {
  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#faf9f7]/90 backdrop-blur-xl">
        <div className="container-wide flex h-[78px] items-center justify-between">
          <button aria-label="Open menu" className="rounded-full border border-black/10 p-3"><Menu size={20} /></button>
          <Link href="/" className="display-font text-[23px] font-black tracking-[-.09em]">KINETIC<span className="text-[#ee7640]">.</span></Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#classes">Classes</a><a href="#coaching">Coaching</a><a href="#approach">Our approach</a>
          </nav>
          <Link href="#contact" className="pill bg-[#161616] px-6 py-3 text-sm font-bold text-white">LET’S TALK <ArrowUpRight className="ml-2 inline" size={15} /></Link>
        </div>
      </header>

      <section className="container-wide pt-6 md:pt-10">
        <div className="relative isolate min-h-[590px] overflow-hidden rounded-[30px] bg-[#e9e8e5] md:min-h-[690px]">
          <div className="absolute inset-0 -z-10 opacity-70" style={{backgroundImage:"linear-gradient(128deg, transparent 0 47%, rgba(255,255,255,.9) 47.2% 48.5%, transparent 48.7%), linear-gradient(58deg, transparent 0 58%, rgba(255,255,255,.7) 58.2% 59.2%, transparent 59.4%)"}} />
          <div className="grid min-h-[590px] grid-cols-1 items-center gap-8 p-7 md:min-h-[690px] md:grid-cols-[1fr_1.1fr_1fr] md:p-12">
            <div className="z-10 self-start pt-5 md:pt-14">
              <p className="section-label mb-4">A stronger kind of fitness experience</p>
              <h1 className="display-font text-[clamp(3rem,6vw,5.8rem)] font-black leading-[.92] tracking-[-.08em]">NO<br/>SHORTCUTS<span className="text-[#ee7640]">.</span></h1>
              <p className="mt-6 max-w-[270px] text-sm leading-6 text-black/65">A space to build strength, find your rhythm, and feel good about the progress you make.</p>
              <a href="#classes" className="orange-button pill mt-7 inline-flex items-center gap-4 px-6 py-3 text-sm font-bold">EXPLORE KINETIC <ArrowUpRight size={16}/></a>
            </div>
            <div className="relative flex h-[310px] items-center justify-center self-end md:h-[590px]">
              <div className="absolute h-[270px] w-[270px] rounded-full bg-[#ee7640]/15 blur-2xl md:h-[440px] md:w-[440px]"/>
              <div className="relative flex h-[270px] w-[220px] items-center justify-center rounded-[48%_48%_22px_22px] border border-black/10 bg-gradient-to-b from-white/70 to-[#c9c7c2]/60 p-5 text-center md:h-[470px] md:w-[330px]">
                <div><span className="display-font text-6xl font-black tracking-[-.1em] text-black/10 md:text-8xl">K</span><p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em] text-black/45">Your training story starts here</p></div>
              </div>
              <div className="absolute bottom-5 left-0 rounded-2xl bg-white p-4 shadow-lg"><p className="display-font text-2xl font-black">01</p><p className="text-[10px] font-semibold uppercase tracking-wider text-black/50">One step at a time</p></div>
            </div>
            <div className="z-10 flex flex-col justify-between gap-8 md:h-full md:py-14">
              <div><h2 className="display-font text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.92] tracking-[-.08em]">MOVE<br/>WITH<br/>PURPOSE<span className="text-[#ee7640]">.</span></h2></div>
              <div className="max-w-[260px] self-end md:self-start"><p className="text-sm leading-6 text-black/65">No one-size-fits-all plans. Just thoughtful coaching, useful tools, and a community that meets you where you are.</p><a href="#approach" className="mt-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider">DISCOVER OUR APPROACH <ArrowDown size={15}/></a></div>
            </div>
          </div>
          <div className="absolute bottom-5 right-6 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-widest md:flex"><span className="h-2 w-2 rounded-full bg-[#ee7640]"/> BUILT AROUND YOU</div>
        </div>
      </section>

      <section id="classes" className="container-wide py-24 md:py-32">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-label mb-4">Find your kind of movement</p><h2 className="display-font text-4xl font-black leading-[1] tracking-[-.07em] md:text-6xl">CLASSES<br/>FOR YOUR LIFE<span className="text-[#ee7640]">.</span></h2></div><p className="max-w-sm text-sm leading-6 text-black/60">Different goals. Different starting points. Explore ways to move that work for you.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{classes.map((item, i) => <article key={item.title} className={`group rounded-[26px] p-4 ${item.tone} ${i % 2 === 1 ? "lg:mt-12" : ""}`}><div className="flex aspect-[4/5] items-end rounded-[19px] bg-gradient-to-br from-white/50 to-black/10 p-5"><span className="display-font text-6xl font-black tracking-[-.1em] text-black/15">0{i+1}</span></div><div className="flex items-center justify-between gap-3 py-5"><div><h3 className="text-xs font-extrabold">{item.title}</h3><p className="mt-1 text-xs text-black/55">{item.detail}</p></div><span className="rounded-full bg-[#ee7640] p-3 text-white transition-transform group-hover:rotate-45"><MoveUpRight size={16}/></span></div></article>)}</div>
      </section>

      <section id="coaching" className="container-wide pb-24 md:pb-32">
        <div className="grid overflow-hidden rounded-[30px] bg-[#161616] text-white md:grid-cols-2">
          <div className="flex min-h-[340px] items-center justify-center bg-[#ee7640] p-10"><div className="display-font text-center text-8xl font-black tracking-[-.12em] text-white/90">K<span className="text-black/20">.</span></div></div>
          <div className="flex flex-col justify-center p-8 md:p-16"><p className="section-label text-[#ee7640]">Coaching that sees you</p><h2 className="display-font mt-5 text-4xl font-black leading-[1.05] tracking-[-.07em] md:text-5xl">YOUR GOALS.<br/>YOUR PACE.</h2><p className="mt-6 max-w-md text-sm leading-7 text-white/60">Work with a coach, explore a class, or find a routine that fits your day. The right support starts with listening.</p><a href="#contact" className="mt-8 inline-flex w-fit items-center gap-4 rounded-full bg-white px-6 py-3 text-xs font-extrabold text-black">MEET YOUR COACHING TEAM <ArrowUpRight size={16}/></a></div>
        </div>
      </section>

      <section id="approach" className="container-wide pb-24 md:pb-32">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="section-label mb-4">A simple way forward</p><h2 className="display-font text-4xl font-black tracking-[-.07em] md:text-6xl">PROGRESS<br/>WITH YOU<span className="text-[#ee7640]">.</span></h2></div><p className="max-w-xs text-sm leading-6 text-black/60">Ready to take a first step? Start with what feels possible today.</p></div>
        <div className="grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number,title,description])=><div key={number}><span className="display-font text-sm font-bold text-[#ee7640]">{number}</span><div className="my-6 flex h-20 w-20 items-center justify-center rounded-full border border-black/15 text-2xl"><MoveUpRight/></div><h3 className="display-font text-sm font-black">{title}</h3><p className="mt-3 max-w-[220px] text-sm leading-6 text-black/55">{description}</p></div>)}</div>
      </section>

      <section className="container-wide pb-24">
        <div className="rounded-[30px] bg-[#ee7640] p-8 text-white md:p-14"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="section-label text-white/70">Your next chapter</p><h2 className="display-font mt-4 text-4xl font-black leading-none tracking-[-.08em] md:text-6xl">MAKE ROOM<br/>TO MOVE.</h2></div><div className="max-w-sm"><p className="text-sm leading-6 text-white/85">Explore membership options and find the right way to get started. Final plans and pricing will be confirmed by the gym.</p><a href="#contact" className="mt-6 inline-flex items-center gap-4 rounded-full bg-white px-6 py-3 text-xs font-extrabold text-black">ASK ABOUT MEMBERSHIP <ArrowUpRight size={16}/></a></div></div></div>
      </section>

      <footer id="contact" className="bg-[#161616] py-12 text-white">
        <div className="container-wide"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 md:flex-row"><div><Link href="/" className="display-font text-3xl font-black tracking-[-.09em]">KINETIC<span className="text-[#ee7640]">.</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-white/50">A supportive fitness experience. Built around real people and real routines.</p></div><div className="grid grid-cols-2 gap-10 text-sm"><div><p className="section-label mb-4 text-white/40">Explore</p><a className="mb-3 block" href="#classes">Classes</a><a className="mb-3 block" href="#coaching">Coaching</a><a className="block" href="#approach">Our approach</a></div><div><p className="section-label mb-4 text-white/40">Get in touch</p><a className="mb-3 block" href="mailto:hello@kinetic.example">Email the team</a><a className="block" href="#contact">Visit the gym</a></div></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-wider text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} KINETIC. All rights reserved.</span><span>Move with purpose.</span></div></div>
      </footer>
    </main>
  );
}
