import type { HeroProps } from '../types/hero'

export const HERO: HeroProps[] = [
  { id: "H-001", name: "Belerick", image: "/Belerick.webp", role: "Roamer", attackType: "Melee", isAvailable: true, abilities: ["Nature's Strike", "Ancient Seed", "Wrath of Dryad"] },
  { id: "H-002", name: "Layla", image: "/Layla.webp", role: "Marksman", attackType: "Ranged", isAvailable: false, abilities: ["Malefic Bomb", "Void Projectile", "Destruction Rush"] },
  { id: "H-003", name: "Kagura", image: "/Kagura.webp", role: "Mage", attackType: "Ranged", isAvailable: true, abilities: ["Seimei Umbrella", "Rasho Umbrella Flee", "Yin Yang Overturn"] },
  { id: "H-004", name: "Chou", image: "/Chou.webp", role: "Fighter", attackType: "Melee", isAvailable: true, abilities: ["Jeet Kune Do", "Shunpo", "The Way of Dragon"] },
  { id: "H-005", name: "Fanny", image: "/Fanny.webp", role: "Assassin", attackType: "Melee", isAvailable: false, abilities: ["Tornado Strike", "Steel Cable", "Cut Throat"] }
];

export const HEROBADGE: Record<string, { color: string; icon: string }> = {
  Roamer: { color: "#A4523A", icon: "game-icons:leather-boot" },
  Marksman: { color: "#2F7B45", icon: "mdi:target" },  
  Mage: { color: "#365477", icon: "game-icons:wizard-staff" },  
  Fighter: { color: "#8F7353", icon: "game-icons:fist" },  
  Assassin: { color: "#584187", icon: "game-icons:hood" },  
  Melee: { color: "#60402D", icon: "game-icons:curvy-knife" },  
  Ranged: { color: "#1F7891", icon: "game-icons:crossbow" }  
};