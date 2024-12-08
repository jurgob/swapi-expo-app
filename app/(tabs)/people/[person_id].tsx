import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import type { Person } from '@/clients/starwars';

import { useStarWarsGetPerson } from '@/hooks/starwarsapi';

function PersonView({person}: {person: Person}) {
  const attributes = [
    {label: "height", value: person.height}, 
    {label: "mass", value: person.mass},
    {label: "gender", value: person.gender},
    {label: "hair color", value: person.hair_color},
  ]
  return (
    <ThemedView style={styles.personContainer}>
      <ThemedView >
        <ThemedText type="title">{person.name}</ThemedText>
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
      <PersonView person={person} />
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


