import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {startWarsClient} from '@/clients/starwars';
import {
  useInfiniteQuery,
  useQueryClient
} from '@tanstack/react-query'

function PlanetView(props: {name: string, gravity: string, url: string}) {
  return (
    <ThemedView style={styles.personContainer}>
      <ThemedView >
        <ThemedText type="title">{props.name}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.personContent} >
        <ThemedText type="defaultSemiBold">gravity:</ThemedText>
        <ThemedText>{props.gravity}</ThemedText>
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
  const queryClient= useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['planets'] })

  const results = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <ParallaxScrollView

      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sw-planets.png')}
          style={styles.headerImage}
        />
              
      }>
      {error && (
        <ThemedView style={styles.personContent} >
          {/* <ThemedText>{{error}}</ThemedText> */}
        </ThemedView>
      )}
      {results.map((person) => {
        return (
          <PlanetView
            key={person.url}
            name={person.name}
            gravity={person.gravity}
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


