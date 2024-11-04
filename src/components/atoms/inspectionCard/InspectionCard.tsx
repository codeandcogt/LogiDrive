import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Acceptance } from '@/src/interface';

interface InpectionProps {
  data: Acceptance
  onPress?: () => void;
}

export const InspectionCard: React.FC<InpectionProps> = ({ 
  data,
  onPress 
}) => {
  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.tripType}>{data.tripType}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: data.statusTrip ? '#4CAF50' : '#FF5252' }
        ]}>
          <Text style={styles.statusText}>
            {data.statusTrip ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>ID Vehículo:</Text>
          <Text style={styles.value}>{data.idVehicle}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha inicio:</Text>
          <Text style={styles.value}>{formatDate(data.startDate)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha fin:</Text>
          <Text style={styles.value}>{formatDate(data.endDate)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Días:</Text>
          <Text style={styles.value}>{data.dayQuantity}</Text>
        </View>

        <View style={styles.commentContainer}>
          <Text style={styles.label}>Comentario:</Text>
          <Text style={styles.comment}>{data.comment}</Text>
        </View>
      </View>

      <Text style={styles.creationDate}>
        Creado: {formatDate(data.creationDate)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  commentContainer: {
    marginTop: 8,
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    fontStyle: 'italic',
  },
  creationDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 12,
  },
});