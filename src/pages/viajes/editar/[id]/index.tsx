import { Layout } from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { axiosInstance } from "@/config/axios";
import { CustomerWithId } from "@/models/Customer";
import { EmployeeWithId } from "@/models/Employee";
import { TravelWithId } from "@/models/Travel";
import { useAppStore } from "@/store";
import { Field, Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

interface Props {
  travel: TravelWithId;
}

interface Values {
  destination: string;
  departureDate: string;
  returnDate: string;
  price: string;
  customerId: string;
  employeeId: string;
}

const validationSchema = Yup.object({
  destination: Yup.string().required("Campo requerido"),
  departureDate: Yup.string().required("Campo requerido"),
  returnDate: Yup.string().required("Campo requerido"),
  price: Yup.number().required("Campo requerido").positive("Precio inválido"),
  customerId: Yup.string().required("Campo requerido"),
  employeeId: Yup.string().required("Campo requerido"),
});

const EditTravelPage: React.FC<Props> = ({
  travel: {
    id,
    cliente,
    destino,
    empleado,
    fecha_regreso,
    fecha_salida,
    precio,
    id_cliente,
    id_empleado,
  },
}) => {
  const { editTravel, customers, employees, fetchCustomers, fetchEmployees } =
    useAppStore();
  const router = useRouter();

  const initialValues: Values = {
    destination: destino || "",
    departureDate: fecha_salida || "",
    returnDate: fecha_regreso || "",
    price: precio?.toString() || "",
    customerId: id_cliente?.toString() || "",
    employeeId: id_empleado?.toString() || "",
  };

  useEffect(() => {
    fetchCustomers().catch((err) => {
      console.error(err);
      toast.error("Error al cargar clientes");
    });

    fetchEmployees().catch((err) => {
      console.error(err);
      toast.error("Error al cargar empleados");
    });
  }, []);

  return (
    <>
      <Head>
        <title>Editar viaje</title>
      </Head>
      <Layout>
        <section className="flex justify-center flex-col">
          <div>
            <h2 className="text-center mt-8 font-bold text-4xl text-slate-300">
              Editar Viaje
            </h2>
          </div>
          <div className="self-center max-w-lg w-[22rem] py-20">
            <Formik<Values>
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const {
                    customerId,
                    departureDate,
                    destination,
                    employeeId,
                    price,
                    returnDate,
                  } = values;

                  await editTravel(id, {
                    destino: destination,
                    fecha_regreso: returnDate,
                    fecha_salida: departureDate,
                    id_cliente: parseInt(customerId),
                    id_empleado: parseInt(employeeId),
                    precio: parseFloat(price),
                    cliente,
                    empleado,
                  });

                  toast.success("Viaje actualizado con éxito");
                  router.back();
                } catch (error) {
                  console.log(error);
                  toast.error("Error al actualizar viaje");
                }

                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="destination"
                      className="text-slate-200 mb-2"
                    >
                      Destino
                    </label>
                    <Field
                      id="destination"
                      name="destination"
                      placeholder="Madrid"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border ${
                        errors.destination &&
                        touched.destination &&
                        "ring-1 ring-red-500"
                      }`}
                      type="text"
                    />
                    {errors.destination && touched.destination ? (
                      <span className="pt-1 text-red-500">
                        {errors.destination}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="departureDate"
                      className="text-slate-200 mb-2"
                    >
                      Fecha de salida
                    </label>
                    <Field
                      id="departureDate"
                      name="departureDate"
                      placeholder="08/04/2023"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border ${
                        errors.departureDate &&
                        touched.departureDate &&
                        "ring-1 ring-red-500"
                      }`}
                      type="date"
                    />
                    {errors.departureDate && touched.departureDate ? (
                      <span className="pt-1 text-red-500">
                        {errors.departureDate}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="returnDate" className="text-slate-200 mb-2">
                      Fecha de regreso
                    </label>
                    <Field
                      id="returnDate"
                      name="returnDate"
                      placeholder="08/04/2023"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border ${
                        errors.returnDate &&
                        touched.returnDate &&
                        "ring-1 ring-red-500"
                      }`}
                      type="date"
                    />
                    {errors.returnDate && touched.returnDate ? (
                      <span className="pt-1 text-red-500">
                        {errors.returnDate}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="price" className="text-slate-200 mb-2">
                      Precio
                    </label>
                    <Field
                      id="price"
                      name="price"
                      placeholder="100.50"
                      step="0.01"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border ${
                        errors.price && touched.price && "ring-1 ring-red-500"
                      }`}
                      type="number"
                    />
                    {errors.price && touched.price ? (
                      <span className="pt-1 text-red-500">{errors.price}</span>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="customerId" className="text-slate-200 mb-2">
                      Cliente
                    </label>
                    <Field
                      as="select"
                      id="customerId"
                      name="customerId"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-300 w-full box-border ${
                        errors.customerId &&
                        touched.customerId &&
                        "ring-1 ring-red-500"
                      }`}
                    >
                      <option value="">Seleccione cliente</option>
                      {customers.map((customer) => (
                        <option
                          value={customer.id}
                          key={customer.id}
                        >{`${customer.nombre} ${customer.apellido}`}</option>
                      ))}
                    </Field>
                    {errors.customerId && touched.customerId ? (
                      <span className="pt-1 text-red-500">
                        {errors.customerId}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="employeeId" className="text-slate-200 mb-2">
                      Empleado
                    </label>
                    <Field
                      as="select"
                      id="employeeId"
                      name="employeeId"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none focus:ring-1 focus:ring-cyan-300 w-full box-border ${
                        errors.employeeId &&
                        touched.employeeId &&
                        "ring-1 ring-red-500"
                      }`}
                    >
                      <option value="">Seleccione empleado</option>
                      {employees.map((employee) => (
                        <option
                          value={employee.id}
                          key={employee.id}
                        >{`${employee.nombre} ${employee.apellido}`}</option>
                      ))}
                    </Field>
                    {errors.employeeId && touched.employeeId ? (
                      <span className="pt-1 text-red-500">
                        {errors.employeeId}
                      </span>
                    ) : null}
                  </div>

                  <div className="pt-8 flex gap-4">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      className="text-slate-300 border border-slate-300 px-4 py-2 rounded-lg flex hover:text-slate-800 hover:bg-slate-300 font-semibold transition-all m-auto w-full justify-center"
                      onClick={() => router.back()}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-cyan-300 border border-cyan-300 px-4 py-2 rounded-lg flex hover:text-slate-800 hover:bg-cyan-300 font-semibold transition-all m-auto w-full justify-center"
                    >
                      {isSubmitting ? <Spinner /> : "Actualizar"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const { data } = await axiosInstance.get<TravelWithId>(
    `/travel/${params?.id}`
  );

  const { data: customer } = await axiosInstance.get<CustomerWithId>(
    `/customer/${data.id_cliente}`
  );

  const { data: employee } = await axiosInstance.get<EmployeeWithId>(
    `/employee/${data.id_empleado}`
  );

  return {
    props: {
      travel: {
        ...data,
        cliente: customer,
        empleado: employee,
      },
    },
  };
};

export default EditTravelPage;
