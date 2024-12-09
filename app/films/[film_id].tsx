import { useLocalSearchParams } from 'expo-router';
import type { Film } from '@/clients/starwars';
import {StyleSheet} from 'react-native';
import { useStarWarsGetFilm } from '@/hooks/starwarsapi';
import { FilmListItem } from '@/components/FilmListItem';
import { Loader } from '@/components/Loader';
import { ThemedView } from '@/components/ThemedView';



export default function PersonScreen() {
  const { film_id } = useLocalSearchParams();
  const filmId = film_id.toString();
  const {
    data,
  } = useStarWarsGetFilm({filmId});
  if (!data) {
    return <ThemedView style={styles.container}>
      <Loader />;
    </ThemedView>
    
  }else {

  }
  const film : Film = data;
  return (
      <ThemedView style={styles.container} >
        <FilmListItem film={film} />
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  }
})

