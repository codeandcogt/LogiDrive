import { TabBar } from '@/src/components';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar props={props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
        }
      }}
    >
      <Tabs.Screen
        name="index"
      />
      <Tabs.Screen
        name="explore"
      />

    </Tabs>
  );
}