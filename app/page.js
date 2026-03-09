'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import recipesData from '@/data/recipes.json';
import Header from '@/components/Header/Header';
import Filtres from '@/components/Filtres/Filtres';
import RecettesList from '@/components/RecetteList/RecettesList';

// Fonction utilitaire : Supprime accents et majuscules pour une recherche robuste
const normalizeText = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. ÉTATS : Initialisation via l'URL pour la persistance au rafraîchissement
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState(() => {
    const params = searchParams.get('filters');
    return params ? params.split(',') : [];
  });
  const [tagCategories, setTagCategories] = useState({});

  // 2. LOGIQUE : Debounce (Performance : évite de filtrer à chaque touche tapée)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // 3. LOGIQUE : Restauration des catégories (Pour que les badges se placent bien après un F5)
  useEffect(() => {
    if (selectedTags.length > 0 && Object.keys(tagCategories).length === 0) {
      const restored = {};
      selectedTags.forEach(tag => {
        const isIng = recipesData.some(r => r.ingredients.some(i => normalizeText(i.ingredient) === normalizeText(tag)));
        const isApp = recipesData.some(r => normalizeText(r.appliance) === normalizeText(tag));
        restored[tag] = isIng ? 'ingredients' : (isApp ? 'appliances' : 'ustensils');
      });
      setTagCategories(restored);
    }
  }, [selectedTags]);

  // 4. LOGIQUE : Filtrage des recettes (Moteur principal)
  const filteredRecipes = useMemo(() => {
    let results = recipesData;
    const searchLower = normalizeText(debouncedQuery);

    if (searchLower.length >= 3) {
      results = results.filter(recipe => 
        normalizeText(recipe.name).includes(searchLower) ||
        normalizeText(recipe.description).includes(searchLower) ||
        recipe.ingredients.some(i => normalizeText(i.ingredient).includes(searchLower))
      );
    }

    if (selectedTags.length > 0) {
      results = results.filter(recipe => {
        const recipeData = [
          normalizeText(recipe.name),
          normalizeText(recipe.appliance),
          ...recipe.ingredients.map(i => normalizeText(i.ingredient)),
          ...recipe.ustensils.map(u => normalizeText(u))
        ];
        return selectedTags.every(tag => recipeData.includes(normalizeText(tag)));
      });
    }
    return results;
  }, [selectedTags, debouncedQuery]);

  // 5. LOGIQUE : Tags disponibles (Actualisés selon les résultats)
  const getAvailableTags = (type) => {
    let rawTags = [];
    if (type === 'ingredients') rawTags = filteredRecipes.flatMap(r => r.ingredients.map(i => i.ingredient));
    else if (type === 'appliances') rawTags = filteredRecipes.map(r => r.appliance);
    else rawTags = filteredRecipes.flatMap(r => r.ustensils);
    
    return [...new Set(rawTags)]
      .filter(tag => !selectedTags.some(st => normalizeText(st) === normalizeText(tag)))
      .sort((a, b) => a.localeCompare(b));
  };

  // 6. ACTIONS : Gestion des tags
  const addTag = (tag, category) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
      setTagCategories(prev => ({ ...prev, [tag]: category }));
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
    setTagCategories(prev => {
      const { [tag]: _, ...rest } = prev;
      return rest;
    });
  };

  // 7. SYNCHRONISATION : Écriture dans l'URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTags.length > 0) params.set('filters', selectedTags.join(','));
    if (searchQuery.length >= 3) params.set('search', searchQuery);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [selectedTags, searchQuery, router]);

  return (
    <>
      <Header onSearch={setSearchQuery} defaultValue={searchQuery} />
      <main>
        <Filtres 
          recipesCount={filteredRecipes.length}
          ingredients={getAvailableTags('ingredients')}
          appareils={getAvailableTags('appliances')}
          ustensiles={getAvailableTags('ustensils')}
          selectedTags={selectedTags}
          tagCategories={tagCategories}
          onSelectTag={addTag}
          onRemoveTag={removeTag}
        />
        <RecettesList recettes={filteredRecipes} />
      </main>
    </>
  );
}
