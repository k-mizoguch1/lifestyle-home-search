import type { Home } from '@/model/home'

export function filterHomes(
  homes: Home[],
  {
    minRent,
    maxRent,
    year,
    selectedCities,
    layouts,
    buildings,
  }: {
    minRent: string | null
    maxRent: string | null
    year: string | null
    selectedCities: string[] | null
    layouts: string[] | null
    buildings: string[] | null
  },
): Home[] {
  const minRentValue = minRent ? Number(minRent) * 10000 : 0
  const maxRentValue = maxRent ? Number(maxRent) * 10000 : Infinity
  const yearValue = year && year !== '指定しない' ? parseInt(year) : null

  return homes.filter((home) => {
    return (
      home.rent >= minRentValue &&
      home.rent <= maxRentValue &&
      (yearValue === null || home.year <= yearValue) &&
      (selectedCities === null ||
        selectedCities.length === 0 ||
        selectedCities.includes(home.city)) &&
      (layouts === null ||
        layouts.length === 0 ||
        layouts.includes(home.layout)) &&
      (buildings === null ||
        buildings.length === 0 ||
        buildings.includes(home.building))
    )
  })
}
