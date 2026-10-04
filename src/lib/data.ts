export const RESTAURANT = {
  name: "Fish, Wings & Tings",
  shortName: "FW&T",
  tagline: "Nouvelle Caribbean fare",
  established: 2012,
  phone: "020 7737 4888",
  phoneHref: "tel:+442077374888",
  email: "hello@fishwingsandtings.co.uk",
  address: {
    line1: "Unit 3, Granville Arcade",
    line2: "Brixton Village, Coldharbour Lane",
    city: "London",
    postcode: "SW9 8PR",
  },
  mapEmbed:
    "https://www.google.com/maps?q=Granville+Arcade,+Coldharbour+Ln,+London+SW9+8PR&output=embed",
  mapLink:
    "https://www.google.com/maps/place/Granville+Arcade,+Coldharbour+Ln,+London+SW9+8PR",
  instagram: "https://www.instagram.com/fishwingsandtings",
};

export const HOURS: { day: string; time: string | null; short: string }[] = [
  { day: "Monday", time: null, short: "Mon" },
  { day: "Tuesday", time: "12:00 — 22:00", short: "Tue" },
  { day: "Wednesday", time: "12:00 — 22:00", short: "Wed" },
  { day: "Thursday", time: "12:00 — 22:00", short: "Thu" },
  { day: "Friday", time: "12:00 — 22:30", short: "Fri" },
  { day: "Saturday", time: "12:00 — 22:30", short: "Sat" },
  { day: "Sunday", time: "12:00 — 22:00", short: "Sun" },
];

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

export const MENU: Record<string, { label: string; blurb: string; items: MenuItem[] }> = {
  tings: {
    label: "Tings",
    blurb: "Small plates to start the rhythm — fritters, wings and tings.",
    items: [
      {
        name: "Reggae Wings",
        description:
          "Our signature. Chicken wings doused in fiery tamarind sauce, served with a stack of cooling pineapple.",
        price: "8.5",
        tag: "Signature",
      },
      {
        name: "Cod Fritters (Accras)",
        description:
          "Salt cod fritters with ginger and lime aioli — the perfect combo with the energy of Coldharbour Lane.",
        price: "6.5",
        tag: "Time Out pick",
      },
      {
        name: "Split-Pea Fritters",
        description:
          "Crisp outside, soft within — served with kuchela, the spiced, sun-dried pulp of unripe mango.",
        price: "5.5",
        tag: "Veg",
      },
      {
        name: "Fried Sweet Plantain",
        description: "Caramelised plantain, honey-lime glaze, toasted coconut flakes.",
        price: "5",
        tag: "Veg",
      },
      {
        name: "Saltfish Buljol",
        description: "Trini breakfast classic — salt fish sautéed with peppers, tomato and onion.",
        price: "7",
      },
      {
        name: "Festival",
        description: "Sweet fried dumplings, golden and dense. Built for dipping.",
        price: "3.5",
      },
    ],
  },
  mains: {
    label: "Mains",
    blurb: "Regional and street food, turned into delightful nouvelle Caribbean fare.",
    items: [
      {
        name: "Jerk Chicken",
        description:
          "Half chicken over pimento wood smoke, rice & peas, fried plantain, pickled slaw.",
        price: "13",
        tag: "House legend",
      },
      {
        name: "Trini Curry Crab & Dumplings",
        description:
          "Blue crab simmered in golden turmeric curry, flat dumplings, thyme and Scotch bonnet.",
        price: "16",
      },
      {
        name: "Curry Goat",
        description: "Slow-cooked until it gives up, wrapped in dalpuri roti or over rice.",
        price: "12",
      },
      {
        name: "Brown Stew Fish",
        description: "Whole fish kissed by the pot — peppers, tomato, escovitch-style sauce.",
        price: "13",
      },
      {
        name: "Doubles",
        description:
          "Trinidad's favourite street snack — curried chickpeas between two barra, mango kuchela.",
        price: "6",
        tag: "Veg",
      },
      {
        name: "Roti (Chicken / Goat / Veg / Shrimp)",
        description: "Dalpuri roti wrapped around your filling of choice, with tamarind sauce.",
        price: "9.5",
      },
      {
        name: "Pelau",
        description:
          "Trinidad's one-pot wonder — pigeon peas, caramelised chicken, coconut milk rice.",
        price: "11",
      },
      {
        name: "Callaloo & Crab",
        description: "Dasheen leaves simmered with okra, coconut milk and blue crab.",
        price: "9",
      },
    ],
  },
  sides: {
    label: "Sides",
    blurb: "Nobody leaves without plantain. House rule.",
    items: [
      { name: "Rice & Peas", description: "Coconut milk, kidney beans, thyme.", price: "3.5" },
      { name: "Fried Plantain", description: "Sweet, caramelised, dangerous.", price: "4" },
      { name: "Macaroni Pie", description: "Caribbean baked mac & cheese with a crisp lid.", price: "4" },
      { name: "Coleslaw", description: "Cooling, crunchy, creamed.", price: "3" },
      { name: "Steamed Cabbage", description: "With carrots and sweet peppers.", price: "3.5" },
      { name: "Extra Kuchela", description: "Spiced green mango relish. You'll want it.", price: "2" },
    ],
  },
  drinks: {
    label: "Drink Tings",
    blurb: "Rum forward, sunshine backed.",
    items: [
      {
        name: "The Rum Punch",
        description:
          "Wray & Nephew overproof, tropical fruit, grated nutmeg. Full of the flavours that rum has to offer.",
        price: "8",
        tag: "Signature",
      },
      { name: "Sorrel", description: "Hibiscus, ginger, clove — served over ice.", price: "4" },
      { name: "Homemade Ginger Beer", description: "Fiery and fresh. Widely imitated, never beaten.", price: "3.5" },
      { name: "Sea Moss Punch", description: "Caribbean classic, blended with milk and spice.", price: "4.5" },
      { name: "Red Stripe", description: "Jamaican lager, ice cold.", price: "5" },
      { name: "Caribbean Sodas", description: "Ting, Kola Champagne, Irn-Bru's cooler cousins.", price: "3" },
    ],
  },
  sweets: {
    label: "Sweet Tings",
    blurb: "Save room. Trust we.",
    items: [
      {
        name: "Rum Cake",
        description: "Dark, sticky, unapologetically boozy. Granny Tina's recipe.",
        price: "6",
        tag: "Signature",
      },
      { name: "Pineapple Upside-Down Cake", description: "Caramelised pineapple rings, golden sponge.", price: "6" },
      { name: "Coconut Ice Cream", description: "Made with toasted coconut and condensed milk.", price: "5" },
      { name: "Bread Pudding & Rum Sauce", description: "Old school comfort, doused properly.", price: "5.5" },
    ],
  },
};

