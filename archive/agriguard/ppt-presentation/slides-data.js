// Presentation Slide Deck Data Structure - Samarth Foundation Proposal Entry
// Theme: Rayalaseema Green Industrial Grid (RGIG)

const presentationMeta = {
  title: "Rayalaseema Green Industrial Grid (RGIG)",
  subtitle: "Decentralized Agri-Waste Hubs for Sustainable Industrial Development",
  author: "Samarth Foundation Call for Ideas Proposal",
  date: "August 2026",
  theme: "theme-glass"
};

const initialSlidesData = [
  {
    id: "slide-1",
    type: "hero",
    badge: "SAMARTH FOUNDATION COMPETITION PROPOSAL",
    title: "Rayalaseema Green Industrial Grid (RGIG)",
    subtitle: "Transforming regional agricultural residues into high-value eco-industrial manufacturing & rural employment.",
    image: "assets/hero_agri.jpg",
    bullets: [
      "Themes: Industrial Development & Sustainable Environment",
      "Concept: Village-Level Biomass & Fibre Processing Hubs",
      "Target Region: Rayalaseema (Anantapur, Kurnool, Kadapa, Chittoor, Tirupati)"
    ],
    notes: "Respected Judges, welcome to our proposal: The Rayalaseema Green Industrial Grid (RGIG). Instead of viewing agricultural waste as an environmental burden, RGIG converts crop residues into raw materials for high-value industrial manufacturing, creating a new economic engine for Rayalaseema."
  },
  {
    id: "slide-2",
    type: "stats",
    badge: "THE REGIONAL CHALLENGE",
    title: "Water Scarcity & Unutilized Crop Residues",
    subtitle: "Rayalaseema produces millions of tonnes of agricultural biomass currently burnt or wasted due to groundwater stress.",
    image: "assets/agri_waste.jpg",
    stats: [
      { value: "3.2M Tons", label: "Agri-Waste Generated", note: "Groundnut shells, cotton & banana residue" },
      { value: "₹0 Value", label: "Farmer Return for Waste", note: "Crop residues currently burnt or dumped" },
      { value: "85% Stress", label: "Groundwater Depletion", note: "Limits water-heavy traditional factories" },
      { value: "72% Youth", label: "Rural Migration Rate", note: "Due to lack of local manufacturing jobs" }
    ],
    notes: "Rayalaseema faces severe groundwater stress, making traditional water-heavy manufacturing difficult. Meanwhile, over 3 million tonnes of crop waste are burnt every year. RGIG turns this environmental challenge into our strongest economic asset."
  },
  {
    id: "slide-3",
    type: "grid",
    badge: "PROPOSED INNOVATION",
    title: "Decentralized Village Processing Hubs",
    subtitle: "A closed-loop economic model: Farmer → Collection → Processing → Industrial Sales.",
    cards: [
      {
        icon: "🌾",
        title: "1. Village Collection Hubs",
        desc: "Farmers sell groundnut shells, cotton stalks, and banana husk directly to local village centers."
      },
      {
        icon: "⚙️",
        title: "2. Micro-Processing Units",
        desc: "Decentralized, low-water machines convert raw residue into pellets, fibres, and biochar."
      },
      {
        icon: "📦",
        title: "3. High-Value Manufacturing",
        desc: "Produces industrial fuel pellets, bio-packaging boards, and soil-enriching biochar."
      },
      {
        icon: "💻",
        title: "4. Digital Grid & Supply",
        desc: "Centralized marketplace connects hubs directly to regional industrial buyers in Tirupati & Anantapur."
      }
    ],
    notes: "Here is the RGIG architecture. Small processing units near villages pay farmers on the spot for crop residues, local youth operate the machinery, and finished eco-products are shipped to nearby industrial buyers."
  },
  {
    id: "slide-4",
    type: "grid",
    badge: "PRODUCT MATRIX & REVENUE",
    title: "3 High-Value Eco-Industrial Product Lines",
    subtitle: "Zero freshwater consumption required during primary processing.",
    image: "assets/bio_products.jpg",
    cards: [
      {
        icon: "🔥",
        title: "Biomass Pellets & Briquettes",
        desc: "High-calorific eco-fuel replacing coal for industrial boilers, brick kilns, and thermal units."
      },
      {
        icon: "📦",
        title: "Agri-Fibre Bio-Packaging",
        desc: "Biodegradable packaging material & particle boards produced from banana husk & cotton stalks."
      },
      {
        icon: "🌱",
        title: "Bio-Char Soil Improver",
        desc: "Carbon-rich soil modifier that increases soil moisture retention by +40% in drought fields."
      },
      {
        icon: "💰",
        title: "Triple Revenue Model",
        desc: "Direct product sales + Carbon credit monetization + Industrial waste management fees."
      }
    ],
    notes: "RGIG manufactures three high-demand items: biomass fuel pellets that replace coal in industrial boilers, biodegradable packaging, and moisture-retaining bio-char that directly helps Rayalaseema's drought-prone soil."
  },
  {
    id: "slide-5",
    type: "stats",
    badge: "EMPIRICAL IMPACT & ROI",
    title: "Economic & Social Impact Projections",
    subtitle: "Calculated 3-Year Projection per 10-Hub Village Cluster.",
    stats: [
      { value: "+₹18,000", label: "Annual Farmer Income", note: "Per smallholder selling crop waste" },
      { value: "450+ Jobs", label: "Rural Youth Jobs", note: "Direct employment per 10-hub cluster" },
      { value: "120,000 T", label: "CO2 Offset / Year", note: "Replacing fossil fuels & stopping burning" },
      { value: "14 Months", label: "Hub Payback Period", note: "Rapid ROI with low capital expenditure" }
    ],
    notes: "The financial feasibility is compelling. A single cluster of 10 village hubs boosts farmer income by ₹18,000 per year, creates 450 local jobs, and pays back initial capital in just 14 months."
  },
  {
    id: "slide-6",
    type: "split",
    badge: "3-PHASE EXECUTION PLAN",
    title: "Implementation Roadmap & Scalability",
    subtitle: "Phased rollout from pilot hubs in Anantapur to a regional Rayalaseema grid.",
    items: [
      { phase: "Phase 1 (Months 1–6)", title: "Pilot Launch in Anantapur & Kurnool", desc: "Deploy 2 Pilot Hubs; sign off-take agreements with local industrial boiler units." },
      { phase: "Phase 2 (Months 7–18)", title: "10-Hub Grid & Skill Center", desc: "Scale to 10 Village Hubs; launch digital marketplace app & youth machinery training program." },
      { phase: "Phase 3 (Months 19–36)", title: "Regional RGIG Expansion (50+ Hubs)", desc: "Establish full regional grid across Tirupati, Kadapa, Chittoor & integrate carbon credit trading." }
    ],
    notes: "We start with a 2-hub pilot in Anantapur & Kurnool within 6 months, expand to 10 hubs in Phase 2, and build a 50-hub regional grid by Year 3. RGIG connects sustainable environment with industrial development!"
  }
];
