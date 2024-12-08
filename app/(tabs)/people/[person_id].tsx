import { Image, StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {startWarsClient} from '@/clients/starwars';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import {
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'

function PersonView(props: {name: string, height: string, url: string}) {
  return (
    <ThemedView style={styles.personContainer}>
      <ThemedView >
        <ThemedText type="title">{props.name}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.personContent} >
        <ThemedText type="defaultSemiBold">height:</ThemedText>
        <ThemedText>{props.height}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}


export default function PersonScreen() {
  const { person_id } = useLocalSearchParams();
  const personId = person_id.toString();
  const {
    data
  } = useQuery({
    queryKey: ['person', personId],
    queryFn: async () => {
      const result = await startWarsClient.getPerson({
        params: {
          personId: personId,
        }
      });
      return result;
    }
  });

  return (
    <ThemedView>
      <ThemedText type="title">{data?.name}</ThemedText>
    </ThemedView>
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


