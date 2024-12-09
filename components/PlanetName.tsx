import { ThemedText } from './ThemedText';
import { utils } from '@/clients/starwars';
import { useStarWarsGetPlanet } from '@/hooks/starwarsapi';
const { urlToPlanetId } = utils;

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

