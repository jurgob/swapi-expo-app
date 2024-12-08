import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Person } from '@/clients/starwars';
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

export function PersonListItem({person}: {person: Person}) {
    return (
      <ThemedView style={styles.personContainer}>
        <ThemedView >
          <ThemedText type="title">{person.name}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.personContent} >
          <ThemedText type="defaultSemiBold">height:</ThemedText>
          <ThemedText>{person.height}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.personContent} >
          <ThemedText type="defaultSemiBold">homeworld:</ThemedText>
          <PlanetName url={person.homeworld} />
        </ThemedView>
      </ThemedView>
    );
  }