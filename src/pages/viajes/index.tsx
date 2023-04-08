/* eslint-disable react-hooks/exhaustive-deps */
import { EyeIcon } from "@/components/EyeIcon";
import { Layout } from "@/components/Layout";
import { PencilSquareIcon } from "@/components/PencilSquareIcon";
import { PlusIcon } from "@/components/PlusIcon";
import { TrashIcon } from "@/components/TrashIcon";
import { useAppStore } from "@/store";
import Link from "next/link";
import React, { useEffect } from "react";

const TravelsPage = () => {
  const { travels, fetchTravels } = useAppStore();

  useEffect(() => {
    fetchTravels();
  }, []);

  return (
    <Layout>
      <h2 className="text-center mt-8 font-bold text-5xl text-slate-300">
        Viajes
      </h2>
      <div className="px-8 flex justify-end max-w-[1280px] m-auto pb-8 pt-16">
        <Link
          href="/viajes/agregar"
          className="text-cyan-300 border border-cyan-300 px-4 py-2 rounded-lg flex hover:text-slate-800 hover:bg-cyan-300 font-semibold transition-all"
        >
          <span className="me-2">
            <PlusIcon />
          </span>
          <span>Nuevo</span>
        </Link>
      </div>
      <section className="max-w-[1280px] m-auto px-8 pb-24">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-base text-left  text-gray-200">
            <thead className="text-xs  uppercase text-cyan-300 ">
              <tr>
                <th scope="col" className="px-6 py-3 bg-slate-600">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-700">
                  Destino
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-600">
                  Fecha salida
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-700">
                  Fecha regreso
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-600">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-700">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-600">
                  Empleado
                </th>
                <th scope="col" className="px-6 py-3 bg-slate-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {travels.map(
                ({
                  id,
                  destino,
                  fecha_salida,
                  fecha_regreso,
                  precio,
                  cliente,
                  empleado,
                }) => (
                  <tr className="border-b border-slate-500" key={id}>
                    <td className="px-6 py-4 bg-slate-600">{id}</td>
                    <td className="px-6 py-4 bg-slate-700">{destino}</td>
                    <td className="px-6 py-4 bg-slate-600">
                      {new Date(fecha_salida as any).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 bg-slate-700">
                      {new Date(fecha_regreso as any).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 bg-slate-600">{precio}</td>
                    <td className="px-6 py-4 bg-slate-700">
                      {`${cliente?.nombre} ${cliente?.apellido}`}
                    </td>
                    <td className="px-6 py-4 bg-slate-600">
                      {`${empleado?.nombre} ${empleado?.apellido}`}
                    </td>
                    <td className="px-6 py-4 bg-slate-700">
                      <div className="flex gap-3">
                        <button>
                          <EyeIcon />
                        </button>
                        <button>
                          <PencilSquareIcon />
                        </button>
                        <button>
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default TravelsPage;
