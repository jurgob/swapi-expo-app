import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import type { Film } from '@/clients/starwars';

import { useStarWarsGetFilm } from '@/hooks/starwarsapi';

function FilmView({film}: {film: Film}) {
  const attributes = [
    {label: "Director", value: film.director}, 
    {label: "Releaes Date", value: film.release_date}, 
  ]
  return (
    <ThemedView style={styles.filmContainer}>
      <ThemedView >
        <ThemedText type="title">{film.title}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.list} >
        {attributes.map(({label, value}, idx) => (
          <ThemedView style={styles.listItem} key={idx} >
          <ThemedText type="defaultSemiBold">{label}:</ThemedText>
          <ThemedText>{value}</ThemedText>
        </ThemedView>
        ))} 
      </ThemedView>
    </ThemedView>
  );
}


export default function PersonScreen() {
  const { film_id } = useLocalSearchParams();
  const filmId = film_id.toString();
  const {
    data,
    error
  } = useStarWarsGetFilm({filmId});
  console.log(error);
  if (!data) {
    return <ThemedView>
        <ThemedText>Loading... ({filmId}) </ThemedText>
    </ThemedView>;
  }
  const film : Film = data;
  return (
      <FilmView film={film} />
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
  filmContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
    gap: 8,
  },
  list:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 1,
  },
  listItem: {
    width: "100%",
    flexDirection: 'row',
  }
});


