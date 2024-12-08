import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {startWarsClient} from '@/clients/starwars';
import { Link } from 'expo-router';
import { useStarWarsQueryPaged } from '@/hooks/useStarWarsQueryPaged';
import { PersonListItem } from '@/components/PersonListItem';


export default function PeopleScreen() {
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useStarWarsQueryPaged({
    queryKey: ['people'], 
    queryCallback: (nextPage )=> startWarsClient.getPeople({
      queries:{
        page: nextPage,
      }
    })
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sw-people.png')}
          style={styles.headerImage}
        />
              
      }>  
      <ThemedView>
        <ThemedText type="title">Planets</ThemedText>
         <Link href="/planets"
        >Planets</Link> 
      </ThemedView>
          
      {results.map((person) => {
        return (
          <PersonListItem
            key={person.url}
            name={person.name}
            height={person.height}
            url={person.url}
          />
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


