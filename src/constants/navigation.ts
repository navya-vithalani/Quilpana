export type NavContext = "sidebar" | "navbar" | "dropdown";

export type NavItem = {
  label: string;
  href: string;
  contexts: NavContext[];
  icon?: string; // optional for now, useful later
  group?: "main" | "mode" | "utility"; // optional structure layer
  disabled?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
    {
    label: "Play",
    href: "/player",
    contexts: ["sidebar", "navbar"],
    group: "mode"
  },
    {
    label: "Create",
    href: "/creator",
    contexts: ["sidebar", "navbar"],
    group: "mode"
  },  
  {
    label: "Spark",
    href: "/spark",
    contexts: ["sidebar", "navbar", "dropdown"],
    group: "main"
  },
  {
    label: "Beyond",
    href: "/beyond",
    contexts: ["sidebar", "navbar", "dropdown"],
    group: "main"
  },
  {
    label: "Manifesto",
    href: "/manifesto",
    contexts: ["sidebar", "navbar", "dropdown"],
    group: "main"
  },
  {
    label: "Profile",
    href: "/profile/me",
    contexts: ["sidebar", "navbar", "dropdown"],
    group: "utility"
  } 
];