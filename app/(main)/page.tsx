import Image from "next/image";
import Hero from "../components/Hero";
import MenuList from "../components/MenuList";
import NewItemsPill from "../components/NewItemsPill";
import Visit from "../components/Visit";
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

        <div className="wrap">
          <section className="menu" id="menu">
            <h2 className="big menu-title">the menu.</h2>
            <MenuList items={items} drinks={drinks} />
          </section>

          <section className="board">
            <h2 className="big">the board.</h2>
            <Image
              className="board-full"
              src="/board.jpg"
              alt="The whole review board by the counter, covered edge to edge in customer notes"
              width={1020}
              height={1280}
              sizes="(min-width: 600px) 560px, 100vw"
            />
            <div className="notes">
              {noteUrls.slice(0, 3).map((url) => (
                <div className="round" key={url}>
                  <Image src={url} alt="Customer note from the board" fill sizes="140px" />
                </div>
              ))}
            </div>
            <p className="desc" style={{ fontStyle: "normal" }}>by the counter. leave yours next time.</p>
            <a className="link" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              or leave us a Google review →
            </a>
          </section>

          <section className="story" id="story">
            <h2 className="big">our story.</h2>
            <p>
              A small family, and now Paro too. We built this place ourselves: painted the walls, wired the
              lights, and messed up a lot of croissant batches until they came out right.
            </p>
            <p>Not a franchise, not someone else&apos;s idea. Ours, with pastries you won&apos;t find anywhere nearby.</p>
            <a className="link" href={BUILD_VIDEO_URL} target="_blank" rel="noopener noreferrer">
              watch us build it →
            </a>
          </section>

          <Visit />
        </div>
      </main>

      <NewItemsPill items={items.filter((i) => i.isNew)} />
    </>
  );
}
