import { ThemedText } from './ThemedText';
import { utils } from '@/clients/starwars';
import { useStarWarsGetPerson, useStarWarsGetPlanet } from '@/hooks/starwarsapi';
import { Link } from 'expo-router';
import { ThemedView } from './ThemedView';
const { urlToPersonId } = utils;

export function PersonName({url}: {url:string}) {
    const personId = urlToPersonId(url);
    const {data} = useStarWarsGetPerson({personId})
    
    if (!data) {
        return <ThemedView><ThemedText >Loading</ThemedText></ThemedView>
    }

    return (
        <ThemedView><Link href={`/people/${personId}`} ><ThemedText >{data.name}</ThemedText></Link></ThemedView>
    );
  }
