
import React from 'react';

// === Base Shapes & Utilities ===
const SvgBase = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {children}
  </svg>
);

// === ANOMALIES (Blue) ===

// Whisper: Sound waves / Ear
const Whisper = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M20 50 Q 50 10, 80 50 Q 50 90, 20 50 Z" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.1" />
    <path d="M35 50 Q 50 30, 65 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M45 50 Q 50 45, 55 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// Catalog: Grid / Items
const Catalog = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <rect x="15" y="15" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="4" />
    <rect x="55" y="15" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.2"/>
    <rect x="15" y="55" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.2"/>
    <rect x="55" y="55" width="30" height="30" rx="4" stroke="currentColor" strokeWidth="4" />
  </SvgBase>
);

// Drain: Spiral / Siphon
const Drain = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M50 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10" />
    <path d="M50 50 m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </SvgBase>
);

// Clock: Hourglass / Time
const Clock = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M20 10 H80 L50 50 L80 90 H20 L50 50 L20 10 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
    <path d="M40 75 H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// Growth: Organic / Expanding
const Growth = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <circle cx="50" cy="50" r="15" fill="currentColor" />
    <circle cx="50" cy="20" r="10" stroke="currentColor" strokeWidth="4" />
    <circle cx="80" cy="50" r="10" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="80" r="10" stroke="currentColor" strokeWidth="4" />
    <circle cx="20" cy="50" r="10" stroke="currentColor" strokeWidth="4" />
    <path d="M50 35 V30 M65 50 H70 M50 65 V70 M35 50 H30" stroke="currentColor" strokeWidth="4" />
  </SvgBase>
);

// Gun: Target / Impact
const Gun = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" />
    <line x1="50" y1="10" x2="50" y2="30" stroke="currentColor" strokeWidth="4" />
    <line x1="50" y1="70" x2="50" y2="90" stroke="currentColor" strokeWidth="4" />
    <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="4" />
    <line x1="70" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </SvgBase>
);

// Dream: Cloud / Moon
const Dream = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M30 60 Q 10 60 10 40 Q 10 20 30 20 Q 40 5 60 20 Q 80 10 90 30 Q 100 60 80 60 Z" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.1" />
    <circle cx="70" cy="30" r="5" fill="currentColor" />
    <circle cx="30" cy="40" r="3" fill="currentColor" />
  </SvgBase>
);

// Manifold: Connections / Map
const Manifold = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <circle cx="20" cy="80" r="5" fill="currentColor" />
    <circle cx="80" cy="20" r="5" fill="currentColor" />
    <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="4" />
    <circle cx="80" cy="80" r="5" stroke="currentColor" strokeWidth="4" />
    <path d="M20 80 C 20 50, 80 50, 80 20" stroke="currentColor" strokeWidth="4" />
    <path d="M25 20 L75 80" stroke="currentColor" strokeWidth="4" strokeDasharray="5 5" />
  </SvgBase>
);

// Absence: Empty Box / Dotted
const Absence = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" />
    <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="2" opacity="0.3" />
  </SvgBase>
);


// === REALITIES (Yellow) ===

// Caretaker: Hands / Protection
const Caretaker = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M10 50 Q 30 90 50 70 Q 70 90 90 50" stroke="currentColor" strokeWidth="4" fill="none" />
    <circle cx="50" cy="40" r="15" fill="currentColor" />
  </SvgBase>
);

// Overworked: Stack / Busy
const Overworked = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <rect x="30" y="10" width="40" height="50" fill="currentColor" fillOpacity="0.2" />
    <rect x="20" y="20" width="40" height="50" stroke="currentColor" strokeWidth="4" fill="white" />
    <rect x="40" y="40" width="40" height="50" stroke="currentColor" strokeWidth="4" fill="white" />
    <line x1="50" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="4" />
    <line x1="50" y1="65" x2="70" y2="65" stroke="currentColor" strokeWidth="4" />
  </SvgBase>
);

// Stalked: Eye / Looking
const Stalked = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M10 50 Q 50 10 90 50 Q 50 90 10 50 Z" stroke="currentColor" strokeWidth="4" fill="none" />
    <circle cx="50" cy="50" r="12" fill="currentColor" />
    <path d="M50 20 V10 M50 80 V90 M20 50 H10 M80 50 H90" stroke="currentColor" strokeWidth="4" />
  </SvgBase>
);

// Star: Star Shape
const Star = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M50 10 L61 38 H90 L67 56 L76 85 L50 68 L24 85 L33 56 L10 38 H39 Z" fill="currentColor" />
  </SvgBase>
);

// Struggling: Broken Coin / Down Arrow
const Struggling = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="4" />
    <path d="M35 50 L50 65 L65 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 35 V65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// Newborn: Egg / Spark
const Newborn = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M50 15 Q 80 15 80 55 Q 80 85 50 85 Q 20 85 20 55 Q 20 15 50 15 Z" stroke="currentColor" strokeWidth="4" />
    <path d="M50 40 L50 70 M35 55 L65 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// Romantic: Heart
const Romantic = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M50 30 Q 30 0 10 30 Q 0 50 50 90 Q 100 50 90 30 Q 70 0 50 30 Z" fill="currentColor" />
  </SvgBase>
);

// Pillar: Column
const Pillar = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <rect x="20" y="10" width="60" height="10" fill="currentColor" />
    <rect x="20" y="80" width="60" height="10" fill="currentColor" />
    <rect x="30" y="20" width="10" height="60" stroke="currentColor" strokeWidth="4" />
    <rect x="45" y="20" width="10" height="60" stroke="currentColor" strokeWidth="4" />
    <rect x="60" y="20" width="10" height="60" stroke="currentColor" strokeWidth="4" />
  </SvgBase>
);

