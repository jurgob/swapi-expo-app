import { ThemedText } from './ThemedText';
import { utils } from '@/clients/starwars';
import { useStarWarsGetSpecies } from '@/hooks/starwarsapi';
import { Link } from 'expo-router';
import { LoaderRow } from '@/components/LoaderRow';
import { ThemedView } from './ThemedView';
const { urlToSpeciesId } = utils;

export function SpeciesName({url}: {url:string}) {
    const speciesId = urlToSpeciesId(url);
    const {data} = useStarWarsGetSpecies({speciesId})
    
    if (!data) {
        return <LoaderRow />;
    }

    return (
        <Link href={`/species/${speciesId}`} ><ThemedText >{data.name}</ThemedText></Link>
    );
  }
