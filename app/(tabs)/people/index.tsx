import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {startWarsClient} from '@/clients/starwars';
import { Link } from 'expo-router';
import { StackActions } from '@react-navigation/native';

import {
  useInfiniteQuery,
} from '@tanstack/react-query'

function PeopleView(props: {name: string, height: string, url: string}) {
  return (
    <ThemedView style={styles.personContainer}>
      <ThemedView >
        <ThemedText type="title">{props.name}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.personContent} >
        <ThemedText type="defaultSemiBold">height:</ThemedText>
        <ThemedText>{props.height}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}


export default function PeopleScreen() {
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({ 
    queryKey: ['people'], 
    queryFn: async (queryParams) => {
      const nextPage = Number(queryParams.pageParam);
      const result = await  startWarsClient.getPeople({
        queries:{
          page: nextPage,
        }
      })
      return result;
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
        {/* <Button
          title="Planets"
          onPress={() => {
            // navigation.navigate('Planets');
            navigation.dispatch(StackActions.push('PlanetsScreen'));
          }}/> */}
         <Link href="/planets"
        >Planets</Link> 
      </ThemedView>
          
      {results.map((person) => {
        return (
          <PeopleView
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

