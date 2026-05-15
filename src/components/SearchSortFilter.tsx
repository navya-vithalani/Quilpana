// src/components/SearchSortFilter.tsx

import React, { useState, useRef, useEffect } from "react";
import useSearchSortFilter from "../hooks/useSearchSortFilter";
import { SearchIcon, FilterIcon } from "./Icons";

type SortOption<T> = {
  label: string;
  key: keyof T;
  order?: "asc" | "desc";
};

type FilterOption<T> = {
  label: string;
  key: keyof T;
  values: string[];
};

interface Props<T> {
  items: T[];
  searchKey: keyof T;
  sortOptions: SortOption<T>[];
  filterOptions: FilterOption<T>[];
  onChange: (filteredItems: T[]) => void;
  headerHeight?: number;
}

function SearchSortFilter<T extends Record<string, any>>({
  items,
  searchKey,
  sortOptions,
  filterOptions,
  onChange,
  headerHeight = 120,
}: Props<T>) {

  const {
    searchQuery,
    setSearchQuery,
    selectedSort,
    setSelectedSort,
    activeFilters,
    toggleFilterValue,
    clearFilters,
  } = useSearchSortFilter(
    items,
    searchKey,
    sortOptions,
    filterOptions,
    onChange
  );

  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [openGroups, setOpenGroups] = useState<
    Record<string, boolean>
  >({});

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const SIDEBAR_TOP = `${headerHeight}px`;

  return (
    <>
      {/* TOP CONTROLS */}

      <div className="flex items-center justify-between mb-6 gap-4">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <button
            onClick={() => setShowFilters((p) => !p)}
            className="
              p-3
              rounded-2xl
              bg-/10
              hover:bg-white/20
              border
              border-white/10
              backdrop-blur-md
              transition
            "
          >
            <FilterIcon className="w-5 h-5 " />
          </button>

          <div className="text-sm">
            {Object.keys(activeFilters).length > 0
              ? `${Object.values(activeFilters).flat().length} active`
              : "No filters"}
          </div>

        </div>

        {/* SEARCH */}

        <div className="flex items-right gap-3">

          <div
            className={`
              transition-all
              duration-300
              overflow-hidden
              ${showSearch
                ? "w-[280px] opacity-100"
                : "w-0 opacity-0"}
            `}
          >

            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search templates..."
              className="
                w-full
                px-4
                py-2
                rounded-2xl
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                text-white
                placeholder:text-white/40
                outline-none
              "
            />

          </div>

          <button
            onClick={() => setShowSearch((p) => !p)}
            className="
              p-3
              rounded-2xl
              bg-white/10
              hover:bg-white/20
              border
              border-white/10
              backdrop-blur-md
              transition
            "
          >
            <SearchIcon className="w-5 h-5 text-white" />
          </button>

        </div>

      </div>

      {/* ACTIVE FILTER CHIPS */}

      <div className="flex flex-wrap gap-2 mb-5">

        {Object.entries(activeFilters).flatMap(
          ([key, values]) =>
            values.map((v) => (
              <button
                key={`${key}-${v}`}
                onClick={() =>
                  toggleFilterValue(key, v)
                }
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-purple-500/20
                  border
                  border-purple-400/20
                  text-xs
                  text-white
                  hover:bg-red-500/20
                  transition
                "
              >
                {v} ✕
              </button>
            ))
        )}

      </div>

      {/* FILTER SIDEBAR */}

      <div
        className={`
          fixed
          left-0
          transition-all
          duration-300
          z-50
          ${showFilters
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"}
        `}
        style={{
          top: SIDEBAR_TOP,
          height: `calc(100vh - ${SIDEBAR_TOP})`,
          width: 340,
        }}
      >

        <div
          className="
            h-full
            bg-black/40
            backdrop-blur-2xl
            border-r
            border-white/10
            p-6
            overflow-y-auto
          "
        >

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-xl font-semibold text-white">
              Filters
            </h2>

            <div className="flex items-center gap-3">

              <button
                onClick={() => clearFilters()}
                className="
                  text-sm
                  px-3
                  py-1
                  rounded-lg
                  bg-white/10
                  hover:bg-white/20
                  text-white
                  transition
                "
              >
                Reset
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-white/10
                  hover:bg-red-500
                  text-white
                  transition
                "
              >
                ✕
              </button>

            </div>

          </div>

          {/* FILTER GROUPS */}

          <div className="space-y-6">

            {filterOptions.map((filter) => {

              const key = String(filter.key);

              const active =
                activeFilters[key] || [];

              return (
                <div key={key}>

                  {/* GROUP HEADER */}

                  <button
                    onClick={() => toggleGroup(key)}
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      text-left
                      text-white
                      font-medium
                      mb-3
                    "
                  >
                    {filter.label}

                    <span className="text-xs text-white/50">
                      {openGroups[key] ? "▲" : "▼"}
                    </span>

                  </button>

                  {/* VALUES */}

                  <div
                    className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      space-y-2
                      ${openGroups[key]
                        ? "max-h-[500px]"
                        : "max-h-0"}
                    `}
                  >

                    {filter.values.map((value) => {

                      const checked =
                        active.includes(value);

                      return (
                        <label
                          key={value}
                          className={`
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2
                            rounded-xl
                            cursor-pointer
                            transition
                            ${checked
                              ? "bg-purple-500/20"
                              : "hover:bg-white/5"}
                          `}
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleFilterValue(
                                key,
                                value
                              )
                            }
                            className="accent-purple-500"
                          />

                          <span className="text-sm text-white">
                            {value}
                          </span>

                        </label>
                      );
                    })}

                  </div>

                </div>
              );
            })}

          </div>

          {/* SORT */}

          <div className="mt-10">

            <p className="text-sm text-white/60 mb-2">
              Sort By
            </p>

            <select
              value={selectedSort}
              onChange={(e) =>
                setSelectedSort(Number(e.target.value))
              }
              className="
                w-full
                px-4
                py-3
                rounded-2xl
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                text-white
                outline-none
              "
            >

              {sortOptions.map((option, index) => (
                <option
                  key={option.label}
                  value={index}
                  className="bg-black"
                >
                  {option.label}
                </option>
              ))}

            </select>

          </div>

        </div>

      </div>

      {/* OVERLAY */}

      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-[2px]
            z-40
          "
          style={{
            top: SIDEBAR_TOP,
          }}
        />
      )}
    </>
  );
}

export default SearchSortFilter;