export interface UserProfile {
  id: string;
  name: string;
  role: "farmer" | "buyer" | "equipment" | "grocery" | "agronomist" | "finance";
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  date: string;
  type: "sold" | "purchased";
  item: string;
  quantity: string;
  amount: number;
  status: "Completed" | "Processing" | "Pending";
}

export interface MarketPricePoint {
  date: string;
  price: number;
}

export interface CropPriceData {
  id: string;
  nameKey: string;
  currentPrice: number;
  change: number;
  trend: "increasing" | "decreasing";
  mandiBenchmark: number;
  dailyData: MarketPricePoint[];
  weeklyData: MarketPricePoint[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  isRental: boolean;
  isSale: boolean;
  rentalRate: number;
  rentalUnit: "day" | "hour" | "acre";
  purchasePrice?: number;
  supplier: string;
  location: string;
  image: string;
  specs: string;
  available: boolean;
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  farmerPrice: number;
  mandiPrice: number;
  isFairPrice: boolean;
  location: string;
  harvestDate: string;
}

export interface BuyerRequest {
  id: string;
  buyerName: string;
  crop: string;
  requiredQuantity: string;
  offeredPrice: number;
  location: string;
  date: string;
  status: "open" | "accepted";
}

export interface BulkOrder {
  id: string;
  buyerName: string;
  farmerName: string;
  produce: string;
  quantity: string;
  totalAmount: number;
  deliveryDate: string;
  destination: string;
  status: "Confirmed" | "In Transit" | "Delivered" | "Scheduled";
}

export interface AgronomistQuery {
  id: string;
  farmerName: string;
  crop: string;
  symptoms: string;
  severity: "High" | "Medium" | "Low";
  date: string;
  status: "pending" | "answered";
  diagnosis?: string;
  treatment?: string;
  advisorName?: string;
  resolvedDate?: string;
}

export interface FinanceProduct {
  id: string;
  title: string;
  provider: string;
  type: "loan" | "insurance";
  interestOrPremium: string;
  maxAmountOrCover: string;
  tenure: string;
  subsidy: string;
  description: string;
}

export interface SeasonalFinancialEntry {
  id: string;
  userId: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface SchemeItem {
  id: string;
  titleEn: string;
  titleTa: string;
  category: "central" | "state";
  authority: string;
  summaryEn: string;
  summaryTa: string;
  benefitsEn: string;
  benefitsTa: string;
  eligibilityEn: string;
  eligibilityTa: string;
  documentsEn: string[];
  documentsTa: string[];
  portalUrl: string;
}

export interface ForumPost {
  id: string;
  author: string;
  authorRole: string;
  avatar: string;
  title: string;
  content: string;
  category: "pest" | "irrigation" | "organic" | "market";
  date: string;
  upvotes: number;
  replies: {
    id: string;
    author: string;
    avatar: string;
    content: string;
    date: string;
  }[];
}

export interface BlogArticle {
  id: string;
  titleEn: string;
  titleTa: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  summaryEn: string;
  summaryTa: string;
  contentEn: string;
  contentTa: string;
}

export interface NewsItem {
  id: string;
  titleEn: string;
  titleTa: string;
  source: string;
  date: string;
  isBreaking: boolean;
  summaryEn: string;
  summaryTa: string;
}

export interface FAQItem {
  id: string;
  category: "general" | "farming" | "trading" | "equipment";
  questionEn: string;
  questionTa: string;
  answerEn: string;
  answerTa: string;
}

// ----------------- SEED DATA -----------------

export const DEMO_USERS: UserProfile[] = [
  {
    id: "user-rajesh",
    name: "Rajesh Kumar",
    role: "farmer",
    email: "rajesh.farmer@agritech.in",
    phone: "+91 94432 10850",
    location: "Thanjavur, Tamil Nadu",
    avatar: "👨‍🌾",
  },
  {
    id: "user-sita",
    name: "Sita Devi",
    role: "farmer",
    email: "sita.farmer@agritech.in",
    phone: "+91 98421 55902",
    location: "Madurai, Tamil Nadu",
    avatar: "👩‍🌾",
  },
  {
    id: "user-greenfoods",
    name: "Green Foods Pvt Ltd",
    role: "buyer",
    email: "procurement@greenfoods.com",
    phone: "+91 44 2841 9000",
    location: "Chennai, Tamil Nadu",
    avatar: "🏢",
  },
  {
    id: "user-freshmart",
    name: "FreshMart Retail Chain",
    role: "grocery",
    email: "supply@freshmartretail.com",
    phone: "+91 422 6601 222",
    location: "Coimbatore, Tamil Nadu",
    avatar: "🛒",
  },
  {
    id: "user-organicbuyers",
    name: "Organic Buyers Co",
    role: "buyer",
    email: "orders@organicbuyers.co",
    phone: "+91 80 4112 7890",
    location: "Bengaluru, Karnataka",
    avatar: "🌿",
  },
  {
    id: "user-agriequip",
    name: "AgriEquip Hub",
    role: "equipment",
    email: "rentals@agriequiphub.in",
    phone: "+91 427 244 5500",
    location: "Salem, Tamil Nadu",
    avatar: "🚜",
  },
  {
    id: "user-murugan",
    name: "Dr. K. Murugan (Agronomist)",
    role: "agronomist",
    email: "dr.murugan@tnau.ac.in",
    phone: "+91 94862 33110",
    location: "Coimbatore (TNAU)",
    avatar: "🔬",
  },
  {
    id: "user-kisanvikas",
    name: "Kisan Vikas Rural Finance",
    role: "finance",
    email: "loans@kisanvikasbank.org",
    phone: "+91 431 270 4400",
    location: "Tiruchirappalli, Tamil Nadu",
    avatar: "🏦",
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // Rajesh Kumar (Farmer)
  {
    id: "TXN-8821",
    userId: "user-rajesh",
    userName: "Rajesh Kumar",
    date: "2026-09-14",
    type: "sold",
    item: "Paddy (Ponni Raw)",
    quantity: "50 Quintals",
    amount: 115000,
    status: "Completed",
  },
  {
    id: "TXN-8822",
    userId: "user-rajesh",
    userName: "Rajesh Kumar",
    date: "2026-09-08",
    type: "sold",
    item: "Hybrid Maize",
    quantity: "20 Quintals",
    amount: 44000,
    status: "Completed",
  },
  {
    id: "TXN-8823",
    userId: "user-rajesh",
    userName: "Rajesh Kumar",
    date: "2026-08-28",
    type: "purchased",
    item: "Bio-NPK Fertilizer Pack",
    quantity: "15 Bags",
    amount: 12500,
    status: "Completed",
  },
  {
    id: "TXN-8824",
    userId: "user-rajesh",
    userName: "Rajesh Kumar",
    date: "2026-08-15",
    type: "purchased",
    item: "Micro-Drip Lateral Lines",
    quantity: "2 Acres Kit",
    amount: 28000,
    status: "Completed",
  },

  // Sita Devi (Farmer)
  {
    id: "TXN-8831",
    userId: "user-sita",
    userName: "Sita Devi",
    date: "2026-09-12",
    type: "sold",
    item: "Sharbati Wheat",
    quantity: "35 Quintals",
    amount: 80500,
    status: "Completed",
  },
  {
    id: "TXN-8832",
    userId: "user-sita",
    userName: "Sita Devi",
    date: "2026-09-02",
    type: "sold",
    item: "Medium Staple Cotton",
    quantity: "15 Quintals",
    amount: 105000,
    status: "Completed",
  },
  {
    id: "TXN-8833",
    userId: "user-sita",
    userName: "Sita Devi",
    date: "2026-08-20",
    type: "purchased",
    item: "Certified Hybrid Seeds",
    quantity: "8 Packets",
    amount: 8200,
    status: "Completed",
  },

  // Green Foods Pvt Ltd (Buyer)
  {
    id: "TXN-8841",
    userId: "user-greenfoods",
    userName: "Green Foods Pvt Ltd",
    date: "2026-09-14",
    type: "purchased",
    item: "Paddy (Ponni Raw) from Rajesh Kumar",
    quantity: "50 Quintals",
    amount: 115000,
    status: "Completed",
  },
  {
    id: "TXN-8842",
    userId: "user-greenfoods",
    userName: "Green Foods Pvt Ltd",
    date: "2026-09-12",
    type: "purchased",
    item: "Sharbati Wheat from Sita Devi",
    quantity: "35 Quintals",
    amount: 80500,
    status: "Completed",
  },
  {
    id: "TXN-8843",
    userId: "user-greenfoods",
    userName: "Green Foods Pvt Ltd",
    date: "2026-09-17",
    type: "sold",
    item: "Processed Polished Rice (Wholesale)",
    quantity: "80 Quintals",
    amount: 260000,
    status: "Completed",
  },
  {
    id: "TXN-8844",
    userId: "user-greenfoods",
    userName: "Green Foods Pvt Ltd",
    date: "2026-09-04",
    type: "sold",
    item: "Refined Atta Flour Pallets",
    quantity: "60 Bags",
    amount: 145000,
    status: "Completed",
  },

  // FreshMart Retail Chain (Grocery / Retailer)
  {
    id: "TXN-8851",
    userId: "user-freshmart",
    userName: "FreshMart Retail Chain",
    date: "2026-09-16",
    type: "purchased",
    item: "Farm Fresh Country Tomatoes",
    quantity: "120 Crates",
    amount: 65000,
    status: "Completed",
  },
  {
    id: "TXN-8852",
    userId: "user-freshmart",
    userName: "FreshMart Retail Chain",
    date: "2026-09-15",
    type: "purchased",
    item: "Fresh Spinach & Ridge Gourd",
    quantity: "450 Kg",
    amount: 48000,
    status: "Completed",
  },
  {
    id: "TXN-8853",
    userId: "user-freshmart",
    userName: "FreshMart Retail Chain",
    date: "2026-09-18",
    type: "sold",
    item: "Retail Supermarket Daily Veg Packets",
    quantity: "1850 Packs",
    amount: 185000,
    status: "Completed",
  },

  // Organic Buyers Co (Buyer)
  {
    id: "TXN-8861",
    userId: "user-organicbuyers",
    userName: "Organic Buyers Co",
    date: "2026-09-02",
    type: "purchased",
    item: "Raw Cotton (Unbleached)",
    quantity: "25 Quintals",
    amount: 180000,
    status: "Completed",
  },
  {
    id: "TXN-8862",
    userId: "user-organicbuyers",
    userName: "Organic Buyers Co",
    date: "2026-09-10",
    type: "sold",
    item: "Export Grade Organic Cotton Bales",
    quantity: "15 Bales",
    amount: 290000,
    status: "Completed",
  },
];

export const CROP_PRICE_DATA: Record<string, CropPriceData> = {
  wheat: {
    id: "wheat",
    nameKey: "marketTrends.crops.wheat",
    currentPrice: 2420,
    change: 2.8,
    trend: "increasing",
    mandiBenchmark: 2350,
    dailyData: [
      { date: "13 Sep", price: 2350 },
      { date: "14 Sep", price: 2370 },
      { date: "15 Sep", price: 2365 },
      { date: "16 Sep", price: 2390 },
      { date: "17 Sep", price: 2410 },
      { date: "18 Sep", price: 2405 },
      { date: "19 Sep", price: 2420 },
    ],
    weeklyData: [
      { date: "Week 34", price: 2280 },
      { date: "Week 35", price: 2310 },
      { date: "Week 36", price: 2340 },
      { date: "Week 37", price: 2385 },
      { date: "Week 38", price: 2420 },
    ],
  },
  rice: {
    id: "rice",
    nameKey: "marketTrends.crops.rice",
    currentPrice: 2300,
    change: 1.5,
    trend: "increasing",
    mandiBenchmark: 2250,
    dailyData: [
      { date: "13 Sep", price: 2240 },
      { date: "14 Sep", price: 2260 },
      { date: "15 Sep", price: 2280 },
      { date: "16 Sep", price: 2275 },
      { date: "17 Sep", price: 2290 },
      { date: "18 Sep", price: 2295 },
      { date: "19 Sep", price: 2300 },
    ],
    weeklyData: [
      { date: "Week 34", price: 2200 },
      { date: "Week 35", price: 2220 },
      { date: "Week 36", price: 2250 },
      { date: "Week 37", price: 2280 },
      { date: "Week 38", price: 2300 },
    ],
  },
  maize: {
    id: "maize",
    nameKey: "marketTrends.crops.maize",
    currentPrice: 2180,
    change: -1.2,
    trend: "decreasing",
    mandiBenchmark: 2220,
    dailyData: [
      { date: "13 Sep", price: 2240 },
      { date: "14 Sep", price: 2230 },
      { date: "15 Sep", price: 2210 },
      { date: "16 Sep", price: 2200 },
      { date: "17 Sep", price: 2195 },
      { date: "18 Sep", price: 2190 },
      { date: "19 Sep", price: 2180 },
    ],
    weeklyData: [
      { date: "Week 34", price: 2270 },
      { date: "Week 35", price: 2250 },
      { date: "Week 36", price: 2230 },
      { date: "Week 37", price: 2200 },
      { date: "Week 38", price: 2180 },
    ],
  },
  cotton: {
    id: "cotton",
    nameKey: "marketTrends.crops.cotton",
    currentPrice: 7150,
    change: 3.4,
    trend: "increasing",
    mandiBenchmark: 6900,
    dailyData: [
      { date: "13 Sep", price: 6850 },
      { date: "14 Sep", price: 6920 },
      { date: "15 Sep", price: 6980 },
      { date: "16 Sep", price: 7020 },
      { date: "17 Sep", price: 7080 },
      { date: "18 Sep", price: 7110 },
      { date: "19 Sep", price: 7150 },
    ],
    weeklyData: [
      { date: "Week 34", price: 6700 },
      { date: "Week 35", price: 6820 },
      { date: "Week 36", price: 6940 },
      { date: "Week 37", price: 7050 },
      { date: "Week 38", price: 7150 },
    ],
  },
};

export const BUSINESS_PNL_DATA: Record<
  string,
  {
    name: string;
    weekly: {
      revenue: number;
      expenses: number;
      transactions: number;
      trend: { label: string; revenue: number; expenses: number }[];
      categories: { nameKey: string; value: number }[];
    };
    monthly: {
      revenue: number;
      expenses: number;
      transactions: number;
      trend: { label: string; revenue: number; expenses: number }[];
      categories: { nameKey: string; value: number }[];
    };
    quarterly: {
      revenue: number;
      expenses: number;
      transactions: number;
      trend: { label: string; revenue: number; expenses: number }[];
      categories: { nameKey: string; value: number }[];
    };
  }
> = {
  "user-greenfoods": {
    name: "Green Foods Pvt Ltd",
    weekly: {
      revenue: 405000,
      expenses: 195500,
      transactions: 4,
      trend: [
        { label: "Mon", revenue: 45000, expenses: 25000 },
        { label: "Tue", revenue: 60000, expenses: 32000 },
        { label: "Wed", revenue: 75000, expenses: 28000 },
        { label: "Thu", revenue: 55000, expenses: 40000 },
        { label: "Fri", revenue: 90000, expenses: 35000 },
        { label: "Sat", revenue: 80000, expenses: 35500 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 75000 },
        { nameKey: "profitLoss.categories.equipment", value: 32000 },
        { nameKey: "profitLoss.categories.transportation", value: 48000 },
        { nameKey: "profitLoss.categories.labour", value: 24500 },
        { nameKey: "profitLoss.categories.packaging", value: 16000 },
      ],
    },
    monthly: {
      revenue: 1820000,
      expenses: 960000,
      transactions: 28,
      trend: [
        { label: "Week 1", revenue: 380000, expenses: 210000 },
        { label: "Week 2", revenue: 440000, expenses: 240000 },
        { label: "Week 3", revenue: 495000, expenses: 260000 },
        { label: "Week 4", revenue: 505000, expenses: 250000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 380000 },
        { nameKey: "profitLoss.categories.equipment", value: 160000 },
        { nameKey: "profitLoss.categories.transportation", value: 220000 },
        { nameKey: "profitLoss.categories.labour", value: 120000 },
        { nameKey: "profitLoss.categories.packaging", value: 80000 },
      ],
    },
    quarterly: {
      revenue: 5640000,
      expenses: 3120000,
      transactions: 92,
      trend: [
        { label: "July", revenue: 1720000, expenses: 980000 },
        { label: "August", revenue: 1980000, expenses: 1080000 },
        { label: "September", revenue: 1940000, expenses: 1060000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 1240000 },
        { nameKey: "profitLoss.categories.equipment", value: 540000 },
        { nameKey: "profitLoss.categories.transportation", value: 680000 },
        { nameKey: "profitLoss.categories.labour", value: 420000 },
        { nameKey: "profitLoss.categories.packaging", value: 240000 },
      ],
    },
  },

  "user-freshmart": {
    name: "FreshMart Retail Chain",
    weekly: {
      revenue: 298000,
      expenses: 162000,
      transactions: 6,
      trend: [
        { label: "Mon", revenue: 38000, expenses: 22000 },
        { label: "Tue", revenue: 42000, expenses: 26000 },
        { label: "Wed", revenue: 48000, expenses: 24000 },
        { label: "Thu", revenue: 50000, expenses: 28000 },
        { label: "Fri", revenue: 58000, expenses: 31000 },
        { label: "Sat", revenue: 62000, expenses: 31000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 45000 },
        { nameKey: "profitLoss.categories.equipment", value: 22000 },
        { nameKey: "profitLoss.categories.transportation", value: 49000 },
        { nameKey: "profitLoss.categories.labour", value: 28000 },
        { nameKey: "profitLoss.categories.packaging", value: 18000 },
      ],
    },
    monthly: {
      revenue: 1340000,
      expenses: 745000,
      transactions: 34,
      trend: [
        { label: "Week 1", revenue: 310000, expenses: 175000 },
        { label: "Week 2", revenue: 330000, expenses: 185000 },
        { label: "Week 3", revenue: 345000, expenses: 190000 },
        { label: "Week 4", revenue: 355000, expenses: 195000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 210000 },
        { nameKey: "profitLoss.categories.equipment", value: 115000 },
        { nameKey: "profitLoss.categories.transportation", value: 220000 },
        { nameKey: "profitLoss.categories.labour", value: 125000 },
        { nameKey: "profitLoss.categories.packaging", value: 75000 },
      ],
    },
    quarterly: {
      revenue: 4120000,
      expenses: 2310000,
      transactions: 104,
      trend: [
        { label: "July", revenue: 1280000, expenses: 720000 },
        { label: "August", revenue: 1420000, expenses: 790000 },
        { label: "September", revenue: 1420000, expenses: 800000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 680000 },
        { nameKey: "profitLoss.categories.equipment", value: 360000 },
        { nameKey: "profitLoss.categories.transportation", value: 690000 },
        { nameKey: "profitLoss.categories.labour", value: 360000 },
        { nameKey: "profitLoss.categories.packaging", value: 220000 },
      ],
    },
  },

  "user-organicbuyers": {
    name: "Organic Buyers Co",
    weekly: {
      revenue: 470000,
      expenses: 242000,
      transactions: 3,
      trend: [
        { label: "Mon", revenue: 65000, expenses: 35000 },
        { label: "Tue", revenue: 70000, expenses: 40000 },
        { label: "Wed", revenue: 85000, expenses: 42000 },
        { label: "Thu", revenue: 75000, expenses: 38000 },
        { label: "Fri", revenue: 85000, expenses: 45000 },
        { label: "Sat", revenue: 90000, expenses: 42000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 92000 },
        { nameKey: "profitLoss.categories.equipment", value: 36000 },
        { nameKey: "profitLoss.categories.transportation", value: 54000 },
        { nameKey: "profitLoss.categories.labour", value: 38000 },
        { nameKey: "profitLoss.categories.packaging", value: 22000 },
      ],
    },
    monthly: {
      revenue: 2050000,
      expenses: 1080000,
      transactions: 19,
      trend: [
        { label: "Week 1", revenue: 480000, expenses: 260000 },
        { label: "Week 2", revenue: 510000, expenses: 270000 },
        { label: "Week 3", revenue: 530000, expenses: 280000 },
        { label: "Week 4", revenue: 530000, expenses: 270000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 420000 },
        { nameKey: "profitLoss.categories.equipment", value: 160000 },
        { nameKey: "profitLoss.categories.transportation", value: 240000 },
        { nameKey: "profitLoss.categories.labour", value: 160000 },
        { nameKey: "profitLoss.categories.packaging", value: 100000 },
      ],
    },
    quarterly: {
      revenue: 6180000,
      expenses: 3290000,
      transactions: 68,
      trend: [
        { label: "July", revenue: 1920000, expenses: 1020000 },
        { label: "August", revenue: 2120000, expenses: 1140000 },
        { label: "September", revenue: 2140000, expenses: 1130000 },
      ],
      categories: [
        { nameKey: "profitLoss.categories.fertilizer", value: 1290000 },
        { nameKey: "profitLoss.categories.equipment", value: 490000 },
        { nameKey: "profitLoss.categories.transportation", value: 740000 },
        { nameKey: "profitLoss.categories.labour", value: 480000 },
        { nameKey: "profitLoss.categories.packaging", value: 290000 },
      ],
    },
  },
};

export const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: "eq-1",
    name: "Mahindra 575 DI 45HP Tractor",
    category: "Tractor & Tillage",
    isRental: true,
    isSale: true,
    rentalRate: 850,
    rentalUnit: "hour",
    purchasePrice: 690000,
    supplier: "AgriEquip Hub",
    location: "Salem (Radius 40 km)",
    image: "🚜",
    specs: "4 Cylinder, 45 HP, Dual Clutch, Hydrostatic Power Steering",
    available: true,
  },
  {
    id: "eq-2",
    name: "DJI Agras T40 Precision Drone Sprayer",
    category: "Drone Technology",
    isRental: true,
    isSale: true,
    rentalRate: 500,
    rentalUnit: "acre",
    purchasePrice: 850000,
    supplier: "AeroAgri Robotics",
    location: "Trichy (Radius 60 km)",
    image: "🛸",
    specs: "40L Spray Tank, 50kg Spreading Payload, Active Phased Array Radar",
    available: true,
  },
  {
    id: "eq-3",
    name: "Yanmar Paddy Combine Harvester AW70V",
    category: "Harvesting",
    isRental: true,
    isSale: false,
    rentalRate: 2300,
    rentalUnit: "hour",
    supplier: "Tamil Nadu Agro Machinery",
    location: "Thanjavur (Delta Region)",
    image: "🌾",
    specs: "70 HP Diesel, Rubber Crawler Track for Deep Muddy Paddy Fields",
    available: true,
  },
  {
    id: "eq-4",
    name: "VST Shakti 130DI Power Tiller",
    category: "Tillage & Weeding",
    isRental: true,
    isSale: true,
    rentalRate: 350,
    rentalUnit: "hour",
    purchasePrice: 215000,
    supplier: "Kisan Tools Co",
    location: "Coimbatore",
    image: "⚙️",
    specs: "13 HP Direct Injection Diesel, Rotary Tiller with 16 Blades",
    available: true,
  },
];

export const INITIAL_PRODUCE_LISTINGS: ProduceListing[] = [
  {
    id: "prod-1",
    farmerId: "user-rajesh",
    farmerName: "Rajesh Kumar",
    crop: "Paddy (Ponni Raw)",
    variety: "Deluxe Ponni Single Harvest",
    quantity: 60,
    unit: "Quintals",
    farmerPrice: 2300,
    mandiPrice: 2250,
    isFairPrice: true,
    location: "Thanjavur, Delta Block",
    harvestDate: "2026-09-10",
  },
  {
    id: "prod-2",
    farmerId: "user-sita",
    farmerName: "Sita Devi",
    crop: "Wheat (Sharbati Gold)",
    variety: "MP Sharbati Grade-A",
    quantity: 40,
    unit: "Quintals",
    farmerPrice: 2420,
    mandiPrice: 2380,
    isFairPrice: true,
    location: "Madurai, Vadipatti",
    harvestDate: "2026-09-12",
  },
  {
    id: "prod-3",
    farmerId: "user-rajesh",
    farmerName: "Rajesh Kumar",
    crop: "Hybrid Yellow Maize",
    variety: "Pioneer 3302",
    quantity: 25,
    unit: "Quintals",
    farmerPrice: 2180,
    mandiPrice: 2150,
    isFairPrice: true,
    location: "Thanjavur, Orathanadu",
    harvestDate: "2026-09-15",
  },
  {
    id: "prod-4",
    farmerId: "user-sita",
    farmerName: "Sita Devi",
    crop: "Cotton (Medium Staple)",
    variety: "BT-2 Premium Long Staple",
    quantity: 18,
    unit: "Quintals",
    farmerPrice: 7150,
    mandiPrice: 6980,
    isFairPrice: true,
    location: "Madurai, Usilampatti",
    harvestDate: "2026-09-08",
  },
];

export const INITIAL_BUYER_REQUESTS: BuyerRequest[] = [
  {
    id: "req-101",
    buyerName: "Green Foods Pvt Ltd",
    crop: "Paddy (Ponni Raw)",
    requiredQuantity: "100 Quintals",
    offeredPrice: 2320,
    location: "Delivery to Chennai Warehouse",
    date: "2026-09-18",
    status: "open",
  },
  {
    id: "req-102",
    buyerName: "FreshMart Retail Chain",
    crop: "Country Tomatoes (Grade 1)",
    requiredQuantity: "80 Crates (25kg)",
    offeredPrice: 580,
    location: "Delivery to Coimbatore Distribution Center",
    date: "2026-09-17",
    status: "open",
  },
  {
    id: "req-103",
    buyerName: "Organic Buyers Co",
    crop: "Organic Sharbati Wheat",
    requiredQuantity: "50 Quintals",
    offeredPrice: 2480,
    location: "Delivery to Bengaluru Agro Hub",
    date: "2026-09-19",
    status: "open",
  },
];

export const INITIAL_BULK_ORDERS: BulkOrder[] = [
  {
    id: "ORD-9421",
    buyerName: "Green Foods Pvt Ltd",
    farmerName: "Rajesh Kumar",
    produce: "Paddy (Ponni Raw)",
    quantity: "50 Quintals",
    totalAmount: 115000,
    deliveryDate: "2026-09-22",
    destination: "Ambattur Central Warehouse, Chennai",
    status: "Scheduled",
  },
  {
    id: "ORD-9422",
    buyerName: "Organic Buyers Co",
    farmerName: "Sita Devi",
    produce: "Cotton (Medium Staple)",
    quantity: "15 Quintals",
    totalAmount: 105000,
    deliveryDate: "2026-09-24",
    destination: "Electronic City Logistics Depot, Bengaluru",
    status: "Confirmed",
  },
  {
    id: "ORD-9423",
    buyerName: "FreshMart Retail Chain",
    farmerName: "Rajesh Kumar",
    produce: "Country Tomatoes",
    quantity: "100 Crates",
    totalAmount: 65000,
    deliveryDate: "2026-09-19",
    destination: "Saravanampatti Hub, Coimbatore",
    status: "In Transit",
  },
];

export const INITIAL_AGRONOMIST_QUERIES: AgronomistQuery[] = [
  {
    id: "AGRO-501",
    farmerName: "Rajesh Kumar",
    crop: "Rice / Paddy",
    symptoms:
      "Yellowing of lower leaf margins spreading toward tip, slight brown spotting under stem collar.",
    severity: "Medium",
    date: "2026-09-16",
    status: "answered",
    diagnosis:
      "Potassium (K) deficiency combined with early signs of Brown Plant Hopper (BPH) sucking nymphs.",
    treatment:
      "Apply Muriate of Potash (MOP) @ 25 kg/acre as top dressing. For BPH, spray Triflumezopyrim 10% SC @ 94 ml/acre or Pymetrozine 50% WDG @ 120 g/acre with 200 liters of water directed at base of tillers.",
    advisorName: "Dr. K. Murugan (Agronomist)",
    resolvedDate: "2026-09-17",
  },
  {
    id: "AGRO-502",
    farmerName: "Sita Devi",
    crop: "Cotton",
    symptoms:
      "Upward curling of young tender leaves, stunted vegetative shoots, presence of tiny white flies under leaf canopy.",
    severity: "High",
    date: "2026-09-18",
    status: "answered",
    diagnosis:
      "Severe Whitefly (Bemisia tabaci) infestation carrying Cotton Leaf Curl Virus risk.",
    treatment:
      "Erect yellow sticky traps @ 10 per acre. Spray Diafenthiuron 50% WP @ 250 g/acre or Pyriproxyfen 10% EC @ 400 ml/acre during morning hours. Avoid excessive nitrogen fertilizer.",
    advisorName: "Dr. K. Murugan (Agronomist)",
    resolvedDate: "2026-09-19",
  },
  {
    id: "AGRO-503",
    farmerName: "Rajesh Kumar",
    crop: "Tomato",
    symptoms:
      "Dark water-soaked concentric lesions on mature green fruits and blackening of blossom end.",
    severity: "Medium",
    date: "2026-09-19",
    status: "pending",
  },
];

export const INITIAL_FINANCE_PRODUCTS: FinanceProduct[] = [
  {
    id: "fin-kcc",
    title: "Kisan Credit Card (KCC) Subsidized Loan",
    provider: "NABARD & Nationalized Banks",
    type: "loan",
    interestOrPremium: "4.0% p.a. (with 3% prompt repayment incentive)",
    maxAmountOrCover: "Up to ₹3,00,000 collateral-free",
    tenure: "12 Months Revolving Credit",
    subsidy: "Central Govt 3% Interest Subvention",
    description:
      "Flexible working capital for purchasing high-yield seeds, fertilizers, tractor diesel, and paying seasonal labor wages.",
  },
  {
    id: "fin-solar",
    title: "PM-KUSUM Solar Agricultural Pump Subsidy",
    provider: "Ministry of New and Renewable Energy",
    type: "loan",
    interestOrPremium: "5.5% p.a. on farmer component",
    maxAmountOrCover: "Up to ₹4,50,000 for 7.5 HP Solar Pump",
    tenure: "5 Years Repayment",
    subsidy: "60% Direct Grant (30% Central + 30% State)",
    description:
      "Replace expensive diesel pumps with high-efficiency standalone solar pumps, guaranteeing daylight irrigation.",
  },
  {
    id: "fin-pmfby",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    provider: "Agriculture Insurance Company of India",
    type: "insurance",
    interestOrPremium: "2.0% for Kharif / 1.5% for Rabi",
    maxAmountOrCover: "Full Sum Insured (Up to ₹45,000/acre)",
    tenure: "Full Crop Season (Sowing to Post-Harvest)",
    subsidy: "Balance premium fully subsidized by Central & State Govts",
    description:
      "Comprehensive yield protection against floods, drought, unseasonal cloudbursts, pest outbreaks, and post-harvest cyclone lodging.",
  },
];

export const INITIAL_SEASONAL_ENTRIES: SeasonalFinancialEntry[] = [
  {
    id: "entry-1",
    userId: "user-rajesh",
    type: "income",
    description: "Paddy harvest sale to Green Foods (50 qtl)",
    amount: 115000,
    date: "2026-09-14",
    category: "Harvest Sale",
  },
  {
    id: "entry-2",
    userId: "user-rajesh",
    type: "income",
    description: "Maize wholesale sale at Mandi (20 qtl)",
    amount: 44000,
    date: "2026-09-08",
    category: "Harvest Sale",
  },
  {
    id: "entry-3",
    userId: "user-rajesh",
    type: "expense",
    description: "Bio-NPK Fertilizer bags & micronutrient spray",
    amount: 12500,
    date: "2026-08-28",
    category: "Fertilizer & Seeds",
  },
  {
    id: "entry-4",
    userId: "user-rajesh",
    type: "expense",
    description: "Paddy transplantation labor wages (10 laborers x 3 days)",
    amount: 16500,
    date: "2026-08-10",
    category: "Labour",
  },
  {
    id: "entry-5",
    userId: "user-rajesh",
    type: "expense",
    description: "Tractor ploughing rental (8 hours)",
    amount: 6800,
    date: "2026-08-04",
    category: "Machinery & Fuel",
  },
];

export const SCHEMES_DATABASE: SchemeItem[] = [
  {
    id: "pm-kisan",
    titleEn: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    titleTa: "பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)",
    category: "central",
    authority: "Ministry of Agriculture & Farmers Welfare, Govt of India",
    summaryEn:
      "Direct income support of ₹6,000 per year in three equal instalments of ₹2,000 directly transferred into the Aadhaar-seeded bank accounts of all landholding farmer families.",
    summaryTa:
      "விவசாய நிலம் வைத்துள்ள அனைத்து விவசாய குடும்பங்களுக்கும் ஆண்டுதோறும் ₹6,000 நேரடி உதவித்தொகை (தலா ₹2,000 வீதம் 3 தவணைகளில்) வங்கிக் கணக்கில் நேரடியாக செலுத்தப்படுகிறது.",
    benefitsEn:
      "₹6,000 annual cash support directly to DBT bank accounts with zero middlemen commission.",
    benefitsTa:
      "ஆண்டுக்கு ₹6,000 நேரடி வங்கிப் பரிமாற்றம். இடைத்தரகர்கள் இன்றி விவசாயிகள் கணக்கிற்கே வந்து சேரும்.",
    eligibilityEn:
      "All small and marginal landholding farmer families holding cultivable land in their names. Institutional landholders and income-tax payers are excluded.",
    eligibilityTa:
      "விவசாய நிலம் வைத்துள்ள அனைத்து சிறு மற்றும் குறு விவசாயிகள். வருமான வரி செலுத்துவோர் மற்றும் அரசு ஊழியர்களுக்கு விலக்கு அளிக்கப்பட்டுள்ளது.",
    documentsEn: [
      "Aadhaar Card linked with mobile number",
      "Land ownership document (Patta / Chitta / Land Record)",
      "Aadhaar-seeded Active Bank Account Passbook",
    ],
    documentsTa: [
      "மொபைல் எண்ணுடன் இணைக்கப்பட்ட ஆதார் அட்டை",
      "நில உரிமையாளர் பட்டா / சிட்டா ஆவணம்",
      "ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்",
    ],
    portalUrl: "https://pmkisan.gov.in",
  },
  {
    id: "pmfby",
    titleEn: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    titleTa: "பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம் (PMFBY)",
    category: "central",
    authority: "Ministry of Agriculture & Farmers Welfare & Insurance Companies",
    summaryEn:
      "Comprehensive safety net providing financial support to farmers suffering crop loss/damage arising out of unforeseen non-preventable natural calamities like floods, cyclones, drought, and pest outbreaks.",
    summaryTa:
      "வெள்ளம், வறட்சி, சூறாவளி மற்றும் பூச்சித் தாக்குதல் போன்ற இயற்கை இடர்பாடுகளால் பயிர்களுக்கு ஏற்படும் சேதங்களுக்கு முழுமையான நிதி இழப்பீடு வழங்கும் தேசிய காப்பீட்டுத் திட்டம்.",
    benefitsEn:
      "Lowest premium in the world (2% for Kharif, 1.5% for Rabi, 5% for horticultural crops). Complete claim settlement directly credited.",
    benefitsTa:
      "மிகக் குறைந்த பிரீமியம் (காரீப் பயிருக்கு 2%, ரபி பயிருக்கு 1.5%). இழப்பீட்டுத் தொகை நேரடியாக வங்கிக் கணக்கில் சேர்க்கப்படும்.",
    eligibilityEn:
      "All farmers growing notified crops in notified areas including tenant farmers and sharecroppers.",
    eligibilityTa:
      "அறிவிக்கப்பட்ட பகுதிகளில் அறிவிக்கப்பட்ட பயிர்களை சாகுபடி செய்யும் அனைத்து விவசாயிகள் மற்றும் குத்தகைதாரர்கள்.",
    documentsEn: [
      "Aadhaar Card",
      "Sowing Certificate from Village Administrative Officer (VAO)",
      "Land Revenue Receipt / Patta",
      "Bank Passbook copy",
    ],
    documentsTa: [
      "ஆதார் அட்டை",
      "கிராம நிர்வாக அலுவலர் (VAO) வழங்கிய பயிர் சாகுபடி சான்றிதழ்",
      "நில உரிமை பட்டா / அடங்கல்",
      "வங்கி கணக்கு புத்தக நகல்",
    ],
    portalUrl: "https://pmfby.gov.in",
  },
  {
    id: "soil-health-card",
    titleEn: "Soil Health Card Scheme (SHC)",
    titleTa: "மண் வள அட்டை திட்டம்",
    category: "central",
    authority: "Department of Agriculture and Farmers Welfare",
    summaryEn:
      "Provides soil test reports to farmers every 2 years indicating the nutritional status of 12 vital chemical and micronutrient parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) alongside customized fertilizer recommendations.",
    summaryTa:
      "ஒவ்வொரு 2 ஆண்டுகளுக்கும் விவசாயிகளின் மண் மாதிரிகளை பரிசோதித்து 12 ஊட்டச்சத்து நிலைகள் குறித்த அறிக்கை மற்றும் தேவையான உர அளவு பரிந்துரைகள் வழங்கப்படுகின்றன.",
    benefitsEn:
      "Saves 15-20% on unnecessary fertilizer costs while preventing soil degradation and increasing crop yield by 10-15%.",
    benefitsTa:
      "தேவையற்ற உரச் செலவை 15-20% குறைக்கிறது, மண்ணின் வளத்தை பாதுகாக்கிறது மற்றும் மகசூலை 10-15% அதிகரிக்கிறது.",
    eligibilityEn: "All cultivating farmers across all agricultural districts.",
    eligibilityTa: "அனைத்து வேளாண் மாவட்டங்களிலும் உள்ள அனைத்து விவசாயிகளும் தகுதியானவர்கள்.",
    documentsEn: ["Farmer Land Record / Survey Number", "Aadhaar Card"],
    documentsTa: ["விவசாய நிலத்தின் புல எண் (சர்வே எண்)", "ஆதார் அட்டை"],
    portalUrl: "https://soilhealth.dac.gov.in",
  },
  {
    id: "kalaignar-scheme",
    titleEn:
      "Kalaignarin All Village Integrated Agriculture Development Programme",
    titleTa: "கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சித் திட்டம்",
    category: "state",
    authority: "Department of Agriculture, Govt of Tamil Nadu",
    summaryEn:
      "State flagship initiative converting fallow lands into cultivable farmlands, distributing free tree saplings, farm ponds, high-yield vegetable seed kits, and micro-irrigation systems across Tamil Nadu village panchayats.",
    summaryTa:
      "தமிழ்நாட்டின் கிராம ஊராட்சிகளில் தரிசு நிலங்களை விளைநிலங்களாக மாற்றுதல், இலவச மரக்கன்றுகள், பண்ணைக் குட்டைகள் மற்றும் நுண்ணீர்ப்பாசன அமைப்புகளை வழங்கும் முதன்மை திட்டம்.",
    benefitsEn:
      "100% subsidy on micro-irrigation for small/marginal farmers, free sprayers, and community farm pond development.",
    benefitsTa:
      "சிறு/குறு விவசாயிகளுக்கு சொட்டு நீர் பாசனத்திற்கு 100% மானியம், இலவச தெளிப்பான் மற்றும் சமுதாய பண்ணைக் குட்டைகள்.",
    eligibilityEn:
      "Farmers holding lands in selected village panchayats in Tamil Nadu. Preference to small and marginal farmers.",
    eligibilityTa:
      "தேர்வு செய்யப்பட்ட கிராம ஊராட்சிகளில் நிலம் வைத்துள்ள விவசாயிகள். சிறு மற்றும் குறு விவசாயிகளுக்கு முன்னுரிமை.",
    documentsEn: [
      "Tamil Nadu Patta / Chitta",
      "Aadhaar Card",
      "Small / Marginal Farmer Certificate from Tahsildar",
    ],
    documentsTa: [
      "தமிழ்நாடு பட்டா / சிட்டா",
      "ஆதார் அட்டை",
      "வட்டாட்சியர் வழங்கிய சிறு/குறு விவசாயி சான்றிதழ்",
    ],
    portalUrl: "https://tnhorticulture.tn.gov.in",
  },
];

export const FORUM_POSTS: ForumPost[] = [
  {
    id: "post-1",
    author: "Rajesh Kumar",
    authorRole: "Farmer • Thanjavur",
    avatar: "👨‍🌾",
    title: "Best natural method to manage stem borer in Samba paddy season?",
    content:
      "Our Samba paddy crop is currently 35 days old. I'm noticing white ear-heads and central tiller drying in a 2-acre plot. Looking for organic or bio-control recommendations before resorting to heavy chemical sprays.",
    category: "pest",
    date: "2026-09-17",
    upvotes: 14,
    replies: [
      {
        id: "rep-101",
        author: "Dr. K. Murugan (Agronomist)",
        avatar: "🔬",
        content:
          "Install Trichogramma japonicum egg parasitoid cards @ 2 cc (approx 1,00,000 parasites) per acre at 30, 37, and 44 days after transplanting. Also install 8 pheromone traps per acre with Scirpophaga incertulas lures to catch adult moths.",
        date: "2026-09-17",
      },
      {
        id: "rep-102",
        author: "Sita Devi",
        avatar: "👩‍🌾",
        content:
          "We tried neem oil 3% with liquid soap spray last year and it gave great deterrence against female moths laying eggs. Apply early in the evening.",
        date: "2026-09-18",
      },
    ],
  },
  {
    id: "post-2",
    author: "Sita Devi",
    authorRole: "Farmer • Madurai",
    avatar: "👩‍🌾",
    title:
      "Drip irrigation subsidy experience with Tamil Nadu Horticulture department",
    content:
      "Sharing our experience: Small and marginal farmers in TN can receive 100% subsidy for drip installation through the Micro Irrigation scheme. The application requires online registration on the Uzhavan App along with your VAO certificate and land map.",
    category: "irrigation",
    date: "2026-09-15",
    upvotes: 22,
    replies: [
      {
        id: "rep-201",
        author: "Green Foods Pvt Ltd",
        avatar: "🏢",
        content:
          "Drip irrigation significantly improves uniform produce sizing and lower water-stress marks, making procurement grading much higher!",
        date: "2026-09-16",
      },
    ],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    titleEn:
      "Precision Agriculture 2026: How Autonomous Drones Are Revolutionizing Input Efficiency",
    titleTa:
      "துல்லிய விவசாயம் 2026: தானியங்கி ட்ரோன்கள் எவ்வாறு இடுபொருள் திறனை புரட்சிகரமாக்குகின்றன",
    author: "Dr. K. Murugan, Senior Agronomist",
    date: "2026-09-15",
    category: "Technology",
    readTime: "4 min",
    image: "🛰️",
    summaryEn:
      "Drone spraying uses 90% less water and reduces chemical run-off by targeting micro-droplets directly on canopy foliage.",
    summaryTa:
      "ட்ரோன் தெளித்தல் 90% குறைந்த தண்ணீரைப் பயன்படுத்துகிறது மற்றும் ரசாயன விரயத்தை கணிசமாகக் குறைக்கிறது.",
    contentEn:
      "Agricultural drone spraying has transformed from an experimental luxury to an essential commercial tool for Indian farming. By deploying multispectral imaging alongside ultra-low volume (ULV) nozzles, farmers can complete 1 acre of crop protection in under 8 minutes. The targeted delivery saves over 25% of input costs and eliminates human exposure to toxic pesticide sprays.",
    contentTa:
      "விவசாய ட்ரோன் தெளிப்பு முறை இப்போது அத்தியாவசிய வணிகக் கருவியாக மாறியுள்ளது. பல நிறமாலை புகைப்படக் கருவிகளுடன் இணைக்கப்பட்ட ட்ரோன்கள் வெறும் 8 நிமிடங்களில் 1 ஏக்கர் தெளிப்பை முடிக்கின்றன. இது இடுபொருள் செலவை 25% குறைப்பதுடன் மனிதர்களுக்கு ஏற்படும் விஷ பாதிப்புகளை முற்றிலும் தடுக்கிறது.",
  },
  {
    id: "blog-2",
    titleEn:
      "Understanding Mandi Fair Price Indicators: Safeguarding Farmer Margins",
    titleTa:
      "மண்டி நியாய விலை குறியீட்டைப் புரிந்துகொள்வது: விவசாயிகளின் லாபத்தைப் பாதுகாத்தல்",
    author: "AgriTech Market Research Desk",
    date: "2026-09-12",
    category: "Economics",
    readTime: "5 min",
    image: "📈",
    summaryEn:
      "How transparent live pricing algorithms bridge the gap between APMC wholesale rates and farmer gate price realization.",
    summaryTa:
      "ஒழுங்குமுறை விற்பனைக்கூட மொத்த விலைகளுக்கும் விவசாயிகளின் நேரடி பண்ணை விலைகளுக்கும் இடையிலான இடைவெளியை AI எவ்வாறு குறைக்கிறது.",
    contentEn:
      "Traditionally, small farmers have faced price opacity where village aggregators purchase crops at steep discounts. AgriTech's Fair Price Indicator aggregates daily arrivals and weighted averages across 48 nearby APMC mandis, equipping farmers with real-time bargaining leverage and allowing them to sell directly to wholesale buyers at verified fair rates.",
    contentTa:
      "பாரம்பரியமாக கிராமப்புற இடைத்தரகர்கள் குறைந்த விலைக்கு விளைபொருட்களை வாங்கி வந்தனர். அக்ரிடெக் நியாய விலை குறியீட்டு முறை 48 ஒழுங்குமுறை விற்பனைக்கூடங்களின் சராசரி விலையை நேரடியாக விவசாயிகளுக்கு தெரியப்படுத்துகிறது.",
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    titleEn:
      "Northeast Monsoon Forecast: IMD Predicts Favourable Rains for Southern Peninsular Agriculture",
    titleTa:
      "வடகிழக்கு பருவமழை முன்னறிவிப்பு: தென் தீபகற்ப விவசாயத்திற்கு சாதகமான மழை பெய்யும் என வானிலை மையம் கணிப்பு",
    source: "Indian Meteorological Department / AgriNews",
    date: "2026-09-19",
    isBreaking: true,
    summaryEn:
      "The IMD has issued an advisory stating normal to above-normal precipitation across Tamil Nadu, Andhra Pradesh, and Karnataka, providing ample reservoir storage for upcoming winter rabi sowing.",
    summaryTa:
      "தமிழ்நாடு மற்றும் ஆந்திரா பகுதிகளில் வழக்கமான அளவை விட அதிக மழை பெய்ய வாய்ப்புள்ளதால் குளிர்கால ரபி பயிர் சாகுபடிக்கு போதுமான நீர் இருப்பு கிடைக்கும் என வானிலை மையம் தெரிவித்துள்ளது.",
  },
  {
    id: "news-2",
    titleEn:
      "Centre Increases Minimum Support Price (MSP) for Wheat by ₹150 per Quintal for 2026-27",
    titleTa:
      "2026-27 ஆம் ஆண்டிற்கு கோதுமைக்கான குறைந்தபட்ச ஆதரவு விலையை (MSP) குவிண்டாலுக்கு ₹150 உயர்த்தியது மத்திய அரசு",
    source: "Ministry of Agriculture Bulletin",
    date: "2026-09-18",
    isBreaking: false,
    summaryEn:
      "In a decisive move to incentivize food grain production, the Cabinet Committee on Economic Affairs has raised wheat MSP to ensure a guaranteed 100% margin over the weighted all-India cost of production.",
    summaryTa:
      "தானிய உற்பத்தியை ஊக்குவிக்கும் வகையில் கோதுமைக்கான குறைந்தபட்ச ஆதரவு விலையை அரசு உயர்த்தியுள்ளது.",
  },
  {
    id: "news-3",
    titleEn:
      "Tamil Nadu Launches Solar Micro-Grid Subsidies for Remote Agricultural Pump-Sets",
    titleTa:
      "தமிழ்நாட்டில் தொலைதூர விவசாய பம்புசெட்டுகளுக்கு சூரிய மின்சார மைக்ரோ-கிரிட் மானியம் தொடக்கம்",
    source: "TANGEDCO / Agriculture Dept",
    date: "2026-09-17",
    isBreaking: false,
    summaryEn:
      "Farmers in off-grid rural areas can now avail up to 70% capital subsidies for community solar solar micro-grids, eliminating long waiting lists for traditional agricultural power connections.",
    summaryTa:
      "மின்சார இணைப்பு இல்லாத கிராமப்புற விவசாயிகளுக்கு 70% மானியத்தில் சோலார் மைக்ரோ கிரிட் அமைக்கும் திட்டம் அறிவிக்கப்பட்டுள்ளது.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "general",
    questionEn: "How does AgriTech eliminate intermediaries and benefit farmers?",
    questionTa: "அக்ரிடெக் தளம் இடைத்தரகர்களை எவ்வாறு களைந்து விவசாயிகளுக்கு உதவுகிறது?",
    answerEn:
      "AgriTech directly matches verified farmers with wholesale procurement entities, food processors, and grocery chains. Farmers see live Mandi benchmark rates and receive immediate payment settlements without commission cuts.",
    answerTa:
      "அக்ரிடெக் விவசாயிகள் மற்றும் கொள்முதல் நிறுவனங்களை நேரடியாக இணைக்கிறது. ஒழுங்குமுறை விற்பனைக்கூட நேரலை விலைகள் காட்டப்படுவதால் இடைத்தரகர்களின் கமிஷன் இன்றி முழுத் தொகையும் விவசாயிக்கே கிடைக்கிறது.",
  },
  {
    id: "faq-2",
    category: "farming",
    questionEn: "How does the Fertilizer Recommendation calculator work?",
    questionTa: "உரப் பரிந்துரை கால்குலேட்டர் எவ்வாறு செயல்படுகிறது?",
    answerEn:
      "Our scientific calculator takes into account your crop type (e.g. Paddy, Wheat, Cotton), specific soil classification (Alluvial, Black, Red, Clay), and acreage to determine the exact NPK kilograms and organic compost requirements according to ICAR agricultural standards.",
    answerTa:
      "பயிர் வகை, மண் வகை மற்றும் ஏக்கர் பரப்பளவை உள்ளீடு செய்வதன் மூலம் ICAR மற்றும் TNAU வழிகாட்டுதலின்படி துல்லியமான NPK தழைச்சத்து, மணிச்சத்து மற்றும் சாம்பல் சத்து அளவுகளை இது கணக்கிட்டு தருகிறது.",
  },
  {
    id: "faq-3",
    category: "trading",
    questionEn: "How are payments and bulk delivery scheduled on AgriTech?",
    questionTa: "அக்ரிடெக்கில் பணப்பரிவர்த்தனை மற்றும் மொத்த விநியோகம் எவ்வாறு திட்டமிடப்படுகிறது?",
    answerEn:
      "When a buyer accepts produce or creates a bulk order, delivery dates and warehouse checkpoints are locked in. Both parties can track transport logistics and payments are settled securely upon digital receipt verification.",
    answerTa:
      "வாங்குபவர் ஆர்டரை உறுதி செய்தவுடன் விநியோக தேதி மற்றும் கிடங்கு முகவரி பதிவு செய்யப்படுகிறது. பொருட்கள் சரிபார்க்கப்பட்டு மின்னணு முறையில் வரவு-செலவு ஏட்டில் தொகை பதிவு செய்யப்படும்.",
  },
  {
    id: "faq-4",
    category: "equipment",
    questionEn: "Can I rent farm equipment like tractors and drones by the hour?",
    questionTa: "டிராக்டர் மற்றும் ட்ரோன் போன்ற உபகரணங்களை மணிநேர அடிப்படையில் வாடகைக்கு எடுக்க முடியுமா?",
    answerEn:
      "Yes! Registered equipment owners offer tractors, harvesters, and spray drones for hourly, daily, or per-acre rentals. You can review supplier verification and request bookings directly through the Equipment section.",
    answerTa:
      "ஆம்! டிராக்டர்கள், அறுவடை இயந்திரங்கள் மற்றும் பூச்சிக்கொல்லி தெளிக்கும் ட்ரோன்களை மணிநேர அல்லது ஏக்கர் அடிப்படையில் வாடகைக்கு முன்பதிவு செய்யலாம்.",
  },
];
