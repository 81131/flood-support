import { LifeBuoy, Cat, Trees } from 'lucide-react';

export const serviceCards = [
  {
    title: "Rescue Supports",
    icon: <LifeBuoy className="w-12 h-12 text-blue-600" />,
    description: "Immediate assistance for flood victims.",
    items: [
      "Hotlines",
      "Volunteer Rescuers",
      "Report Incidents",
      "Meet Volunteers",
      "Boats",
      "Drones"
    ],
    action: "/rescue",
  },
  {
    title: "Pets",
    icon: <Cat className="w-12 h-12 text-orange-500" />,
    description: "Support for domestic animals affected by floods.",
    items: [
      "Report Missing Pets",
      "Report Found Pets",
      "Report Pets with need"
    ],
    action: "/pets",
  },
  {
    title: "Wild Life",
    icon: <Trees className="w-12 h-12 text-green-600" />,
    description: "Manage human-wildlife encounters safely.",
    items: [
      "Request Removal",
      "Request Rescuers",
      "Identify Snakes (Beta AI)" 
    ],
    action: "/wildlife",
  }
];