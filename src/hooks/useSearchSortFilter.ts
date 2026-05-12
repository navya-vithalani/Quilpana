// src/hooks/useSearchSortFilter.ts
import { useState, useEffect } from "react";

type SortOption<T> = { label: string; key: keyof T; order?: "asc" | "desc" };

export default function useSearchSortFilter<T extends Record<string, any>>(
  items: T[],
  searchKey: keyof T,
  sortOptions: SortOption<T>[],
  filterOptions: { label: string; key: keyof T; values: string[] }[],
  onChange: (filteredItems: T[]) => void
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const toggleFilterValue = (key: string, value: string) => {
    setActiveFilters(prev => {
      const prevArr = prev[key] || [];
      if (prevArr.includes(value)) return { ...prev, [key]: prevArr.filter(v => v !== value) };
      return { ...prev, [key]: [...prevArr, value] };
    });
  };

  const clearFilters = (key?: string) => {
    setActiveFilters(prev => {
      if (!key) return {};
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  // ✅ Only depend on actual state values, not object references
  useEffect(() => {
    let result = items.slice();
    // Apply filters
    filterOptions.forEach(filter => {
      const active = activeFilters[filter.key as string];
      if (active && active.length > 0) {
        result = result.filter(item => {
          const val = item[filter.key];
          if (Array.isArray(val)) return val.some((v: any) => active.includes(String(v)));
          return active.includes(String(val));
        });
      }
    });
   
  // Search (ranking, not removing)
  const q = searchQuery.trim().toLowerCase();
  const scored = result.map(item => {
    if (!q) return { item, score: 0 };
    let score = 0;
    const primary = item[searchKey];
    const primaryStr = Array.isArray(primary) ? primary.join(" ") : String(primary || "");
    const p = primaryStr.toLowerCase();
    if (p === q) score += 100;
  else if (p.startsWith(q)) score += 50;
  else if (p.includes(q)) score += 20;

  // secondary fields (optional boost)
  const otherFields = ["name", "description", "tags", "creator"];
  otherFields.forEach(f => {
    if (f === searchKey) return; // skip primary field
    const val = item[f];
    if (!val) return;
    const str = Array.isArray(val) ? val.join(" ") : String(val);
    if (str.toLowerCase().includes(q)) score += 5;
  });

      return { item, score };
    });
     

    // Sort by score first, then selectedSort
    const sortOpt = sortOptions[selectedSort] || sortOptions[0];
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const va = a.item[sortOpt.key];
      const vb = b.item[sortOpt.key];

      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;

      if (typeof va === "string" && typeof vb === "string") return (va as string).localeCompare(vb as string) * (sortOpt.order === "desc" ? -1 : 1);
      if (typeof va === "number" && typeof vb === "number") return (va as number - vb as number) * (sortOpt.order === "desc" ? -1 : 1);
      if ((va as any) instanceof Date && (vb as any) instanceof Date) {
  return ((va as Date).getTime() - (vb as Date).getTime()) * (sortOpt.order === "desc" ? -1 : 1);
}


      return 0;
    });

   // Prevent unnecessary updates: only call onChange if items actually change
  const newItems = scored.map(s => s.item);

    // ✅ Call onChange only if newItems differ from previous items to prevent infinite re-render
    const isEqual =
      newItems.length === items.length &&
      newItems.every((v, i) => v === items[i]);

    if (!isEqual) onChange(newItems);
  }, [items, searchQuery, selectedSort, activeFilters, filterOptions, sortOptions, searchKey]); // ✅ dependencies fixed

  return {
    searchQuery,
    setSearchQuery,
    selectedSort,
    setSelectedSort,
    activeFilters,
    toggleFilterValue,
    clearFilters,
  };
}
