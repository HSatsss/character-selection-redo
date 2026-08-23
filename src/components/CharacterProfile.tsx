import type { CharacterProfileProps } from '../types/hero';
import { HEROBADGE } from '../constants/heroData';
import { CharacterBadge } from '../components/CharacterBadge';

export function CharacterProfile({ hero, isSelected, hasActiveSelection, onSelect }: CharacterProfileProps) {
  const roleColor = HEROBADGE[hero.role]?.color ?? '#585858';

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
          <CharacterBadge 
            text={hero.role} 
            isAvailable={hero.isAvailable && (!hasActiveSelection || isSelected)} 
          />
          <CharacterBadge 
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