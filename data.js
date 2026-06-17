// Default configuration data for BLOQ Saigon Landing Page
// This will be loaded into localStorage upon the first visit.

const DEFAULT_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="%23d32f2f"/><rect x="60" y="50" width="80" height="70" fill="white" rx="8"/><g><path d="M70 50 L110 120 M90 50 L130 120 M110 50 L140 102 M60 70 L90 120 M60 92 L75 120" stroke="%23d32f2f" stroke-width="8" stroke-linecap="round"/></g><text x="100" y="165" font-family="'Outfit', 'Inter', sans-serif" font-weight="900" font-size="28" fill="white" text-anchor="middle" letter-spacing="6">BLOQ</text></svg>`;

window.DEFAULT_CONFIG = {
  configVersion: 5,
  desktopBgUrl: "assets/freecompress-0522 (2)(6).mp4",
  desktopBgType: "video",
  desktopSlideshow: [
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&auto=format&fit=crop&q=80"
  ],
  slideshowInterval: 60,
  mobileBgUrl: "assets/freecompress-0522 (2)(6).mp4",
  mobileBgType: "video",
  logoUrl: DEFAULT_LOGO,
  siteName: "BLOQ Saigon!",
  siteTagline: "Lifestyle & Shopping Park - all at BLOQ!",
  facebookUrl: "https://www.facebook.com/bloqsaigon",
  instagramUrl: "https://www.instagram.com/bloqsaigon",
  
  aboutUs: {
    title: "About BLOQ Saigon",
    subtitle: "Vietnam's First Lifestyle & Shopping Park",
    description: "Located in the heart of Thao Dien, BLOQ Saigon is a pioneer in the container-park retail concept in Vietnam. We offer a modern, open-air lifestyle oasis designed with green spaces, industrial shipping containers, and a welcoming central courtyard. BLOQ serves as a dynamic community hub where families, friends, and pet lovers can gather to explore premium F&B, trendy retail boutiques, and wellness services, alongside interactive markets and live performances.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1000&auto=format&fit=crop&q=80"
  },
  
  leasing: {
    title: "Leasing at BLOQ",
    subtitle: "Grow Your Brand in Thao Dien's Creative Hub",
    description: "Are you an artisanal chef, a boutique retailer, or a creative brand owner? BLOQ Saigon offers flexible retail spaces and shipping container units designed to showcase unique concepts. Benefit from our premium location, high foot traffic, established community, and dedicated marketing support. Join our curated collective of brands today.",
    email: "leasing@bloqsaigon.com",
    phone: "+84 28 3744 2026",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80"
  },
  
  shops: [
    {
      id: "shop-1",
      name: "MINH NHI",
      subtitle: "Hủ tiếu Nam Vang & Mì hoành thánh",
      description: "Traditional noodle house offering rich, slow-simmered broth, premium pork, prawns, and house-made wontons. Click here to view the full menu.",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80",
      driveUrl: "https://drive.google.com/file/d/1ZtFfP2bCgXUvI-Jz9D78cEaNlXFh9GfS/view?usp=sharing"
    },
    {
      id: "shop-2",
      name: "BEAR & BREW",
      subtitle: "Specialty Coffee & Craft Beer",
      description: "Artisanal espresso bar by day, turning into a cozy neighborhood craft beer hideout by night. Click here to view our beverage menu.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
      driveUrl: "https://drive.google.com/file/d/1Y5ZtFfP2bCgXUvI-Jz9D78cEaNlXFh9GfS/view?usp=sharing"
    },
    {
      id: "shop-3",
      name: "GREEN GARDEN",
      subtitle: "Healthy Salads & Cold-Pressed Juices",
      description: "Fresh, organic, and locally-sourced salads, wraps, and vitamin-packed juices. Click here to view our healthy menu.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
      driveUrl: "https://drive.google.com/file/d/1X5ZtFfP2bCgXUvI-Jz9D78cEaNlXFh9GfS/view?usp=sharing"
    },
    {
      id: "shop-4",
      name: "LE CROISSANT",
      subtitle: "French Bakery & Pastries",
      description: "Golden flaky croissants, pain au chocolat, fruit tarts, and fresh sourdough baked daily using French butter. Click here to view our bakery menu.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
      driveUrl: "https://drive.google.com/file/d/1W5ZtFfP2bCgXUvI-Jz9D78cEaNlXFh9GfS/view?usp=sharing"
    }
  ],
  
  retailShops: [
    {
      id: "retail-1",
      name: "TROPICANA BOUTIQUE",
      subtitle: "Fashion & Accessories",
      description: "Curated resort wear, handmade accessories, and tropical-inspired fashion items for your perfect styling.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80",
      shopUrl: "https://www.facebook.com/bloqsaigon"
    },
    {
      id: "retail-2",
      name: "L'APOTHIQUAIRE SPA",
      subtitle: "Wellness & Beauty",
      description: "French-style luxury day spa offering organic facial treatments, aromatherapy, and premium skincare products.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
      shopUrl: "https://www.facebook.com/bloqsaigon"
    },
    {
      id: "retail-3",
      name: "THE DESIGN HOUSE",
      subtitle: "Home Decor & Lifestyle",
      description: "Minimalist Scandinavian furniture, custom ceramics, scented candles, and unique local craftsmanship items.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
      shopUrl: "https://www.facebook.com/bloqsaigon"
    },
    {
      id: "retail-4",
      name: "CLAY & ART STUDIO",
      subtitle: "Creative Ceramic Pottery",
      description: "Hands-on pottery workshops, clay painting classes, and retail of artisanal handmade ceramic tableware.",
      image: "https://images.unsplash.com/photo-1565192647048-f997ded87958?w=600&auto=format&fit=crop&q=80",
      shopUrl: "https://www.facebook.com/bloqsaigon"
    }
  ],
  
  events: [
    {
      id: "event-1",
      title: "Weekend Acoustic Session",
      date: "Every Saturday, 7:00 PM - 9:00 PM",
      description: "Unwind your weekend with acoustic cover performances under the stars at our central courtyard. Bring your friends and enjoy special drinks from our F&B shops. Free entry!",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "event-2",
      title: "Green & Craft Market",
      date: "June 20-21, 2026 | 10:00 AM - 8:00 PM",
      description: "Discover eco-friendly products, handmade craft items, zero-waste lifestyle goods, and potted plants. Join creative DIY workshops and grab tasty bites from local artisanal stalls.",
      image: "https://images.unsplash.com/photo-1488459718432-36c85e987c8a?w=600&auto=format&fit=crop&q=80"
    }
  ]
};
