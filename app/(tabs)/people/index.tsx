import { Link } from 'expo-router';
import { useStarWarsGetPeople } from '@/hooks/starwarsapi';
import { PersonListItem } from '@/components/PersonListItem';
import { utils } from '@/clients/starwars';
import { ScrollableList } from '@/components/ScrallableList';
const { urlToPersonId } = utils;


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
          const personId = urlToPersonId(person.url);
          return (
            <Link href={`/people/${personId}`} key={person.url}>  
              <PersonListItem
                key={person.url}
                person={person}
              />
            </Link>
          )
        })}
    </ScrollableList>
  )
}


