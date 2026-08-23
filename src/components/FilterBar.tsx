import { Icon } from '@iconify/react'
import type { FilterBarProps } from '../types/hero'
import { FilterRole } from '../components/FilterRole'
import { FilterSearch } from '../components/FilterSearch'
import { FilterType } from '../components/FilterType'


function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedRole, 
  setSelectedRole, 
  selectedType, 
  setSelectedType,
  onOpenAddModal 
}: FilterBarProps & { onOpenAddModal: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
      <FilterSearch value={searchQuery} onChange={setSearchQuery} />
      <FilterRole value={selectedRole} onChange={setSelectedRole} />
      <FilterType value={selectedType} onChange={setSelectedType} />
      
      <button 
        onClick={onOpenAddModal}
        className="flex items-center justify-center gap-2 bg-[#111820] border border-[#585858] hover:bg-[#1a232e] text-white text-sm h-10 px-6 rounded-3xl shrink-0 transition-colors cursor-pointer"
      >
        <Icon icon="material-symbols:add" className="w-4 h-4" />
        Add Character
      </button>
    </div>
  );
}
