import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Planet} from '@/clients/starwars';
import { ReactElement } from 'react';
import { PersonName } from './PersonName';


export function SimpleItem({label, value}: {label: string, value: string}) {
  return (
    <ThemedView style={styles.contentItem} >
      <ThemedView style={styles.contentItemLine} >
        <ThemedText type="defaultSemiBold">{label}:</ThemedText>
        <ThemedText>{value}</ThemedText>
      </ThemedView>
    </ThemedView> 
  )
}

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
          <ThemedView style={styles.contentItem} >
            <ThemedText type="defaultSemiBold">Residents:</ThemedText>
            <ThemedView style={styles.contentItemList} >
              {planet.residents.map((personUrl) => <PersonName key={personUrl}  url={personUrl} />)}
            </ThemedView>
          </ThemedView>
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
  contentItem:{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  contentItemLine:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 4,
  },
  contentItemList: {
    paddingLeft: 16,
  }
});