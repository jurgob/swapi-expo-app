import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function MoreScreen() {
  const menu = [
    {label: "Species", path: "/species" as const},
    {label: "Starship", path: "/starships" as const},
    {label: "Vehicles", path: "/vehicles" as const},
  ]
  return (
      <ThemedView style={styles.container}>
        {menu.map(({label, path}, idx) => (
          <Link href={path} style={styles.item} key={idx} >
            <ThemedView style={styles.item} key={idx} >
              <ThemedText>{label}</ThemedText>
            </ThemedView>
          </Link>
        ))}
        {/* <ThemedView style={styles.item} ><ThemedText>Species</ThemedText></ThemedView>
        <ThemedView style={styles.item} ><ThemedText>Starship</ThemedText></ThemedView>
        <ThemedView style={styles.item} ><ThemedText>Vehicles</ThemedText></ThemedView> */}
        
      </ThemedView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 item: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
});


