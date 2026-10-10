import Image from "next/image";
import Hero from "../components/Hero";
import MenuList from "../components/MenuList";
import NewItemsPill from "../components/NewItemsPill";
import Visit from "../components/Visit";
import Ticker from "../components/Ticker";
import CroissantButton from "../components/CroissantButton";
import { client } from "../../sanity/lib/client";
import { DRINK_ITEMS_QUERY, MENU_ITEMS_QUERY, REVIEW_NOTES_QUERY } from "../../sanity/lib/queries";
import type { DrinkItem, MenuItem, ReviewNote } from "../lib/types";
import { BUILD_VIDEO_URL, GOOGLE_REVIEW_URL } from "../lib/site";
import { pageMetadata, SITE_DESCRIPTION } from "../lib/metadata";

// Studio edits show up within a minute, without a redeploy.
export const revalidate = 60;

export const metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: "/",
});

export default async function Home() {
  const [items, drinks, notes]: [MenuItem[], DrinkItem[], ReviewNote[]] = await Promise.all([
    client.fetch(MENU_ITEMS_QUERY),
    client.fetch(DRINK_ITEMS_QUERY),
    client.fetch(REVIEW_NOTES_QUERY),
  ]);
  const noteUrls = notes.map((n) => n.imageUrl).filter(Boolean);

  return (
    <>
      <main>
        <Hero notes={noteUrls} />

        <Ticker words={items.map((i) => i.name.toLowerCase())} />

        {/* Sections alternate plum and white down the page. */}
        <div className="band band-plum">
          <div className="wrap">
            <section className="menu" id="menu">
              <h2 className="big menu-title" data-reveal="left">the menu.</h2>
              <MenuList items={items} drinks={drinks} />
            </section>
          </div>
        </div>

        <div className="band">
          <div className="wrap">
            <section className="board">
              <h2 className="big" data-reveal="left">the board.</h2>
              <div data-reveal>
                <Image
                  className="board-full"
                  src="/board.jpg"
                  alt="The whole review board by the counter, covered edge to edge in customer notes"
                  width={1020}
                  height={1280}
                  sizes="(min-width: 600px) 560px, 100vw"
                />
                <div className="notes">
                  {noteUrls.slice(0, 3).map((url, i) => (
                    <div className="round" key={url} style={{ "--i": i } as React.CSSProperties}>
                      <Image src={url} alt="Customer note from the board" fill sizes="140px" />
                    </div>
                  ))}
                </div>
              </div>
              <p className="desc" style={{ fontStyle: "normal" }}>by the counter. leave yours next time.</p>
              <div>
                <CroissantButton href={GOOGLE_REVIEW_URL} variant="line">leave us a Google review</CroissantButton>
              </div>
            </section>
          </div>
        </div>

        <div className="band band-plum">
          <div className="wrap">
            <section className="story" id="story">
              <h2 className="big" data-reveal="left">our story.</h2>
              <div className="story-text" data-reveal>
                <p>
                  A small family, and now Paro too. We built this place ourselves: painted the walls, wired the
                  lights, and messed up a lot of croissant batches until they came out right.
                </p>
                <p>Not a franchise, not someone else&apos;s idea. Ours, with pastries you won&apos;t find anywhere nearby.</p>
              </div>
              <div>
                <CroissantButton href={BUILD_VIDEO_URL}>watch us build it</CroissantButton>
              </div>
            </section>
          </div>
        </div>

        <div className="band">
          <div className="wrap">
            <Visit />
          </div>
        </div>
      </main>

      <NewItemsPill items={items.filter((i) => i.isNew)} />
    </>
  );
}
