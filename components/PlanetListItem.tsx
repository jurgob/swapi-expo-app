import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Planet} from '@/clients/starwars';

export function PlanetListItem({planet}: {planet: Planet}) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView >
          <ThemedText type="title">{planet.name}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.content} >
          <ThemedText type="defaultSemiBold">gravity:</ThemedText>
          <ThemedText>{planet.gravity}</ThemedText>
        </ThemedView>
      </ThemedView>
    );
}


 const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  content:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  }
});