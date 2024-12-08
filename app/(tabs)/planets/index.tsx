import { Link } from 'expo-router';
import { useStarWarsGetPlanets } from '@/hooks/starwarsapi';
import { utils } from '@/clients/starwars';
import { ScrollableList } from '@/components/ScrallableList';
import { PlanetListItem } from '@/components/PlanetListItem';
import React from 'react';
const { urlToPlanetId } = utils;


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
          const planetId = urlToPlanetId(planet.url);
          return (
            <Link href={`/people/${planetId}`} key={planet.url}>  
              <PlanetListItem
                key={planet.url}
                planet={planet}
              />
            </Link>
          )
        })}
    </ScrollableList>
  )
}

