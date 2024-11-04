import { ButtonBack } from "@/src/components";
import { useQR } from "@/src/hooks";
import { FormatDate } from "@/src/lib";
import { useAcceptanceStore } from "@/src/store";
import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("window");
const cardWidth = Math.min(width - 32, 380);

export const QRScreen = () => {
  const { acceptance, scanner } = useAcceptanceStore();
  const { handleBack, handleBackScanner, handleAccept } = useQR();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView style={styles.overlay}>
        <ButtonBack onPress={scanner ? handleBackScanner : handleBack} />
      </SafeAreaView>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.statusBar}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: acceptance?.status ? "#4CAF50" : "#FF5252" },
              ]}
            />
            <Text style={styles.statusText}>
              {acceptance?.status ? "Activo" : "Inactivo"}
            </Text>
          </View>
          {!scanner && (
            <View style={styles.qrWrapper}>
              <View style={styles.qrBackground}>
                <QRCode
                  value={JSON.stringify({
                    idVehicleAssignment: acceptance?.idVehicleAssignment,
                    activityType: acceptance?.statusTrip ? "entrada" : "salida",
                  })}
                  size={160}
                />
              </View>
            </View>
          )}

          <View style={styles.mainInfo}>
            <View style={styles.plateBox}>
              <Text style={styles.plateText}>{acceptance?.plate || "-"}</Text>
              <Text style={styles.brandText}>{acceptance?.brand || "-"}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Tipo de Viaje</Text>
                <Text style={styles.detailValue}>
                  {acceptance?.tripType || "-"}
                </Text>
              </View>
              {acceptance?.remainingHoursToStart && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Horas para inicio</Text>
                  <Text style={styles.detailValue}>
                    {acceptance?.remainingHoursToStart.toFixed(2) || "0"}h
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.dateSection}>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Inicio</Text>
                <Text style={styles.dateValue}>
                  {FormatDate(acceptance?.startDate || "")}
                </Text>
              </View>
              <View style={styles.dateDivider} />
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Fin</Text>
                <Text style={styles.dateValue}>
                  {FormatDate(acceptance?.endDate || "")}
                </Text>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          {acceptance?.comment && (
            <View style={styles.commentContainer}>
              <Text style={styles.commentText}>{acceptance.comment}</Text>
            </View>
          )}
        </View>
      </View>

      {scanner && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAccept}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: cardWidth,
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#FAFAFA",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  qrWrapper: {
    alignItems: "center",
    paddingVertical: 24,
  },
  qrBackground: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainInfo: {
    alignItems: "center",
    paddingBottom: 20,
  },
  plateBox: {
    alignItems: "center",
  },
  plateText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: 1,
  },
  brandText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  dateSection: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  dateItem: {
    flex: 1,
    alignItems: "center",
  },
  dateDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  commentContainer: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  commentText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16, // Padding en la parte inferior
    width: "100%",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
