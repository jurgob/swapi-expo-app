import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useStarWarsGetPeople } from '@/hooks/starwarsapi';
import { PersonListItem } from '@/components/PersonListItem';
import { utils } from '@/clients/starwars';
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
  if (error) {
    return <ThemedView>Error: {error.message}</ThemedView>;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sw-people.png')}
          style={styles.headerImage}
        />
              
      }>  
      {results.map((person) => {
        const personId = urlToPersonId(person.url);
        return (
          <Link href={`/people/${personId}`} key={person.url}>  
            <PersonListItem
              key={person.url}
              name={person.name}
              height={person.height}
              url={person.url}
            />
          </Link>
        )
      })}
      {hasNextPage && (
         <Button
         title="Next Page"
         onPress={() => fetchNextPage()}
         disabled={isFetchingNextPage}
          
       />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});


