// Projects section (#projects): a featured "how I build with AI agents" story,
// then project cards (problem -> what was built), a compact "more" line, and
// a GitHub link. Styling extends docs/design/mockup-c-ink.html (section head,
// hairline borders, ink-raised surfaces, pixel stack chips).

type Project = {
  name: string;
  problem: string;
  built: string;
  stack: string[];
  result?: string; // headline number, underlined like the mockup's .metric
};

const projects: Project[] = [
  {
    name: "Personal Cloud Storage",
    problem: "My own storage for files and photos, reachable securely from every device.",
    built:
      "A full-stack system: a custom Node.js REST API, a SwiftUI frontend, and a backend photo pipeline for compression, optimization and metadata extraction. Multi-device networking is secured with Tailscale.",
    stack: ["Node.js", "SwiftUI", "Tailscale"],
  },
  {
    name: "All Abroad",
    problem: "Travelers in European cities had no simple, anonymous way to talk to each other.",
    built:
      "An anonymous social platform for travelers, built in SwiftUI with Firebase authentication and cloud functions.",
    stack: ["SwiftUI", "Firebase"],
  },
  {
    name: "ASL Alphabet Classification",
    problem: "Classifying ASL alphabet signs from images, and seeing what the model looks at.",
    built:
      "A recognition pipeline in PyTorch and scikit-learn comparing logistic regression, random forest, a CNN, and an SVM on CNN embeddings, with Grad-CAM for interpretability.",
    stack: ["PyTorch", "scikit-learn"],
    result: "99% test accuracy",
  },
];

const agentRoles = ["Implementer", "Tester", "Reviewer"];

