import { Link } from 'expo-router';
import {  useStarWarsGetSpeciesList } from '@/hooks/starwarsapi';
import { SpeciesListItem } from '@/components/SpeciesListItem';

import { ScrollableList } from '@/components/ScrallableList';



export default function SpeciesScreen() {
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStarWarsGetSpeciesList()

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <ScrollableList 
      error={error}
      hasNextPage={hasNextPage}
      headerSource={require('@/assets/images/partial-react-logo.png')}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      >
        {results.map((species) => {
          return (
              <SpeciesListItem
                key={species.url}
                species={species}
              />
          )
        })}
    </ScrollableList>
  )
}


