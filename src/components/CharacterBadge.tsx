import { Icon } from '@iconify/react'
import { HEROBADGE } from '../constants/heroData'

export function CharacterBadge({ text, isAvailable }: { text: string; isAvailable: boolean }) {
  const badgeData = HEROBADGE[text];

  if (!badgeData) return null;
  
  return (
    <div 
      className={`flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300 ${isAvailable ? '' : 'grayscale opacity-40'}`} 
      style={{ backgroundColor: isAvailable ? badgeData.color : '#2d3748' }}
    >
      <Icon icon={badgeData.icon} className="w-4 h-4 text-white flex-shrink-0"/>
    </div>
  );
}