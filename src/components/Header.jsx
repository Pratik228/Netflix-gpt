import logo from "../assets/logo.webp";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-50">
      <img src={logo} alt="logo" className="w-32 h-auto m-4" />
    </div>
  );
};

export default Header;
