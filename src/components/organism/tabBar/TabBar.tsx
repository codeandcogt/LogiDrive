import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { HomeIcon } from '../../atoms';

interface TabBarIconProps {
  props: {
    state: {
      index: number;
      routeNames: string[];
    };
    navigation: any;
  };
}

export function TabBar({ props }: TabBarIconProps) {
  const { state, navigation } = props;

  const icons = [
    { 
      name: 'index', 
      icon: () => <HomeIcon fill={state.index === 0 ? '#FF9500' : '#8E8E93'} />, 
      label: 'Home' 
    },
    { 
      name: 'explore', 
      icon: () => <HomeIcon fill={state.index === 1 ? '#FF9500' : '#8E8E93'} />, 
      label: 'Explore' 
    },
    { 
      name: 'scanner', 
      icon: () => <HomeIcon fill={'#FFFFFF'} />, 
      label: 'Scanner' 
    },
  ];

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {icons.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = state.index === index;
          
          if (item.name === 'scanner') {
            return (
              <View key={item.name} style={styles.scanButtonWrapper}>
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={() => navigation.navigate(item.name)}
                >
                  <IconComponent />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.tab}
              onPress={() => navigation.navigate(item.name)}
            >
              <IconComponent />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 54,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scanButtonWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -27 }], // La mitad del ancho del botón
    top: -20, // Ajusta esto para que sobresalga más o menos
  },
  scanButton: {
    backgroundColor: '#FF9500',
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});