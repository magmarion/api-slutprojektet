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
    description: "Upplev friheten med trådlösa hörlurar som levererar klart och kraftfullt ljud helt utan sladdar. Med bekväm passform, lång batteritid och brusreducerande teknik kan du njuta av musik och samtal i högsta kvalitet, oavsett om du är på språng eller kopplar av hemma.",
    image:
      "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
  },
  {
    id: "",
    articleNumber: "test-1002",
    title: "Smartklocka",
    price: 2490,
    description: "Upplev en kombination av elegant design och smart teknik som hjälper dig hålla koll på allt från notiser till träningsresultat. Med inbyggd pulsmätare, GPS och sömnanalys får du en heltäckande bild av din hälsa och aktivitet, samtidigt som du alltid är uppkopplad mot viktiga samtal och appar.",
    image:
      "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
  },
  {
    id: "",
    articleNumber: "test-1003",
    title: "Laptop",
    price: 9999,
    description: "En bärbar dator som förenar prestanda och stil. Den tunna designen, högupplösta skärmen och det responsiva tangentbordet gör att du smidigt kan jobba, studera eller strömma underhållning. Tack vare kraftfull processor och generöst batteri är den redo för dina dagliga utmaningar.",
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
  },
  {
    id: "",
    articleNumber: "test-1004",
    title: "Elcykel",
    price: 25999,
    description: "En lättanvänd elcykel som kombinerar bekväm trampning med kraftfull elassistans. Perfekt för både korta pendlingssträckor och längre utflykter, med en robust ram och pålitlig motor för en smidig cykelupplevelse.",
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
  },
  {
    id: "",
    articleNumber: "test-1005",
    title: "Trådlösa Hörlurar",
    price: 5500,
    description: "Upplev friheten med trådlösa hörlurar som levererar klart och kraftfullt ljud helt utan sladdar. Med bekväm passform, lång batteritid och brusreducerande teknik kan du njuta av musik och samtal i högsta kvalitet, oavsett om du är på språng eller kopplar av hemma.",
    image:
      "https://soundium.se/media/catalog/product/cache/705b44c076ccef27260ea5d687f0f9cb/p/x/px8darkforest.jpg",
  },
  {
    id: "",
    articleNumber: "test-1006",
    title: "Smartklocka",
    price: 2490,
    description: "Upplev en kombination av elegant design och smart teknik som hjälper dig hålla koll på allt från notiser till träningsresultat. Med inbyggd pulsmätare, GPS och sömnanalys får du en heltäckande bild av din hälsa och aktivitet, samtidigt som du alltid är uppkopplad mot viktiga samtal och appar.",
    image:
      "https://www.elgiganten.se/image/dv_web_D180001280333226/786744/samsung-galaxy-watch-fe-bt-smartwatch-svart.jpg",
  },
  {
    id: "",
    articleNumber: "test-1007",
    title: "Laptop",
    price: 9999,
    description: "En bärbar dator som förenar prestanda och stil. Den tunna designen, högupplösta skärmen och det responsiva tangentbordet gör att du smidigt kan jobba, studera eller strömma underhållning. Tack vare kraftfull processor och generöst batteri är den redo för dina dagliga utmaningar.",
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
  },
  {
    id: "",
    articleNumber: "test-1008",
    title: "Elcykel",
    price: 25999,
    description: "En lättanvänd elcykel som kombinerar bekväm trampning med kraftfull elassistans. Perfekt för både korta pendlingssträckor och längre utflykter, med en robust ram och pålitlig motor för en smidig cykelupplevelse.",
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
  },
  {
    id: "",
    articleNumber: "test-1009",
    title: "iPhone 15 Pro",
    price: 10999,
    description: "iPhone 15 Pro erbjuder en förstklassig användarupplevelse med fantastisk kamera, blixtsnabb prestanda och elegant design i tåligt material. Uppgraderade batterifunktioner och banbrytande mjukvara gör det till ett kraftpaket i fickformat, perfekt för både arbete och nöje.",
    image:
      "https://www.tashicell.com/themes/tashicell/assets/phones/iPhone%2015%20Pro%20Max%20256GB_2023-09-22.png",
  },
  {
    id: "",
    articleNumber: "test-1010",
    title: "Samsung s24 Ultra",
    price: 8999,
    description: "Samsung S24 Ultra kombinerar proffsfotografering med en omslutande skärm och hög prestanda. Med dess avancerade kamerasystem, förbättrad batteriteknik och stilrena form blir den en kraftfull följeslagare för både produktivitet och underhållning i vardagen.",
    image:
      "https://www.elgiganten.se/image/dv_web_D1800010021349704/575790/samsung-galaxy-s23-ultra-5g-smartphone-12512gb-gron.jpg",
  },
];
