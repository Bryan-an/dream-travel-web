/* eslint-disable @next/next/no-img-element */
import { Layout } from "@/components/Layout";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <Layout>
        <section className="flex flex-col">
          <div>
            <img
              src="https://metropolitantouring.com.ec/wp-content/uploads/2021/04/viajando.jpg"
              alt="Agencia de viajes"
              className="w-screen h-64 object-cover shadow-md"
            />
            <h1 className="text-6xl font-bold text-slate-300 p-4 text-center mt-8">
              Dream Travel
            </h1>
          </div>
          <article className="p-8 max-w-2xl self-center text-lg font-normal">
            Nuestra agencia de viajes es el lugar perfecto para aquellos que
            buscan la experiencia de viaje más emocionante e inolvidable. Nos
            enorgullece ofrecer una amplia variedad de destinos y paquetes de
            viaje diseñados para adaptarse a cualquier presupuesto y
            preferencia.
          </article>
          <div className="flex justify-center py-8">
            <img
              src="https://www.estaentumundo.com/wp-content/imagenes/2018/09/parque-guell.jpg"
              alt="Barcelona"
              className="max-w-2xl object-contain rounded-md shadow-md"
            />
          </div>
        </section>
      </Layout>
    </>
  );
}
