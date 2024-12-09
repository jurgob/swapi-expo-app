import { ThemedText } from './ThemedText';
import { utils } from '@/clients/starwars';
import { useStarWarsGetPerson, useStarWarsGetPlanet } from '@/hooks/starwarsapi';
const { urlToPersonId } = utils;

export function PersonName({url}: {url:string}) {
    const personId = urlToPersonId(url);
    const {data} = useStarWarsGetPerson({personId})
    
    if (!data) {
        return <ThemedText >Loading</ThemedText>
    }

    return (
        <ThemedText >{data.name}</ThemedText>
    );
  }
