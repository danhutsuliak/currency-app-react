import { ICurrencyData } from "../../types/currencyData.type";

interface HeaderProps {
  currencies: ICurrencyData[];
}

const Header = ({ currencies }: HeaderProps) => {
  return (
    <header className="w-screen min-w-[460px] flex justify-between align-middle px-8 py-4 bg-slate-700">
      <h1 className="min-w-max text-3xl font-bold">Курс валют</h1>

      <div>
        <div className="text-base px-4">
          {currencies[0].ccy}: {(+currencies[0].buy).toFixed(3)} /{" "}
          {(+currencies[0].sale).toFixed(3)}
        </div>
        <div className="text-base px-4">
          {currencies[1].ccy}: {(+currencies[1].buy).toFixed(3)} /{" "}
          {(+currencies[1].sale).toFixed(3)}
        </div>
      </div>
    </header>
  );
};

export default Header;
