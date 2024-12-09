import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import type { Planet } from '@/clients/starwars';

import { useStarWarsGetPlanet } from '@/hooks/starwarsapi';

function PlanetView({planet}: {planet: Planet}) {
  const attributes = [
    {label: "Climate", value: planet.climate}, 
    {label: "Diameter", value: planet.diameter},
    {label: "Gravity", value: planet.gravity},
  ]
  return (
    <ThemedView style={styles.container}>
      <ThemedView >
        <ThemedText type="title">{planet.name}</ThemedText>
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
  const { planet_id } = useLocalSearchParams();
  const planetId = planet_id.toString();
  const {
    data
  } = useStarWarsGetPlanet({planetId});

  if (!data) {
    return <ThemedView>Loading...</ThemedView>;
  }
  const planet : Planet = data;
  return (
      <PlanetView planet={planet} />
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
  container:{
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


