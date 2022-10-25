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
    </>
  );
}

export default App;
