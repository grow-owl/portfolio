import { videoCategories } from "./videoCategoriesData";

// Detailed 3 execution examples per video format matching the PDF guide
export const videoFormatExamples = {
  hospitality: {
    "location-walkthrough": [
      {
        id: "ex-1",
        title: "Siliguri Cafe Walkthrough: Sevoke Road Route & Entry",
        angle: "Landmark Proximity & Route Guide",
        hook: "Siliguri mein ye aesthetic café exactly kahan hai? Sevoke Road se yahan kaise pahunchna hai...",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Cozy Rooftop Seating & Sunset Lighting",
        angle: "Evening Ambience Tour",
        hook: "The quietest rooftop sunset spot in town with fairy lights and warm acoustic music.",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-3",
        title: "Speciality Coffee Bar & Workspace Tour",
        angle: "Remote Work & High-Speed Wi-Fi",
        hook: "Looking for a peaceful cafe in [City] with charging ports and high-speed Wi-Fi?",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "process-transformation": [
      {
        id: "ex-1",
        title: "Raw Ingredients → High Flame Cooking → Plating",
        angle: "Full Kitchen Process Breakdown",
        hook: "Watch how our signature slow-cooked gravy is prepared fresh from raw spices at 6 AM.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Woodfired Pizza: 48h Dough to Table Serving",
        angle: "Fermentation Craft to Crisp Crust",
        hook: "Behind every 5-star pizza is 48 hours of natural dough fermentation you never see.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "Tossing Pasta Live in Giant Parmesan Wheel",
        angle: "Culinary Plating Artistry",
        hook: "Watch what happens when steaming fettuccine meets pure aged parmesan cheese wheel...",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "behind-the-scenes": [
      {
        id: "ex-1",
        title: "Restaurant Opening Se 1 Hour Pehle Kitchen Prep",
        angle: "Morning Hygiene & Workstation Setup",
        hook: "What happens inside our kitchen 1 hour before our doors open at 11 AM...",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Fresh Farm Vegetable Unboxing & Quality Inspection",
        angle: "Ingredient Transparency",
        hook: "Every single morning at 6:30 AM: Inspecting crisp farm vegetables and fresh dairy.",
        image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Barista Espresso Calibration & Dial-In",
        angle: "Specialty Coffee ASMR",
        hook: "Dialing in the perfect espresso grind before the morning rush begins.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "day-in-the-life": [
      {
        id: "ex-1",
        title: "Day-in-the-Life of a Restaurant Owner",
        angle: "Morning Mandi to Accounts Closing",
        hook: "5:30 AM Mandi visit → 11 AM kitchen rush → 11 PM accounts closing: A real day in my life.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-2",
        title: "Head Chef 12-Hour Shift Routine",
        angle: "Culinary Leadership & Passion",
        hook: "12 hours on his feet leading 8 line cooks — meet our executive chef.",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-3",
        title: "Behind-The-Counter Barista Daily Shift",
        angle: "Coffee Brewing & Customer Smiles",
        hook: "Making 250+ artisan coffees every day: Here is what a barista shift looks like.",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "event-launch": [
      {
        id: "ex-1",
        title: "New Restaurant Grand Opening Ribbon Cutting",
        angle: "Opening Hype & VIP Guests",
        hook: "Grand opening highlights: Ribbon cutting, first dish tastings, and electric crowd energy!",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Friday Live Acoustic & Candlelight Night",
        angle: "Weekend Musical Ambience",
        hook: "Your Friday dinner plans just got a live acoustic upgrade at [Restaurant Name].",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Seasonal Winter Tasting Menu Launch",
        angle: "Limited Time Exclusivity",
        hook: "Available for 14 days only: Our chef's winter seasonal menu has officially dropped.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "storytelling-reel": [
      {
        id: "ex-1",
        title: "Customer's Unusual Late-Night Request",
        angle: "Surprising Real Hospitality Story",
        hook: "Ek customer hamare restaurant mein aaya aur usne ek aisi request ki jo humne pehle kabhi nahi suni thi...",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-2",
        title: "How A Recipe From 1984 Became Our Bestseller",
        angle: "Heritage Family Secret",
        hook: "My grandmother's secret spice blend that saved our family restaurant from closing.",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-3",
        title: "The Table 7 Anniversary Tradition",
        angle: "Heartwarming Customer Connection",
        hook: "Why this couple has booked Table 7 on the exact same date for 6 years straight.",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
    ],
  },
  automotive: {
    "service-showcase": [
      {
        id: "ex-1",
        title: "Dirty Car → Snow Foam → Polish → Interior Delivery",
        angle: "Step-by-Step Detailing Experience",
        hook: "Watch the full 5-stage detailing journey from muddy exterior to factory showroom shine.",
        image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Leather Deep Scrub & Steam Sanitize ASMR",
        angle: "Interior Cabin Deep Clean",
        hook: "Years of accumulated grime removed from cream leather seats in 45 seconds.",
        image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Ceramic Coating 9H Hydrophobic Water Beading",
        angle: "Water & Chemical Resistance Test",
        hook: "Pouring muddy water on 9H ceramic coating: Watch how water instantly beads off!",
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "before-after": [
      {
        id: "ex-1",
        title: "Bonnet Split: Swirl Marks vs Mirror Paint",
        angle: "50/50 Dual Stage Compound Cut",
        hook: "Look at this dramatic split view: Heavy swirl marks on the left vs crystal clarity on the right.",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Faded Yellow Headlights to Crystal Clear Glass",
        angle: "Oxidation Wet Sanding & UV Seal",
        hook: "Don't replace oxidized yellow headlights — watch us restore them to brand new.",
        image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Muddy Off-Roader to Mirror Ceramic Finish",
        angle: "Full 4x4 Transformation",
        hook: "This SUV spent 3 days in deep mud — look at the final mirror delivery reveal!",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "how-to-tutorial": [
      {
        id: "ex-1",
        title: "Car Ka Tyre Pressure Correctly Kaise Check Karein?",
        angle: "Cold Tyre PSI Measurement",
        hook: "Car ka tyre pressure correctly kaise check karein taaki mileage aur tyre life dono badhein?",
        image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Engine Oil Dipstick & Viscosity Inspection",
        angle: "Preventing Engine Seizure",
        hook: "Engine oil kab aur kaise check karna chahiye? Ye 1-minute habit aapke hazaron bachayegi.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Safe Scratch-Free Two-Bucket Wash Technique",
        angle: "Grit Guard & Microfiber Hygiene",
        hook: "Never wash your car with a single bucket! Here is the scratch-free two-bucket method.",
        image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "comparison-reel": [
      {
        id: "ex-1",
        title: "Normal Car Wash vs Professional Detailing",
        angle: "Acidic Detergent vs pH Neutral Foam",
        hook: "Normal local car wash vs professional detailing: Kyun local wash aapka clear coat kharab karta hai?",
        image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Teflon Coating vs Ceramic 9H vs PPF Film",
        angle: "Protection Level & Longevity",
        hook: "Teflon, Ceramic ya PPF? Aapki car ke liye kaun sa protection option best hai?",
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "Dry Chemical Interior Clean vs Steam Extraction",
        angle: "Bacteria & Odor Elimination",
        hook: "Spray polish vs deep steam extraction: Look at the bacteria vacuumed out of the fabric.",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "tips-and-tricks": [
      {
        id: "ex-1",
        title: "Car Mileage Improve Karne Ke 3 Practical Hacks",
        angle: "Tyre Pressure, Throttle & Air Filter",
        hook: "Car mileage improve karne ke 3 simple aur practical tips jo aap turant follow kar sakte hain.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "How to Safely Remove Bird Droppings Without Scratches",
        angle: "Quick Emergency Paint Care",
        hook: "Never wipe dry bird droppings with a cloth! Do this instead to save your paint clear coat.",
        image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Monsoon Wiper Blade & Windshield Water Repellent",
        angle: "Rain Safety & Clear Visibility",
        hook: "Driving in heavy rain? This 2-minute glass treatment makes wipers almost unnecessary!",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "customer-testimonial": [
      {
        id: "ex-1",
        title: "Car Owner Speechless at Mirror Delivery",
        angle: "Unfiltered Customer Joy",
        hook: "'I honestly thought I was looking at a brand new car from the showroom!'",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Classic Vintage Car Restoration Review",
        angle: "Preserving Family Heritage Vehicle",
        hook: "Customer brings his father's 20-year-old vintage sedan for full restoration.",
        image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-3",
        title: "Daily Commuter Reviews 6-Month Ceramic Performance",
        angle: "Long-Term Dirt Resistance Feedback",
        hook: "6 months after ceramic coating: Here's how easy it is to wash off daily highway dust.",
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
  },
};

// Universal helper to retrieve 3 examples for any category & video type
export function getVideoTypeExamples(categorySlug, videoTypeId, baseVideo) {
  const normCategory = (categorySlug || "").toLowerCase();
  
  if (
    videoFormatExamples[normCategory] &&
    videoFormatExamples[normCategory][videoTypeId]
  ) {
    return videoFormatExamples[normCategory][videoTypeId];
  }

  // Dynamic high-quality fallback examples based on PDF principles
  return [
    {
      id: `${videoTypeId}-ex-1`,
      title: `${baseVideo?.title || "Core Format"}: Real Implementation Angle 1`,
      angle: "Problem-Solving & High Retention Hook",
      hook: `Here is the exact real-world scenario where this video format generates instant customer inquiries...`,
      image: baseVideo?.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      duration: baseVideo?.duration || "45-60s",
    },
    {
      id: `${videoTypeId}-ex-2`,
      title: `${baseVideo?.title || "Core Format"}: Process & Proof Angle 2`,
      angle: "Visual Transformation & Craftsmanship",
      hook: `Watch how we showcase the step-by-step quality to build undeniable trust with your audience...`,
      image: baseVideo?.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      duration: baseVideo?.duration || "50-60s",
    },
    {
      id: `${videoTypeId}-ex-3`,
      title: `${baseVideo?.title || "Core Format"}: Direct Conversion Angle 3`,
      angle: "Social Proof & Call to Action",
      hook: `Real customer results and clear booking instructions that convert viewers into paying clients!`,
      image: baseVideo?.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      duration: baseVideo?.duration || "45-60s",
    },
  ];
}

// Deep dive data mapping for each category with detailed script blueprints
export function getCategoryDeepDive(categorySlug) {
  const baseCategory = videoCategories.find(
    (c) => c.categorySlug === categorySlug || c.id === categorySlug
  ) || videoCategories[0];

  return {
    heroTagline: `High-Impact Video Strategies Engineered for ${baseCategory.fullName}`,
    metaTitle: `${baseCategory.name} Video Marketing Blueprint | GrowOwl`,
    metaDescription: `Discover 60-second viral video scripts, production setups, and high-converting hooks tailored for ${baseCategory.fullName}.`,
    industryStats: [
      { label: "Target Reel Duration", value: "45-60s" },
      { label: "Ideal Posting Frequency", value: "4-6 Reels / Week" },
      { label: "Primary Goal", value: "Client Inquiries & Direct Bookings" },
      { label: "Top Performing Angle", value: "Proof & Transformation Breakdown" },
    ],
    whyVideoWorks: `In today's fast-moving digital landscape, visual authority is the #1 deciding factor for ${baseCategory.fullName}. High-retention 60-second reels turn casual viewers into loyal, high-paying clients.`,
    targetAudience: `Local clients, decision-makers, and customers seeking trusted, premium services in ${baseCategory.name}.`,
  };
}

// Helper function to get specific video guide by category and slug
export function getVideoGuide(categorySlug, videoSlug) {
  const baseCategory = videoCategories.find(
    (c) => c.categorySlug === categorySlug || c.id === categorySlug
  ) || videoCategories[0];

  const baseVideo = baseCategory.videoTypes.find(
    (v) => v.id === videoSlug
  ) || baseCategory.videoTypes[0];

  const examples = getVideoTypeExamples(categorySlug, baseVideo.id, baseVideo);

  return {
    slug: baseVideo.id,
    title: baseVideo.title,
    categoryName: baseCategory.fullName,
    categorySlug: baseCategory.categorySlug,
    pdfCategory: baseVideo.pdfCategory,
    idealDuration: baseVideo.duration || "45-60s",
    objective: `Drive Maximum Engagement & Conversions for ${baseCategory.name}`,
    hooks: [
      examples[0]?.hook || `If you run a business in ${baseCategory.name}, you cannot afford to ignore this strategy...`,
      examples[1]?.hook || `Here is the exact 60-second video formula we use to generate high-value clients.`,
      examples[2]?.hook || `Stop wasting money on dead ads — watch this transformation instead!`,
    ],
    scriptTimeline: [
      {
        phase: "00:00 - 00:04",
        name: "High-Curiosity Hook",
        camera: "Dynamic Action Close-Up",
        action: "Eye-catching visual movement with fast-paced audio sound design.",
        spokenLine: "Here is the #1 secret our top clients use to dominate their market...",
      },
      {
        phase: "00:04 - 00:20",
        name: "Problem / Setup",
        camera: "Candid Medium Angle",
        action: "Identify the primary pain point experienced by your ideal customer.",
        spokenLine: "Most people struggle with this every single day without realizing there is a better way.",
      },
      {
        phase: "00:20 - 00:45",
        name: "Core Value & Proof",
        camera: "Smooth Product / Service Orbit",
        action: "Demonstrate the real transformation, quality craftsmanship, and undeniable proof.",
        spokenLine: "Our proven methodology delivers consistent 5-star results every single time.",
      },
      {
        phase: "00:45 - 00:60",
        name: "High-Converting Action CTA",
        camera: "Direct Contact / Booking View",
        action: "Display clear booking instructions, contact number, and website address.",
        spokenLine: "Ready to elevate your results? Tap the link in bio to book your consultation today!",
      },
    ],
    productionTips: [
      "Keep pacing brisk with visual cut transitions every 1.5 - 2.5 seconds.",
      "Ensure voiceover audio is recorded in a quiet acoustic space with zero background echo.",
      "Use bold on-screen typography with glowing highlight accents for key trigger words.",
    ],
  };
}
