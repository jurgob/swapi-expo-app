import { useStarWarsGetPlanets } from '@/hooks/starwarsapi';
import { ScrollableList } from '@/components/ScrallableList';
import { PlanetListItem } from '@/components/PlanetListItem';
import React from 'react';
export default function PlanetsScreen() {
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStarWarsGetPlanets()
  const results = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <ScrollableList 
      error={error}
      hasNextPage={hasNextPage}
      headerSource={require('@/assets/images/sw-planets.png')}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      >
        {results.map((planet) => {
          return (
              <PlanetListItem
                key={planet.url}
                planet={planet}
              />
          )
        })}
    </ScrollableList>
  )
}
