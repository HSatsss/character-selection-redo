import type { CharacterSelectProps } from '../types/hero'

export function SelectCharacter({ selectedHero, onConfirm, onReset }: CharacterSelectProps) {
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