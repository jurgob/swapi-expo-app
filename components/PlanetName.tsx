import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Person } from '@/clients/starwars';
import { utils } from '@/clients/starwars';
import { useStarWarsGetPlanet } from '@/hooks/starwarsapi';
const { urlToPlanetId } = utils;
const styles = StyleSheet.create({
    personContainer:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
    personContent:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    }
  });

export function PlanetName({url}: {url:string}) {
    const planetId = urlToPlanetId(url);
    const {data} = useStarWarsGetPlanet({planetId})
    
    if (!data) {
        return <ThemedText >Loading</ThemedText>
    }

    return (
        <ThemedText >{data.name}</ThemedText>
    );
  }

