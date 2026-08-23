import { useState, type ChangeEvent } from 'react';
import { Icon } from '@iconify/react';
import type { HeroProps } from './types/hero';
import { HERO } from './constants/heroData';
import { FilterBar } from './components/FilterBar';
import { CharacterProfile } from './components/CharacterProfile';
import { CharacterSelect } from './components/CharacterSelect';
import { CharacterAdd } from './components/CharacterAdd';
import './App.css';

function App() {
  const [heroList, setHeroList] = useState<HeroProps[]>(HERO);
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [confirmedHeroName, setConfirmedHeroName] = useState<string | null>(null);
  const [unavailableHeroIds, setUnavailableHeroIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const activeHero = heroList.find((h) => h.id === selectedHeroId);

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

  const handleAddHero = (newHero: HeroProps) => {
    setHeroList((prev) => [...prev, newHero]);
  };

  const filteredHeroes = heroList.map((hero) => ({
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
        onOpenAddModal={() => setIsAddModalOpen(true)}
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

      <CharacterSelect 
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

      <CharacterAdd 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddCharacter={handleAddHero}
        existingHeroes={heroList}
      />
    </div>
  );
}

export default App;