import { Department, Option, RequestBooking, Town } from "@/src/interface";
import { get, post } from "@/src/service";
import { useSessionStore } from "@/src/store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export const UseFormBooking = () => {
  const { session } = useSessionStore();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const router = useRouter();

  const initialValues: RequestBooking = {
    idLogReservation: 0,
    idCollaborator: Number(session?.nameidentifier) || 0,
    comment: "",
    idTown: 0,
    numberPeople: 0,
    statusReservation: "Solicitado",
    justify: "",
    addres: "",
    status: true,
    creationDate: "",
  };

  const BookingSchema = Yup.object().shape({
    idTown: Yup.number()
      .min(1, "Debes seleccionar una ciudad")
      .required("La ciudad es requerida"),

    numberPeople: Yup.number()
      .min(1, "Debe haber al menos 1 persona")
      .max(50, "El número máximo de personas es 50")
      .required("El número de personas es requerido"),

    comment: Yup.string()
      .min(10, "El comentario debe tener al menos 10 caracteres")
      .max(500, "El comentario no puede exceder los 500 caracteres")
      .required("El comentario es requerido"),

    justify: Yup.string().nullable(),

    addres: Yup.string()
      .min(5, "La dirección debe tener al menos 5 caracteres")
      .required("La dirección es requerida"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: BookingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data: RequestBooking = {
          idCollaborator: initialValues.idCollaborator,
          comment: values.comment,
          idTown: values.idTown,
          numberPeople: values.numberPeople,
          statusReservation: initialValues.statusReservation,
          justify: initialValues.justify,
          addres: values.addres,
          status: initialValues.status,
        };
        await createBooking(data);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const createBooking = async (values: RequestBooking) => {
    try {

      const response = await post<any>(
        "api/LogReservation",
        values,
        session?.token
      );
      if (response.code === 200) {
        router.replace("/booking")
      } else {
        console.log("error", response);
      }
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  // Query para departamentos
  const {
    data: departmentData,
    isLoading: departmentLoading,
    refetch: refetchDepartment,
  } = useQuery<Department[], Error, Option[]>({
    queryKey: ["department-api"],
    queryFn: async () => {
      const response = await get<Department[]>(
        "api/Department",
        session?.token
      );
      return response.data;
    },
    select: (items) =>
      items.map((item) => ({
        label: item.name,
        value: item.idDepartment.toString(),
      })),
  });

  // Query para ciudades basada en el departamento seleccionado
  const {
    data: townData,
    isLoading: townLoading,
    refetch: refetchTown,
  } = useQuery<Town[], Error, Option[]>({
    queryKey: ["town-api", selectedDepartment],
    queryFn: async () => {
      if (!selectedDepartment) return [];
      const response = await get<Town[]>(
        `api/Town/byDepartment/${selectedDepartment}`,
        session?.token
      );
      return response.data;
    },
    enabled: !!selectedDepartment,
    select: (items) =>
      items.map((item) => ({
        label: item.name,
        value: item.idTown.toString(),
      })),
  });

  // Manejador para la selección de departamento
  const handleDepartmentChange = async (value: string) => {
    // Actualizamos el estado local
    setSelectedDepartment(value);

    // Actualizamos el valor en formik
    formik.setFieldValue("idDepartment", Number(value));

    // Reseteamos la ciudad seleccionada cuando cambia el departamento
    formik.setFieldValue("idTown", 0);
  };

  return {
    formik,
    departmentData,
    departmentLoading,
    townData,
    townLoading,
    refetchDepartment,
    refetchTown,
    handleDepartmentChange,
  };
};
