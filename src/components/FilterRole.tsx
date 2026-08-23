import { Icon } from '@iconify/react';

export function FilterRole({ value, onChange }: { value: string; onChange: (v: string) => void }) {
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