const Header = () => {
  return (
    <header className="w-screen min-w-[460px] flex justify-between align-middle px-8 py-4 bg-slate-700">
      <h1 className="min-w-max text-3xl font-bold">Курс валют</h1>

      <div>
        <div className="text-base px-4">USD: 39.800/40.100</div>
        <div className="text-base px-4">EUR: 38.800/39.100</div>
      </div>
    </header>
  );
};

export default Header;
