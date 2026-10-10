import Image from 'next/image'

// Opening curtain: the logo spins and pops in on plum, then the curtain lifts.
// Pure CSS, so it never waits on JavaScript. It plays once per visit: the script
// in the root layout adds `intro-seen` to <html> on later pages, which hides it.
export default function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-inner">
        <Image className="intro-logo" src="/logo.png" alt="" width={140} height={140} priority />
        <span className="intro-line caps">
          <span>fresh from sodnac</span>
        </span>
      </div>
    </div>
  )
}
