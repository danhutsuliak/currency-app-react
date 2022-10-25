import { ChangeEventHandler, useRef } from "react";
import { ICurrencyData } from "../../types/currencyData.type";

interface ConverterProps {
  currencies: ICurrencyData[];
}

const Converter = ({ currencies }: ConverterProps) => {
  const baseInputRef = useRef<HTMLInputElement>(null!);
  const baseSelectRef = useRef<HTMLSelectElement>(null!);
  const secondInputRef = useRef<HTMLInputElement>(null!);
  const secondSelectRef = useRef<HTMLSelectElement>(null!);

  const usdEurRate = currencies[0].buy / currencies[1].buy;
  const eurUsdRate = currencies[1].buy / currencies[0].buy;

  const handleBaseInputChange: ChangeEventHandler<HTMLInputElement> = () => {
    if (baseInputRef.current.value === "") {
      secondInputRef.current.value = "";
      return;
    }

    if (baseSelectRef.current.value === secondSelectRef.current.value) {
      secondInputRef.current.value = baseInputRef.current.value;
      return;
    }

    if (
      baseSelectRef.current.value === "UAH" &&
      secondSelectRef.current.value === "USD"
    ) {
      secondInputRef.current.value = (
        +baseInputRef.current.value / currencies[0].buy
      ).toFixed(3);
      return;
    }

    if (
      baseSelectRef.current.value === "EUR" &&
      secondSelectRef.current.value === "UAH"
    ) {
      secondInputRef.current.value = (
        +baseInputRef.current.value * currencies[1].sale
      ).toFixed(3);
      return;
    }

    if (
      baseSelectRef.current.value === "UAH" &&
      secondSelectRef.current.value === "EUR"
    ) {
      secondInputRef.current.value = (
        +baseInputRef.current.value / currencies[1].buy
      ).toFixed(3);
      return;
    }

    if (
      baseSelectRef.current.value === "USD" &&
      secondSelectRef.current.value === "UAH"
    ) {
      secondInputRef.current.value = (
        +baseInputRef.current.value * currencies[0].sale
      ).toFixed(3);
      return;
    }

    if (
      baseSelectRef.current.value === "USD" &&
      secondSelectRef.current.value === "EUR"
    )
      secondInputRef.current.value = (
        +baseInputRef.current.value * usdEurRate
      ).toFixed(3);

    if (
      baseSelectRef.current.value === "EUR" &&
      secondSelectRef.current.value === "USD"
    )
      secondInputRef.current.value = (
        +baseInputRef.current.value * eurUsdRate
      ).toFixed(3);
  };

  const handleSecondInputChange: ChangeEventHandler<HTMLInputElement> = () => {
    if (secondInputRef.current.value === "") {
      baseInputRef.current.value = "";
      return;
    }

    if (baseSelectRef.current.value === secondSelectRef.current.value) {
      baseInputRef.current.value = secondInputRef.current.value;
    }

    if (
      baseSelectRef.current.value === "UAH" &&
      secondSelectRef.current.value === "USD"
    )
      baseInputRef.current.value = (
        +secondInputRef.current.value * currencies[0].buy
      ).toFixed(3);

    if (
      baseSelectRef.current.value === "USD" &&
      secondSelectRef.current.value === "UAH"
    )
      baseInputRef.current.value = (
        +secondInputRef.current.value / currencies[0].sale
      ).toFixed(3);

    if (
      baseSelectRef.current.value === "UAH" &&
      secondSelectRef.current.value === "EUR"
    )
      baseInputRef.current.value = (
        +secondInputRef.current.value * currencies[1].buy
      ).toFixed(3);

    if (
      baseSelectRef.current.value === "EUR" &&
      secondSelectRef.current.value === "UAH"
    )
      baseInputRef.current.value = (
        +secondInputRef.current.value / currencies[1].sale
      ).toFixed(3);

    if (
      baseSelectRef.current.value === "USD" &&
      secondSelectRef.current.value === "EUR"
    )
      baseInputRef.current.value = (
        +secondInputRef.current.value * eurUsdRate
      ).toFixed(3);

    if (
      baseSelectRef.current.value === "EUR" &&
      secondSelectRef.current.value === "USD"
    )
      baseInputRef.current.value = (
        +secondInputRef.current.value * usdEurRate
      ).toFixed(3);
  };

  const swapCurrencies = () => {
    // swap select values

    let buf = baseSelectRef.current.value;
    baseSelectRef.current.value = secondSelectRef.current.value;
    secondSelectRef.current.value = buf;

    // swap input values
    buf = baseInputRef.current.value;
    baseInputRef.current.value = secondInputRef.current.value;
    secondInputRef.current.value = buf;
  };

  const clearInputs = () => {
    baseInputRef.current.value = "";
    secondInputRef.current.value = "";
  };

  return (
    <div className="w-screen min-w-max flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold py-6">Конвертувати</h1>

      <div className="flex justify-center items-center py-4">
        <div className="flex gap-2">
          <select
            name="base_ccy"
            ref={baseSelectRef}
            className="bg-slate-400 text-black p-2"
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <input
            name="base_ccy_value"
            type="number"
            className="bg-slate-200 text-black w-32 p-2"
            ref={baseInputRef}
            onChange={handleBaseInputChange}
          />
        </div>

        <div className="p-4">=</div>

        <div className="flex gap-2">
          <select
            name="ccy"
            ref={secondSelectRef}
            className="bg-slate-400 text-black p-2"
          >
            <option className="selection:bg-red-500" value="USD">
              USD
            </option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
          <input
            name="ccy_value"
            type="number"
            className="bg-slate-200 text-black w-32 p-2"
            ref={secondInputRef}
            onChange={handleSecondInputChange}
          />
        </div>
      </div>

      <div className="py-6 flex flex-col gap-4 items-center">
        <button
          onClick={swapCurrencies}
          className="bg-slate-400 rounded px-4 py-2 text-black hover:bg-slate-500 transition-all"
        >
          Поміняти валюти місцями
        </button>
        <button
          onClick={clearInputs}
          className="bg-red-600 rounded px-4 py-2 text-black hover:bg-red-700 transition-all"
        >
          Очистити
        </button>
      </div>
    </div>
  );
};

export default Converter;
