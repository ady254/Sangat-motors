export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  image: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
}

export const servicesData: Service[] = [
  {
    _id: "s1",
    title: "Car Servicing",
    description: "Comprehensive scheduled maintenance to keep your engine running smoothly and ensure vehicle longevity.",
    icon: "Wrench",
    image: "/car-service.webp",
    features: ["Engine Oil Change", "Filter Replacements", "Fluid Level Checks", "Full Vehicle Inspection"]
  },
  {
    _id: "s2",
    title: "Diagnostics & Repairs",
    description: "Advanced computerized scanning to detect faults early combined with expert mechanical repairs.",
    icon: "Cpu",
    image: "/brake-repair.webp",
    features: ["OBD2 Engine Diagnostics", "Brake System Repair", "Suspension Tuning", "Electrical Troubleshooting"]
  },
  {
    _id: "s3",
    title: "Premium Car Wash",
    description: "Deep exterior foam wash and interior cleaning using high-quality detergents and pure filtered water.",
    icon: "Droplets",
    image: "/car-wash.webp",
    features: ["High-Pressure Foam Wash", "Undercarriage Cleaning", "Interior Vacuuming", "Dashboard Polish"]
  },
  {
    _id: "s4",
    title: "Professional Detailing",
    description: "Restore your vehicle's showroom shine with our multi-step paint correction and protection systems.",
    icon: "Sparkles",
    image: "/detenling.webp",
    features: ["Ceramic Coating", "Paint Correction", "Clay Bar Treatment", "Leather Conditioning"]
  },
  {
    _id: "s5",
    title: "Brake Repair & Services",
    description: "Precision brake inspections, pad replacements, and rotor resurfacing to guarantee stopping power.",
    icon: "ShieldAlert",
    image: "/brake-repair.webp",
    features: ["Brake Pad Replacement", "Rotor Resurfacing", "Brake Fluid Flush", "Caliper Servicing"]
  },
  {
    _id: "s6",
    title: "Genuine Spare Parts",
    description: "Direct OEM replacement components sourcing and installation for all premium European and luxury cars.",
    icon: "Settings",
    image: "/thar-service.jpeg",
    features: ["100% Original Parts", "Manufacturer Warranty", "Precise Fitment", "Extensive Inventory"]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    _id: "t1",
    name: "Rahul Sharma",
    role: "Premium Car Owner",
    rating: 5,
    content: "Excellent service and genuine advice. My car feels brand new after the service. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    _id: "t2",
    name: "Priya Malhotra",
    role: "SUV Owner",
    rating: 5,
    content: "Very professional team and transparent pricing. They fixed the issue quickly and explained everything clearly.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    _id: "t3",
    name: "Amit Verma",
    role: "Sports Sedan Owner",
    rating: 5,
    content: "Best car service experience ever! Timely delivery and top quality work. Will surely visit again.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    _id: "t4",
    name: "Karan Singh",
    role: "Luxury SUV Owner",
    rating: 5,
    content: "Trustworthy and reliable. Finally found a service centre that truly cares for customers and their cars.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export const faqsData: FAQ[] = [
  {
    _id: "f1",
    question: "HOW OFTEN SHOULD I SERVICE MY CAR?",
    answer: "We recommend servicing your car every 10,000 km or 6 months, whichever comes first. Regular servicing ensures optimal engine performance, prevents breakdown, and maintains safety standards."
  },
  {
    _id: "f2",
    question: "DO YOU USE GENUINE SPARE PARTS?",
    answer: "Yes, we use 100% genuine, OEM-approved spare parts. All replacement parts come directly from official manufacturers, assuring quality and maintaining your vehicle's warranty."
  },
  {
    _id: "f3",
    question: "HOW LONG DOES A TYPICAL SERVICE TAKE?",
    answer: "A standard service takes about 3 to 4 hours. If your car requires complex mechanical repairs or advanced diagnostics, our technicians will inspect and provide a clear timeline upfront."
  },
  {
    _id: "f4",
    question: "DO YOU OFFER PICKUP & DROP FACILITY?",
    answer: "Yes! We offer a convenient pickup and drop service across Bihar. You can schedule a pickup through our booking form or call our support line at +91 93869 92921."
  },
  {
    _id: "f5",
    question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
    answer: "We accept all major credit/debit cards, UPI payments, net banking, and cash. We also provide secure online payment links and detailed GST invoices for corporate clients."
  }
];

export const galleryData: GalleryItem[] = [
  {
    _id: "g1",
    title: "Engine Oil Flush",
    image: "/car-oil-change.webp",
    category: "Servicing"
  },
  {
    _id: "g2",
    title: "Jeep Thar Offroad Inspection",
    image: "/thar-service.jpeg",
    category: "Inspection"
  },
  {
    _id: "g3",
    title: "De-ionized Water Foam Wash",
    image: "/car-wash.webp",
    category: "Detailing"
  },
  {
    _id: "g4",
    title: "Multi-stage Paint Polish",
    image: "/detenling.webp",
    category: "Detailing"
  },
  {
    _id: "g5",
    title: "Performance Alloy Fitment",
    image: "/car-service.webp",
    category: "Tuning"
  }
];
