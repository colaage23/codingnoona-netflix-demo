export const languageOptions = [
  { value: "", label: "All languages" },
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
  { value: "hi", label: "हिन्दी" },
  { value: "th", label: "ไทย" },
];

export const releaseYearOptions = [
  { value: "", label: "All years" },
  ...Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, index) => {
    const year = new Date().getFullYear() - index;
    return { value: String(year), label: String(year) };
  }),
];

export const sortOptions = [
  { value: "", label: "Default" },
  { value: "popularity.desc", label: "인기도 높은순" },
  { value: "popularity.asc", label: "인기도 낮은순" },
];
