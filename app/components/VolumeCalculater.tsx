// src/pages/index.tsx or wherever you need the category manager
import React, { useState } from 'react';
import CategoryManager from './CategoryManager';
import { calculateWeight } from '../../utils/calculateWeight';

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [volume, setVolume] = useState(0);
  const [weight, setWeight] = useState<number | null>(null);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

 

  return (
    <div>
      <CategoryManager onCategorySelect={handleCategorySelect} />

    </div>
  );
};

export default MainPage;
