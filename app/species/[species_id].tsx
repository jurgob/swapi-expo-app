import { useLocalSearchParams } from 'expo-router';
import type { Species } from '@/clients/starwars';
import { useStarWarsGetSpecies } from '@/hooks/starwarsapi';
import {  SpeciesListItem} from '@/components/SpeciesListItem';
import { ThemedView } from '@/components/ThemedView';
import { Loader } from '@/components/Loader';


export default function PersonScreen() {
  const { species_id } = useLocalSearchParams();
  const speciesId = species_id.toString();
  const {
    data
  } = useStarWarsGetSpecies({speciesId});

  if (!data) {
    return <Loader />;
  }
  const species : Species = data;
  return (
      <SpeciesListItem species={species} />
  );
}
