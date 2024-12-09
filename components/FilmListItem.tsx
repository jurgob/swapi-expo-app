import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Film } from '@/clients/starwars';
import { PlanetName } from './PlanetName';
import { SimpleItem,ListContainerItem } from './Items';
import { ReactElement } from 'react';
import { PersonName } from './PersonName';
import { SpeciesName } from './SpeciesName';
import { utils } from '@/clients/starwars';
const { urlToFilmId } = utils;
import { Link } from 'expo-router';

const styles = StyleSheet.create({
    personContainer:{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 8,
    },
    personContent:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    }
  });

export function FilmListItem({film}: {film: Film}) {
    const ITEMS:{label: string, value: string| ReactElement}[] = [
      {label: 'Director', value: film.director},
      {label: 'Episode', value: film.episode_id.toString()},
      {label: 'Release Date', value: film.release_date},
      {label: 'Producer', value: film.producer},
      // {label: 'Opening Crawl', value: film.opening_crawl},
    ];
    const filmId = urlToFilmId(film.url);

    return (
      <ThemedView style={styles.personContainer}>
        <Link href={`/films/${filmId}`} key={film.url}>  
          <ThemedView >
            <ThemedText type="title">{film.title}</ThemedText>
          </ThemedView>
        </Link>
        {ITEMS.map(({label, value}) => {
          return <SimpleItem key={label} label={label} value={value} />
        })}
        <ListContainerItem label='Opening Crawl'>
          <ThemedText>{film.opening_crawl}</ThemedText>
        </ListContainerItem>
        <ListContainerItem label='Characters'>
          {film.characters.map((personUrl) => <PersonName key={personUrl}  url={personUrl} />)}
        </ListContainerItem> 
        <ListContainerItem label='Species'>
          {film.species.map((speciesUrl) => <SpeciesName key={speciesUrl}  url={speciesUrl} />)}
        </ListContainerItem>
        <ListContainerItem label='Planets'>
          {film.planets.map((planetUrl) => <PlanetName key={planetUrl}  url={planetUrl} />)}
        </ListContainerItem>
      </ThemedView>
    );
  }