// Syncs Sanity menu items to the current printed menu.
// Run with: set -a; source .env.local; set +a; node scripts/update-menu.mjs
//
// Existing items are matched by name (published IDs don't follow one scheme);
// items not found are created with a fixed _id so re-running never duplicates them.

import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('SANITY_API_TOKEN is not set — source .env.local first.');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-07-11',
  token,
  useCdn: false,
});

const MENU = [
  { id: 'menu-savory-6', category: 'savory', order: 6, name: 'Chicken Crush', price: 260,
    description: 'Creamy chicken, lettuce, Chilli Oil, Onions, Bell Peppers', dietary: ['egg'] },
  { category: 'savory', name: 'Mush Melt', price: 240,
    description: 'Creamy mushroom, Lettuce, Onions, Bell peppers' },
  { category: 'sweet', name: 'Strawberry Swirl', price: 240,
    description: 'Strawberry sauce, fresh Strawberry, Vanilla cream' },
  { category: 'croastie', name: 'Mexican Crunch', price: 240,
    description: 'Mexican Red Beans sauce, Corn, Chilli, Tomato, Onions, Cheese sauce, Mint' },
  { id: 'menu-croastie-4', category: 'croastie', order: 4, name: 'Berry Kiss', price: 240,
    description: 'Blueberry Sauce, Vanilla Cream, Fresh Blueberry' },
];

// Items carrying the red "NEW" tag on the printed menu.
const NEW_ITEMS = ['Chicken Crush', 'Mexican Crunch', 'Mediterranean Breeze', 'Sunny Crost', 'Berry Kiss'];

async function main() {
  const existing = await client.fetch(`*[_type == "menuItem"]{_id, name}`);
  const byName = new Map(existing.map((d) => [d.name, d._id]));

  let tx = client.transaction();
  for (const item of MENU) {
    const fields = { price: item.price, description: item.description };
    const id = byName.get(item.name);
    if (id) {
      tx = tx.patch(id, { set: fields });
      console.log(`update  ${item.name}`);
    } else {
      tx = tx.createIfNotExists({
        _id: item.id,
        _type: 'menuItem',
        name: item.name,
        category: item.category,
        order: item.order,
        available: true,
        bestSeller: false,
        ...(item.dietary && { dietary: item.dietary }),
        ...fields,
      });
      console.log(`create  ${item.name}`);
    }
  }

  // Runs after creates in the same transaction, so newly created items get flagged too.
  for (const name of NEW_ITEMS) {
    const id = byName.get(name) ?? MENU.find((m) => m.name === name)?.id;
    tx = tx.patch(id, { set: { isNew: true } });
    console.log(`new     ${name}`);
  }

  const result = await tx.commit();
  console.log(`\nCommitted ${result.results.length} mutations.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
