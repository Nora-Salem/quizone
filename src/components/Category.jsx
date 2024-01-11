import { useNavigate } from "react-router-dom";
const Category = ({ chooseCategory }) => {
  const navigate = useNavigate(null);
  const categories = [
    {
      category: "Arts & Literature",
    },
    { category: "Film & TV" },
    { category: "Food & Drink" },
    { category: "General Knowledge" },
    { category: "History" },
    { category: "Geography" },
    { category: "Science" },
    { category: "Music" },
    { category: "Society & Culture" },
    { category: "Sport & Leisure" },
  ];

  return (
    <div className="flex items-center justify-center h-full pt-[8rem] ">
      <div className=" w-[80%] flex flex-wrap items-center justify-center gap-6 py-6">
        {categories.map((category) => (
          <div
            className=" sm:text-[24px] xl:text-[16px] cursor-pointer w-52 sm:w-[18rem] text-center p-2 border-[#3c3a4a] border-2 hover:bg-[#f2f2f2] hover:text-[#3c3a4a] ease-in-out duration-300"
            key={category.category}
            onClick={() => {
              chooseCategory(category.category),
                setTimeout(() => {
                  navigate("/quiz");
                }, 300);
            }}
          >
            <p>{category.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
