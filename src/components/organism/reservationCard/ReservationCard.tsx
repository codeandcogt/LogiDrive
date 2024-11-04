import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { JustifyModal } from '../../molecules';
import { BookingDetail } from '@/src/interface';

interface ReservationCardProps {
  data: BookingDetail;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const getStatusColor = () => {
    switch (data.statusReservation.toLowerCase()) {
      case 'active':
        return '#22C55E';
      case 'pending':
        return '#F59E0B';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#CBD5E1';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.card, { borderLeftColor: getStatusColor() }]}
        onPress={() => data.justify && setModalVisible(true)}
        activeOpacity={data.justify ? 0.7 : 1}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.id}>#{data.idLogReservation.toString().padStart(4, '0')}</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          </View>
          <Text style={styles.date}>{formatDate(data.creationDate)}</Text>
        </View>

        <Text style={styles.comment} numberOfLines={2}>
          {data.comment}
        </Text>

        <View style={styles.footer}>
          <View style={styles.footerInfo}>
            <AntDesign name="user" size={14} color="#64748B" />
            <Text style={styles.infoText}>{data.numberPeople}</Text>
          </View>
          {data.justify && (
            <View style={styles.justifyIndicator}>
              <AntDesign name="infocirlce" size={14} color="#6366F1" />
              <Text style={styles.justifyText}>Ver justificación</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {data.justify && (
        <JustifyModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          justify={data.justify}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  id: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  date: {
    fontSize: 13,
    color: '#64748B',
  },
  comment: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#64748B',
  },
  justifyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  justifyText: {
    fontSize: 13,
    color: '#6366F1',
  },
});