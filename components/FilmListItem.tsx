import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Film } from '@/clients/starwars';
import { PlanetName } from './PlanetName';

const styles = StyleSheet.create({
    personContainer:{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 8,
    },
    personContent:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    }
  });

export function FilmListItem({film}: {film: Film}) {
    return (
      <ThemedView style={styles.personContainer}>
        <ThemedView >
          <ThemedText type="title">{film.title}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.personContent} >
          <ThemedText type="defaultSemiBold">director:</ThemedText>
          <ThemedText>{film.director}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.personContent} >
          <ThemedText type="defaultSemiBold">Episode:</ThemedText>
          <ThemedText>{film.episode_id}</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }