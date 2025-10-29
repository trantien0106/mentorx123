import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import mentor3 from "@/assets/mentor-3.jpg";
import mentor4 from "@/assets/mentor-4.jpg";
import mentor5 from "@/assets/mentor-5.jpg";
import mentor6 from "@/assets/mentor-6.jpg";
import mentor7 from "@/assets/mentor-7.jpg";
import mentor8 from "@/assets/mentor-8.jpg";
import mentor9 from "@/assets/mentor-9.jpg";
import mentor10 from "@/assets/mentor-10.jpg";
import mentor11 from "@/assets/mentor-11.jpg";
import mentor12 from "@/assets/mentor-12.jpg";
import mentor13 from "@/assets/mentor-13.jpg";

export interface Mentor {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  reviews: number;
  totalSessions: number;
  responseTime: string;
  price: number;
  skills: string[];
  verified: boolean;
  category: string;
  location: string;
  languages: string[];
  bio: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  availability: string[];
  topReviews: {
    name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export const allMentors: Mentor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    company: "Tech Corp",
    image: mentor1,
    rating: 4.9,
    reviews: 127,
    totalSessions: 450,
    responseTime: "2 hours",
    price: 75,
    skills: ["Product Strategy", "Agile", "Leadership", "User Research", "Roadmapping"],
    verified: true,
    category: "product",
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    bio: "I'm a Senior Product Manager with over 10 years of experience building products that millions of users love. I've worked at both startups and large tech companies, giving me a unique perspective on product development at different scales.",
    experience: [
      {
        title: "Senior Product Manager",
        company: "Tech Corp",
        period: "2020 - Present",
        description: "Leading product strategy for B2B SaaS platform serving 50k+ businesses"
      },
      {
        title: "Product Manager",
        company: "Innovation Labs",
        period: "2017 - 2020",
        description: "Launched 3 successful products from 0 to 1, growing to $10M ARR"
      }
    ],
    availability: [
      "Monday: 9:00 AM - 5:00 PM",
      "Wednesday: 1:00 PM - 7:00 PM",
      "Friday: 10:00 AM - 4:00 PM"
    ],
    topReviews: [
      {
        name: "Michael R.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Sarah provided incredible insights into product strategy. Her real-world examples and frameworks were exactly what I needed!"
      },
      {
        name: "Jennifer L.",
        rating: 5,
        date: "1 month ago",
        comment: "Amazing mentor! Sarah helped me prepare for PM interviews and I got offers from 3 companies."
      }
    ]
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Software Engineer",
    company: "Innovation Labs",
    image: mentor2,
    rating: 4.8,
    reviews: 93,
    totalSessions: 320,
    responseTime: "4 hours",
    price: 85,
    skills: ["React", "System Design", "TypeScript", "Node.js", "AWS"],
    verified: true,
    category: "engineering",
    location: "Seattle, WA",
    languages: ["English", "Mandarin"],
    bio: "Lead Software Engineer specializing in building scalable web applications. I've mentored 50+ engineers throughout my career and love helping developers level up their skills.",
    experience: [
      {
        title: "Lead Software Engineer",
        company: "Innovation Labs",
        period: "2019 - Present",
        description: "Leading engineering team of 12, architecting microservices handling 10M+ requests/day"
      },
      {
        title: "Senior Software Engineer",
        company: "Cloud Systems",
        period: "2016 - 2019",
        description: "Built real-time analytics platform processing 100TB+ data daily"
      }
    ],
    availability: [
      "Tuesday: 6:00 PM - 9:00 PM",
      "Thursday: 6:00 PM - 9:00 PM",
      "Sunday: 10:00 AM - 2:00 PM"
    ],
    topReviews: [
      {
        name: "Sarah M.",
        rating: 5,
        date: "1 week ago",
        comment: "Michael's system design knowledge is outstanding. He broke down complex concepts into digestible pieces!"
      },
      {
        name: "Alex P.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Best coding mentor I've had. Very patient and provides excellent code reviews."
      }
    ]
  },
  {
    id: 3,
    name: "Emma Martinez",
    role: "Creative Director",
    company: "Design Studio",
    image: mentor3,
    rating: 5.0,
    reviews: 156,
    totalSessions: 580,
    responseTime: "1 hour",
    price: 90,
    skills: ["UX Design", "Branding", "Creative Strategy", "Design Systems", "Figma"],
    verified: true,
    category: "design",
    location: "New York, NY",
    languages: ["English", "French"],
    bio: "Award-winning Creative Director with 12+ years of experience crafting memorable brand experiences. I've led design for Fortune 500 companies and fast-growing startups.",
    experience: [
      {
        title: "Creative Director",
        company: "Design Studio",
        period: "2018 - Present",
        description: "Leading creative vision for 50+ client projects annually, managing team of 15 designers"
      },
      {
        title: "Senior UX Designer",
        company: "Digital Agency",
        period: "2015 - 2018",
        description: "Redesigned core products resulting in 200% increase in user engagement"
      }
    ],
    availability: [
      "Monday: 10:00 AM - 6:00 PM",
      "Tuesday: 2:00 PM - 8:00 PM",
      "Thursday: 10:00 AM - 4:00 PM"
    ],
    topReviews: [
      {
        name: "James W.",
        rating: 5,
        date: "3 days ago",
        comment: "Emma is phenomenal! Her portfolio reviews are incredibly detailed and actionable."
      },
      {
        name: "Lisa K.",
        rating: 5,
        date: "2 weeks ago",
        comment: "The best design mentor on this platform. Highly recommend!"
      }
    ]
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Business Strategy Consultant",
    company: "McKinsey & Company",
    image: mentor4,
    rating: 4.9,
    reviews: 201,
    totalSessions: 680,
    responseTime: "3 hours",
    price: 120,
    skills: ["Strategy", "Business Development", "M&A", "Leadership", "Change Management"],
    verified: true,
    category: "business",
    location: "Boston, MA",
    languages: ["English", "German"],
    bio: "Former McKinsey consultant with 20+ years helping Fortune 500 companies transform their business. I specialize in strategic planning and organizational change.",
    experience: [
      {
        title: "Senior Partner",
        company: "McKinsey & Company",
        period: "2015 - Present",
        description: "Leading strategic transformations for Fortune 500 clients across multiple industries"
      },
      {
        title: "Partner",
        company: "Bain & Company",
        period: "2010 - 2015",
        description: "Advised C-suite executives on growth strategy and operational excellence"
      }
    ],
    availability: [
      "Monday: 2:00 PM - 6:00 PM",
      "Wednesday: 3:00 PM - 7:00 PM",
      "Saturday: 9:00 AM - 1:00 PM"
    ],
    topReviews: [
      {
        name: "Rachel S.",
        rating: 5,
        date: "1 week ago",
        comment: "David's strategic insights helped me secure a consulting role at a top firm!"
      },
      {
        name: "Tom B.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Incredible depth of knowledge and real-world experience. Worth every penny."
      }
    ]
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Data Science Lead",
    company: "Analytics Co",
    image: mentor5,
    rating: 4.9,
    reviews: 112,
    totalSessions: 385,
    responseTime: "2 hours",
    price: 95,
    skills: ["Machine Learning", "Python", "Data Visualization", "SQL", "Statistics"],
    verified: true,
    category: "data",
    location: "Austin, TX",
    languages: ["English"],
    bio: "Data Science Lead passionate about making AI accessible. I've built ML models that have generated millions in revenue and love teaching others the art of data science.",
    experience: [
      {
        title: "Data Science Lead",
        company: "Analytics Co",
        period: "2019 - Present",
        description: "Leading team building predictive models for customer behavior and revenue optimization"
      },
      {
        title: "Senior Data Scientist",
        company: "Tech Giant",
        period: "2016 - 2019",
        description: "Developed recommendation systems serving 100M+ users daily"
      }
    ],
    availability: [
      "Tuesday: 10:00 AM - 4:00 PM",
      "Thursday: 1:00 PM - 6:00 PM",
      "Sunday: 2:00 PM - 6:00 PM"
    ],
    topReviews: [
      {
        name: "Kevin H.",
        rating: 5,
        date: "5 days ago",
        comment: "Lisa made machine learning concepts click for me. Great at explaining complex topics!"
      },
      {
        name: "Amy L.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Helped me transition from business analyst to data scientist. Forever grateful!"
      }
    ]
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Senior UX Researcher",
    company: "User First",
    image: mentor6,
    rating: 4.8,
    reviews: 67,
    totalSessions: 220,
    responseTime: "3 hours",
    price: 80,
    skills: ["User Research", "Usability Testing", "Design Thinking", "Persona Development"],
    verified: true,
    category: "design",
    location: "Portland, OR",
    languages: ["English"],
    bio: "UX Researcher obsessed with understanding users. I've conducted 500+ user interviews and helped shape products used by millions.",
    experience: [
      {
        title: "Senior UX Researcher",
        company: "User First",
        period: "2018 - Present",
        description: "Leading research initiatives across multiple product lines"
      },
      {
        title: "UX Researcher",
        company: "Design Lab",
        period: "2015 - 2018",
        description: "Conducted qualitative and quantitative research for B2B and B2C products"
      }
    ],
    availability: [
      "Monday: 9:00 AM - 3:00 PM",
      "Wednesday: 11:00 AM - 5:00 PM",
      "Friday: 1:00 PM - 5:00 PM"
    ],
    topReviews: [
      {
        name: "Nina P.",
        rating: 5,
        date: "1 week ago",
        comment: "James taught me research methods I use every day. Excellent mentor!"
      },
      {
        name: "Mark T.",
        rating: 4,
        date: "1 month ago",
        comment: "Very practical advice for conducting user interviews. Highly recommend."
      }
    ]
  },
  {
    id: 7,
    name: "Rachel Green",
    role: "Marketing Director",
    company: "Growth Agency",
    image: mentor7,
    rating: 4.7,
    reviews: 89,
    totalSessions: 295,
    responseTime: "4 hours",
    price: 70,
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    verified: true,
    category: "marketing",
    location: "Los Angeles, CA",
    languages: ["English", "Italian"],
    bio: "Marketing Director who's scaled startups from zero to millions in revenue. I specialize in growth marketing and building brands that resonate.",
    experience: [
      {
        title: "Marketing Director",
        company: "Growth Agency",
        period: "2019 - Present",
        description: "Leading marketing strategy for 20+ high-growth startups"
      },
      {
        title: "Growth Marketing Manager",
        company: "Startup Inc",
        period: "2016 - 2019",
        description: "Grew user base from 0 to 1M+ through creative growth campaigns"
      }
    ],
    availability: [
      "Tuesday: 9:00 AM - 1:00 PM",
      "Thursday: 2:00 PM - 6:00 PM",
      "Saturday: 10:00 AM - 2:00 PM"
    ],
    topReviews: [
      {
        name: "Sophie M.",
        rating: 5,
        date: "1 week ago",
        comment: "Rachel's marketing frameworks are gold! Saw immediate results."
      },
      {
        name: "Daniel K.",
        rating: 4,
        date: "2 weeks ago",
        comment: "Great insights into growth marketing. Very actionable advice."
      }
    ]
  },
  {
    id: 8,
    name: "Alex Rodriguez",
    role: "Cybersecurity Specialist",
    company: "SecureNet",
    image: mentor8,
    rating: 4.9,
    reviews: 78,
    totalSessions: 245,
    responseTime: "2 hours",
    price: 100,
    skills: ["Penetration Testing", "Network Security", "Ethical Hacking", "CISSP", "Risk Assessment"],
    verified: true,
    category: "security",
    location: "Washington, DC",
    languages: ["English", "Portuguese"],
    bio: "Cybersecurity expert with 8+ years protecting enterprise systems. I'm passionate about teaching security best practices and helping aspiring security professionals.",
    experience: [
      {
        title: "Lead Security Engineer",
        company: "SecureNet",
        period: "2019 - Present",
        description: "Leading security assessments and penetration testing for Fortune 500 clients"
      },
      {
        title: "Security Analyst",
        company: "CyberDefense",
        period: "2016 - 2019",
        description: "Conducted vulnerability assessments and security audits"
      }
    ],
    availability: [
      "Monday: 6:00 PM - 9:00 PM",
      "Wednesday: 6:00 PM - 9:00 PM",
      "Saturday: 1:00 PM - 5:00 PM"
    ],
    topReviews: [
      {
        name: "Chris W.",
        rating: 5,
        date: "4 days ago",
        comment: "Alex helped me pass my CISSP exam! Great teaching style."
      },
      {
        name: "Maria S.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent mentor for anyone interested in cybersecurity career."
      }
    ]
  },
  {
    id: 9,
    name: "Patricia Davis",
    role: "Financial Advisor",
    company: "Wealth Partners",
    image: mentor9,
    rating: 4.8,
    reviews: 134,
    totalSessions: 420,
    responseTime: "3 hours",
    price: 85,
    skills: ["Financial Planning", "Investment Strategy", "Retirement Planning", "Tax Strategy"],
    verified: true,
    category: "finance",
    location: "Chicago, IL",
    languages: ["English"],
    bio: "CFP with 15+ years helping individuals and businesses achieve financial freedom. I make complex financial concepts simple and actionable.",
    experience: [
      {
        title: "Senior Financial Advisor",
        company: "Wealth Partners",
        period: "2017 - Present",
        description: "Managing $500M+ in client assets, providing comprehensive financial planning"
      },
      {
        title: "Financial Planner",
        company: "Investment Group",
        period: "2012 - 2017",
        description: "Developed financial plans for high-net-worth individuals"
      }
    ],
    availability: [
      "Monday: 10:00 AM - 4:00 PM",
      "Wednesday: 10:00 AM - 4:00 PM",
      "Friday: 2:00 PM - 6:00 PM"
    ],
    topReviews: [
      {
        name: "Robert J.",
        rating: 5,
        date: "1 week ago",
        comment: "Patricia helped me create a retirement plan I'm confident in. Highly recommend!"
      },
      {
        name: "Linda M.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Clear, practical advice. Made investing less intimidating."
      }
    ]
  },
  {
    id: 10,
    name: "Steven Park",
    role: "Startup Founder & Entrepreneur",
    company: "TechVentures",
    image: mentor10,
    rating: 4.9,
    reviews: 145,
    totalSessions: 510,
    responseTime: "2 hours",
    price: 110,
    skills: ["Entrepreneurship", "Fundraising", "Product-Market Fit", "Team Building", "Scaling"],
    verified: true,
    category: "entrepreneurship",
    location: "San Francisco, CA",
    languages: ["English", "Korean"],
    bio: "Serial entrepreneur with 3 successful exits. I've raised $50M+ and built teams from 0 to 100+. Love helping aspiring founders navigate the startup journey.",
    experience: [
      {
        title: "CEO & Co-Founder",
        company: "TechVentures",
        period: "2018 - Present",
        description: "Building SaaS platform serving 10k+ businesses, raised $20M Series A"
      },
      {
        title: "Founder",
        company: "StartupCo",
        period: "2014 - 2018",
        description: "Built and sold mobile app with 5M+ users"
      }
    ],
    availability: [
      "Tuesday: 3:00 PM - 7:00 PM",
      "Thursday: 3:00 PM - 7:00 PM",
      "Sunday: 10:00 AM - 2:00 PM"
    ],
    topReviews: [
      {
        name: "Jessica L.",
        rating: 5,
        date: "3 days ago",
        comment: "Steven's fundraising advice was invaluable. Just closed my seed round!"
      },
      {
        name: "Mike D.",
        rating: 5,
        date: "1 week ago",
        comment: "Real talk from someone who's been there. Best mentor for founders."
      }
    ]
  },
  {
    id: 11,
    name: "Amanda Foster",
    role: "HR Director",
    company: "TalentFirst",
    image: mentor11,
    rating: 4.7,
    reviews: 92,
    totalSessions: 315,
    responseTime: "4 hours",
    price: 65,
    skills: ["Talent Acquisition", "Employee Relations", "Performance Management", "DEI", "HR Strategy"],
    verified: true,
    category: "hr",
    location: "Denver, CO",
    languages: ["English"],
    bio: "HR Director passionate about building great workplace cultures. I've hired 1000+ employees and helped companies scale their teams effectively.",
    experience: [
      {
        title: "HR Director",
        company: "TalentFirst",
        period: "2018 - Present",
        description: "Leading HR strategy for 500+ employee organization"
      },
      {
        title: "Senior HR Manager",
        company: "Growth Corp",
        period: "2014 - 2018",
        description: "Scaled HR function during company growth from 50 to 300 employees"
      }
    ],
    availability: [
      "Monday: 9:00 AM - 3:00 PM",
      "Wednesday: 1:00 PM - 5:00 PM",
      "Friday: 9:00 AM - 1:00 PM"
    ],
    topReviews: [
      {
        name: "Sarah B.",
        rating: 5,
        date: "1 week ago",
        comment: "Amanda helped me navigate a difficult workplace situation with grace."
      },
      {
        name: "John P.",
        rating: 4,
        date: "2 weeks ago",
        comment: "Great advice for building HR processes from scratch."
      }
    ]
  },
  {
    id: 12,
    name: "Tyler Brooks",
    role: "Content Creator & Influencer",
    company: "Creative Media",
    image: mentor12,
    rating: 4.6,
    reviews: 156,
    totalSessions: 445,
    responseTime: "1 hour",
    price: 60,
    skills: ["Content Creation", "Video Production", "Social Media Growth", "Personal Branding"],
    verified: true,
    category: "content",
    location: "Miami, FL",
    languages: ["English"],
    bio: "Full-time content creator with 2M+ followers across platforms. I've built my personal brand from zero and monetized my content to 6-figures annually.",
    experience: [
      {
        title: "Content Creator",
        company: "Independent",
        period: "2019 - Present",
        description: "Building engaged community of 2M+ followers, generating $200k+ annual revenue"
      },
      {
        title: "Social Media Manager",
        company: "Creative Media",
        period: "2017 - 2019",
        description: "Managed social media for brands with combined reach of 10M+"
      }
    ],
    availability: [
      "Tuesday: 11:00 AM - 5:00 PM",
      "Thursday: 11:00 AM - 5:00 PM",
      "Saturday: 2:00 PM - 6:00 PM"
    ],
    topReviews: [
      {
        name: "Emily R.",
        rating: 5,
        date: "2 days ago",
        comment: "Tyler's content strategies helped me grow from 0 to 50k followers!"
      },
      {
        name: "Jake M.",
        rating: 4,
        date: "1 week ago",
        comment: "Practical tips for anyone wanting to build an audience online."
      }
    ]
  },
  {
    id: 13,
    name: "Monica Taylor",
    role: "Sales Director",
    company: "SalesForce Pro",
    image: mentor13,
    rating: 4.8,
    reviews: 118,
    totalSessions: 380,
    responseTime: "3 hours",
    price: 75,
    skills: ["B2B Sales", "Negotiation", "Sales Leadership", "CRM", "Account Management"],
    verified: true,
    category: "sales",
    location: "Atlanta, GA",
    languages: ["English"],
    bio: "Sales Director with proven track record of building and scaling high-performing sales teams. I've closed $100M+ in enterprise deals throughout my career.",
    experience: [
      {
        title: "Sales Director",
        company: "SalesForce Pro",
        period: "2018 - Present",
        description: "Leading sales team of 25, consistently exceeding quarterly targets by 30%+"
      },
      {
        title: "Enterprise Sales Manager",
        company: "Tech Solutions",
        period: "2014 - 2018",
        description: "Built and managed enterprise sales team, closed $50M+ in deals"
      }
    ],
    availability: [
      "Monday: 1:00 PM - 6:00 PM",
      "Wednesday: 1:00 PM - 6:00 PM",
      "Thursday: 10:00 AM - 2:00 PM"
    ],
    topReviews: [
      {
        name: "Brian K.",
        rating: 5,
        date: "5 days ago",
        comment: "Monica's sales techniques transformed my approach. Doubled my close rate!"
      },
      {
        name: "Laura S.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best sales mentor I've worked with. Real strategies that work."
      }
    ]
  }
];
