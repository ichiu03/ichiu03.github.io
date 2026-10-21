// Site footer: small hanko seal, copyright, and a quiet build note.

// Pixel-chipped corners, like a worn hanko stamp (mockup C's .seal).
const sealClip =
  "polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-3 px-4 pt-10 pb-14 font-pixel text-[18px] leading-none text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="m-0 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-[30px] w-[30px] flex-none place-items-center bg-vermilion text-center text-[17px] leading-[0.8] text-ink"
            style={{ clipPath: sealClip }}
          >
            <span>
              I
              <br />C
            </span>
          </span>
          &copy; 2026 Ivan Chiu
        </p>
        <p className="m-0">Built with Next.js · deployed on GitHub Pages</p>
      </div>
    </footer>
  );
}