function Chips({ items, label = "Stack" }: { items: string[]; label?: string }) {
  return (
    <ul className="mt-5 flex list-none flex-wrap gap-2 p-0" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className="border border-line bg-ink-raised px-2.5 pt-1.5 pb-[5px] font-pixel text-lg leading-none text-mist"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="m-0 font-pixel text-lg leading-none tracking-[0.1em] text-mist uppercase">
      {children}
    </p>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-t border-line pt-20 pb-24 sm:pt-28 sm:pb-32"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8">
        <div className="mb-9 grid grid-cols-[1fr_auto] items-end gap-6 sm:mb-14">
          <h2
            id="projects-title"
            className="m-0 font-pixel text-[clamp(44px,7vw,72px)] leading-[0.9] font-normal"
          >
            <span className="mb-2.5 block text-[22px] tracking-[0.1em] text-sakura">02 /</span>
            Projects
          </h2>
          <p
            aria-hidden="true"
            className="m-0 font-['Hiragino_Mincho_ProN','Yu_Mincho',serif] text-[15px] tracking-[0.5em] text-mist opacity-75 [writing-mode:vertical-rl]"
          >
            制作
          </p>
        </div>

        {/* Featured: how I build with AI agents */}
        <article
          aria-labelledby="agents-title"
          className="border border-line border-l-2 border-l-vermilion bg-ink-raised p-5 sm:p-8"
        >
          <p className="m-0 font-pixel text-[22px] leading-none tracking-[0.08em] text-sakura">
            Featured
          </p>
          <h3
            id="agents-title"
            className="mt-3 mb-0 font-pixel text-[clamp(32px,5vw,44px)] leading-none font-normal"
          >
            How I build with AI agents
          </h3>
          <p className="mt-4 mb-0 max-w-[40rem] text-mist">
            Two ways I use language models as part of how software gets built, not just as a
            feature inside it.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
            <div className="border-t border-line pt-6">
              <Label>At Decodables</Label>
              <h4 className="mt-3 mb-0 font-pixel text-[26px] leading-none font-normal">
                A pipeline that checks its own work
              </h4>
              <p className="mt-3 mb-0 opacity-90">
                I built a closed-loop agentic GPT-4 pipeline that generates dyslexia-tailored
                stories, scores each one for decodability, and refines it until it clears a{" "}
                <span className="font-semibold shadow-[inset_0_-2px_0_rgba(226,69,47,0.7)]">
                  92% threshold
                </span>
                . The work was prompt engineering plus automated evaluation and self-correction.
              </p>
              <Chips items={["GPT-4", "Prompt engineering", "Auto-evaluation"]} label="Techniques" />
            </div>

            <div className="border-t border-line pt-6">
              <Label>Day to day</Label>
              <h4 className="mt-3 mb-0 font-pixel text-[26px] leading-none font-normal">
                Claude Code as an orchestrator
              </h4>
              <p className="mt-3 mb-0 opacity-90">
                I align on the vision with one main agent. It plans the work and delegates focused
                tasks to specialized agents with tight context, backed by a markdown wiki the
                agents maintain. This website was built that way.
              </p>

              {/* Small flow: me -> main agent -> specialists, with the shared wiki */}
              <ol
                aria-label="How work flows between agents"
                className="mt-5 flex list-none flex-col gap-2 p-0 font-pixel text-lg leading-none"
              >
                <li className="flex items-center gap-2 text-washi">
                  <span className="text-vermilion" aria-hidden="true">
                    &#9656;
                  </span>
                  Me + main agent: vision and plan
                </li>
                <li className="flex flex-wrap items-center gap-2 pl-5 text-mist">
                  <span aria-hidden="true">&rarr;</span>
                  {agentRoles.map((role) => (
                    <span
                      key={role}
                      className="border border-line bg-ink px-2.5 pt-1.5 pb-[5px] text-mist"
                    >
                      {role}
                    </span>
                  ))}
                </li>
                <li className="flex items-center gap-2 pl-5 text-mist">
                  <span aria-hidden="true">&harr;</span>
                  Shared markdown wiki
                </li>
              </ol>
            </div>
          </div>
        </article>

        {/* Project cards */}
        <ul className="mt-10 grid list-none gap-4 p-0 sm:mt-12 md:grid-cols-3 md:gap-5">
          {projects.map((project) => (
            <li
              key={project.name}
              className="group flex flex-col border border-line p-5 transition-colors hover:border-sakura-dk sm:p-6"
            >
              <h3 className="m-0 font-pixel text-[30px] leading-none font-normal transition-colors group-hover:text-sakura-lt">
                {project.name}
              </h3>
              <div className="mt-4">
                <Label>Problem</Label>
                <p className="mt-2 mb-0 text-[15px] text-mist">{project.problem}</p>
              </div>
              <div className="mt-4">
                <Label>Built</Label>
                <p className="mt-2 mb-0 text-[15px] opacity-90">
                  {project.built}
                  {project.result && (
                    <>
                      {" "}
                      Reached{" "}
                      <span className="font-semibold shadow-[inset_0_-2px_0_rgba(226,69,47,0.7)]">
                        {project.result}
                      </span>
                      .
                    </>
                  )}
                </p>
              </div>
              <div className="mt-auto">
                <Chips items={project.stack} />
              </div>
            </li>
          ))}
        </ul>

        {/* Compact "more" line */}
        <div className="mt-10 border-t border-line pt-6 sm:mt-12">
          <Label>More</Label>
          <ul className="mt-3 list-none space-y-2 p-0 text-[15px] text-mist">
            <li>
              <span className="font-pixel text-xl text-washi">DNS Server</span>{" "}
              <span aria-hidden="true">&middot;</span> Java; query resolution, caching and dynamic
              records.
            </li>
            <li>
              <span className="font-pixel text-xl text-washi">MLFQ scheduler in xv6</span>{" "}
              <span aria-hidden="true">&middot;</span> four priority levels, demotion, preemption
              and round-robin.
            </li>
          </ul>
        </div>

        <a
          href="https://github.com/ichiu03"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 border-2 border-line px-[22px] pt-[13px] pb-3 font-pixel text-2xl leading-none text-washi no-underline transition-colors hover:border-sakura hover:text-sakura focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sakura"
        >
          More on GitHub
          <span className="text-xl" aria-hidden="true">
            &rarr;
          </span>
        </a>
      </div>
    </section>
  );
}
