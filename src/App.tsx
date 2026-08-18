import { useState } from 'react'
import { Icon } from '@iconify/react'
import './App.css';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedRole: string;
  setSelectedRole: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
}

function FilterBar({ searchQuery, setSearchQuery, selectedRole, setSelectedRole, selectedType, setSelectedType }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <RoleFilter value={selectedRole} onChange={setSelectedRole} />
      <TypeFilter value={selectedType} onChange={setSelectedType} />
    </div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center px-4 gap-2 bg-[#111820] rounded-3xl border border-[#585858] w-full min-w-0 md:min-w-[700px] flex-1 h-10">
      <Icon icon="material-symbols:search" color="#ffffff" className="w-5 h-5 flex-shrink-0" />
      <input 
        type="text" 
        placeholder="Search Character Name...." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none w-full text-white text-sm"
      />
    </div>
  );
}

function RoleFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full flex-1 h-10">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-[#111820] h-10 w-full text-white rounded-3xl border border-[#585858] pl-5 pr-10 outline-none cursor-pointer text-sm"
      >
        <option value="" className="bg-[#111820] text-white">All Role</option>
        <option value="assassin" className="bg-[#111820] text-white">Assassin</option>
        <option value="fighter" className="bg-[#111820] text-white">Fighter</option>
        <option value="mage" className="bg-[#111820] text-white">Mage</option>
        <option value="marksman" className="bg-[#111820] text-white">Marksman</option>
        <option value="roamer" className="bg-[#111820] text-white">Roamer</option>
      </select>

      <Icon 
        icon="tabler:chevron-down" 
        color="#FFFFFF" 
        className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}

function TypeFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex-1 relative h-10 w-full">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="appearance-none bg-[#111820] h-10 w-full text-white rounded-3xl border border-[#585858] pl-5 pr-10 outline-none cursor-pointer text-sm"
      >
        <option value="">All Attack Types</option>
        <option value="melee">Melee</option>
        <option value="ranged">Ranged</option>
      </select>

      <Icon 
        icon="tabler:chevron-down" 
        color="#FFFFFF" 
        className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex-shrink-0"
      />
    </div>
  );
}

interface SelectCharacterProps {
  selectedHero: HeroProps | null;
  onConfirm: () => void;
  onReset: () => void;
}

function SelectCharacter({ selectedHero, onConfirm, onReset }: SelectCharacterProps) {
  const isSelectDisabled = !selectedHero || !selectedHero.isAvailable;

  return (
    <div className="flex flex-row justify-center gap-4 w-full text-white">
      <button 
        onClick={onConfirm}
        disabled={isSelectDisabled}
        className={`h-10 min-w-0 md:min-w-[500px] border rounded-3xl transition-all duration-200 font-semibold ${
          isSelectDisabled 
            ? 'border-[#333] text-gray-500 bg-gray-900/40 cursor-not-allowed' 
            : 'border-white bg-white text-black hover:bg-gray-200 cursor-pointer'
        }`}
      >
        {selectedHero ? `Select ${selectedHero.name}` : 'Select Character'}
      </button>

      <button 
        onClick={onReset} 
        className="h-10 min-w-0 md:min-w-[500px] border border-[#585858] rounded-3xl hover:bg-white/10 transition-colors"
      >
        Restart Selection
      </button>
    </div>
  );
}

function App() {
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [confirmedHeroName, setConfirmedHeroName] = useState<string | null>(null);
  const [unavailableHeroIds, setUnavailableHeroIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const activeHero = heroes.find((h) => h.id === selectedHeroId);

  const handleSelectHero = (hero: HeroProps) => {
    if (unavailableHeroIds.includes(hero.id)) return;
    setSelectedHeroId((prevId) => (prevId === hero.id ? null : hero.id));
  };

  const handleConfirmSelection = () => {
    if (!activeHero) return;

    setConfirmedHeroName(activeHero.name);
    setUnavailableHeroIds((prev) => [...prev, activeHero.id]);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setUnavailableHeroIds([]);
    setSelectedHeroId(null);
    setConfirmedHeroName(null);
  };

  const filteredHeroes = heroes.map((hero) => ({
    ...hero,
    isAvailable: hero.isAvailable && !unavailableHeroIds.includes(hero.id)
  })).filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "" || hero.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesType = selectedType === "" || hero.attackType.toLowerCase() === selectedType.toLowerCase();

    return matchesSearch && matchesRole && matchesType;
  });

  return (
    <div className="flex flex-col p-8 max-w-7xl mx-auto w-full gap-10">
      <h1 className="w-full font-bold text-white text-3xl">CHARACTER SELECTION</h1>
      
      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center p-6">
        {filteredHeroes.map((hero) => (
          <CharacterProfile
            key={hero.id}
            hero={hero}
            isSelected={selectedHeroId === hero.id}
            hasActiveSelection={selectedHeroId !== null}
            onSelect={handleSelectHero}
          />
        ))}
      </div>

      <SelectCharacter 
        selectedHero={activeHero || null}
        onConfirm={handleConfirmSelection}
        onReset={handleReset} 
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111820] border border-[#585858] rounded-2xl p-6 flex flex-col items-center gap-4 text-white max-w-sm w-full text-center">
            <Icon icon="material-symbols:check-circle-outline" className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-bold">Character Selected!</h2>
            <p className="text-gray-300">You have successfully chosen <span className="font-bold text-white">{confirmedHeroName}</span>.</p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="mt-2 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface HeroProps{
  id: string;
  name: string;
  image: string;
  role: string;
  attackType: string;
  isAvailable: boolean;
  abilities: string[];
}

