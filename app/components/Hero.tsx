import Branch from "./hero/Branch";
import { Torii } from "./hero/NightAccents";
import Petals from "./hero/Petals";

// Hero (#about), ported from mockup C: pixel sakura branch top-right with
// falling petals, plus mockup A's small moon (inside the branch) and torii
// (on the bottom hairline). The nav overlays the top of this section.
export default function Hero() {
  return (
    <section
      id="about"
      aria-labelledby="hero-title"
      className="relative flex min-h-[min(92vh,860px)] flex-col overflow-hidden"
    >
      <Branch />
      <Petals />

      <div className="relative z-[3] mx-auto flex w-full max-w-[1080px] flex-1 flex-col justify-center px-4 pt-[54vw] pb-24 sm:px-8 min-[760px]:pt-[clamp(120px,18vh,200px)]">
        <p className="mb-[18px] font-pixel text-[22px] tracking-[.08em] text-sakura">
          <span aria-hidden="true" className="mr-3 inline-block h-0.5 w-7 bg-vermilion align-middle" />
          Software engineer
        </p>
        <h1
          id="hero-title"
          className="max-w-[9.5ch] font-pixel text-[clamp(56px,11vw,132px)] leading-[.9] tracking-[.01em]"
        >
          Hey, I&apos;m Ivan Chiu<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-7 max-w-[34rem] text-[clamp(17px,2vw,19px)] text-mist">
          <strong className="font-medium text-washi">Boston College CS &apos;26</strong>. I
          build fullstack products and AI pipelines.
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 border-2 border-washi bg-washi px-[22px] pt-[13px] pb-3 font-pixel text-2xl leading-none text-ink transition-colors hover:border-sakura hover:bg-sakura focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sakura"
          >
            See my work{" "}
            <span aria-hidden="true" className="text-xl">
              &rarr;
            </span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 border-2 border-line px-[22px] pt-[13px] pb-3 font-pixel text-2xl leading-none text-washi transition-colors hover:border-sakura hover:text-sakura focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sakura"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative z-[3] mx-auto flex w-full max-w-[1080px] items-center gap-3 px-4 pb-8 font-pixel text-lg tracking-[.1em] text-mist sm:px-8"
      >
        SCROLL
        <span className="relative h-px flex-1 bg-line">
          <Torii className="right-[6%]" />
        </span>
      </div>
    </section>
  );
}
