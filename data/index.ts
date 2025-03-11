/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "",
    articleNumber: "test-1001",
    title: "Trådlösa Hörlurar",
    price: 5500,
    description: "Trådlösa Hörlurar",
    image:
      "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
  },
  {
    id: "",
    articleNumber: "test-1002",
    title: "Smartklocka",
    price: 2490,
    description: "Smartklocka",
    image:
      "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
  },
  {
    id: "",
    articleNumber: "test-1003",
    title: "Laptop",
    price: 9999,
    description: "Laptop",
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
  },
  {
    id: "",
    articleNumber: "test-1004",
    title: "Elcykel",
    price: 25999,
    description: "Elcykel",
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
  },
  {
    id: "",
    articleNumber: "test-1005",
    title: "Trådlösa Hörlurar",
    price: 5500,
    description: "Trådlösa Hörlurar",
    image:
      "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
  },
  {
    id: "",
    articleNumber: "test-1006",
    title: "Smartklocka",
    price: 2490,
    description: "Smartklocka",
    image:
      "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
  },
  {
    id: "",
    articleNumber: "test-1007",
    title: "Laptop",
    price: 9999,
    description: "Laptop",
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
  },
  {
    id: "",
    articleNumber: "test-1008",
    title: "Elcykel",
    price: 25999,
    description: "Elcykel",
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
  },
  {
    id: "",
    articleNumber: "test-1009",
    title: "iPhone 15 pro",
    price: 10999,
    description: "iPhone 15 pro",
    image:
      "https://www.tashicell.com/themes/tashicell/assets/phones/iPhone%2015%20Pro%20Max%20256GB_2023-09-22.png",
  },
  {
    id: "",
    articleNumber: "test-1010",
    title: "Samsung s24 Ultra",
    price: 8999,
    description: "Samsung s24 Ultra",
    image:
      "https://www.elgiganten.se/image/dv_web_D1800010021349704/575790/samsung-galaxy-s23-ultra-5g-smartphone-12512gb-gron.jpg",
  },
];
