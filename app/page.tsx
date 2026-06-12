import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDF6EC] flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-8 text-center max-w-lg">

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Maison du Croissant Logo"
          width={220}
          height={220}
          priority
        />

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-[#540244]">
          Maison du Croissant
        </h1>

        {/* Under Construction Banner */}
        <div className="w-full bg-[#540244] text-[#FDF6EC] py-3 px-6 rounded-full font-semibold text-sm tracking-widest uppercase">
          🚧 Website Under Construction 🚧
        </div>

        {/* Main Message */}
        <p className="text-xl font-bold text-[#540244] tracking-widest uppercase leading-relaxed">
          Our new website is on the way, featuring a streamlined pre-ordering 
          system, real-time baking updates to know if there's waiting time, 
          and everything you need to get your favourite croissant with minimal 
          waiting.
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#540244] rounded-full" />

        {/* Coming Soon */}
        <p className="text-xl font-bold text-[#540244] tracking-widest uppercase">
          Coming Soon
        </p>

      </div>
    </main>
  );
}