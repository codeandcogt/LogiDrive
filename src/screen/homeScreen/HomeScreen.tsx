import { useHomeGarita } from '@/src/hooks';
import React from 'react';
import { View, ScrollView, ActivityIndicator, Text, StyleSheet, RefreshControl } from 'react-native';
import { HomeGarita, WidgetButton, WidgetDay } from '@/src/components';

export const HomeScreen = () => {
  const { data, error, refetch, session, handleClick } = useHomeGarita();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  if (!data && !error) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar los datos</Text>
        <Text style={styles.retryText} onPress={()=>refetch()}>
          Toca para intentar nuevamente
        </Text>
      </View>
    );
  }

  const sortedData = data 
    ? [...data].sort((a, b) => 
        new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
      )
    : [];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Bienvenido, <Text style={styles.userName}>{session?.name}</Text>
        </Text>
      </View>

      <View style={styles.widgetsContainer}>
        <View style={styles.widgetWrapper}>
          <WidgetDay/>
        </View>
        <View style={styles.widgetWrapper}>
          <WidgetButton onPress={handleClick}/>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reservaciones del día</Text>
        <Text style={styles.sectionCount}>{sortedData.length} vehículos</Text>
      </View>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {sortedData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay vehículos programados</Text>
            <Text style={styles.emptySubtext}>Las reservaciones aparecerán aquí</Text>
          </View>
        ) : (
          sortedData.map((vehicleData) => (
            <HomeGarita 
              key={`${vehicleData.idVehicle}-${vehicleData.departureTime}`}
              data={vehicleData}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 20,
    color: '#374151',
  },
  userName: {
    fontWeight: '600',
    color: '#111827',
  },
  widgetsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 12,
  },
  widgetWrapper: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop:20
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  sectionCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  container: {
    flex: 1,
    marginTop:15
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 15,
    color: '#4B5563',
    marginBottom: 4,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});