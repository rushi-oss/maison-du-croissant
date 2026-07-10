import Image from "next/image";
import OvenStatusCard from "../components/OvenStatusCard";

const reviewNotes = [
  { src: "/note1.jpeg", rotate: "-2deg" },
  { src: "/note2.jpeg", rotate: "1.5deg" },
  { src: "/note3.jpeg", rotate: "-1deg" },
  { src: "/note4.jpeg", rotate: "2deg" },
  { src: "/note5.jpeg", rotate: "-1.5deg" },
  { src: "/note6.jpeg", rotate: "1deg" },
  { src: "/note7.jpeg", rotate: "-2deg" },
  { src: "/note8.jpeg", rotate: "1.5deg" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

        <Image
          src="/hero2.jpeg"
          alt="Maison du Croissant"
          fill
          className="object-cover object-[40%_50%]"
          priority
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm">
          <h1 className="font-serif text-4xl text-[#FDF6EC] leading-snug">
            Fresh from our oven<br />to your hands
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-36 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce">
          <p className="text-[#FDF6EC]/80 text-xs font-medium tracking-widest uppercase">
            Scroll to explore
          </p>
          <svg
            className="w-5 h-5 text-[#FDF6EC]/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

      </section>

      {/* LIVE OVEN STATUS */}
      <section className="px-4 py-6">
        <OvenStatusCard />
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section className="py-10 px-4">
        <p className="text-[#C4973B] text-lg font-semibold tracking-widest uppercase mb-4">
          What our customers say
        </p>
        <div className="w-10 h-0.5 bg-[#C4973B] mb-6" />
        <p className="text-[#540244] text-base text-center mb-6">
          Little notes stuck by our customers on the review board.
        </p>

        {/* Scrollable sticky notes with right-edge fade hint */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {reviewNotes.map((note, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-center w-56 h-56 rounded-lg overflow-hidden shadow-md"
                style={{ transform: `rotate(${note.rotate})` }}
              >
                <Image
                  src={note.src}
                  alt={`Customer review ${i + 1}`}
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Gradient fade showing there's more to scroll */}
          <div className="absolute right-0 top-0 bottom-3 w-16 bg-gradient-to-l from-[#FDF6EC] to-transparent pointer-events-none" />
        </div>

        <p className="text-[#540244] text-lg italic text-center mt-6 mb-4">
          Wait, there&apos;s a whole board of it... 🤍
        </p>

        <div className="w-full rounded-xl overflow-hidden max-h-96">
          <Image
            src="/board.jpg"
            alt="Our customer review board"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </section>

    </main>
  );
}
