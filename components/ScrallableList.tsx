import { Image, StyleSheet, Button, ImageSourcePropType } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

export  function ScrollableList({error,children,hasNextPage, headerSource,fetchNextPage,isFetchingNextPage}: {error: Error|null, children: any,hasNextPage: boolean, headerSource: ImageSourcePropType, fetchNextPage: () => void,isFetchingNextPage:boolean}) {
  if (error) {
    return <ThemedView>Error: {error.message}</ThemedView>;
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={headerSource}
          style={styles.headerImage}
        />
              
      }>  
     {children}
      {hasNextPage && (
         <Button
         title="Next Page"
         onPress={() => fetchNextPage()}
         disabled={isFetchingNextPage}
          
       />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});