// Outlier: Glitch / Alien
const Outlier = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="4" />
    <rect x="35" y="25" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
  </SvgBase>
);


// === COMPETENCIES (Red) ===

// PR: Megaphone
const PR = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M20 30 L50 20 V80 L20 70 Z" fill="currentColor" />
    <path d="M50 30 L80 10 V90 L50 70" stroke="currentColor" strokeWidth="4" fill="none" />
    <path d="M85 30 Q 95 50 85 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// RD: Beaker
const RD = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M35 10 V30 L20 80 H80 L65 30 V10" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    <path d="M25 60 H75" stroke="currentColor" strokeWidth="4" strokeDasharray="5 5" />
    <circle cx="40" cy="50" r="3" fill="currentColor" />
    <circle cx="60" cy="70" r="4" fill="currentColor" />
  </SvgBase>
);

// Barista: Coffee Cup
const Barista = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M20 30 H80 V70 Q 80 90 50 90 Q 20 90 20 70 Z" stroke="currentColor" strokeWidth="4" />
    <path d="M80 40 H90 Q 100 40 100 50 Q 100 60 90 60 H80" stroke="currentColor" strokeWidth="4" />
    <path d="M30 20 Q 35 5 40 20" stroke="currentColor" strokeWidth="2" />
    <path d="M50 20 Q 55 5 60 20" stroke="currentColor" strokeWidth="2" />
    <path d="M70 20 Q 75 5 80 20" stroke="currentColor" strokeWidth="2" />
  </SvgBase>
);

// CEO: Crown / Tie
const CEO = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M20 40 L30 80 H70 L80 40 L50 60 Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    <path d="M20 40 L35 20 L50 40 L65 20 L80 40" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="none" />
  </SvgBase>
);

// Intern: ID Badge
const Intern = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <rect x="30" y="30" width="40" height="50" rx="2" stroke="currentColor" strokeWidth="4" />
    <path d="M40 30 V15 Q 50 5 60 15 V30" stroke="currentColor" strokeWidth="4" fill="none" />
    <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.3" />
    <line x1="35" y1="65" x2="65" y2="65" stroke="currentColor" strokeWidth="4" />
  </SvgBase>
);

// Gravedigger: Shovel
const Gravedigger = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M45 10 L55 10 L55 60 L45 60 Z" fill="currentColor" />
    <path d="M30 60 H70 V80 Q 70 95 50 95 Q 30 95 30 80 Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="4" />
    <line x1="35" y1="10" x2="65" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// Reception: Bell
const Reception = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M20 80 H80" stroke="currentColor" strokeWidth="4" />
    <path d="M50 30 Q 90 30 80 80 H20 Q 10 30 50 30 Z" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.1" />
    <circle cx="50" cy="25" r="5" fill="currentColor" />
  </SvgBase>
);

// Hotline: Phone
const Hotline = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <path d="M30 30 Q 50 10 70 30 V70 Q 50 90 30 70 Z" stroke="currentColor" strokeWidth="4" />
    <path d="M40 40 H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M40 50 H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M40 60 H60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </SvgBase>
);

// Clown: Nose / Hat
const Clown = ({ className }: { className?: string }) => (
  <SvgBase className={className}>
    <circle cx="50" cy="60" r="15" fill="currentColor" />
    <path d="M20 50 L50 10 L80 50 Z" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />
    <circle cx="50" cy="10" r="5" fill="currentColor" />
  </SvgBase>
);

// === Default / Fallback ===
export const IconAnomaly = Anomaly; // Alias if needed
export const IconReality = Reality; // Alias if needed
export const IconCompetency = Competency; // Alias if needed

// Generic Category Icons
function Anomaly(props: { className?: string }) { return <Whisper {...props}/> }
function Reality(props: { className?: string }) { return <Caretaker {...props}/> }
function Competency(props: { className?: string }) { return <CEO {...props}/> }


export const getArcIcon = (id: string) => {
  switch (id) {
    // Anomalies
    case 'whisper': return <Whisper className="w-full h-full" />;
    case 'catalog': return <Catalog className="w-full h-full" />;
    case 'drain': return <Drain className="w-full h-full" />;
    case 'clock': return <Clock className="w-full h-full" />;
    case 'growth': return <Growth className="w-full h-full" />;
    case 'gun': return <Gun className="w-full h-full" />;
    case 'dream': return <Dream className="w-full h-full" />;
    case 'manifold': return <Manifold className="w-full h-full" />;
    case 'absence': return <Absence className="w-full h-full" />;
    
    // Realities
    case 'caretaker': return <Caretaker className="w-full h-full" />;
    case 'overworked': return <Overworked className="w-full h-full" />;
    case 'stalked': return <Stalked className="w-full h-full" />;
    case 'star': return <Star className="w-full h-full" />;
    case 'struggling': return <Struggling className="w-full h-full" />;
    case 'newborn': return <Newborn className="w-full h-full" />;
    case 'romantic': return <Romantic className="w-full h-full" />;
    case 'pillar': return <Pillar className="w-full h-full" />;
    case 'outlier': return <Outlier className="w-full h-full" />;

    // Competencies
    case 'pr': return <PR className="w-full h-full" />;
    case 'rd': return <RD className="w-full h-full" />;
    case 'barista': return <Barista className="w-full h-full" />;
    case 'ceo': return <CEO className="w-full h-full" />;
    case 'intern': return <Intern className="w-full h-full" />;
    case 'gravedigger': return <Gravedigger className="w-full h-full" />;
    case 'reception': return <Reception className="w-full h-full" />;
    case 'hotline': return <Hotline className="w-full h-full" />;
    case 'clown': return <Clown className="w-full h-full" />;
    
    default: return null;
  }
};
