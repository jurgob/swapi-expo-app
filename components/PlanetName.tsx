import { ThemedText } from './ThemedText';
import { utils } from '@/clients/starwars';
import { useStarWarsGetPlanet } from '@/hooks/starwarsapi';
const { urlToPlanetId } = utils;
import { Link } from 'expo-router';


export function PlanetName({url}: {url:string}) {
    const planetId = urlToPlanetId(url);
    const {data} = useStarWarsGetPlanet({planetId})
    
    if (!data) {
        return <ThemedText >Loading</ThemedText>
    }

    return (
        <Link href={`/planets/${planetId}`} ><ThemedText >{data.name}</ThemedText></Link>
    );
  }

