import { ThemedText } from './ThemedText';
import { utils } from '@/clients/starwars';
import { useStarWarsGetFilm, } from '@/hooks/starwarsapi';
import { Link } from 'expo-router';
const { urlToFilmId } = utils;

export function FilmName({url}: {url:string}) {
    const filmId = urlToFilmId(url);
    const {data} = useStarWarsGetFilm({filmId})
    
    if (!data) {
        return <ThemedText >Loading</ThemedText>
    }

    return (
        <Link href={`/films/${filmId}`} ><ThemedText >{data.title}</ThemedText></Link>
    );
  }
