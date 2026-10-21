import type { ReactNode } from "react";

// Experience section (#experience), ported from the Experience block of
// docs/design/mockup-c-ink.html. Facts come from the resume; keep roles
// newest first. Only the standout numbers get the <Metric> underline.

type Job = {
  company: string;
  role: string;
  when: string;
  place: string;
  story: ReactNode[];
  stack: string[];
};

// Key number: brighter, semibold, thin vermilion underline.
function Metric({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold text-washi shadow-[inset_0_-2px_0_rgb(226_69_47/0.7)]">
      {children}
    </span>
  );
}

const jobs: Job[] = [
  {
    company: "Claritas",
    role: "Fullstack Software Engineer",
    when: "Dec 2025 – Mar 2026",
    place: "Remote",
    story: [
      <>
        Built responsive React + TypeScript apps for web and mobile with
        automated round-up donations that made giving simpler for Catholic
        parishes.
      </>,
      <>
        Designed the backend: Node.js APIs on Prisma ORM and Supabase
        PostgreSQL, with a Dockerized dev environment.
      </>,
    ],
    stack: ["React", "TypeScript", "Node.js", "Prisma", "Supabase", "Docker"],
  },
  {
    company: "Fidelity Investments",
    role: "Software Engineering Intern",
    when: "Jun – Aug 2025",
    place: "Boston, MA",
    story: [
      <>
        Led development of the &ldquo;Saved Orders&rdquo; feature serving{" "}
        <Metric>10M+ users</Metric>, built in Kotlin and Java with Clean
        Architecture and MVVM.
      </>,
      <>
        Integrated GraphQL and REST APIs, handled Android lifecycle management
        and wrote comprehensive unit tests, working in Agile sprints with code
        reviews and CI/CD.
      </>,
    ],
    stack: ["Kotlin", "Java", "Android", "GraphQL", "REST"],
  },
  {
    company: "Decodables",
    role: "Fullstack Software Engineer",
    when: "Oct 2024 – May 2025",
    place: "Remote",
    story: [
      <>
        Built a closed-loop agentic LLM pipeline (GPT-4) that writes
        dyslexia-tailored stories, scores their decodability and self-corrects
        until it clears a <Metric>92%</Metric> threshold.
      </>,
      <>
        Codified 80+ linguistic rules into an NLP engine over a 10,000+ word
        corpus, reaching 90–100% accuracy against dyslexia accessibility
        standards.
      </>,
      <>
        Shipped image generation and text-to-speech in a FastAPI + Firebase
        product to real users, and closed a <Metric>$20K</Metric> code sale.
      </>,
    ],
    stack: ["Python", "FastAPI", "Firebase", "GPT-4", "NLP"],
  },
  {
    company: "Exsilio Solutions",
    role: "Software Engineer & Tech Consultant Intern",
    when: "May – Aug 2023",
    place: "Remote",
    story: [
      <>
        Built and deployed cross-platform installers for Shure clients across
        Mac (arm64, x86_64, Universal) and Windows.
      </>,
    ],
    stack: ["macOS", "Windows", "installers"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="exp-title"
      className="border-t border-line py-20 sm:pt-28 sm:pb-32"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8">
        <div className="mb-9 grid grid-cols-[1fr_auto] items-end gap-6 sm:mb-14">
          <h2
            id="exp-title"
            className="font-pixel text-[clamp(44px,7vw,72px)] leading-[0.9] font-normal"
          >
            <span className="mb-2.5 block text-[22px] tracking-[0.1em] text-sakura">
              01 /
            </span>
            Experience
          </h2>
          <p
            aria-hidden="true"
            className="text-[15px] tracking-[0.5em] text-mist opacity-75 [writing-mode:vertical-rl] [font-family:'Hiragino_Mincho_ProN','Yu_Mincho',serif]"
          >
            経歴
          </p>
        </div>

        <ol>
          {jobs.map((job) => (
            <li
              key={job.company}
              className="group grid grid-cols-1 gap-3 border-t border-line py-7 last:border-b md:grid-cols-[200px_1fr] md:gap-10 md:py-9"
            >
              <p className="font-pixel text-[21px] leading-[1.2] text-mist">
                {job.when}
                <span className="opacity-90 before:content-['·_'] ml-2.5 md:ml-0 md:mt-1 md:block md:before:content-none">
                  {job.place}
                </span>
              </p>
              <div className="min-w-0">
                <h3 className="font-pixel text-[34px] leading-none font-normal transition-colors group-hover:text-sakura-lt">
                  {job.company}
                  <span className="mt-2.5 block font-sans text-[15px] font-medium tracking-[0.01em] text-sakura">
                    {job.role}
                  </span>
                </h3>
                {job.story.map((line, i) => (
                  <p
                    key={i}
                    className="mt-3.5 max-w-[40rem] text-washi/90"
                  >
                    {line}
                  </p>
                ))}
                <ul aria-label="Stack" className="mt-[18px] flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-line bg-ink-raised px-2.5 pt-1.5 pb-[5px] font-pixel text-lg leading-none text-mist"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
