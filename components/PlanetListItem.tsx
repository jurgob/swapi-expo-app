import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Planet} from '@/clients/starwars';
import { PersonName } from './PersonName';
import { SimpleItem,ListContainerItem } from './Items';



export function PlanetListItem({planet}: {planet: Planet}) {
  // const ITEMS:{label}[] = [];
    return (
      <ThemedView style={styles.container}>
        <ThemedView >
          <ThemedText type="title">{planet.name}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.content} >
          <SimpleItem label="Rotation period" value={planet.rotation_period.toString()} />
          <SimpleItem label="Orbital Period" value={planet.orbital_period.toString()} />
          <SimpleItem label="Diameter" value={planet.diameter.toString()} />
          <SimpleItem label="Climate" value={planet.climate} />
          <SimpleItem label="Gravity" value={planet.gravity} />
          <SimpleItem label="Terrain" value={planet.terrain} />
          <ListContainerItem label='Residents'>
              {planet.residents.map((personUrl) => <PersonName key={personUrl}  url={personUrl} />)}
          </ListContainerItem>
        </ThemedView>
      </ThemedView>
    );
}


 const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',
  },
  content:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 4,
    width: '100%',

  },
});