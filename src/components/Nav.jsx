import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="fixed top-8 left-6  ">
      <Link to="/">
        <div className="logo sm:text-[28px] text-[20px]  font-bold tracking-wider Caveat">
          QuiZone
        </div>
      </Link>
    </div>
  );
};

export default Nav;
