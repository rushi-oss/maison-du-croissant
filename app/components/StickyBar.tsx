import Link from "next/link";

export default function StickyBar() {
  return (
    <div className="sticky bottom-0 z-40 bg-[#FDF6EC] border-t border-[#e0d5c5] px-4 py-3 md:hidden">
      <div className="flex gap-2">
        <Link
          href="/menu"
          className="flex-1 bg-[#FDF6EC] border-2 border-[#540244] text-[#540244] text-center py-3 rounded-full font-semibold text-sm tracking-wide"
        >
          Our Menu
        </Link>
        <Link
          href="/preorder"
          className="flex-1 bg-[#540244] text-[#FDF6EC] text-center py-3 rounded-full font-semibold text-sm tracking-wide"
        >
          Pre-order now
        </Link>
      </div>
    </div>
  );
}
