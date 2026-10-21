// Contact section (#contact): email button plus GitHub and LinkedIn links.
// No form and no backend (docs/vision.md). Never add a phone number or address.

const EMAIL = "ivanchiu03@gmail.com";

// Pixel-chipped corners, like a worn hanko stamp (mockup C's .seal).
const sealClip =
  "polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)";

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-5 w-5 shrink-0"
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <path d="M1 3h14v10H1V3zm2 2v.5l5 3.5 5-3.5V5H3zm0 2.9V11h10V7.9L8 11.4 3 7.9z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 shrink-0" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 shrink-0" fill="currentColor">
      <path d="M0 1.15C0 .52.53 0 1.18 0h13.64C15.47 0 16 .52 16 1.15v13.7c0 .63-.53 1.15-1.18 1.15H1.18C.53 16 0 15.48 0 14.85V1.15zM4.9 13.4V6.17H2.5v7.23h2.4zM3.7 5.18c.84 0 1.36-.56 1.36-1.25-.02-.71-.52-1.25-1.34-1.25-.82 0-1.36.54-1.36 1.25 0 .69.52 1.25 1.33 1.25h.01zm4.91 8.22V9.36c0-.22.02-.43.08-.58.17-.43.57-.88 1.23-.88.87 0 1.22.66 1.22 1.63v3.87h2.4V9.26c0-2.22-1.18-3.25-2.77-3.25-1.28 0-1.86.7-2.17 1.2v.02h-.02l.02-.02V6.17h-2.4c.03.68 0 7.23 0 7.23h2.4z" />
    </svg>
  );
}

const links = [
  { label: "GitHub", href: "https://github.com/ichiu03", Icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ivan-chiu-32b87527b",
    Icon: LinkedInIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-line pt-20 pb-24 sm:pt-28 sm:pb-32"
    >
      <div className="mx-auto max-w-[1080px] px-4 sm:px-8">
        <div className="mb-9 grid grid-cols-[1fr_auto] items-end gap-6 sm:mb-14">
          <h2
            id="contact-title"
            className="m-0 font-pixel text-[clamp(44px,7vw,72px)] leading-[0.9] font-normal"
          >
            <span className="mb-2.5 block text-[22px] tracking-[0.1em] text-sakura">
              04 /
            </span>
            Contact
          </h2>
          <p
            aria-hidden="true"
            className="m-0 [font-family:'Hiragino_Mincho_ProN','Yu_Mincho',serif] text-[15px] tracking-[0.5em] text-mist opacity-75 [writing-mode:vertical-rl]"
          >
            連絡
          </p>
        </div>

        <div className="relative border border-line bg-ink-raised p-6 sm:p-10">
          {/* Hanko seal as a sign-off stamp in the card's corner */}
          <span
            aria-hidden="true"
            className="absolute top-5 right-5 hidden h-14 w-14 rotate-[-6deg] place-items-center bg-vermilion text-center font-pixel text-[30px] leading-[0.8] text-ink sm:grid"
            style={{ clipPath: sealClip }}
          >
            <span>
              I
              <br />C
            </span>
          </span>

          <p className="m-0 max-w-[34rem] font-pixel text-[clamp(30px,5vw,44px)] leading-[1] text-washi">
            Let&apos;s build something<span className="text-vermilion">.</span>
          </p>
          <p className="mt-5 mb-0 max-w-[34rem] text-[17px] text-mist">
            I&apos;m open to <strong className="font-medium text-washi">software engineering roles</strong>{" "}
            across full-stack and AI. If you&apos;re hiring or want to talk about a team or a
            project, I&apos;d love to hear from you.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2.5 border-2 border-washi bg-washi px-[22px] pt-[13px] pb-3 font-pixel text-[24px] leading-none text-ink transition-colors hover:border-sakura hover:bg-sakura focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sakura"
            >
              <MailIcon />
              Email me
              <span aria-hidden="true" className="text-[20px]">
                &rarr;
              </span>
            </a>
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border-2 border-line px-[22px] pt-[13px] pb-3 font-pixel text-[24px] leading-none text-washi transition-colors hover:border-sakura hover:text-sakura focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sakura"
              >
                <Icon />
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <p className="mt-6 mb-0 font-pixel text-[20px] leading-none break-all text-mist">
            <span className="text-sakura">&#9656;</span> {EMAIL}
          </p>
        </div>
      </div>
    </section>
  );
}
