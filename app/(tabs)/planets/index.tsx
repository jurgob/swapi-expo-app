import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Planet, startWarsClient} from '@/clients/starwars';
import {
  useInfiniteQuery,
} from '@tanstack/react-query'
import { StackActions, useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { utils } from '@/clients/starwars';
const { urlToPlanetId } = utils;
function PlanetView({planet}: {planet: Planet}) {
  return (
    <ThemedView style={styles.personContainer}>
      <ThemedView >
        <ThemedText type="title">{planet.name}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.personContent} >
        <ThemedText type="defaultSemiBold">gravity:</ThemedText>
        <ThemedText>{planet.gravity}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}


export default function PlanetsScreen() {
  // const peopleQuery = useQuery({ queryKey: ['people'], queryFn: startWarsClient.getPeople });
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({ 
    queryKey: ['planets'], 
    queryFn: async (queryParams) => {
      const nextPage = Number(queryParams.pageParam);
      return startWarsClient.getPlanets({
        queries:{
          page: nextPage,
        }
      })
    },
    initialPageParam: "1",
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get('page') ;
      }
      return undefined;
    }
  
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  const navigation = useNavigation();
  
  if(error){
    console.log("error", error);
  }
  return (
    <ParallaxScrollView

      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sw-planets.png')}
          style={styles.headerImage}
        />
              
      }>
      {results.map((planet) => {
        const planetId = urlToPlanetId(planet.url);

        return (
          <Link href={`/people/${planetId}`} key={planet.url}>  
            <PlanetView planet={planet} />
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
  },
  personContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  personContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  }
});


