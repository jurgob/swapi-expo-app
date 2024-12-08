import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const styles = StyleSheet.create({
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

export function PersonListItem(props: {name: string, height: string, url: string}) {
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