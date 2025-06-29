import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { FilterOption } from '@/lib/types';

interface ExerciseFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedEquipment: string;
  selectedLevel: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onEquipmentChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  categories: FilterOption[];
  equipmentOptions: FilterOption[];
  levelOptions: FilterOption[];
}

export default function ExerciseFilters({
  searchTerm,
  selectedCategory,
  selectedEquipment,
  selectedLevel,
  onSearchChange,
  onCategoryChange,
  onEquipmentChange,
  onLevelChange,
  categories,
  equipmentOptions,
  levelOptions
}: ExerciseFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedEquipment} onValueChange={onEquipmentChange}>
        <SelectTrigger>
          <SelectValue placeholder="Equipment" />
        </SelectTrigger>
        <SelectContent>
          {equipmentOptions.map(equipment => (
            <SelectItem key={equipment.value} value={equipment.value}>
              {equipment.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedLevel} onValueChange={onLevelChange}>
        <SelectTrigger>
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          {levelOptions.map(level => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
