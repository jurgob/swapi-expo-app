import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {startWarsClient} from '@/clients/starwars';
import { useEffect, useState } from 'react';


type StartWarsPersonResult = Awaited<ReturnType<typeof startWarsClient.getPeople>>['results'];

function PeopleView(props: {name: string, height: string, url: string}) {
  return (
    <ThemedView style={styles.personContainer}>
      <ThemedView >
        <ThemedText type="title">{props.name}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.personContent} >
        <ThemedText type="defaultSemiBold">height:</ThemedText>
        <ThemedText>{props.name}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}


export default function PeopleScreen() {
  const [people, setPeople] = useState<StartWarsPersonResult>([]);
  useEffect(() => {
    startWarsClient.getPeople().then((data) => {
      setPeople(data.results);
    });
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/sw-people.png')}
          style={styles.headerImage}
        />
      }>
      {people.map((person) => {
        return (
          <PeopleView
            key={person.url}
            name={person.name}
            height={person.height}
            url={person.url}
          />
        )
      })}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
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


