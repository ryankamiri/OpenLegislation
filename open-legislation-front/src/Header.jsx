import "./App.css";
import logo from "./oleg-logo.png";

function Header() {
  return (
    <header className="flex font-bold text-lg text-center bg-gradient-to-r from-blue-500 to-red-500 flex-auto p-4">
      <a
        href="/"
        className="text-white hover:text-gray-300 transition-colors duration-200"
      >
        <img src={logo} alt="OpenLegislation" className="h-8 inline" />
        OpenLegislation
      </a>
    </header>
  );
}

export default Header;
