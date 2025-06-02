export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "",
    articleNumber: "1001",
    title: "Monstera Deliciosa",
    price: 349,
    stock: 10,
    description:
      "En populär inomhusväxt känd för sina stora, glänsande blad med karakteristiska hål och flikar. Lättskött och ger en tropisk känsla till hemmet.",
    image:
      "https://images.unsplash.com/photo-1604866830513-d54766457f45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Inomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1002",
    title: "Svärmors Tunga (Sansevieria Trifasciata)",
    price: 199,
    stock: 10,
    description:
      "En mycket tålig och lättskött inomhusväxt med upprättstående, svärdliknande blad. Perfekt för nybörjare och luftrenande.",
    image:
      "https://images.unsplash.com/photo-1679411216531-d899cb6da3d9?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Inomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1003",
    title: "Fiolfikus (Ficus Lyrata)",
    price: 499,
    stock: 10,
    description:
      "En ståtlig inomhusväxt med stora, fiolformade blad. Ger ett dramatiskt intryck och är en favorit i moderna inredningar.",
    image:
      "https://images.unsplash.com/photo-1596547612397-1432a7a7d37d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Inomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1004",
    title: "Rosenbuske (Rosa 'New Dawn')",
    price: 279,
    stock: 10,
    description:
      "En klätterros med ljuvliga, ljusrosa blommor som blommar rikligt under sommaren. Doftande och vacker i trädgården.",
    image:
      "https://images.unsplash.com/photo-1603095737639-f75134da4085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RmljdXMlMjBMeXJhdGF8ZW58MHx8MHx8fDA%3D",
    category: ["Utomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1005",
    title: "Lavendel (Lavandula Angustifolia)",
    price: 129,
    stock: 10,
    description:
      "En doftande perenn med vackra lila blommor. Lockar bin och fjärilar, perfekt för rabatter eller krukor i soliga lägen.",
    image:
      "https://images.unsplash.com/photo-1658545056023-ce30117cd9ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Utomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1006",
    title: "Solros (Helianthus Annuus)",
    price: 59,
    stock: 10,
    description:
      "En imponerande ettårig blomma med stora, gula blomhuvuden som följer solens rörelse. Perfekt för att skapa höjd och färg i trädgården.",
    image:
      "https://images.unsplash.com/photo-1540039906769-84cf3d448bc1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Utomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1007",
    title: "Ampellilja (Chlorophytum Comosum)",
    price: 99,
    stock: 10,
    description:
      "En klassisk och lättskött inomhusväxt med långa, bågformade blad och små 'bebisplantor' som hänger ner. Utmärkt luftrenare.",
    image:
      "https://images.unsplash.com/photo-1647631703145-01e8bf7cd149?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Inomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1008",
    title: "Orkidé (Phalaenopsis)",
    price: 249,
    stock: 10,
    description:
      "En elegant inomhusväxt känd för sina exotiska och långvariga blommor i olika färger. Kräver specifik skötsel men är mycket givande.",
    image:
      "https://images.unsplash.com/photo-1723721420945-d7f4b16e640b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFBoYWxhZW5vcHNpc3xlbnwwfHwwfHx8MA%3D%3D",
    category: ["Inomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1009",
    title: "Pelargon (Pelargonium x Hortorum)",
    price: 79,
    stock: 10,
    description:
      "En älskad utomhusväxt med riklig blomning i många färger, perfekt för balkonglådor och krukor. Tål sol bra.",
    image:
      "https://images.unsplash.com/photo-1729870126187-ea978e560dcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFBlbGFyZ29uaXVtJTIweCUyMEhvcnRvcnVtfGVufDB8fDB8fHww",
    category: ["Utomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1010",
    title: "Hortensia (Hydrangea Macrophylla)",
    price: 329,
    stock: 10,
    description:
      "En storslagen buske för utomhusbruk med stora, bollformade blommor som kan ändra färg beroende på jordens pH-värde.",
    image:
      "https://images.unsplash.com/photo-1690121013896-828f1b536dd6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Utomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1011",
    title: "Aloe Vera (Aloe Barbadensis Miller)",
    price: 179,
    stock: 10,
    description:
      "En suckulent inomhusväxt med tjocka, köttiga blad som innehåller en gel med läkande egenskaper. Mycket lättskött och torktålig.",
    image:
      "https://images.unsplash.com/photo-1632380211596-b96123618ca8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Inomhusväxter"],
  },
  {
    id: "",
    articleNumber: "1012",
    title: "Tomatplanta (Solanum Lycopersicum)",
    price: 49,
    stock: 10,
    description:
      "En populär utomhusväxt för den egna odlingen, ger saftiga och goda tomater under sommaren. Kräver sol och stöd.",
    image:
      "https://images.unsplash.com/photo-1599663371158-b5d9ae173108?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: ["Utomhusväxter"],
  },
];
