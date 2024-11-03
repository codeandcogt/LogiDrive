import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

interface DateCardProps {
  title: string;
  startDate: string;
  endDate: string;
  onButtonPress: () => void;
}

export const DateCard: React.FC<DateCardProps> = ({
  title,
  startDate,
  endDate,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.timelineContainer}>
          {/* Puntos y línea */}
          <View style={styles.timeline}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>

          {/* Contenedores de fechas */}
          <View style={styles.datesColumn}>
            <View style={styles.dateContainer}>
              <View style={styles.dateWrapper}>
                <Text style={styles.dateText}>{startDate}</Text>
              </View>
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateWrapper}>
                <Text style={styles.dateText}>{endDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  timelineContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 10,
  },
  timeline: {
    width: 20,
    alignItems: 'center',
    marginRight: 15,
    marginTop:10
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginVertical: 15,
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: '#000',
    position: 'absolute',
    top: 25,
    left: 9,
  },
  datesColumn: {
    flex: 1,
  },
  dateContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    width: '100%',
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#676f6f",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    width: '100%',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});