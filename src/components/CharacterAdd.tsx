import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from '@iconify/react';
import type { CharacterAddProps } from '../types/hero';
import type { HeroProps } from '../types/hero';
import { z } from 'zod'

export const CHARACTERSCHEME = z.object ({
  name: z.string().trim().min(1, "Character name is required.").max(30, "Name must be 30 characters or less."),
  role: z.string().min(1, "Please select characters role."),
  attackType: z.string().min(1, "Please select characters attack type."),
  image: z.string().min(1, "Character image is required!"),
  skills: z.string().min(1, "At least one skill is required!").max(100, "Skills list is too long."),
});

export type CharacterFormValues = z.infer<typeof CHARACTERSCHEME>;

interface CharacterAddExtendedProps extends CharacterAddProps {
  existingHeroes?: HeroProps[];
  onAddCharacter?: (newHero: HeroProps) => void;
}

export function CharacterAdd ({ isOpen, onClose, onAddCharacter, existingHeroes=[]}: CharacterAddExtendedProps) {

    const {
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    reset,
    setError,
    formState: { errors }
  } = useForm<CharacterFormValues>({
    resolver: zodResolver(CHARACTERSCHEME),
    mode: 'onTouched',
    defaultValues: {
      name: "",
      role: "",
      attackType: "",
      image: "",
      skills: "", 
    } 
  })

  const imagePreview = watch('image');

  if (!isOpen) return null;
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('image', reader.result as string, { shouldValidate: true });
    }
    reader.readAsDataURL(file);
  }

  const onSubmit = (data: CharacterFormValues) => {
    const isDuplicate = existingHeroes.some(
      (hero) => hero.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    )

    if (isDuplicate) {
      setError('name', {
        type: 'manual',
        message: `Character "${data.name.trim()}" already exists!`,
      });
      return;
    }

    const parseAbilities = data.skills.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
    
    const newHero: HeroProps = {
      id: `H-${Date.now()}`,
      name: data.name.trim(),
      role: data.role,
      attackType: data.attackType,
      image: data.image,
      isAvailable: true,
      abilities: parseAbilities,
    };

    if (onAddCharacter) {
      onAddCharacter(newHero);
    }

    reset();
    onClose();
  };

  const handleCloseModal = () => {
    reset();
    onClose();
  }


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300 animate-fadeIn overflow-y-auto" onClick={handleCloseModal} >
      <div className="bg-[#0b1015] border border-[#2a3544] rounded-3xl md:rounded-[32px] p-5 sm:p-8 max-w-3xl w-full my-auto relative shadow-2xl transition-all transform animate-scaleUp max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} >
        <button onClick={handleCloseModal} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white transition-colors cursor-pointer z-10" >
          <Icon icon="material-symbols:close" className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] gap-6 sm:gap-8 items-start mt-2">

          <div className="flex flex-col items-center w-full">
            <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-[#2a3544] bg-[#0d141d] rounded-full h-[280px] w-[180px] sm:h-[320px] sm:w-[200px] md:h-[360px] md:w-full cursor-pointer hover:border-[#4a5a70] transition-colors group overflow-hidden shrink-0">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#16202c] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon icon="ph:user-circle" className="w-10 h-10 sm:w-12 sm:h-12 text-[#4a5a70]" />
                  </div>
                  <span className="text-[#64748b] font-medium text-xs sm:text-sm px-2">
                    + Add Character Image
                  </span>
                </div>
              )}
            </label>
            {errors.image && (
              <p className="text-red-400 text-xs font-semibold px-2 mt-2 text-center">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 w-full">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:user-bold" className="w-4 h-4 text-gray-300" />
                Name:
              </label>
              <input 
                type="text" 
                placeholder="Type Character Name" 
                {...register("name")}
                className="bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-10 sm:h-11 px-4 sm:px-5 text-white text-sm outline-none focus:border-white transition-colors placeholder:text-gray-500 w-full"
              />
              {errors.name && <p className="text-red-500 text-xs px-2">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:shield-bold" className="w-4 h-4 text-gray-300" />
                Role:
              </label>
              <div className="relative w-full">
                <select 
                  {...register('role')}
                  defaultValue=""
                  className="w-full appearance-none bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-10 sm:h-11 pl-4 sm:pl-5 pr-10 text-white text-sm outline-none focus:border-white transition-colors cursor-pointer"
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
              {errors.role && <p className="text-red-500 text-xs px-2">{errors.role.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:sword-bold" className="w-4 h-4 text-gray-300" />
                Attack Type:
              </label>
              <div className="relative w-full">
                <select 
                  {...register('attackType')}
                  defaultValue=""
                  className="w-full appearance-none bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-10 sm:h-11 pl-4 sm:pl-5 pr-10 text-white text-sm outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>Select Character Attack Type</option>
                  <option value="Melee" className="bg-[#111820]">Melee</option>
                  <option value="Ranged" className="bg-[#111820]">Ranged</option>
                </select>
                <Icon icon="tabler:chevron-down" className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.attackType && <p className="text-red-500 text-xs px-2">{errors.attackType.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="flex items-center gap-2 text-white text-sm font-semibold">
                <Icon icon="ph:magic-wand-bold" className="w-4 h-4 text-gray-300" />
                Skills <span className="text-gray-400 font-normal text-xs">(SkillName, SkillName)</span>
              </label>
              <input 
                type="text" 
                placeholder="List Character Skills" 
                {...register('skills')}
                className="bg-[#0f172a]/60 border border-[#2a3544] rounded-full h-10 sm:h-11 px-4 sm:px-5 text-white text-sm outline-none focus:border-white transition-colors placeholder:text-gray-500 w-full"
              />
              {errors.skills && <p className="text-red-500 text-xs px-2">{errors.skills.message}</p>}
            </div>

            <button 
              type="submit"
              className="mt-2 w-full bg-[#16202c] hover:bg-[#1e2d3e] text-white font-semibold h-10 sm:h-11 rounded-full border border-[#2a3544] transition-colors cursor-pointer text-sm"
            >
              + Add Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}