export const SIGNATURES = [
  {
    index: "01",
    name: "Reggae Wings",
    description:
      "Fiery tamarind. Cooling pineapple. A stack of wings doused in the sauce that made the yellow-fronted joint famous from Brixton to DC.",
    price: "8.5",
    image: "/images/reggae-wings.jpg",
    pairing: "Pairs with: The Rum Punch, obviously.",
  },
  {
    index: "02",
    name: "Jerk Chicken",
    description:
      "Pimento smoke, Scotch bonnet heat, half a bird over rice & peas and sweet fried plantain. The plate Brixton dreams about.",
    price: "13",
    image: "/images/hero-plate.jpg",
    pairing: "Pairs with: Red Stripe, ice cold.",
  },
  {
    index: "03",
    name: "Cod Fritters",
    description:
      "Salt cod accras with ginger and lime aioli. Time Out calls it the perfect combo with the glorious energy of Coldharbour Lane.",
    price: "6.5",
    image: "/images/cod-fritters.jpg",
    pairing: "Pairs with: Homemade ginger beer.",
  },
  {
    index: "04",
    name: "The Rum Punch",
    description:
      "Wray & Nephew overproof over tropical fruit, finished with grated nutmeg. One is a greeting, two is a party.",
    price: "8",
    image: "/images/rum-punch.jpg",
    pairing: "Pairs with: Everything. And nothing.",
  },
];

export const PRESS = [
  {
    quote:
      "An authentic taste of the Caribbean in Brixton Village. You can't beat Fish, Wings & Tings for atmosphere.",
    source: "Time Out London",
    detail: "Recommended — Caribbean, Brixton",
  },
  {
    quote:
      "Brian Danclair has always had a homemade approach to his cooking — from grandmother Tina's empanadas to that rum punch.",
    source: "Condé Nast Traveller",
    detail: "The best restaurants in Brixton",
  },
  {
    quote:
      "Run by Trinidadian chef Brian Danclair, Fish, Wings & Tings has become a Brixton Village institution.",
    source: "London The Inside",
    detail: "Best Restaurants in Brixton",
  },
];

export const GUEST_REVIEWS = [
  {
    quote:
      "The wings are outstanding, the rum punch was full of the flavours that Wray N Nephew rum has to offer. This is the place to go.",
    author: "Kadeem M.",
    rating: 5,
  },
  {
    quote:
      "Larger-than-life Trini owner dishes up all the flavours of the Caribbean. Great value, service and ambience was perfect. A must visit.",
    author: "Sarah L.",
    rating: 5,
  },
  {
    quote:
      "Cod fritters and ginger lime aioli with the glorious energy of Coldharbour Lane — this place is a Brixton rite of passage.",
    author: "Daniel O.",
    rating: 5,
  },
];

export const MARQUEE_ITEMS = [
  "Reggae Wings",
  "Jerk Chicken",
  "Rum Punch",
  "Cod Fritters",
  "Fried Plantain",
  "Curry Goat",
  "Doubles",
  "Rum Cake",
];
