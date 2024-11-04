import React, { useState } from 'react';
import { FormInput } from "@/src/components";
import { View, StyleSheet } from "react-native";
import { Button, Text, VStack } from "native-base";
import { useLogin } from '@/src/hooks';

export const LoginScreen: React.FC = () => {
  const {formik}= useLogin();

  return (
    <View style={styles.container}>
      <VStack space={2} style={styles.formContainer}>
        <Text style={styles.title}>Welcome back!</Text>
        
        <FormInput
          type="text"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          error={formik.touched.email ? formik.errors.email : undefined}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          type="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          error={formik.touched.password ? formik.errors.password : undefined}
          autoCapitalize="none"
        />

        <Button
          onPress={()=>formik.handleSubmit()}
          style={styles.button}
          isDisabled={formik.isSubmitting}
          isLoading={formik.isSubmitting}
        >
          Iniciar Sesión
        </Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',

  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    height: "auto"
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    height: "auto"
  },
  button: {
    marginTop: 20,
    backgroundColor: '#011C26',
    borderRadius: 8,
    height: 45,
  },
});