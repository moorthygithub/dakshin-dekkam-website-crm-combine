import logoImg from "../../../../public/logo.png";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <img src={logoImg} alt="Dakshin Ekkam Logo" className="w-auto h-10" />
    </div>
  );
};

export default Logo;
