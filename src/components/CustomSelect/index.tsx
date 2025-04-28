"use client";

import { useState, useRef, useEffect } from "react";
import { mobileOnly } from "@/shared/configs/responsive";
import { RenderContainer } from "@/shared/components/RenderContainer";

interface OptionType {
  value: string;
  label: string;
  flag?: string;
}

interface CustomSelectProps {
  options: OptionType[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  neonColor?: "purple" | "green" | "blue";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  placeholder?: string;
}

export function CustomSelect({
  options,
  defaultValue,
  onChange,
  className = "",
  neonColor = "purple",
  size = "md",
  disabled = false,
  placeholder = "Selecione uma opção",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const selectRef = useRef<HTMLDivElement>(null);

  // Determinar a cor neon baseada na prop
  const neonColorClass = {
    purple:
      "shadow-[0_0_25px_rgba(153,69,255,0.5)] border-hub-secondary hover:shadow-[0_0_5px_rgba(153,69,255,0.8)]",
    green:
      "shadow-[0_0_15px_rgba(20,241,149,0.5)] border-hub-primary hover:shadow-[0_0_5px_rgba(20,241,149,0.8)]",
    blue: "shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-500 hover:shadow-[0_0_5px_rgba(59,130,246,0.8)]",
  }[neonColor];

  // Tamanho do select
  const sizeClass = {
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  }[size];

  // Detectar clique fora do select para fechá-lo
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange && onChange(value);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <RenderContainer>
      <div
        ref={selectRef}
        className={`relative ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${className}`}
      >
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
          flex justify-between items-center
          bg-black border rounded-lg transition-all duration-300 
          ${neonColorClass} ${sizeClass}
          ${isOpen ? "rounded-b-none" : ""}
        `}
        >
          <div className="flex items-center text-white">
            {selectedOption ? (
              <>
                {selectedOption.flag && (
                  <span className="mr-2">{selectedOption.flag}</span>
                )}
                <span>{selectedOption.label}</span>
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <div className="text-white ml-4">
            <svg
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div
            className={`
          absolute z-50 w-full mt-0 py-1 
          bg-black border-x border-b rounded-b-lg 
          ${neonColorClass}
          max-h-48 overflow-y-auto
        `}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                flex items-center px-4 py-2 text-white hover:bg-white/10 
                ${selectedValue === option.value ? "bg-white/20" : ""}
              `}
              >
                {option.flag && <span className="mr-2">{option.flag}</span>}
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </RenderContainer>
  );
}

// Exemplo de uso:
// <CustomSelect
//   options={[
//     { value: 'pt', label: 'Português', flag: '🇧🇷' },
//     { value: 'en', label: 'English', flag: '🇺🇸' },
//     { value: 'es', label: 'Español', flag: '🇪🇸' },
//   ]}
//   defaultValue="pt"
//   onChange={(value) => console.log(value)}
//   neonColor="purple"
//   size="md"
// />
