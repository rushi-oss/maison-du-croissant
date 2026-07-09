export default function FloatingContactButtons() {
  return (
    <div className="fixed right-4 bottom-20 md:bottom-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/message/AYGDQL73A2RUC1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.13-1.35a9.96 9.96 0 0 0 4.91 1.29h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.15h-.01a8.19 8.19 0 0 1-4.17-1.14l-.3-.18-3.05.8.81-2.97-.19-.31a8.18 8.18 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.65.31-.23.25-.85.83-.85 2.03s.87 2.36.99 2.52c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
        </svg>
      </a>

      {/* Call */}
      <a
        href="tel:+23057807934"
        aria-label="Call us"
        className="w-12 h-12 rounded-full bg-[#540244] flex items-center justify-center shadow-lg"
      >
        <svg className="w-5 h-5 text-[#FDF6EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      </a>
    </div>
  );
}
