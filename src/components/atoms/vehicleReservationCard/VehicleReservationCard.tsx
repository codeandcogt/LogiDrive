import { Acceptance } from "@/src/interface";
import { FormatDate } from "@/src/lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from "react-native";

interface Props {
  item: Acceptance;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

export const VehicleReservationCard: React.FC<Props> = ({
  item,
  style,
  onPress,
}) => {
  const isDisabled = !item.isWithinThreshold;

  return (
    <TouchableOpacity
      style={[styles.cardContainer, isDisabled && styles.cardDisabled, style]}
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        {/* Status Indicator */}
        <View style={[
          styles.statusIndicator,
          item.status ? styles.statusIndicatorActive : styles.statusIndicatorInactive
        ]} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="car" size={24} color="#3b82f6" />
            </View>
            <View>
              <Text style={styles.brandText}>{item.brand}</Text>
              <Text style={styles.plateText}>Placa: {item.plate}</Text>
            </View>
          </View>
          <View style={[
            styles.badge,
            item.status ? styles.badgeSuccess : styles.badgeError,
          ]}>
            <Text style={item.status ? styles.badgeTextSuccess : styles.badgeTextError}>
              {item.status ? "Activa" : "Inactiva"}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <View style={styles.content}>
          {/* Dates */}
          <View style={styles.dateContainer}>
            <View style={styles.dateRow}>
              <View style={styles.dateIconContainer}>
                <MaterialCommunityIcons name="calendar-start" size={20} color="#3b82f6" />
              </View>
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Inicio</Text>
                <Text style={styles.dateText}>
                  {item.startDate ? FormatDate(item.startDate) : "No disponible"}
                </Text>
              </View>
            </View>

            <View style={styles.dateRow}>
              <View style={styles.dateIconContainer}>
                <MaterialCommunityIcons name="calendar-end" size={20} color="#3b82f6" />
              </View>
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Fin</Text>
                <Text style={styles.dateText}>
                  {item.endDate ? FormatDate(item.endDate) : "No disponible"}
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.tripTypeBadge}>
              <MaterialCommunityIcons 
                name={item.tripType === "Personal" ? "account" : "briefcase"} 
                size={16} 
                color="#1e40af" 
              />
              <Text style={styles.tripTypeText}>{item.tripType}</Text>
            </View>
            {typeof item.remainingHoursToStart === "number" && (
              <View style={styles.timeContainer}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color="#3b82f6"
                />
                <Text style={styles.remainingTimeText}>
                  {item.remainingHoursToStart.toFixed(1)}h restantes
                </Text>
              </View>
            )}
          </View>

          {/* Warning when disabled */}
          {isDisabled && (
            <View style={styles.warningContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={20}
                color="#dc2626"
              />
              <Text style={styles.warningText}>
                Reserva fuera de tiempo permitido
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  cardDisabled: {
    opacity: 0.6,
  },
  statusIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
  },
  statusIndicatorActive: {
    backgroundColor: '#22c55e',
  },
  statusIndicatorInactive: {
    backgroundColor: '#ef4444',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 12,
  },
  brandText: {
    fontSize: 18,
    fontWeight: "700",
    color: '#1e293b',
    marginBottom: 2,
  },
  plateText: {
    fontSize: 13,
    color: "#64748b",
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeSuccess: {
    backgroundColor: "#dcfce7",
  },
  badgeError: {
    backgroundColor: "#fee2e2",
  },
  badgeTextSuccess: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  badgeTextError: {
    color: "#991b1b",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    gap: 16,
  },
  dateContainer: {
    gap: 12,
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateIconContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateInfo: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  tripTypeBadge: {
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripTypeText: {
    color: "#1e40af",
    fontSize: 13,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  remainingTimeText: {
    fontSize: 13,
    color: "#3b82f6",
    fontWeight: "500",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  warningText: {
    fontSize: 13,
    color: "#dc2626",
    fontWeight: "500",
  },
});