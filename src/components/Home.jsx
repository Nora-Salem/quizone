import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(null);
  return (
    <div className=" h-full flex flex-col items-center justify-center gap-4 p-4">
      <p className=" text-[30px] sm:text-[50px] font-bold mb-4 ">QuiZone</p>
      <p className="text-center text-[14px] sm:text-[16px] font-light tracking-widest">
        Test Your Knowledge and Conquer Challenges!
      </p>

      <button
        onClick={() =>
          setTimeout(() => {
            navigate("/category");
          }, 400)
        }
        className="border border-[#f2f2f2] text-[#f2f2f2] tracking-wide py-2 mt-2 px-12  rounded-full font-medium hover:bg-[#f2f2f2] hover:text-[#3c3a4a] ease duration-300"
      >
        Get Start
      </button>
    </div>
  );
};

export default Home;
