/* eslint-disable react-hooks/exhaustive-deps */
import { EyeIcon } from "@/components/EyeIcon";
import { Layout } from "@/components/Layout";
import { PencilSquareIcon } from "@/components/PencilSquareIcon";
import { PlusIcon } from "@/components/PlusIcon";
import { TrashIcon } from "@/components/TrashIcon";
import { useAppStore } from "@/store";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const CustomersPage = () => {
  const { customers, fetchCustomers, deleteCustomer } = useAppStore();

  useEffect(() => {
    fetchCustomers().catch((err) => {
      console.error(err);
      toast.error("Error al cargar clientes");
    });
  }, []);

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <Layout>
        <h2 className="text-center mt-8 font-bold text-5xl text-slate-300">
          Clientes
        </h2>
        <div className="px-8 flex justify-end max-w-[1000px] m-auto pb-8 pt-16">
          <Link
            href="/clientes/agregar"
            className="text-cyan-300 border border-cyan-300 px-4 py-2 rounded-lg flex hover:text-slate-800 hover:bg-cyan-300 font-semibold transition-all"
          >
            <span className="me-2">
              <PlusIcon />
            </span>
            <span>Nuevo</span>
          </Link>
        </div>
        <section className="max-w-[1000px] m-auto px-8 pb-24">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-base text-left  text-gray-200">
              <thead className="text-xs  uppercase text-cyan-300 ">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-slate-600">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 bg-slate-700">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 bg-slate-600">
                    Apellido
                  </th>
                  <th scope="col" className="px-6 py-3 bg-slate-700">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3 bg-slate-600">
                    Teléfono
                  </th>
                  <th scope="col" className="px-6 py-3 bg-slate-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map(({ id, nombre, apellido, correo, telefono }) => (
                  <tr className="border-b border-slate-500" key={id}>
                    <td className="px-6 py-4 bg-slate-600">{id}</td>
                    <td className="px-6 py-4 bg-slate-700">{nombre}</td>
                    <td className="px-6 py-4 bg-slate-600">{apellido}</td>
                    <td className="px-6 py-4 bg-slate-700">{correo}</td>
                    <td className="px-6 py-4 bg-slate-600">{telefono}</td>
                    <td className="px-6 py-4 bg-slate-700">
                      <div className="flex gap-3">
                        <Link href={`/clientes/ver/${id}`}>
                          <EyeIcon />
                        </Link>
                        <Link href={`clientes/editar/${id}`}>
                          <PencilSquareIcon />
                        </Link>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                `¿Estas seguro/a de eliminar a ${nombre}?`
                              )
                            ) {
                              deleteCustomer(id);
                            }
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CustomersPage;
