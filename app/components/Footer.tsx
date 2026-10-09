import { INSTAGRAM_URL, TIKTOK_URL } from "../lib/site";

export default function Footer() {
  return (
    <div className="wrap">
      <footer className="site-footer caps">
        <span>Estd 2025</span>
        <span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          {" · "}
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">TikTok</a>
        </span>
      </footer>
    </div>
  );
}
