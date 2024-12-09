import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { FilmTitle } from './FilmTitle';
import { Person } from '@/clients/starwars';
import { PlanetName } from './PlanetName';
import { SimpleItem,ListContainerItem } from './Items';
import { Link } from 'expo-router';
import { utils } from '@/clients/starwars';
import React, { ReactElement } from 'react';
const { urlToPersonId } = utils;

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

export function PersonListItem({person}: {person: Person}) {


    const FilmList = ({filmsUrls}: {filmsUrls: string[]}) => {
      return (
        <ListContainerItem label='Films'>
          {filmsUrls.map((filmUrl) => {
            return <FilmTitle key={filmUrl} url={filmUrl} />
          })}
        </ListContainerItem>
      );
    };

    const ITEMS:{label: string, value: string| ReactElement}[] = [
      {label: 'Height', value: person.height},
      {label: 'Mass', value: person.mass},
      {label: 'Hair color', value: person.hair_color},
      {label: 'Gender', value: person.gender},
      {label: 'Homeworld', value: (<PlanetName url={person.homeworld} />)},

    ]
    const personId = urlToPersonId(person.url);

    return (
      <ThemedView style={styles.container}>
          <ThemedView >
            <Link href={`/people/${personId}`} key={person.url}>  
              <ThemedText type="title">{person.name}</ThemedText>
            </Link>
          </ThemedView>
          <ThemedView style={styles.content} >
            {ITEMS.map(({label, value}, idx) => {         
                return (<SimpleItem key={idx} label={label} value={value} />)
              })}
              <FilmList filmsUrls={person.films} />
        </ThemedView>
      </ThemedView>
    );
  }
