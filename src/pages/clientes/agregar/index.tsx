import { Layout } from "@/components/Layout";
import { Field, Form, Formik } from "formik";
import React from "react";

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

const AddCustomerPage = () => {
  return (
    <Layout>
      <section>
        <div>
          <h2>Agregar Cliente</h2>
        </div>
        <Formik<Values>
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Nombre</label>
                <Field
                  id="name"
                  name="name"
                  placeholder="John"
                  className="rounded-md"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="lastName">Apellido</label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Perez"
                  className="rounded-md"
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="email">Correo</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  className="rounded-md"
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="phone">Teléfono</label>
                <Field
                  id="phone"
                  name="phone"
                  placeholder="john@example.com"
                  className="rounded-md"
                  type="text"
                />
              </div>
              <div>
                <button type="submit">Agregar</button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  );
};

export default AddCustomerPage;
