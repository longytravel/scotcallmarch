'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SplineScene = dynamic(
  () =>
    import('@/components/ui/splite').then((m) => ({
      default: m.SplineScene,
    })),
  { ssr: false }
);

const ROBOT_SCENE_URL =
  'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';
const TOTAL = 9;

type ListItem = {
  title: string;
  desc: string;
  index: string;
};

type RoadmapItem = {
  title: string;
  sub: string;
  tags: string[];
  left: string;
  width: string;
  label: string;
  color: string;
};

function Slide({
  active,
  className = '',
  children,
}: {
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`fixed inset-0 z-10 flex items-center justify-center px-8 py-20 md:px-16 lg:px-20 transition-all duration-700 ease-out ${
        active
          ? 'opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </section>
  );
}

function Reveal({
  active,
  delay = 0,
  className = '',
  children,
}: {
  active: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: active ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function ListLine({
  active,
  delay,
  title,
  desc,
  index,
}: ListItem & { active: boolean; delay: number }) {
  return (
    <Reveal active={active} delay={delay}>
      <div className="grid grid-cols-[32px_1fr] items-start gap-5 border-b border-white/[0.06] py-4">
        <span className="pt-0.5 font-sans text-[11px] tracking-[0.2em] text-white/25">
          {index}
        </span>
        <div>
          <h4 className="font-sans text-sm font-medium tracking-wide text-white/85">
            {title}
          </h4>
          <p className="mt-1 font-sans text-[13px] tracking-wide text-white/40">
            {desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function RoadmapLine({
  active,
  delay,
  row,
}: {
  active: boolean;
  delay: number;
  row: RoadmapItem;
}) {
  return (
    <Reveal active={active} delay={delay}>
      <div className="grid grid-cols-1 gap-3 border-b border-white/[0.06] py-3 md:grid-cols-[200px_1fr]">
        <div className="space-y-0.5">
          <h4 className="font-sans text-[13px] font-medium tracking-wide text-white/85">
            {row.title}
          </h4>
          <p className="font-sans text-[12px] tracking-wide text-white/40">
            {row.sub}
          </p>
          <p className="font-sans text-[10px] tracking-wider text-white/20">
            {row.tags.join(' / ')}
          </p>
        </div>

        <div className="relative h-7 overflow-hidden rounded bg-white/[0.03]">
          <div className="absolute inset-y-0 left-1/4 w-px bg-white/[0.06]" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.06]" />
          <div className="absolute inset-y-0 left-3/4 w-px bg-white/[0.06]" />
          <div
            className="absolute inset-y-0 rounded px-3 pt-2 font-sans text-[10px] font-medium tracking-[0.14em] text-white/90 transition-all duration-1000 ease-out"
            style={{
              left: row.left,
              width: active ? row.width : '0%',
              backgroundColor: row.color,
              opacity: active ? 0.8 : 0,
              transitionDelay: active ? `${delay + 260}ms` : '0ms',
            }}
          >
            <span className="whitespace-nowrap">{row.label}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const whyItems: ListItem[] = [
  { index: '01', title: 'Better Requirements', desc: 'Right first time. Less rework.' },
  { index: '02', title: 'Structured Testing', desc: 'Every release tested before it ships.' },
  { index: '03', title: 'Change Forum', desc: 'Prioritised enhancements. Right work gets done.' },
  { index: '04', title: 'More Prototypes', desc: 'Touch and feel before we build.' },
  { index: '05', title: 'Test Rig', desc: 'Test it yourselves. Real data, your terms.' },
];


const q2fItems: ListItem[] = [
  { index: '01', title: 'Timelines Done', desc: 'All three areas locked. No slippage.' },
  { index: '02', title: 'Demand Locked', desc: 'Submitted on time. No last-minute scramble.' },
  { index: '03', title: 'Directors Booked', desc: 'Meetings in the diary. Storyboarding underway.' },
  { index: '04', title: 'Benefits Foundations', desc: 'Home Customer Services and Consumer Growth in place. Starting to see traction.' },
];

const insightItems: ListItem[] = [
  { index: '01', title: 'Consolidated View', desc: 'All Scots areas in one view — direct to Consumer Channel leadership.' },
  { index: '02', title: 'Daily Run Rates', desc: 'Power BI driven. More flexible, more impactful — richer insight at a glance.' },
  { index: '03', title: 'Bereavement Contact Rates', desc: 'Automated end-to-end. Consistent and reliable.' },
  { index: '04', title: 'Benefits Tracking', desc: '95% now tracked through Blueprint.' },
  { index: '05', title: 'Steering Reimagined', desc: 'Chart-led. Less noise, better decisions.' },
];

const roadmapRows: RoadmapItem[] = [
  { title: 'PB Excel Models Retired', sub: 'Legacy spreadsheets replaced and decommissioned', tags: ['Tom'], left: '0%', width: '100%', label: 'Live', color: '#5A8A6F' },
  { title: 'Intra-Month Shapes', sub: 'ML model — testing and live', tags: ['Mark', 'Ian'], left: '50%', width: '45%', label: 'Testing / Live', color: '#8A7A6B' },
  { title: 'Fraud GUI', sub: 'Target: live end Q1', tags: ['Ian (Lead)', 'John (2nd)'], left: '0%', width: '42%', label: 'In Build', color: '#4A7FA5' },
  { title: 'Strategic & Costed Supply', sub: 'Workshop → requirements → build', tags: ['Chris (Lead)', 'Simon (2nd)'], left: '0%', width: '35%', label: 'Discovery → Build', color: '#7A8BA8' },
  { title: 'Complaints Allocation', sub: 'Legacy tech replaced', tags: ['Simon (Lead)'], left: '0%', width: '92%', label: 'Live — Warranty', color: '#5A8A6F' },
  { title: 'Short-Term Outlooks', sub: 'All 4 areas actively testing', tags: ['Mark', 'John', 'Ian'], left: '0%', width: '68%', label: 'In Testing', color: '#8A7A6B' },
  { title: 'Power BI Consolidation', sub: 'Revamp and simplify existing reports', tags: ['Tom'], left: '50%', width: '50%', label: 'Testing / Live', color: '#8A7A6B' },
];

/* ── Two font classes only ──
   font-sans = Space Grotesk (headings + labels + list text)
   font-display = Plus Jakarta Sans (body paragraphs)
*/
const heading =
  'font-sans text-5xl font-extralight uppercase leading-[0.92] tracking-[0.08em] md:text-7xl lg:text-[8.5rem]';
const subheading =
  'font-sans text-4xl font-extralight uppercase leading-[0.92] tracking-[0.08em] md:text-6xl lg:text-[6.5rem]';
const label =
  'font-sans text-[11px] uppercase tracking-[0.25em] text-white/30';
const body = 'font-display text-sm tracking-wide text-white/50 md:text-base';

export default function Presentation() {
  const [slide, setSlide] = useState(1);

  const next = useCallback(() => setSlide((v) => Math.min(v + 1, TOTAL)), []);
  const prev = useCallback(() => setSlide((v) => Math.max(v - 1, 1)), []);

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
        setSlide(1);
      } else if (e.code === 'End') {
        e.preventDefault();
        setSlide(TOTAL);
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a,button,input,textarea')) return;
      if (e.clientX < window.innerWidth * 0.3) {
        prev();
      } else {
        next();
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [next, prev]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#060608] text-white">
      {/* Dot grid */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.25)_1px,_transparent_1px)] [background-size:20px_20px] opacity-[0.07]" />

      {/* Progress bar */}
      <div
        className="fixed left-0 top-0 z-50 h-px bg-white/40 transition-all duration-500 ease-out"
        style={{ width: `${(slide / TOTAL) * 100}%` }}
      />


      {/* Slide counter - bottom right */}
      <div className="fixed bottom-7 right-8 z-50 font-sans text-sm tracking-[0.15em] text-white/20 md:right-12">
        <span className="text-base font-medium text-white/50">
          {String(slide).padStart(2, '0')}
        </span>
        <span className="mx-1.5 text-white/12">/</span>
        <span>{String(TOTAL).padStart(2, '0')}</span>
      </div>

      {/* Side label */}
      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 bg-white/[0.04] px-2.5 py-5 md:block">
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white/25 [writing-mode:vertical-rl]">
          March 2026
        </span>
      </div>

      {/* ─── SLIDE 1: Title ─── */}
      <Slide active={slide === 1} className="!p-0">
        <div className="grid h-full w-full grid-cols-1 gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="z-10 flex flex-col justify-center px-8 pb-24 pt-28 md:px-16">
            <Reveal active={slide === 1} delay={0}>
              <p className={label}>March 2026</p>
            </Reveal>

            <Reveal active={slide === 1} delay={120} className="mt-8">
              <h1 className={heading}>
                <span className="text-sky-400">Blueprint</span>
              </h1>
            </Reveal>

            <Reveal active={slide === 1} delay={220} className="mt-1">
              <h1 className={`${heading} text-white/50`}>
                & Strategic
              </h1>
            </Reveal>

            <Reveal active={slide === 1} delay={320} className="mt-1">
              <h1 className={`${heading} text-white/50`}>
                Planning
              </h1>
            </Reveal>

            <Reveal active={slide === 1} delay={440} className="mt-12">
              <div className="h-px w-20 bg-white/10" />
            </Reveal>

            <Reveal active={slide === 1} delay={500} className="mt-6 max-w-md">
              <p className="font-display text-lg font-light tracking-wide text-white/60 md:text-xl">
                Better planning. Better tools. Better insight.
              </p>
            </Reveal>
          </div>

          <div className="relative hidden h-full lg:block">
            {slide === 1 && (
              <SplineScene scene={ROBOT_SCENE_URL} className="h-full w-full" />
            )}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 2: Why 2026 is Different ─── */}
      <Slide active={slide === 2}>
        <div className="w-full max-w-6xl">
          <Reveal active={slide === 2} delay={0}>
            <p className={label}><span className="text-sky-400/50">Blueprint</span> Delivery Standard</p>
          </Reveal>
          <Reveal active={slide === 2} delay={100} className="mt-6">
            <h2 className={subheading}>
              Why 2026 is<br />Different
            </h2>
          </Reveal>
          <Reveal active={slide === 2} delay={200} className="mt-5">
            <p className={body}>Not future promises — every point below is live right now.</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal active={slide === 2} delay={260}>
              <div className="h-px w-full bg-white/[0.06]" />
              <p className={`${body} mt-5 max-w-sm`}>
                Changing how we work, not just what we build.
              </p>
              <div className="mt-5 h-px w-full bg-white/[0.06]" />
            </Reveal>
            <div>
              {whyItems.map((item, idx) => (
                <ListLine
                  key={item.index}
                  active={slide === 2}
                  delay={300 + idx * 80}
                  {...item}
                />
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 3: The Delivery Engine ─── */}
      <Slide active={slide === 3}>
        <div className="w-full max-w-6xl">
          <Reveal active={slide === 3} delay={0}>
            <p className={label}><span className="text-sky-400/50">Blueprint</span> Operating Model</p>
          </Reveal>
          <Reveal active={slide === 3} delay={100} className="mt-6">
            <h2 className={subheading}>
              The Delivery<br />Engine
            </h2>
          </Reveal>
          <Reveal active={slide === 3} delay={200} className="mt-5">
            <p className={body}>
              Built for speed, quality, and zero single-person risk.
            </p>
          </Reveal>

          <Reveal active={slide === 3} delay={260} className="mt-10">
            <div className="grid grid-cols-2 gap-8 border-y border-white/[0.06] py-7 md:grid-cols-4">
              {[
                ['2x', 'Paired Working', 'Lead + second on every initiative. No single point of failure.'],
                ['1', 'Kanban Board', 'Single source of truth. All work visible to everyone.'],
                ['30d', 'Warranty', 'Post-deployment support. Issues take priority.'],
                ['10pt', 'Definition of Done', 'Nothing ships without passing the checklist.'],
              ].map(([value, lbl, desc]) => (
                <div key={lbl} className="space-y-2">
                  <p className="font-sans text-4xl font-extralight tracking-wider text-white/75 md:text-5xl">
                    {value}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/25">
                    {lbl}
                  </p>
                  <p className="font-sans text-[12px] tracking-wide text-white/35 mt-1">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Slide>

      {/* ─── SLIDE 4: Q1 Roadmap ─── */}
      <Slide active={slide === 4} className="!py-10 !pt-14">
        <div className="w-full max-w-6xl">
          <Reveal active={slide === 4} delay={0}>
            <p className={label}><span className="text-sky-400/50">Blueprint</span> Positioning by Initiative</p>
          </Reveal>
          <Reveal active={slide === 4} delay={100} className="mt-4">
            <h2 className="font-sans text-3xl font-extralight uppercase leading-[0.92] tracking-[0.08em] md:text-5xl lg:text-6xl">
              Q1 2026 Roadmap
            </h2>
          </Reveal>
          <Reveal active={slide === 4} delay={200} className="mt-3">
            <p className={body}>Where every initiative stands right now.</p>
          </Reveal>

          <Reveal active={slide === 4} delay={260} className="mt-6">
            <div className="hidden grid-cols-[200px_repeat(4,1fr)] border-b border-white/[0.06] pb-2 md:grid">
              <span />
              {['Discovery', 'Build', 'Test', 'Live'].map((name) => (
                <span
                  key={name}
                  className="text-center font-sans text-[10px] uppercase tracking-[0.22em] text-white/25"
                >
                  {name}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-0.5">
            {roadmapRows.map((row, idx) => (
              <RoadmapLine
                key={row.title}
                active={slide === 4}
                delay={320 + idx * 60}
                row={row}
              />
            ))}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 5: Short-Term Outlooks ─── */}
      <Slide active={slide === 5}>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <Reveal active={slide === 5} delay={0}>
              <p className={label}><span className="text-sky-400/50">Blueprint</span> Flagship Delivery</p>
            </Reveal>
            <Reveal active={slide === 5} delay={110} className="mt-6">
              <h2 className={subheading}>
                Short-Term<br />Outlooks
              </h2>
            </Reveal>
            <Reveal active={slide === 5} delay={220} className="mt-6">
              <p className={body}>
                All four areas actively testing the new web-based interface.
                Better requirements, structured testing, and the test rig — all coming together here.
                Working with the platform team towards a 23 March deployment — from our side, we&apos;ll be ready.
              </p>
            </Reveal>
            <Reveal active={slide === 5} delay={300} className="mt-8">
              <div className="h-px w-full bg-white/[0.06]" />
              <p className="mt-4 font-display text-sm tracking-wide text-white/40">
                Thank you to <span className="text-white/70">Mark</span>,{' '}
                <span className="text-white/70">John</span>,{' '}
                <span className="text-white/70">Ian</span> and{' '}
                <span className="text-white/70">Terrie</span>.
              </p>
            </Reveal>
          </div>

          <Reveal active={slide === 5} delay={180}>
            <div className="overflow-hidden rounded border border-white/[0.06]">
              <Image
                src="/short-term-outlooks.jpg"
                alt="Short-Term Outlooks Tool"
                width={1200}
                height={760}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Slide>

      {/* ─── SLIDE 6: Strategic Planning (Divider) ─── */}
      <Slide active={slide === 6}>
        <div className="w-full max-w-5xl text-center">
          <Reveal active={slide === 6} delay={0}>
            <p className={label}>Part 2</p>
          </Reveal>
          <Reveal active={slide === 6} delay={140} className="mt-8">
            <h2 className={heading}>
              <span className="text-red-400">Strategic</span><br />Planning
            </h2>
          </Reveal>
          <Reveal active={slide === 6} delay={300} className="mx-auto mt-12 max-w-md">
            <div className="mx-auto h-px w-20 bg-red-400/25" />
            <p className="mt-6 font-display text-lg font-light tracking-wide text-white/45 md:text-xl">
              Forecast delivery. Insight. Decisions.
            </p>
          </Reveal>
        </div>
      </Slide>

      {/* ─── SLIDE 7: Q2F ─── */}
      <Slide active={slide === 7}>
        <div className="w-full max-w-6xl">
          <Reveal active={slide === 7} delay={0}>
            <p className={label}><span className="text-red-400/50">Strategic</span> Forecast Delivery</p>
          </Reveal>
          <Reveal active={slide === 7} delay={100} className="mt-6">
            <h2 className={subheading}>
              Q2F - Delivering<br />at Scale
            </h2>
          </Reveal>
          <Reveal active={slide === 7} delay={200} className="mt-5">
            <p className={body}>
              Multi-million pound process. Thousands of colleagues. On track.
            </p>
          </Reveal>
          <Reveal active={slide === 7} delay={280} className="mt-8">
            <div className="border-y border-white/[0.06] py-6">
              <p className="font-display text-sm tracking-wide text-white/55 md:text-base">
                Consumer Growth, Home Customer Services and Personal Banking all on track. Real collective effort across the team.
              </p>
            </div>
          </Reveal>

          <div className="mt-3">
            {q2fItems.map((item, idx) => (
              <ListLine
                key={item.index}
                active={slide === 7}
                delay={350 + idx * 80}
                {...item}
              />
            ))}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 8: Better Insight ─── */}
      <Slide active={slide === 8}>
        <div className="w-full max-w-6xl">
          <Reveal active={slide === 8} delay={0}>
            <p className={label}><span className="text-red-400/50">Strategic</span> Insight & Decisions</p>
          </Reveal>
          <Reveal active={slide === 8} delay={100} className="mt-6">
            <h2 className={subheading}>
              Better Insight<br />Better Decisions
            </h2>
          </Reveal>
          <Reveal active={slide === 8} delay={200} className="mt-5">
            <p className={body}>Automating effort. Consolidating views. Simplifying forums.</p>
          </Reveal>

          <div className="mt-3">
            {insightItems.map((item, idx) => (
              <ListLine
                key={item.index}
                active={slide === 8}
                delay={350 + idx * 80}
                {...item}
              />
            ))}
          </div>
        </div>
      </Slide>

      {/* ─── SLIDE 9: Close ─── */}
      <Slide active={slide === 9}>
        <div className="w-full max-w-4xl text-center">
          <Reveal active={slide === 9} delay={0}>
            <p className={label}>Closing</p>
          </Reveal>

          <Reveal active={slide === 9} delay={150} className="mt-8">
            <h2 className={subheading}>
              Good Progress
            </h2>
          </Reveal>

          <Reveal active={slide === 9} delay={300} className="mt-2">
            <h2 className={`${subheading} text-white/30`}>
              More To Do
            </h2>
          </Reveal>

          <Reveal active={slide === 9} delay={500} className="mx-auto mt-12 max-w-lg">
            <div className="mx-auto h-px w-20 bg-white/10" />
            <p className="mt-8 font-display text-base font-light leading-relaxed tracking-wide text-white/45 md:text-lg">
              We&apos;re getting there. Still a lot ahead, but the foundations are solid and the momentum is real. Thanks for your patience and support while we work through it.
            </p>
          </Reveal>
        </div>
      </Slide>
    </main>
  );
}
