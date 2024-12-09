import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ReactElement } from 'react';

export function SimpleItem({label, value}: {label: string, value: string}) {
    return (
      <ThemedView style={styles.contentItem} >
        <ThemedView style={styles.contentItemLine} >
          <ThemedText type="defaultSemiBold">{label}:</ThemedText>
          <ThemedText>{value}</ThemedText>
        </ThemedView>
      </ThemedView> 
    )
  }

  export function ListContainerItem({label, children}: {label: string, children: ReactElement|ReactElement[]}) {
    return (
      <ThemedView style={styles.contentItem} >
      <ThemedText type="defaultSemiBold">{label}:</ThemedText>
        <ThemedView style={styles.contentItemList} >
          {children}
        </ThemedView>
      </ThemedView>
    )
}

  const styles = StyleSheet.create({
    contentItem:{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    contentItemLine:{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      gap: 4,
    },
    contentItemList: {
      paddingLeft: 16,
    }
  });