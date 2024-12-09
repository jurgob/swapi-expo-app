import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import type { Person } from '@/clients/starwars';

import { useStarWarsGetPerson } from '@/hooks/starwarsapi';
import { PersonListItem } from '@/components/PersonListItem';

export default function PersonScreen() {
  const { person_id } = useLocalSearchParams();
  const personId = person_id.toString();
  const {
    data
  } = useStarWarsGetPerson({personId});

  if (!data) {
    return <ThemedView>Loading...</ThemedView>;
  }
  const person : Person = data;
  return (
    <ThemedView style={styles.container}>
      <PersonListItem person={person} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
   padding: 8,
  }
});


