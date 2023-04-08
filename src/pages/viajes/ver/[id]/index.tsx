import { Layout } from "@/components/Layout";
import { axiosInstance } from "@/config/axios";
import { CustomerWithId } from "@/models/Customer";
import { EmployeeWithId } from "@/models/Employee";
import { TravelWithId } from "@/models/Travel";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  travel: TravelWithId;
}

function ViewCustomer({
  travel: {
    id,
    cliente,
    destino,
    empleado,
    fecha_regreso,
    fecha_salida,
    precio,
  },
}: Props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ver viaje</title>
      </Head>
      <Layout>
        <section className="flex justify-center flex-col">
          <div>
            <h2 className="text-center mt-8 font-bold text-4xl text-slate-300">
              Viaje
            </h2>
          </div>
          <div className="self-center max-w-lg w-[22rem] py-20">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="destination" className="text-slate-200 mb-2">
                  Destino
                </label>
                <input
                  id="destination"
                  name="destination"
                  value={destino}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="departureDate" className="text-slate-200 mb-2">
                  Fecha de salida
                </label>
                <input
                  id="departureDate"
                  name="departureDate"
                  value={fecha_salida}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="date"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="returnDate" className="text-slate-200 mb-2">
                  Fecha de regreso
                </label>
                <input
                  id="returnDate"
                  name="returnDate"
                  value={fecha_regreso}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="date"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="text-slate-200 mb-2">
                  Precio
                </label>
                <input
                  id="price"
                  name="price"
                  value={precio}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="customer" className="text-slate-200 mb-2">
                  Cliente
                </label>
                <input
                  id="customer"
                  name="customer"
                  value={`${cliente?.nombre} ${cliente?.apellido}`}
                  className={`rounded-md bg-slate-700 px-4 py-2 outline-none  focus:ring-1 focus:ring-cyan-300 w-full box-border`}
                  type="text"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="employee" className="text-slate-200 mb-2">
                  Empleado
                </label>
                <input
                  id="employee"
                  name="employee"
                  value={`${empleado?.nombre} ${empleado?.apellido}`}
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
                  href={`/viajes/editar/${id}`}
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

export default ViewCustomer;