function CharacterBadges({ text, isAvailable }: { text: string; isAvailable: boolean }) {
  const badgeData = heroBadge[text];

  if (!badgeData) return null;
  
  return (
    <div 
      className={`flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 ${isAvailable ? '' : 'grayscale opacity-40'}`} 
      style={{ backgroundColor: isAvailable ? badgeData.color : '#2d3748' }}
    >
      <Icon icon={badgeData.icon} className="w-4 h-4 text-white flex-shrink-0"/>
    </div>
  );
}

interface CharacterProfileProps{
  hero: HeroProps;
  isSelected: boolean;
  onSelect: (hero: HeroProps) => void;
}

interface CharacterProfileProps {
  hero: HeroProps
  isSelected: boolean
  hasActiveSelection: boolean
  onSelect: (hero: HeroProps) => void
}

function CharacterProfile({ hero, isSelected, hasActiveSelection, onSelect }: CharacterProfileProps) {
  const roleColor = heroBadge[hero.role]?.color ?? '#585858';

  return (
    <div
      onClick={() => hero.isAvailable && onSelect(hero)}
      style={{
        boxShadow: isSelected ? `0 0 35px ${roleColor}66` : 'none',
        borderColor: isSelected ? roleColor : '#334155'
      }}
      className={`flex flex-col bg-[#01060C] min-h-[580px] w-full max-w-[220px] rounded-[110px] pb-8 transition-all duration-300 relative border ${
        hero.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${
        isSelected
          ? 'scale-105 opacity-100 z-10'
          : hasActiveSelection
          ? 'scale-95 opacity-50'
          : 'scale-100 opacity-100'
      }`}
    >
      <div className="relative w-full h-[300px] overflow-hidden rounded-t-[110px] shrink-0">
        <img
          src={hero.image}
          className={`h-full w-full object-cover object-top transition-all duration-300 ${
            !hero.isAvailable || (hasActiveSelection && !isSelected) ? 'grayscale' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/50 to-[#01060C]"></div>
      </div>

      <div className="flex flex-col gap-4 text-white font-bold px-6 py-2">
        <p className="text-[23px]">{hero.name}</p>

        <div className="flex gap-2">
          <CharacterBadges 
            text={hero.role} 
            isAvailable={hero.isAvailable && (!hasActiveSelection || isSelected)} 
          />
          <CharacterBadges 
            text={hero.attackType} 
            isAvailable={hero.isAvailable && (!hasActiveSelection || isSelected)} 
          />
        </div>

        <div className="h-[3px] bg-[#585858]"></div>
        <div className="flex flex-col gap-2">
          <p>Skills</p>
          <ul className="flex flex-col gap-2 text-sm font-normal list-disc list-inside">
            {hero.abilities.map((ability, index) => (
              <li key={index}>{ability}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const heroes = [
  { id: "H-001", name: "Belerick", image: "/Belerick.webp", role: "Roamer", attackType: "Melee", isAvailable: true, abilities: ["Nature's Strike", "Ancient Seed", "Wrath of Dryad"] },
  { id: "H-002", name: "Layla", image: "/Layla.webp", role: "Marksman", attackType: "Ranged", isAvailable: false, abilities: ["Malefic Bomb", "Void Projectile", "Destruction Rush"] },
  { id: "H-003", name: "Kagura", image: "/Kagura.webp", role: "Mage", attackType: "Ranged", isAvailable: true, abilities: ["Seimei Umbrella", "Rasho Umbrella Flee", "Yin Yang Overturn"] },
  { id: "H-004", name: "Chou", image: "/Chou.webp", role: "Fighter", attackType: "Melee", isAvailable: true, abilities: ["Jeet Kune Do", "Shunpo", "The Way of Dragon"] },
  { id: "H-005", name: "Fanny", image: "/Fanny.webp", role: "Assassin", attackType: "Melee", isAvailable: false, abilities: ["Tornado Strike", "Steel Cable", "Cut Throat"] }
];

const heroBadge:  Record <string, {color: string; icon:string }> = {
  Roamer: {color:"#A4523A", icon: "game-icons:leather-boot"},
  Marksman: {color:"#2F7B45", icon: "mdi:target"},  
  Mage: {color:"#365477", icon: "game-icons:wizard-staff"},  
  Fighter: {color:"#8F7353", icon: "game-icons:fist"},  
  Assassin: {color:"#584187", icon: "game-icons:hood"},  
  Melee: {color:"#60402D", icon: "game-icons:curvy-knife"},  
  Ranged: {color:"#1F7891", icon: "game-icons:crossbow"}  
}

export default App