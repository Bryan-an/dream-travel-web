import { Layout } from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { useAppStore } from "@/store";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

interface Values {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

const initialValues: Values = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  lastName: Yup.string().required("Campo requerido"),
  email: Yup.string()
    .required("Campo requerido")
    .email("Correo electrónico inválido"),
  phone: Yup.string()
    .required("Campo requerido")
    .matches(/^\d+$/, "Teléfono inválido"),
});

const AddCustomerPage = () => {
  const { addCustomer } = useAppStore();
  const router = useRouter();

  return (
    <>
      <Layout>
        <section className="flex justify-center flex-col">
          <div>
            <h2 className="text-center mt-8 font-bold text-4xl text-slate-300">
              Agregar Cliente
            </h2>
          </div>
          <div className="self-center max-w-lg w-[22rem] py-20">
            <Formik<Values>
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const { name, lastName, email, phone } = values;

                  await addCustomer({
                    nombre: name,
                    apellido: lastName,
                    correo: email,
                    telefono: phone,
                  });

                  toast.success("Cliente agregado con éxito");
                  router.back();
                } catch (error) {
                  console.log(error);
                  toast.error("Error al agregar cliente");
                }

                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-slate-200 mb-2">
                      Nombre
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="John"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none border focus:border focus:border-cyan-300 w-full box-border ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-slate-800"
                      }`}
                      type="text"
                    />
                    {errors.name && touched.name ? (
                      <span className="pt-1 text-red-500">{errors.name}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-slate-200 mb-2">
                      Apellido
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      placeholder="Perez"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none border focus:border-cyan-300 w-full box-border ${
                        errors.lastName && touched.lastName
                          ? "border-red-500"
                          : "border-slate-800"
                      }`}
                      type="text"
                    />
                    {errors.lastName && touched.lastName ? (
                      <span className="pt-1 text-red-500">
                        {errors.lastName}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-slate-200 mb-2">
                      Correo electrónico
                    </label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none border focus:border-cyan-300 w-full box-border ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-slate-800"
                      }`}
                      type="email"
                    />
                    {errors.email && touched.email ? (
                      <span className="pt-1 text-red-500">{errors.email}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-slate-200 mb-2">
                      Teléfono
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="0987654321"
                      className={`rounded-md bg-slate-700 px-4 py-2 outline-none border focus:border-cyan-300 w-full box-border ${
                        errors.phone && touched.phone
                          ? "border-red-500"
                          : "border-slate-800"
                      }`}
                      type="text"
                    />
                    {errors.phone && touched.phone ? (
                      <span className="pt-1 text-red-500">{errors.phone}</span>
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
                      {isSubmitting ? <Spinner /> : "Agregar"}
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

export default AddCustomerPage;
