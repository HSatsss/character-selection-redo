import type { CharacterSelectProps } from '../types/hero';

export function CharacterSelect({ selectedHero, onConfirm, onReset }: CharacterSelectProps) {
  const isSelectDisabled = !selectedHero || !selectedHero.isAvailable;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4 text-white">
      <button 
        onClick={onConfirm}
        disabled={isSelectDisabled}
        className={`h-11 sm:h-12 w-full max-w-[500px] border rounded-3xl transition-all duration-200 font-semibold text-sm sm:text-base cursor-pointer ${
          isSelectDisabled 
            ? 'border-[#333] text-gray-500 bg-gray-900/40 cursor-not-allowed' 
            : 'border-white bg-white text-black hover:bg-gray-200'
        }`}
      >
        {selectedHero ? `Select ${selectedHero.name}` : 'Select Character'}
      </button>

      <button 
        onClick={onReset} 
        className="h-11 sm:h-12 w-full max-w-[500px] border border-[#585858] rounded-3xl hover:bg-white/10 text-sm sm:text-base transition-colors font-medium cursor-pointer"
      >
        Restart Selection
      </button>
    </div>
  );
}