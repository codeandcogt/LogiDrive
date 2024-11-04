import { ListVehicle } from '@/src/interface';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HomeGaritaProps {
  data: ListVehicle;
}

export const HomeGarita: React.FC<HomeGaritaProps> = ({ data }) => {
  const getTimeStatus = () => {
    const departure = new Date(data.departureTime);
    const now = new Date();
    const diffInMinutes = (departure.getTime() - now.getTime()) / (1000 * 60);

    if (diffInMinutes < 0) return 'past';
    if (diffInMinutes <= 30) return 'near';
    if (diffInMinutes <= 60) return 'approaching';
    return 'future';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const getStatusColor = () => {
    const status = getTimeStatus();
    switch (status) {
      case 'past':
        return '#FCA5A5';
      case 'near':
        return '#FBBF24';
      case 'approaching':
        return '#93C5FD';
      default:
        return '#A7F3D0';
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.card, { borderLeftColor: getStatusColor() }]}>
        <View style={styles.mainInfo}>
          <Text style={styles.plate}>{data.plate}</Text>
          <Text style={styles.time}>{formatTime(data.departureTime)}</Text>
        </View>
        <View style={styles.subInfo}>
          <Text style={styles.brand}>{data.brand}</Text>
          <Text style={styles.date}>{formatDate(data.departureTime)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 6,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    letterSpacing: 0.5,
  },
  time: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  brand: {
    fontSize: 13,
    color: '#6B7280',
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
});