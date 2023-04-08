/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AcademicCapIcon } from "./AcademicCapIcon";
import { UserIcon } from "./UserIcon";
import { BookOpenIcon } from "./BookOpenIcon";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header className="px-16 py-6 flex justify-between sticky top-0 w-full bg-slate-800">
        <div>
          <Link href="/" className="text-xl">
            <span className="text-cyan-300 font-extrabold">Dream</span>
            <span className="font-bold">
              Tra
              <span className="opacity-90">v</span>
              <span className="opacity-80">e</span>
              <span className="opacity-70">l</span>
            </span>
          </Link>
        </div>
        <nav>
          <ul className="flex gap-5 font-bold">
            <li>
              <Link
                href="/clientes"
                className="transition-all hover:text-cyan-300"
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                href="/empleados"
                className="transition-all hover:text-cyan-300"
              >
                Empleados
              </Link>
            </li>
            <li>
              <Link
                href="/viajes"
                className="transition-all hover:text-cyan-300"
              >
                Viajes
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className=" top-20">{children}</main>
      <footer className="flex justify-center p-12 gap-36">
        <img
          src="https://itsqmet.edu.ec/wp-content/uploads/2022/11/ITSQMET.png"
          alt="Logo ITSQMET"
          className="h-24 object-contain"
        />
        <div className="flex flex-col font-normal gap-2">
          <div className="flex">
            <span className="me-3">
              <AcademicCapIcon />
            </span>
            <span>Aplicaciones Web</span>
          </div>
          <div className="flex">
            <span className="me-3">
              <UserIcon />
            </span>
            <span>Ing. Viviana Flores</span>
          </div>
          <div className="flex">
            <span className="me-3">
              <BookOpenIcon />
            </span>
            <span>Quinto Nivel</span>
          </div>
        </div>
      </footer>
    </>
  );
};
