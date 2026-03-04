'use client';

import { useState, useCallback, useEffect, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  ClipboardList,
  Microscope,
  MessageSquare,
  Blocks,
  Monitor,
  Users,
  Kanban,
  ShieldCheck,
  ListChecks,
  CalendarCheck,
  Lock,
  UserCheck,
  TrendingUp,
  BarChart3,
  Cog,
  FileText,
  LineChart,
  Target,
  Sparkles,
  Zap,
  ArrowRight,
} from 'lucide-react';

import { Spotlight } from '@/components/ui/spotlight';

const SplineScene = dynamic(
  () =>
    import('@/components/ui/splite').then((m) => ({
      default: m.SplineScene,
    })),
  { ssr: false }
);

const ROBOT_SCENE_URL =
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const TOTAL = 8;

/* ─── Slide wrapper ─── */
function Slide({
  active,
  children,
  className = '',
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center px-8 md:px-16 lg:px-20 py-12
        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${active ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-6 pointer-events-none z-0'}
        ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Staggered reveal ─── */
function Anim({
  children,
  d = 0,
  active,
  className = '',
}: {
  children: ReactNode;
  d?: number;
  active: boolean;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        ${className}`}
      style={{ transitionDelay: active ? `${d}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

/* ─── Glass card ─── */
function Glass({
  children,
  className = '',
  accentColor,
}: {
  children: ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div
      className={`relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 overflow-hidden
        transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.15]
        hover:shadow-lg hover:shadow-blue-500/[0.04] hover:-translate-y-1 ${className}`}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 w-full h-[3px]"
          style={{ background: accentColor }}
        />
      )}
      {children}
    </div>
  );
}

/* ─── Pipeline bar ─── */
function PipelineBar({
  left,
  width,
  label,
  color,
  delay,
  active,
}: {
  left: string;
  width: string;
  label: string;
  color: string;
  delay: number;
  active: boolean;
}) {
  return (
    <div
      className="absolute top-1 bottom-1 rounded-lg flex items-center px-4 font-semibold text-xs text-white tracking-wide overflow-hidden bar-shimmer transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        left,
        width: active ? width : '0%',
        background: color,
        transitionDelay: active ? `${delay}ms` : '0ms',
        opacity: active ? 1 : 0,
      }}
    >
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN PRESENTATION
   ════════════════════════════════════════ */
export default function Presentation() {
  const [s, setS] = useState(1);

  const next = useCallback(() => setS((c) => Math.min(c + 1, TOTAL)), []);
  const prev = useCallback(() => setS((c) => Math.max(c - 1, 1)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Space', 'ArrowRight', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
        next();
      } else if (['ArrowLeft', 'ArrowUp'].includes(e.code)) {
        e.preventDefault();
        prev();
      } else if (e.code === 'Home') {
        e.preventDefault();
        setS(1);
      } else if (e.code === 'End') {
        e.preventDefault();
        setS(TOTAL);
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button')) return;
      e.clientX < window.innerWidth / 3 ? prev() : next();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [next, prev]);

  const colors = {
    blue: '#3b82f6',
    cyan: '#22d3ee',
    orange: '#f97316',
    green: '#22c55e',
    purple: '#8b5cf6',
    amber: '#f59e0b',
    rose: '#f43f5e',
    discovery: '#7A8BA8',
    build: '#4A7FA5',
    test: '#8A7A6B',
    live: '#5A8A6F',
  };

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#06060f] text-white relative select-none">
      {/* ── Dot grid background ── */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] opacity-[0.07] [background-size:20px_20px] pointer-events-none" />

      {/* ── Progress bar ── */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 transition-all duration-600 ease-out"
        style={{
          width: `${(s / TOTAL) * 100}%`,
          background: colors.blue,
        }}
      />

      {/* ── Slide counter ── */}
      <div className="fixed bottom-6 right-8 z-50 font-mono text-sm text-white/30 tracking-wider">
        <span className="text-blue-400 text-lg font-bold">
          {String(s).padStart(2, '0')}
        </span>
        <span className="mx-1 text-white/20">/</span>
        <span>{String(TOTAL).padStart(2, '0')}</span>
      </div>

      {/* ── Nav hint ── */}
      <div className="fixed bottom-6 left-8 z-50 text-[11px] text-white/20 flex items-center gap-2">
        <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono">
          SPACE
        </kbd>
        <span>or</span>
        <kbd className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono">
          &rarr;
        </kbd>
        <span>to advance</span>
      </div>

      {/* ════════════════════════════════════════
          SLIDE 1 — TITLE (3D Robot)
         ════════════════════════════════════════ */}
      <Slide active={s === 1} className="!p-0">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="flex h-full w-full">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-16 relative z-10 flex flex-col justify-center">
            <Anim active={s === 1} d={0}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/15 backdrop-blur-sm border border-blue-400/25 rounded-full text-blue-300 text-xs font-bold tracking-[0.2em] uppercase mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Q1 2026 Update
              </span>
            </Anim>

            <Anim active={s === 1} d={120}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Blueprint &
                <br />
                <span className="text-blue-400">
                  Strategic Planning
                </span>
              </h1>
            </Anim>

            <Anim active={s === 1} d={200}>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
            </Anim>

            <Anim active={s === 1} d={280}>
              <p className="font-display text-xl md:text-2xl font-semibold text-blue-200/90 tracking-tight mb-3">
                Driving Clarity. Powering Decisions.
              </p>
            </Anim>

            <Anim active={s === 1} d={350}>
              <p className="text-lg text-white/60 max-w-lg">
                Better planning. Better tools. Better insight.
              </p>
            </Anim>

            <Anim active={s === 1} d={430}>
              <p className="mt-8 font-display font-semibold text-sm text-white/30 tracking-[0.15em] uppercase">
                March 2026
              </p>
            </Anim>
          </div>

          {/* Right content — 3D Robot */}
          <div className="flex-1 relative hidden md:block">
            {s === 1 && (
              <SplineScene
                scene={ROBOT_SCENE_URL}
                className="w-full h-full"
              />
            )}
          </div>
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 2 — WHY 2026 IS DIFFERENT
         ════════════════════════════════════════ */}
      <Slide active={s === 2}>
        {/* Background orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />

        <Anim active={s === 2} d={0}>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-2">
            Why <span className="text-blue-400">2026</span> is different
          </h2>
        </Anim>
        <Anim active={s === 2} d={80}>
          <p className="text-lg text-white/50 text-center mb-8">
            Not future promises — already in action.
          </p>
        </Anim>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1000px] w-full">
          {/* Banner */}
          <Anim active={s === 2} d={120} className="md:col-span-2">
            <div className="flex items-center gap-5 px-6 py-4 rounded-2xl bg-blue-600/20 border border-blue-400/20 backdrop-blur-xl">
              <Zap className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Changing how we work, not just what we build
                </h3>
                <p className="text-sm text-white/60">
                  Every point below is live — happening now.
                </p>
              </div>
            </div>
          </Anim>

          {[
            { icon: ClipboardList, title: 'Better Requirements', desc: 'Right first time. Less rework.', color: colors.blue, num: '01' },
            { icon: Microscope, title: 'Structured Testing', desc: 'Every release tested before it reaches you.', color: colors.orange, num: '02' },
            { icon: MessageSquare, title: 'Change Forum', desc: 'Prioritise enhancements. Right work gets done.', color: colors.green, num: '03' },
            { icon: Blocks, title: 'More Prototypes', desc: 'Touch and feel before we build.', color: colors.purple, num: '04' },
            { icon: Monitor, title: 'Test Rig', desc: 'Test it yourselves. Real data, your terms.', color: colors.amber, num: '05' },
          ].map((item, i) => (
            <Anim key={item.num} active={s === 2} d={200 + i * 80}>
              <Glass accentColor={item.color} className="h-full">
                <span className="absolute top-2 right-4 font-display font-extrabold text-3xl text-white/[0.04]">
                  {item.num}
                </span>
                <item.icon
                  className="w-5 h-5 mb-3"
                  style={{ color: item.color }}
                />
                <h3 className="font-display font-bold text-[15px] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </Glass>
            </Anim>
          ))}
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 3 — THE DELIVERY ENGINE
         ════════════════════════════════════════ */}
      <Slide active={s === 3}>
        <Anim active={s === 3} d={0}>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-2">
            The Delivery{' '}
            <span className="text-blue-400">Engine</span>
          </h2>
        </Anim>
        <Anim active={s === 3} d={80}>
          <p className="text-lg text-white/50 text-center mb-10">
            Built for speed, quality, and zero single-person risk.
          </p>
        </Anim>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1100px] w-full">
          {[
            { hero: '2x', title: 'Paired Working', desc: 'Lead + Second on every initiative. No single point of failure.', color: colors.blue, icon: Users },
            { hero: '1', title: 'Kanban Board', desc: 'Single source of truth. All work visible to everyone.', color: colors.orange, icon: Kanban },
            { hero: '30d', title: 'Warranty Period', desc: 'Post-deployment support. Issues take priority.', color: colors.green, icon: ShieldCheck },
            { hero: '10', title: 'Definition of Done', desc: 'Point checklist. Nothing ships without it.', color: colors.purple, icon: ListChecks },
          ].map((item, i) => (
            <Anim key={item.hero} active={s === 3} d={160 + i * 100}>
              <Glass accentColor={item.color} className="text-center py-8 px-5">
                <div
                  className="font-display font-extrabold text-5xl md:text-6xl leading-none mb-2 tracking-tighter"
                  style={{ color: item.color }}
                >
                  {item.hero}
                </div>
                <item.icon className="w-5 h-5 mx-auto mb-2 text-white/30" />
                <h3 className="font-display font-bold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {item.desc}
                </p>
              </Glass>
            </Anim>
          ))}
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 4 — Q1 2026 ROADMAP
         ════════════════════════════════════════ */}
      <Slide active={s === 4}>
        <div className="w-full max-w-[1300px]">
          <Anim active={s === 4} d={0}>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-1">
              Q1 2026 <span className="text-blue-400">Roadmap</span>
            </h2>
          </Anim>
          <Anim active={s === 4} d={60}>
            <p className="text-base text-white/50 text-center mb-6">
              Where every initiative stands right now.
            </p>
          </Anim>

          {/* Phase headers */}
          <Anim active={s === 4} d={100}>
            <div className="grid grid-cols-[240px_repeat(4,1fr)] mb-2">
              <div />
              {[
                { label: 'Discovery', color: colors.discovery },
                { label: 'Build', color: colors.build },
                { label: 'Test', color: colors.test },
                { label: 'Live', color: colors.live },
              ].map((p) => (
                <div
                  key={p.label}
                  className="text-center text-[11px] font-bold uppercase tracking-[0.12em] py-2 rounded-t-lg"
                  style={{ color: p.color, background: `${p.color}15` }}
                >
                  {p.label}
                </div>
              ))}
            </div>
          </Anim>

          {/* Pipeline rows */}
          {[
            {
              title: 'Short-Term Outlooks',
              sub: 'All 4 areas actively testing',
              tags: ['Mark / John / Ian'],
              left: '0%',
              width: '68%',
              label: 'In Testing',
              color: colors.test,
            },
            {
              title: 'Fraud GUI',
              sub: 'Target: live end Q1',
              tags: ['Ian (Lead) / John (2nd)'],
              left: '0%',
              width: '42%',
              label: 'In Build',
              color: colors.build,
            },
            {
              title: 'Strategic Supply',
              sub: 'Workshop \u2192 requirements \u2192 build',
              tags: ['Chris (Lead) / Simon (2nd)'],
              left: '0%',
              width: '35%',
              label: 'Discovery \u2192 Build',
              color: colors.discovery,
            },
            {
              title: 'Complaints Allocation',
              sub: 'Legacy tech replaced',
              tags: ['Simon (Lead)'],
              left: '0%',
              width: '92%',
              label: 'Live \u2014 Warranty',
              color: colors.live,
            },
            {
              title: 'Intra-Month Shapes',
              sub: 'ML \u2014 testing & live',
              tags: ['Mark', 'ML'],
              left: '50%',
              width: '45%',
              label: 'Testing / Live',
              color: colors.test,
            },
          ].map((row, i) => (
            <Anim key={row.title} active={s === 4} d={180 + i * 100}>
              <div className="grid grid-cols-[240px_1fr] items-center mb-3">
                <div className="pr-5">
                  <h4 className="font-display text-[15px] font-bold leading-tight mb-0.5">
                    {row.title}
                  </h4>
                  <p className="text-xs text-white/40 leading-tight">
                    {row.sub}
                  </p>
                  <div className="flex gap-1.5 mt-1 flex-wrap">
                    {row.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative h-12 bg-white/[0.03] rounded-xl overflow-hidden border border-white/[0.06]">
                  {/* Grid lines */}
                  <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/[0.06]" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.06]" />
                  <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/[0.06]" />

                  <PipelineBar
                    left={row.left}
                    width={row.width}
                    label={row.label}
                    color={row.color}
                    delay={400 + i * 150}
                    active={s === 4}
                  />
                </div>
              </div>
            </Anim>
          ))}
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 5 — FLAGSHIP: SHORT-TERM OUTLOOKS
         ════════════════════════════════════════ */}
      <Slide active={s === 5}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1100px] w-full items-center">
          <div>
            <Anim active={s === 5} d={0}>
              <span className="inline-flex items-center gap-2 font-display font-bold text-xs tracking-[0.15em] uppercase text-orange-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                Flagship Delivery
              </span>
            </Anim>

            <Anim active={s === 5} d={100}>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5">
                Short-Term
                <br />
                <span className="text-blue-400">Outlooks</span>
              </h2>
            </Anim>

            <Anim active={s === 5} d={180}>
              <p className="text-base text-white/55 leading-relaxed mb-4">
                All four areas <strong className="text-white/80">actively testing</strong> the new web-based interface right now.
              </p>
            </Anim>

            <Anim active={s === 5} d={240}>
              <p className="text-base text-white/55 leading-relaxed mb-6">
                Where better requirements, structured testing, and the test rig all come together.
              </p>
            </Anim>

            <Anim active={s === 5} d={300}>
              <Glass className="!p-4">
                <p className="text-sm text-white/50">
                  <strong className="text-white/80">Thank you</strong> to{' '}
                  <strong className="text-white/80">Mark</strong>,{' '}
                  <strong className="text-white/80">John</strong>,{' '}
                  <strong className="text-white/80">Ian</strong> and{' '}
                  <strong className="text-white/80">Terrie</strong>.
                </p>
              </Glass>
            </Anim>
          </div>

          <Anim active={s === 5} d={200}>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-xl" />
              <Image
                src="/short-term-outlooks.jpg"
                alt="Short-Term Outlooks Tool"
                width={800}
                height={500}
                className="relative w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
              />
            </div>
          </Anim>
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 6 — STRATEGIC PLANNING DIVIDER
         ════════════════════════════════════════ */}
      <Slide active={s === 6} className="!p-0">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#06060f]/80 z-[1]" />

        <div className="relative z-10 text-center px-8">
          <Anim active={s === 6} d={0}>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-purple-500/15 backdrop-blur-sm border border-purple-400/25 rounded-full text-purple-300 text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Part 2
            </span>
          </Anim>

          <Anim active={s === 6} d={120}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Strategic
              <br />
              <span className="text-purple-400">
                Planning
              </span>
            </h1>
          </Anim>

          <Anim active={s === 6} d={200}>
            <div className="w-20 h-1 bg-purple-500 rounded-full mx-auto mb-6" />
          </Anim>

          <Anim active={s === 6} d={280}>
            <p className="font-display text-xl md:text-2xl font-semibold text-purple-200/80 tracking-tight">
              Delivering the Forecast. Raising the Bar.
            </p>
          </Anim>
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 7 — Q2F: DELIVERING AT SCALE
         ════════════════════════════════════════ */}
      <Slide active={s === 7}>
        <Anim active={s === 7} d={0}>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-2">
            Q2F — Delivering{' '}
            <span className="text-blue-400">at Scale</span>
          </h2>
        </Anim>
        <Anim active={s === 7} d={80}>
          <p className="text-lg text-white/50 text-center mb-6">
            Multi-million pound process. Thousands of colleagues. On track.
          </p>
        </Anim>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[960px] w-full">
          {/* Success banner */}
          <Anim active={s === 7} d={120} className="md:col-span-3">
            <div className="flex items-center gap-5 px-6 py-4 rounded-2xl bg-green-600/20 border border-green-400/20 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  CG, HCS & Personal Banking on track
                </h3>
                <p className="text-sm text-white/55">
                  Demand locked down on time. Real collective effort.
                </p>
              </div>
            </div>
          </Anim>

          {[
            { icon: CalendarCheck, title: 'Timelines Done', desc: 'All three areas. No slippage.', color: colors.blue },
            { icon: Lock, title: 'Demand Locked', desc: 'On time. No last-minute scramble.', color: colors.orange },
            { icon: UserCheck, title: 'Directors Booked', desc: 'All meetings in the diary. Storyboarding underway.', color: colors.green },
            { icon: TrendingUp, title: 'Benefits — Turning the Dial', desc: 'Home & CG building foundations. Starting to see traction.', color: colors.purple },
          ].map((item, i) => (
            <Anim key={item.title} active={s === 7} d={200 + i * 80}>
              <Glass accentColor={item.color} className="h-full">
                <item.icon
                  className="w-5 h-5 mb-3"
                  style={{ color: item.color }}
                />
                <h3 className="font-display font-bold text-[15px] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {item.desc}
                </p>
              </Glass>
            </Anim>
          ))}
        </div>
      </Slide>

      {/* ════════════════════════════════════════
          SLIDE 8 — BETTER INSIGHT & DECISIONS
         ════════════════════════════════════════ */}
      <Slide active={s === 8}>
        <Anim active={s === 8} d={0}>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-2">
            Better <span className="text-blue-400">Insight</span> & Decisions
          </h2>
        </Anim>
        <Anim active={s === 8} d={80}>
          <p className="text-lg text-white/50 text-center mb-6">
            Beyond the day job — raising the bar.
          </p>
        </Anim>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[960px] w-full">
          {/* Accent banner */}
          <Anim active={s === 8} d={120} className="md:col-span-3">
            <div className="flex items-center gap-5 px-6 py-4 rounded-2xl bg-blue-600/20 border border-blue-400/20 backdrop-blur-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Automating effort. Consolidating insight. Simplifying forums.
                </h3>
              </div>
            </div>
          </Anim>

          {[
            { icon: BarChart3, title: 'Consolidated View', desc: 'All Scots areas in one view — direct to Consumer Channel leadership.', color: colors.blue },
            { icon: Cog, title: 'Daily Run Rates', desc: 'Fully automated. Manual effort eliminated.', color: colors.orange },
            { icon: FileText, title: 'Bereavement Contact Rates', desc: 'Fully automated. Consistent and reliable.', color: colors.green },
            { icon: LineChart, title: 'Benefits Tracking', desc: '80% on Blueprint.', color: colors.purple },
            { icon: Target, title: 'Steering Reimagined', desc: 'Chart-led. Simplified. Less noise, better decisions.', color: colors.amber },
          ].map((item, i) => (
            <Anim key={item.title} active={s === 8} d={200 + i * 80}>
              <Glass accentColor={item.color} className="h-full">
                <item.icon
                  className="w-5 h-5 mb-3"
                  style={{ color: item.color }}
                />
                <h3 className="font-display font-bold text-[15px] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  {item.desc}
                </p>
              </Glass>
            </Anim>
          ))}
        </div>
      </Slide>
    </main>
  );
}
