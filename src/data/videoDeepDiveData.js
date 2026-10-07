import { videoCategories } from "./videoCategoriesData";

// Detailed 3 execution examples per video format matching the client reference guides
export const videoFormatExamples = {
  hospitality: {
    "meme-style-reel": [
      {
        id: "ex-1",
        title: "Relatable Late-Night Food Craving Reaction",
        angle: "Relatable Foodie Humor",
        hook: "POV: You promised you would eat clean this week, but our cheese pull platter just arrived at the table...",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-2",
        title: "Friend Who Never Decides What to Order",
        angle: "Social Dining Relatability",
        hook: "Tag that one friend who spends 25 minutes reading the menu only to say 'order whatever you want'.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-3",
        title: "First Bite Euphoria vs Reality",
        angle: "Sensory Close-Up Hook",
        hook: "That exact 2-second silence after the first bite of our signature burger...",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
    ],
    "cinematic-ambience-dish-tour": [
      {
        id: "ex-1",
        title: "Evening Ambience: Fairy Lights to Clay-Oven Sizzle",
        angle: "Full Atmospheric Showcase",
        hook: "Siliguri's quietest rooftop sunset dining spot with live acoustic music and candlelit tables.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Kitchen Pass to Table: Plating the Chef's Special",
        angle: "High-Flame Craft to Plate",
        hook: "Behind every 5-star dish is 4 hours of slow simmer and high-flame clay oven craftsmanship.",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "Cozy Brunch Corner & Artisan Coffee Tour",
        angle: "Daytime Cafe Vibe",
        hook: "Looking for an aesthetic brunch cafe in town with high-speed Wi-Fi and fresh sourdough?",
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "menu-price-reveal": [
      {
        id: "ex-1",
        title: "Complete 3-Course Feast Under ₹499",
        angle: "Affordable Luxury Challenge",
        hook: "With just ₹499, here is everything you can eat at [Restaurant Name] without compromising quality!",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Couples Dinner Date Breakdown Under ₹899",
        angle: "Romantic Dining on a Budget",
        hook: "Can you actually have a romantic candlelight dinner for two under ₹899? Let's check the bill.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Family Platter Feasting Challenge",
        angle: "Group Value Transparency",
        hook: "We ordered the biggest family platter on the menu — here is the portion size and the exact bill.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "day-wise-series-dishes": [
      {
        id: "ex-1",
        title: "Monday to Sunday: 7 Days, 7 Dishes Weekly Split",
        angle: "Weekly Menu Rhythms",
        hook: "7 days, 7 dishes: Stop asking 'what should we eat today?'. Here is your weekly meal guide at [Restaurant].",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "7 Days, 7 Refreshing Artisan Drinks & Shakes",
        angle: "Beverage Series Hook",
        hook: "Beat the heat with 7 signature coolers from Monday mocktail to Sunday cold brew indulgence.",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Chef's Daily Special Tasting Tour",
        angle: "Daily Kitchen Exclusives",
        hook: "Did you know our chef cooks one off-menu dish every day of the week? Here is the full rotation.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "concept-food-reel": [
      {
        id: "ex-1",
        title: "Light-Switch On/Off Reveal to Sizzling Platter",
        angle: "Instant Visual Contrast",
        hook: "Watch what happens when you flip this light switch... from dark room to sizzling smoked steak!",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-2",
        title: "Finger-Snap Table Fill Transition",
        angle: "Rhythmic Speed Edit",
        hook: "Empty wooden table to 12-dish banquet feast in literally 1 finger snap. Don't blink!",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-3",
        title: "Past vs Present: How This Recipe Evolved Over 20 Years",
        angle: "Story-Driven Visual Concept",
        hook: "1994 hand-grated spices vs 2026 modern gourmet plating: The evolution of our signature biryani.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
  },
  fitness: {
    "cinematic-gym-tour": [
      {
        id: "ex-1",
        title: "Full 5,000 Sq Ft Arena & Biometric Tour",
        angle: "Luxury Equipment Showcase",
        hook: "Siliguri's most well-equipped gym arena — here is what a premium workout experience looks like inside [Gym Name].",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Free Weights & Dumbbell Rack Deep Dive",
        angle: "Strength & Bodybuilding Floor",
        hook: "Never wait for a bench or dumbbell set again: 5kg to 50kg dumbbells, 6 squat racks, and zero clutter.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "Cardio Loft, Steam Room & Locker Arena",
        angle: "Hygiene & Amenities Tour",
        hook: "Cardio with a panoramic city view + post-workout Finnish steam bath: Take a quick 60s tour.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "membership-price-offer-reveal": [
      {
        id: "ex-1",
        title: "With Just ₹999/Month: Everything You Unlock",
        angle: "Transparent Fee Chart Breakdown",
        hook: "For just ₹999 a month, here is every single facility, machine, and trainer assistance you unlock at [Gym Name]!",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Beginner Package: Personal Training + Nutrition Included",
        angle: "All-in-One Transformation Value",
        hook: "Thinking of joining a gym but scared of getting lost on the floor? Look at what our ₹1,499 quarterly plan includes.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Seasonal New Year / Summer Membership Rush",
        angle: "Limited Seat Urgency",
        hook: "Only 25 early-bird membership passes remaining for this quarter — here is the complete fee reveal.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "why-choose-us": [
      {
        id: "ex-1",
        title: "3 Reasons 400+ Members Choose Us Over Commercial Gyms",
        angle: "USP Differentiation",
        hook: "Why are serious lifters and working professionals choosing [Gym Name]? Here are 3 big differences.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Zero Machine Crowding: How We Cap Active Members",
        angle: "Respect for Member Time",
        hook: "Tired of waiting 10 minutes for a cable machine? Here is how our slot booking guarantees you train peacefully.",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Certified Biomechanical Trainers Who Actually Care",
        angle: "Expertise vs Generic Floor Staff",
        hook: "Trainers who check your spine alignment instead of staring at their phones — meet our certified coaching staff.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "client-testimonial-review": [
      {
        id: "ex-1",
        title: "14 Kg Fat Loss in 5 Months: Rahul's Story",
        angle: "Real Transformation Journey",
        hook: "'I delayed joining for 2 years because of gym anxiety. 5 months later, I am in the best shape of my life.'",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Working Mom Reviews 6-Month Energy Transformation",
        angle: "Daily Lifestyle & Stamina",
        hook: "'Between office and family, I was exhausted every day. 45 minutes here changed my daily stamina completely.'",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "Post-Injury Rehab & Strength Recovery",
        angle: "Injury Recovery Trust",
        hook: "Customer recovered from chronic lower back ache with proper coached compound lifts at [Gym Name].",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "right-vs-wrong-form": [
      {
        id: "ex-1",
        title: "Stop Doing Deadlifts Like This: Lumbar Spine Fix",
        angle: "Injury Prevention Breakdown",
        hook: "Stop making this #1 deadlift mistake before you damage your lower back discs! Here is the right cue.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Right vs Wrong: Barbell Squat Knee Cave",
        angle: "Knee Health & Quad Activation",
        hook: "Are your knees caving inward when you squat heavy? Watch this 20-second stance correction.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Bench Press Shoulder Impingement Form Fix",
        angle: "Pectoral Isolation",
        hook: "Feeling bench press in your front delts instead of your chest? Tuck your elbows like this.",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "day-wise-series-workouts": [
      {
        id: "ex-1",
        title: "Monday to Sunday: How Many Days Are You Open?",
        angle: "Weekly 7-Day Split Question Hook",
        hook: "How many days a week are you open? Monday Chest, Tuesday Back, Wednesday Legs... here is our 7-day routine!",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Push-Pull-Legs 7-Day Rhythm for Maximum Growth",
        angle: "Science-Backed Workout Split",
        hook: "The only 7-day workout split you need to build muscle and burn stubborn fat without overtraining.",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "7 Days, 7 Cardio & Functional Challenges",
        angle: "HIIT & Athletic Conditioning",
        hook: "Bored of walking on the treadmill? Here is our 7-day functional arena challenge from Battle Ropes to Sled Pushes.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
  },
  healthcare: {
    "contextual-meme-reel": [
      {
        id: "ex-1",
        title: "'Bas Kal Raat Se Pain Ho Raha Hai' (It's Been 6 Months)",
        angle: "Relatable Patient Behavior Meme",
        hook: "When the dentist asks 'Kab se dard ho raha hai?' and you say 'Bas kal raat se' (the cavity has been brewing since 2024)...",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-2",
        title: "Flossing Promise Right After Dental Cleaning",
        angle: "Post-Treatment Relatable Humor",
        hook: "Me nodding aggressively when the dentist says 'Roz raat ko floss karna' knowing full well what will happen tomorrow...",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-3",
        title: "The 0.5s Silence Before the Dental Mirror Touches Your Tooth",
        angle: "Dental Chair Anticipation Meme",
        hook: "POV: You're in the dental chair trying not to swallow your own tongue while the dentist adjusts the overhead light.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
    ],
    "location-walkthrough": [
      {
        id: "ex-1",
        title: "Clinic Route, Parking & Seamless Reception Entry",
        angle: "Landmark Proximity & Route Guide",
        hook: "Where exactly is [Clinic Name] located and how simple is it to reach with free basement parking?",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Hospital-Grade Sterilization & 4-Chair Private Cabins",
        angle: "Hygiene Transparency Tour",
        hook: "Ever wondered what happens behind the clinic doors? Tour our Class-B autoclave sterilization room.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "A Calm Dental Clinic That Relieves Patient Anxiety",
        angle: "Welcoming Atmosphere",
        hook: "Dental clinics don't have to smell like chemicals and feel scary. Step inside our tranquil lounge.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "vlog-style-voiceover": [
      {
        id: "ex-1",
        title: "A Normal Tuesday in Clinic: The 1 Mistake 80% Make",
        angle: "Vlog Storytelling & Oral Advice",
        hook: "Come with me for a normal Tuesday in my dental clinic — and the 1 brushing mistake 8 out of 10 patients made today.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-2",
        title: "Behind the Mask: What I Look For in a First Smile Scan",
        angle: "Doctor POV Observation",
        hook: "What does a dentist actually see in the first 10 seconds of examining your teeth? Here is an honest breakdown.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-3",
        title: "Evening Case Review: Planning an Aligner Journey",
        angle: "Clinical Dedication & Planning",
        hook: "5 PM clinic quiet time: Reviewing 3D digital impressions before our patient's custom aligners arrive.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
    ],
    "dental-transformation": [
      {
        id: "ex-1",
        title: "Broken Front Tooth Restored in 45 Minutes",
        angle: "Same-Day Composite Smile Transformation",
        hook: "Patient came in hiding her smile after a chipped front tooth. Look at the mirror reveal 45 minutes later!",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Crowded Lower Teeth to Straight Smile with Clear Aligners",
        angle: "9-Month Alignment Journey",
        hook: "No metal wires, no painful brackets: Watch this 9-month clear aligners transformation unfold in 30 seconds.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Severe Tea/Coffee Stains to Bright White Natural Polish",
        angle: "Gentle Scaling & Polishing Before/After",
        hook: "Years of stubborn tartar and coffee stains gently removed without thinning the enamel. Look at this result!",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "founder-journey-story": [
      {
        id: "ex-1",
        title: "Why I Left Hospital Practice to Build This Clinic",
        angle: "Founder Purpose & Ethics",
        hook: "5 years ago I walked away from a comfortable hospital salary because I wanted to make dental care completely painless.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-2",
        title: "From 1 Rental Chair to 10,000 Treated Patients",
        angle: "Milestone & Resilience Journey",
        hook: "When we opened with just 1 dental chair and zero marketing, people warned me it would fail. Here is what happened.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
      {
        id: "ex-3",
        title: "The Hardest Lesson I Learned About Patient Trust",
        angle: "Human Empathy & Care",
        hook: "A patient burst into tears in my chair 4 years ago — here is how that moment changed the way we practice dentistry forever.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        duration: "60-75s",
      },
    ],
    "bulk-content-system": [
      {
        id: "ex-1",
        title: "Batching 10 Dental Reels in 2 Hours of Clinic Downtime",
        angle: "Repeatable Filming Workflow",
        hook: "How our clinic records 10 educational reels in a single 2-hour shoot without disturbing a single patient appointment.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "The 3-Light Clinic Setup for High-Quality Video Production",
        angle: "Lighting & Audio Checklist",
        hook: "The exact minimal camera, wireless lapel mic, and softbox setup that makes dental advice look cinematic and trustworthy.",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Batch Shooting FAQs: 1 Script Formula for Multiple Formats",
        angle: "Content Scaling System",
        hook: "Turn the top 5 questions your patients ask every week into a month's worth of viral Reels and Shorts.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "product-showcase": [
      {
        id: "ex-1",
        title: "3D Intraoral Scanner: Say Goodbye to Goopy Impression Molds",
        angle: "Advanced Tech Demonstration",
        hook: "No more choking on goopy pink plaster molds! Here is how our 3D scanner maps your entire jaw in 60 seconds.",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Ultrasonic Scaler: Why Modern Cleaning Doesn't Hurt",
        angle: "Device Demystification",
        hook: "Patients think teeth cleaning scrapes away enamel. Watch how gentle acoustic water vibrations actually lift tartar effortlessly.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "The Electric Toothbrush vs Manual: Dentist Test",
        angle: "Product Recommendation",
        hook: "We tested an electric toothbrush vs a standard manual brush on stained model teeth — here is the shocking truth.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "ugc-patient-experience": [
      {
        id: "ex-1",
        title: "Overcoming Needle Fear: Priya's First Aligners Visit",
        angle: "Candid First-Person Journey",
        hook: "'I avoided the dentist for 4 years because of needle phobia. Here is what my aligners consultation actually felt like.'",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "From Reception to Dental Chair: What a Stress-Free Visit Feels Like",
        angle: "Warm Patient Experience",
        hook: "Walk in with dental anxiety, walk out with a bright smile: Follow Rohit through his routine dental cleaning.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Patient Mirror Reveal After Smile Restoration",
        angle: "Emotional Unfiltered Reaction",
        hook: "Look at the pure emotion on her face the moment we handed her the mirror after finishing her veneer bonding.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "aesthetic-clinic-walkthrough": [
      {
        id: "ex-1",
        title: "Tranquil Clinic Vibe: Modern Aesthetics with Soft Piano BGM",
        angle: "Relaxing Lounge Atmosphere",
        hook: "A dental clinic designed to look and feel like a peaceful wellness lounge where dental fear evaporates.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Private Operatories & Ergonomic Memory Foam Dental Chairs",
        angle: "Comfort & Modern Ergonomics",
        hook: "Heated neck pillows, noise-canceling headphones, and ceiling Netflix: Modern dentistry designed for comfort.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Step Inside [Clinic Name]: 30 Seconds of Calming Dental Vibe",
        angle: "Visual Aesthetic Hook",
        hook: "Warm ambient lights, fresh greenery, and sterile hospital-grade safety: Welcome to [Clinic Name].",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "service-showcase": [
      {
        id: "ex-1",
        title: "Single-Sitting Root Canal: Is It Truly Painless?",
        angle: "Procedure Clarity & Pain Relief",
        hook: "Single-sitting root canals explained in 45 seconds: Why modern computer-guided rotary files mean zero pain.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Invisible Clear Aligners vs Traditional Metal Braces",
        angle: "Modern Orthodontics Comparison",
        hook: "Everything you need to know about Clear Aligners before booking your digital 3D scan at our clinic.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Dental Implants: Permanent Solution for Missing Teeth",
        angle: "Long-Term Restorative Dentistry",
        hook: "Lost a molar tooth? Why dental implants prevent bone loss and look 100% identical to natural teeth.",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "dentist-qa-reel": [
      {
        id: "ex-1",
        title: "'Does Scaling Teeth Make Them Permanently Weak or Loose?'",
        angle: "Myth Busting Q&A",
        hook: "'Doctor, scaling karwane se daant kamzor toh nahi ho jaate?' Answering the #1 myth patients ask every day.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "Why Bleeding Gums When Brushing Is Never Normal",
        angle: "Preventative Gum Health",
        hook: "If your gums bleed while brushing, please don't ignore it thinking it's 'normal irritation'. Here's why.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Can Yellow Teeth Become White with Whitening Toothpaste?",
        angle: "Consumer Product Reality",
        hook: "Can abrasive whitening toothpaste actually remove deep yellow enamel stains? Here is what science says.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
    ],
    "trust-reviews-reel": [
      {
        id: "ex-1",
        title: "Real Patients Who Overcame Their Dental Fear",
        angle: "Gentle Care Testimonial",
        hook: "'I hadn't visited a dentist in 7 years due to trauma. Dr. [Name] changed everything with her gentle touch.'",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-2",
        title: "500+ Five-Star Google Reviews: Why Patients Recommend Us",
        angle: "Verified Social Proof Wall",
        hook: "Over 500+ five-star verified patient reviews on Google: Here is what real families say about our clinic.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
      },
      {
        id: "ex-3",
        title: "Family Dental Care: Treating 3 Generations in One Practice",
        angle: "Generational Community Trust",
        hook: "From grandparents' dental implants to kids' preventive cavity checkups: Why Siliguri families trust our clinic.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
        duration: "45-60s",
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
  },
  homestays: {
    "meme-style-homestay-reel": [
      {
        id: "ex-1",
        title: "Work From Mountain Homestay vs City Reality",
        angle: "Relatable Workation Humor",
        hook: "Boss thinking I'm working from my boring city apartment vs where my morning laptop setup actually is...",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-2",
        title: "Weekend Trip 'Just To Relax' vs Endless Balcony Views",
        angle: "Travel Anticipation Meme",
        hook: "Me claiming I will wake up at 5 AM to trek vs me wrapped in blankets drinking Darjeeling chai for 4 hours.",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
      {
        id: "ex-3",
        title: "City Traffic Chaos vs Mountain Homestay Serenity",
        angle: "Peaceful Escape Contrast",
        hook: "POV: You traded honking horns and pollution for chirping pine birds and cloud-kissed valley views.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        duration: "30-45s",
      },
    ],
    "cinematic-voiceover-tour": [
      {
        id: "ex-1",
        title: "Scenic Travel Route & Pine Forest Approach",
        angle: "Visual Route Journey",
        hook: "Tucked away in the quiet hills of North Bengal, here is the secret road leading to our mountain retreat.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-2",
        title: "Wooden Cottage Rooms & Private Balcony Tour",
        angle: "Cozy Room & Amenities Walkthrough",
        hook: "Step inside our hand-crafted wooden cabins with 180-degree Himalayan sunrise views and organic mountain dining.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
      {
        id: "ex-3",
        title: "Evening Bonfire, Stargazing & Local Kitchen Feast",
        angle: "Atmospheric Evening Experience",
        hook: "When the mist rolls in and temperature drops: Warm bonfire, roasted local delicacies, and millions of stars.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        duration: "50-60s",
      },
    ],
    "budget-friendly-homestay": [
      {
        id: "ex-1",
        title: "Stay in North Bengal Hills Under ₹1,299 with Meals",
        angle: "All-Inclusive Budget Hook",
        hook: "With just ₹1,299 per person, here is everything included in your stay: Room, 3 homecooked meals, and bonfire!",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        duration: "40-50s",
      },
      {
        id: "ex-2",
        title: "Weekend Couple Getaway Cost Breakdown",
        angle: "Transparent Pricing Breakdown",
        hook: "Planning a 2-day escape from Siliguri? Here is the exact budget for two people staying at [Homestay Name].",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        duration: "40-50s",
      },
      {
        id: "ex-3",
        title: "Group Workation / Family Villa Price Reveal",
        angle: "Group Stay Value",
        hook: "Booking an entire private mountain cottage for your family or friends? Look at the per-person rate.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        duration: "40-50s",
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
    subtitle: baseVideo.subtitle,
    description: baseVideo.description || "",
    creativeDirection: baseVideo.creativeDirection || "",
    referenceReels: baseVideo.referenceReels || [],
    categoryName: baseCategory.fullName,
    categorySlug: baseCategory.categorySlug,
    pdfCategory: baseVideo.pdfCategory || baseVideo.title,
    idealDuration: baseVideo.duration || "45-60s",
    tag: baseVideo.tag || "Video Type",
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
        spokenLine: examples[0]?.hook ? `"${examples[0].hook}"` : "Here is the #1 secret our top clients use to dominate their market...",
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
      baseVideo.creativeDirection || "Keep pacing brisk with visual cut transitions every 1.5 - 2.5 seconds.",
      "Ensure voiceover audio is recorded in a quiet acoustic space with zero background echo (or generate with ElevenLabs).",
      "Use bold on-screen typography with glowing highlight accents for key trigger words and prices.",
    ],
  };
}
