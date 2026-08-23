import { Icon } from '@iconify/react'

export function FilterSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex w-full items-center px-4 gap-2 bg-[#111820] rounded-3xl border border-[#585858] h-10">
      <Icon icon="material-symbols:search" color="#ffffff" className="w-5 h-5 shrink-0" />
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
