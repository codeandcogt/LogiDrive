import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { VStack, Button, Text } from "native-base";
import { FormInput, FormSelect, FormTextArea, Navbar } from "@/src/components";
import { UseFormBooking } from "@/src/hooks";

export const FormBookingScreen = () => {
  const {
    formik,
    departmentData,
    departmentLoading,
    townData,
    townLoading,
    handleDepartmentChange,
  } = UseFormBooking();

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={true}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={{height:50}}>
            <Navbar path={"/booking"} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Solicitud de Reserva</Text>

              <VStack space={2} style={styles.formContainer}>
                <FormSelect
                  label="Departamento"
                  placeholder="Selecciona un departamento"
                  options={departmentData || []}
                  value={formik.values.idDepartment?.toString()}
                  onValueChange={handleDepartmentChange}
                  error={
                    formik.touched.idDepartment
                      ? formik.errors.idDepartment
                      : undefined
                  }
                />

                <FormSelect
                  label="Ciudad"
                  placeholder="Selecciona una ciudad"
                  options={townData || []}
                  value={formik.values.idTown?.toString()}
                  onValueChange={(value) =>
                    formik.setFieldValue("idTown", Number(value))
                  }
                  isDisabled={!formik.values.idDepartment}
                  error={formik.touched.idTown ? formik.errors.idTown : undefined}
                />

                <FormInput
                  label="Número de personas"
                  placeholder="Ingresa el número de personas"
                  value={formik.values.numberPeople?.toString()}
                  onChangeText={(value) =>
                    formik.setFieldValue("numberPeople", Number(value))
                  }
                  onBlur={formik.handleBlur("numberPeople")}
                  error={
                    formik.touched.numberPeople
                      ? formik.errors.numberPeople
                      : undefined
                  }
                  keyboardType="numeric"
                />

                <FormTextArea
                  label="Comentario"
                  placeholder="Ingresa un comentario sobre la reserva..."
                  value={formik.values.comment}
                  onChangeText={formik.handleChange("comment")}
                  onBlur={formik.handleBlur("comment")}
                  error={
                    formik.touched.comment ? formik.errors.comment : undefined
                  }
                  showCharacterCount
                />

                <FormInput
                  label="Dirección"
                  placeholder="Ingresa la dirección"
                  value={formik.values.addres}
                  onChangeText={formik.handleChange("addres")}
                  onBlur={formik.handleBlur("addres")}
                  error={formik.touched.addres ? formik.errors.addres : undefined}
                />

                <Button
                  onPress={() => formik.handleSubmit()}
                  style={styles.button}
                  isDisabled={formik.isSubmitting}
                  isLoading={formik.isSubmitting}
                >
                  Enviar Solicitud
                </Button>
              </VStack>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginTop:10
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    paddingTop:10,
    color: "#011C26",
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#011C26",
    borderRadius: 8,
    height: 48,
  },
});