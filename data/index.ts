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
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "",
    articleNumber: "1001",
    title: "Bowers & Wilkins PX8",
    price: 5500,
    description: "Bowers & Wilkins PX8 McLaren Edition is a premium wireless headphone that combines elegant design with advanced technology. With noise-cancelling technology, high-resolution audio and long battery life, it offers an immersive listening experience wherever you go.",
    image:
      "https://www.westcoasthifi.com.au/wp-content/uploads/2024/10/BW-Px8-McLaren-Edition_12.png",
    category: "Headphones",

  },
  {
    id: "",
    articleNumber: "1002",
    title: "Smartwatch",
    price: 2490,
    description: "Experience a combination of elegant design and smart technology that helps you keep track of everything from notifications to workout results. With built-in heart rate monitor, GPS and sleep analysis, you get a comprehensive picture of your health and activity, while always being connected to important calls and apps.",
    image:
      "https://www.leafstudios.in/cdn/shop/files/1_1099cd20-7237-4bdf-a180-b7126de5ef3d_1024x1024.png?v=1722230645",
    category: "Smartwatches",
  },
  {
    id: "",
    articleNumber: "1003",
    title: "Laptop",
    price: 9999,
    description: "A laptop that combines performance and style. Its slim design, high-resolution display, and responsive keyboard let you work, study, or stream entertainment with ease. Thanks to a powerful processor and generous battery, it's ready for your daily challenges.",
    image:
      "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
    category: "Computers",
  },
  {
    id: "",
    articleNumber: "1004",
    title: "Electric Bike",
    price: 25999,
    description: "An easy-to-use electric bike that offers a smooth and comfortable ride. With a powerful motor, long-lasting battery and durable frame, it's perfect for commuting, running errands or exploring the great outdoors. The adjustable seat and handlebars ensure a custom fit for riders of all sizes.",
    image:
      "https://images-cdn.ubuy.co.in/636326cdb789336d02347545-electric-bike-totguard-electric-bike.jpg",
    category: "Bikes",
  },
  {
    id: "",
    articleNumber: "1005",
    title: "Intelligent Robot",
    price: 2099,
    description: "Eilik Intelligent Desktop Robot | for Kids and Adults, with Emotions, Interactions and Animations, Toy Entertainment Companion Pet Robot Personal Assistant for More Fun.",
    image:
      "https://m.media-amazon.com/images/I/51DBd7O6GEL.jpg",
    category: "Toys",
  },
  {
    id: "",
    articleNumber: "1006",
    title: "iPhone 15 Pro",
    price: 11990,
    description: "iPhone 15 Pro offers a stunning design, powerful performance and advanced features for a premium smartphone experience. With a high-resolution display, professional-grade camera and long-lasting battery, it's the perfect device for work and play.",
    image:
      "https://www.tashicell.com/themes/tashicell/assets/phones/iPhone%2015%20Pro%20Max%20256GB_2023-09-22.png",
    category: "Smartphones",
  },
  {
    id: "",
    articleNumber: "1007",
    title: "Samsung S24 Ultra",
    price: 17990,
    description: "Samsung S24 Ultra combines cutting-edge technology with sleek design to deliver a premium smartphone experience. With a stunning display, powerful camera and long-lasting battery, it offers everything you need for work and play, all in one device.",
    image:
      "https://img.etimg.com/photo/msid-98945112,imgsize-13860/SamsungGalaxyS23Ultra.jpg",
    category: "Smartphones",
  },
  {
    id: "",
    articleNumber: "1008",
    title: "Redmi A3",
    price: 1490,
    description: "Redmi A3 is a budget-friendly smartphone with a large display, powerful processor and long battery life. With a range of features including a high-resolution camera, fast charging and expandable storage, it offers great value for money and a smooth user experience.",
    image:
      "https://mtech4u.com/cdn/shop/files/GreenA3_grande_35f29f2f-eb12-4da0-9e04-df7744017f93.webp?v=1709555029",
    category: "Smartphones",
  },
  {
    id: "",
    articleNumber: "1009",
    title: "Bose Bluetooth Earbuds",
    price: 4299,
    description: "Bose bluetooth earbuds are designed to deliver clear sound and comfortable fit for all-day listening. With noise-cancelling technology and long battery life, you can enjoy music and calls without distractions, whether you're on the go or relaxing at home.",
    image:
    "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qcue-headphonein/product_silo_images/QCUEBLE25_LunarBlue_AEM_PDP_Gallery_08.png/jcr:content/renditions/cq5dam.web.1920.1920.png",
    category: "Headphones",
  },
  {
    id: "",
    articleNumber: "1010",
    title: "Play Station 5",
    price: 4990,
    description: "PS5 is the latest gaming console from Sony, offering a powerful gaming experience with stunning graphics and fast loading times. With a range of exclusive games and accessories, you can enjoy immersive gameplay and connect with friends online for an unforgettable gaming experience.",
    image:
      "https://cdn.inet.se/product/688x386/6611973_6.jpg",
    category: "Gaming",
  },
  {
    id: "",
    articleNumber: "1011",
    title: "Xbox Series X",
    price: 4490,
    description: "Xbox Series X is the latest gaming console from Microsoft, offering a powerful gaming experience with stunning graphics and fast loading times. With a range of exclusive games and accessories, you can enjoy immersive gameplay and connect with friends online for an unforgettable gaming experience.",
    image:
      "https://m.media-amazon.com/images/I/61BVvNo8E-L.jpg",
    category: "Gaming",
  },
  {
    id: "",
    articleNumber: "1012",
    title: "K820 Game Keyboard & Mouse",
    price: 550,
    description: "Elevate your gaming experience with the K820 Gaming Keyboard and Mouse Set, designed for precision, performance, and style. This USB wired combo features a 75% compact layout for a clutter-free setup, making it perfect for both desktop and PC gaming",
    image:
      "https://ae01.alicdn.com/kf/S297ce2870f40464383eaff2e7f64cd9ar.jpg",
    category: "Gaming",
  },
];
