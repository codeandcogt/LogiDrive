import React from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';

interface VehicleAssignment {
  idVehicleAssignment: number;
  comment: string;
  tripType: string;
  startDate: string;
  endDate: string;
  idVehicle: number;
  idLogReservation: number;
  status: boolean;
  creationDate: string;
}

interface VehicleAssignmentCardProps {
  assignment: VehicleAssignment;
}

// Tipado para los estilos
interface Styles {
  card: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  statusBadge: ViewStyle;
  statusText: TextStyle;
  content: ViewStyle;
  row: ViewStyle;
  label: TextStyle;
  value: TextStyle;
  commentSection: ViewStyle;
  comment: TextStyle;
}

export const VehicleAssignmentCard: React.FC<VehicleAssignmentCardProps> = ({ assignment }) => {
  // Función para formatear la fecha con tipo de retorno explícito
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Asignación de Vehículo #{assignment.idVehicleAssignment}
        </Text>
        <View 
          style={[
            styles.statusBadge, 
            { backgroundColor: assignment.status ? '#4CAF50' : '#F44336' }
          ]}
        >
          <Text style={styles.statusText}>
            {assignment.status ? 'Activo' : 'Inactivo'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo de viaje:</Text>
          <Text style={styles.value}>{assignment.tripType}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha inicio:</Text>
          <Text style={styles.value}>{formatDate(assignment.startDate)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha fin:</Text>
          <Text style={styles.value}>{formatDate(assignment.endDate)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ID Vehículo:</Text>
          <Text style={styles.value}>{assignment.idVehicle}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ID Reservación:</Text>
          <Text style={styles.value}>{assignment.idLogReservation}</Text>
        </View>

        {assignment.comment && (
          <View style={styles.commentSection}>
            <Text style={styles.label}>Comentario:</Text>
            <Text style={styles.comment}>{assignment.comment}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Styles>({
  card: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: 'white',
    borderRadius: 12,
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  commentSection: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  comment: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    lineHeight: 20,
  },
});
