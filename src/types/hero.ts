 export interface HeroProps {
  id: string;
  name: string;
  image: string;
  role: string;
  attackType: string;
  isAvailable: boolean;
  abilities: string[];
}

export interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRole: string;
  setSelectedRole: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  onOpenAddModal: () => void;
}

export interface CharacterAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCharacter?: (newHero: HeroProps) => void;
}

export interface CharacterProfileProps {
  hero: HeroProps;
  isSelected: boolean;
  hasActiveSelection: boolean;
  onSelect: (hero: HeroProps) => void;
}

export interface CharacterSelectProps {
  selectedHero: HeroProps | null;
  onConfirm: () => void;
  onReset: () => void;
}