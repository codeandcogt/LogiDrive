import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { CompassIcon } from '../icons';

interface WidgetButtonProps {
  onPress: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const WidgetButton: React.FC<WidgetButtonProps> = ({ 
  onPress, 
  title = "Iniciar", 
  subtitle,
  icon 
}) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.contentContainer}>
        <CompassIcon height={50} width={50} fill='#f1f1f1'/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#F25D27',
    borderRadius: 12,
    shadowColor: '#F97316',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  }
});