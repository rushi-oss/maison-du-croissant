export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC] pt-36 pb-24 px-4 max-w-lg mx-auto">

      {/* Page header */}
      <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
        Get to know us
      </p>
      <h1 className="font-serif text-4xl text-[#540244] mb-2">About Us</h1>
      <div className="w-10 h-0.5 bg-[#C4973B] mb-10" />

      {/* Content sections */}
      <div className="flex flex-col gap-8">

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-2">
            Who We Are
          </p>
          <p className="text-[#540244] leading-relaxed">
            We&apos;re a small family running Maison du Croissant in Sodnac. No investors, no big team — just us two, and now Paro, who&apos;s recently joined us to help keep things running.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-2">
            Why We Started
          </p>
          <p className="text-[#540244] leading-relaxed">
            We wanted something of our own. Not a franchise, not someone else&apos;s idea — ours. We also noticed there wasn&apos;t much variety in pastries around here, so we figured, why not bring something different to the table.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-2">
            How We Built It
          </p>
          <p className="text-[#540244] leading-relaxed mb-2">
            We built this place ourselves. Painted the walls, wired the lights, all of it. No contractors. While one of us was dealing with paint and wiring, the other was in the kitchen messing up croissant batches until they got it right.
          </p>
          <a
            href="https://vt.tiktok.com/ZSCm6rdMa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C4973B] text-[#540244] font-semibold text-lg px-4 py-2 rounded-full hover:bg-[#540244] hover:text-[#FDF6EC] transition-colors"
          >
            Watch us build it →
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-2">
            What We Stand For
          </p>
          <p className="text-[#540244] leading-relaxed">
            Good food, made properly, in a space we put together with our own hands. We&apos;d rather show you how it actually happened than just tell you it was hard work.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-2">
            Come See For Yourself
          </p>
          <p className="text-[#540244] leading-relaxed">
            Come by, try the croissants, see the place. That&apos;s really it.
          </p>
        </div>

      </div>

    </main>
  );
}
