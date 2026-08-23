import type { FilterBarProps } from '../types/hero'
import { FilterRole } from '../components/FilterRole'
import { FilterSearch } from '../components/FilterSearch'
import { FilterType } from '../components/FilterType'

export function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedRole, 
  setSelectedRole, 
  selectedType, 
  setSelectedType,
  onOpenAddModal 
}: FilterBarProps & { onOpenAddModal: () => void }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-3 w-full items-center">
      <div className="col-span-2 md:col-span-12 lg:col-span-6">
        <FilterSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-2">
        <FilterRole value={selectedRole} onChange={setSelectedRole} />
      </div>

      <div className="col-span-1 md:col-span-4 lg:col-span-2">
        <FilterType value={selectedType} onChange={setSelectedType} />
      </div>

      <div className="col-span-2 md:col-span-4 lg:col-span-2">
        <button 
          onClick={onOpenAddModal} 
          className="w-full flex items-center justify-center gap-2 h-10 px-4 bg-[#111820] border border-[#585858] rounded-full text-white text-sm whitespace-nowrap hover:bg-[#1f2937] transition-colors"
        >
          <span>+</span>
          <span>Add Character</span>
        </button>
      </div>
    </div>
  );
}