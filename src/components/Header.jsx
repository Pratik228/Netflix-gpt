import logo from "../assets/logo.webp";
const Header = () => {
  return (
    <div className="relative z-50">
      <img
        src={logo}
        alt="logo"
        className="absolute top-4 left-52 w-40 h-auto bg-gradient-to-t from-black"
      />
    </div>
  );
};

export default Header;
