import { Icon } from '@iconify/react'

export function FilterType({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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