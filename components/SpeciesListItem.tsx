import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { FilmTitle } from './FilmTitle';
import { Species } from '@/clients/starwars';
import { PlanetName } from './PlanetName';
import { SimpleItem,ListContainerItem } from './Items';
import { Link } from 'expo-router';
import { utils } from '@/clients/starwars';
import React, { ReactElement } from 'react';
import { PersonName } from './PersonName';
const { urlToSpeciesId } = utils;

const styles = StyleSheet.create({
    container:{
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 8,
      width: '100%',
    },
    content:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    }
  });

export function SpeciesListItem({species}: {species: Species}) {
    const FilmList = ({filmsUrls}: {filmsUrls: string[]}) => {
      return (
        <ListContainerItem label='Films'>
          {filmsUrls.map((filmUrl) => {
            return <FilmTitle key={filmUrl} url={filmUrl} />
          })}
        </ListContainerItem>
      );
    };

    const PeopleList = ({peopleUrls}: {peopleUrls: string[]}) => {
      return (
        <ListContainerItem label='People'>
          {peopleUrls.map((peopleUrl) => {
            return <PersonName key={peopleUrl} url={peopleUrl} />
          })}
        </ListContainerItem>
      );
    };

    const ITEMS:{label: string, value: string| ReactElement}[] = [
      {label: 'Classification', value: species.classification},
      {label: 'Designation', value: species.designation},
      {label: 'Average height', value: species.average_height},
      {label: 'Average lifespan', value: species.average_lifespan},
      {label: 'Language', value: species.language},
      {label: 'Homeworld', value: (species.homeworld ? <PlanetName url={species.homeworld} /> : 'n/a')},
      
    ]
    const speciesId = urlToSpeciesId(species.url);
    console.log(`SpeciesListItem`, speciesId)
    return (
      <ThemedView style={styles.container}>
          <ThemedView >
            <Link href={`/species/${speciesId}`} key={species.url}>  
              <ThemedText type="title">{species.name}</ThemedText>
            </Link>
          </ThemedView>
          <ThemedView style={styles.content} >
            {ITEMS.map(({label, value}, idx) => {         
                return (<SimpleItem key={idx} label={label} value={value} />)
              })}
              <FilmList filmsUrls={species.films} />
              <PeopleList peopleUrls={species.people} />
        </ThemedView>
      </ThemedView>
    );
  }
