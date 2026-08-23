import { useState } from "react";
import { Icon } from '@iconify/react';
import type { CharacterAddProps } from '../types/hero';
import type { HeroProps } from '../types/hero';


export function CharacterAdd ({ isOpen, onClose, onAddCharacter, existingHeroes }: CharacterAddProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [attackType, setAttackType] = useState('');
  const [skills, setSkills] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const isDuplicate = existingHeroes.some(
      (hero) => hero.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage(`Character "${name}" already exists`);
      return;
    }

    if (!name || !role || !attackType || !imagePreview) return;

    const newHero: HeroProps = {
      id: `H-${Date.now()}`,
      name: name.trim(),
      role,
      attackType,
      image: imagePreview,
      isAvailable: true,
      abilities: skills ? skills.split(',').map((s) => s.trim()).filter(Boolean) : []
    };

    onAddCharacter(newHero);
    
    setName('');
    setRole('');
    setAttackType('');
    setSkills('');
    setImagePreview(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#0b1015] border border-[#2a3544] rounded-[32px] p-8 max-w-3xl w-full relative shadow-2xl transition-all transform animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <Icon icon="material-symbols:close" className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center mt-2">
          <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-[#2a3544] bg-[#0d141d] rounded-[110px] h-[360px] w-full cursor-pointer hover:border-[#4a5a70] transition-colors group overflow-hidden">
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }} 
              className="hidden" 
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-[110px]" />
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-[#16202c] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon icon="ph:user-circle" className="w-12 h-12 text-[#4a5a70]" />
                </div>
                <span className="text-[#64748b] font-medium text-sm text-center px-4">
                  + Add Character Image
                </span>
              </>
            )}
          </label>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:user-bold" className="w-4 h-4 text-gray-300" />
                Name:
              </label>
              <input 
                type="text" 
                required
                placeholder="Type Character Name" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-11 px-5 text-white text-sm outline-none focus:border-white transition-colors placeholder:text-gray-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:shield-bold" className="w-4 h-4 text-gray-300" />
                Role:
              </label>
              <div className="relative">
                <select 
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-11 pl-5 pr-10 text-white text-sm outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>Select Character Role</option>
                  <option value="Roamer" className="bg-[#111820]">Roamer</option>
                  <option value="Marksman" className="bg-[#111820]">Marksman</option>
                  <option value="Mage" className="bg-[#111820]">Mage</option>
                  <option value="Fighter" className="bg-[#111820]">Fighter</option>
                  <option value="Assassin" className="bg-[#111820]">Assassin</option>
                </select>
                <Icon icon="tabler:chevron-down" className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:sword-bold" className="w-4 h-4 text-gray-300" />
                Attack Type:
              </label>
              <div className="relative">
                <select 
                  required
                  value={attackType}
                  onChange={(e) => setAttackType(e.target.value)}
                  className="w-full appearance-none bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-11 pl-5 pr-10 text-white text-sm outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>Select Character Attack Type</option>
                  <option value="Melee" className="bg-[#111820]">Melee</option>
                  <option value="Ranged" className="bg-[#111820]">Ranged</option>
                </select>
                <Icon icon="tabler:chevron-down" className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:magic-wand-bold" className="w-4 h-4 text-gray-300" />
                Skills (Format: SkillName, SkillName, SkillName)
              </label>
              <input 
                type="text" 
                placeholder="List Character Skills" 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-11 px-5 text-white text-sm outline-none focus:border-white transition-colors placeholder:text-gray-500"
              />
            </div>

            {errorMessage && (
              <p className="text-red-400 text-xs font-semibold px-2">{errorMessage}</p>
            )}

            <button 
              type="submit"
              className="mt-2 w-full bg-[#16202c] hover:bg-[#1e2d3e] text-white font-semibold h-11 rounded-full border border-[#2a3544] transition-colors cursor-pointer"
            >
              + Add Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}