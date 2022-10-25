import { useQuery } from "@tanstack/react-query";
import React from "react";
import "./App.css";
import Converter from "./components/converter/converter.component";
import Header from "./components/header/header.component";
import { ICurrencyData } from "./types/currencyData.type";
import { getCurrency } from "./utils/getCurrency";

function App() {
  const { data, status } = useQuery<ICurrencyData[]>(
    ["currency_data"],
    getCurrency
  );

  if (data === undefined) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-3xl font-bold">
        Failed connecting to API. Try reloading page.
      </div>
    );
  }

  return (
    <>
      <Header currencies={data} />
      <Converter currencies={data} />
      <div className="text-slate-700 text-xs text-center py-6">
        Зроблено за допомогою{" "}
        <a
          href="https://api.privatbank.ua/#p24/exchange"
          rel="noreferrer"
          target="_blank"
          className=" hover:text-slate-600"
        >
          Приватбанк API
        </a>
      </div>
    </>
  );
}

export default App;
