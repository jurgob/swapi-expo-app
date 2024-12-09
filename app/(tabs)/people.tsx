import { Link } from 'expo-router';
import { useStarWarsGetPeople } from '@/hooks/starwarsapi';
import { PersonListItem } from '@/components/PersonListItem';

import { ScrollableList } from '@/components/ScrallableList';



export default function PeopleScreen() {
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStarWarsGetPeople()

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <ScrollableList 
      error={error}
      hasNextPage={hasNextPage}
      headerSource={require('@/assets/images/sw-people.png')}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      >
        {results.map((person) => {
          return (
              <PersonListItem
                key={person.url}
                person={person}
              />
          )
        })}
    </ScrollableList>
  )
}


