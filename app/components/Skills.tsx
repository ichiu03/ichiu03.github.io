// Skills section (#skills): education card, then skill groups as chip rows.
// Styling extends mockup C's section head, hairline rows and chips.

const courses = [
  "Computer Systems",
  "Data Science",
  "Machine Learning",
  "Computer Networks",
  "NLP",
  "Operating Systems",
];

const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "JavaScript",
      "Bash",
      "Kotlin",
      "C",
      "Rust",
      "Go",
      "Swift",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Full-stack",
    items: [
      "React",
      "Node.js",
      "SwiftUI",
      "Firebase",
      "Supabase",
      "REST APIs",
      "GraphQL",
      "Android Studio",
    ],
  },
  {
    label: "AI / Data",
    items: [
      "Claude Code",
      "PyTorch",
      "scikit-learn",
      "TensorFlow",
      "NumPy",
      "Pandas",
    ],
  },
  { label: "DevOps", items: ["AWS", "Docker", "Tailscale", "Git"] },
];

// Spoken languages carry a proficiency level, shown after the name.
const spoken: { name: string; level: string }[] = [
  { name: "English", level: "native" },
  { name: "Chinese", level: "native/conversational" },
  { name: "Spanish", level: "conversational" },
  { name: "Italian", level: "conversational" },
];

const chip =
  "border border-line bg-ink-raised px-2.5 pt-1.5 pb-[5px] font-pixel text-[18px] leading-none text-mist";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-t border-line pt-20 pb-24 sm:pt-28 sm:pb-32"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8">
        <div className="mb-9 grid grid-cols-[1fr_auto] items-end gap-6 sm:mb-14">
          <h2
            id="skills-title"
            className="m-0 font-pixel text-[clamp(44px,7vw,72px)] leading-[0.9] font-normal"
          >
            <span className="mb-2.5 block text-[22px] tracking-[0.1em] text-sakura">
              03 /
            </span>
            Skills
          </h2>
          <p
            aria-hidden="true"
            className="m-0 font-serif text-[15px] tracking-[0.5em] text-mist opacity-75 [writing-mode:vertical-rl]"
          >
            技能
          </p>
        </div>

        {/* Education */}
        <div className="border border-line bg-ink-raised p-5 sm:p-8">
          <p className="m-0 font-pixel text-[20px] leading-none tracking-[0.08em] text-sakura">
            Education
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h3 className="m-0 font-pixel text-[34px] leading-none font-normal">
              Boston College
              <span className="mt-2.5 block font-sans text-[15px] leading-snug font-medium tracking-[0.01em] text-washi/90">
                B.A./B.S. in Computer Science
              </span>
            </h3>
            <p className="m-0 font-pixel text-[21px] leading-tight text-mist sm:text-right">
              May 2026
              <span className="ml-2.5 text-washi sm:ml-0 sm:block">
                <span className="text-mist sm:hidden">· </span>GPA 3.65
              </span>
            </p>
          </div>
          <p className="mt-6 mb-0 text-[14px] text-mist">Relevant courses</p>
          <ul
            aria-label="Relevant courses"
            className="mt-2.5 flex list-none flex-wrap gap-2 p-0"
          >
            {courses.map((c) => (
              <li key={c} className="border border-line bg-ink px-2.5 pt-1.5 pb-[5px] font-pixel text-[18px] leading-none text-mist">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Skill groups */}
        <dl className="mt-12 mb-0 sm:mt-16">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="grid grid-cols-1 gap-3 border-t border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-10 sm:py-7"
            >
              <dt className="font-pixel text-[24px] leading-tight text-washi">
                {g.label}
              </dt>
              <dd className="m-0">
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {g.items.map((item) => (
                    <li key={item} className={chip}>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
          <div className="grid grid-cols-1 gap-3 border-y border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-10 sm:py-7">
            <dt className="font-pixel text-[24px] leading-tight text-washi">
              Spoken
            </dt>
            <dd className="m-0">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {spoken.map((s) => (
                  <li key={s.name} className={chip}>
                    <span className="text-washi">{s.name}</span>{" "}
                    <span className="text-sakura">· {s.level}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
