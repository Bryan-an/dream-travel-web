import { Layout } from "@/components/Layout";
import { axiosInstance } from "@/config/axios";
import { EmployeeWithId } from "@/models/Employee";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  employee: EmployeeWithId;
}

function ViewCustomer({
  employee: { nombre, apellido, correo, telefono, id },
}: Props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ver empleado</title>
      </Head>
      <Layout>
        <section className="flex justify-center flex-col">
          <div>
            <h2 className="text-center mt-8 font-bold text-4xl text-slate-300">
              Empleado
            </h2>
          </div>
          <div className="self-center max-w-lg w-[22rem] py-20">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-slate-200 mb-2">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  value={nombre}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-slate-200 mb-2">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={apellido}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-slate-200 mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  value={correo}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-slate-200 mb-2">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={telefono}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="pt-8 flex gap-4">
                <button
                  type="button"
                  className="text-slate-300 border border-slate-300 px-4 py-2 rounded-lg flex hover:text-slate-800 hover:bg-slate-300 font-semibold transition-all m-auto w-full justify-center"
                  onClick={() => router.back()}
                >
                  Volver
                </button>
                <Link
                  href={`/empleados/editar/${id}`}
                  className="text-cyan-300 border border-cyan-300 px-4 py-2 rounded-lg flex hover:text-slate-800 hover:bg-cyan-300 font-semibold transition-all m-auto w-full justify-center"
                >
                  Editar
                </Link>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const { data } = await axiosInstance.get<EmployeeWithId>(
    `/employee/${params?.id}`
  );

  return {
    props: {
      employee: data,
    },
  };
};

export default ViewCustomer;
