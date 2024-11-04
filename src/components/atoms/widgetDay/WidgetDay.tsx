import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const WidgetDay = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedDay = () => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long'
    }).toUpperCase();
  };

  const getFormattedDate = () => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
    });
  };

  const getFormattedMonth = () => {
    return date.toLocaleDateString('es-ES', {
      month: 'long'
    });
  };

  return (
    <View style={styles.widget}>
      <View style={styles.dateContainer}>
        <View style={styles.mainDate}>
          <Text style={styles.weekDay}>{getFormattedDay()}</Text>
          <Text style={styles.dayNumber}>{getFormattedDate()}</Text>
        </View>
        <View style={styles.monthContainer}>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widget: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainDate: {
    flex: 1,
  },
  weekDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F25D27',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -1,
  },
  monthContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F25D27',
    textTransform: 'capitalize',
  },
  yearText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});