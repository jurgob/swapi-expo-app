import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'People',
          tabBarIcon: () => (
             <IconSymbol name="person.2.fill" color="#444"  />
          ),
        }}
      />
       <Tabs.Screen
        name="people"
        options={{
          href:null
        }}
      />
      <Tabs.Screen
        name="planets"
        options={{
          title: 'Planets',
          tabBarIcon: () => (
            <IconSymbol name="globe.central.south.asia" color="#444"  />
         ),
        }}
      />
      <Tabs.Screen
        name="films"
        options={{
          title: 'Films',
          tabBarIcon: () => (
            <IconSymbol name="movieclapper.fill" color="#444"  />
         ),
        }}
      />
      <Tabs.Screen
        name="films/[film_id]"
        options={{
          href:null
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: () => (
            <IconSymbol name="ellipsis" color="#444"  />
         ),
          
        }}
      />
      {/*}
      <Tabs.Screen
        name="species"
        options={{
          title: 'Species'
        }}
      />
      <Tabs.Screen
        name="vehicles"
        options={{
          title: 'Vehicles'
        }}
      />
       <Tabs.Screen
        name="starships"
        options={{
          title: 'Starships'
        }}
      />  */}
    </Tabs>
  );
}
