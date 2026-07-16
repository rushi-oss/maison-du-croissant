import Image from "next/image";
import OvenStatusCard from "../components/OvenStatusCard";
import HeroParallax from "../components/HeroParallax";
import { client } from "../../sanity/lib/client";
import { REVIEW_NOTES_QUERY } from "../../sanity/lib/queries";

type ReviewNote = {
  _id: string;
  imageUrl: string;
};

// Cycles through a few tilt angles so the notes still look hand-scattered.
const ROTATIONS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

export default async function Home() {
  const reviewNotes: ReviewNote[] = await client.fetch(REVIEW_NOTES_QUERY);

  return (
    <main className="min-h-screen bg-[#FDF6EC]">

      {/* HERO SECTION */}
      <HeroParallax />

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
                key={note._id}
                className="flex-shrink-0 snap-center w-56 h-56 rounded-lg overflow-hidden shadow-md"
                style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]})` }}
              >
                <Image
                  src={note.imageUrl}
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
