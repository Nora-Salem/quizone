import { useNavigate } from "react-router-dom";
import { useCategories } from "./hooks/useData";
import Loading from "./Loading";
const Category = ({ chooseCategory }) => {
  const { data: categories, isLoading, isError, error } = useCategories();
  const navigate = useNavigate(null);

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className=" text-[24px]">{error.message}!</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full pt-[8rem] ">
      <div className=" w-[80%] flex flex-wrap items-center justify-center gap-6 py-6">
        {isLoading ? (
          <Loading />
        ) : (
          [...new Set(categories?.map((c) => c.category))]
            .sort()
            .map((category) => (
              <div
                className=" sm:text-[24px] xl:text-[16px] cursor-pointer w-52 sm:w-[18rem] text-center p-2 border-[#3c3a4a] border-2 hover:bg-[#f2f2f2] hover:text-[#3c3a4a] ease-in-out duration-300"
                key={category}
                onClick={() => {
                  chooseCategory(category),
                    setTimeout(() => {
                      navigate("/quiz");
                    }, 300);
                }}
              >
                <p>{category}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Category;
