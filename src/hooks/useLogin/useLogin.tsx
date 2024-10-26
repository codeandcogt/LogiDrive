import { jwtData, Login, LoginSessionData } from "@/src/interface";
import * as yup from "yup";
import { useFormik } from "formik";
import { post } from "@/src/service";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSessionStore } from "@/src/store";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setSession } = useSessionStore();

  const initialValues: Login = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Correo electrónico inválido")
      .required("El correo es requerido"),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
  });

  const handleAuth = async (data: Login) => {
    try {
      const response = await post<string>("api/Auth/login", data);

      if (response.data) {
        const decodedToken = jwtDecode<jwtData>(response.data);

        const data: LoginSessionData = {
          nameidentifier:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ],
          name: decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
          emailaddress:
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
          role: decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
          token: response.data,
        };
        setSession(data);
        return { success: true, data: decodedToken };
      } else {
        throw new Error("No se recibió token en la respuesta");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error desconocido durante el login");
      }
      return { success: false, error };
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await handleAuth(values);
        if (result.success) {
          router.replace("/home");
        }
      } catch (error) {
        throw Error
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    isLoading,
    error,
  };
};
