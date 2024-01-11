import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getData } from "./hooks/useData";
import Loading from "./Loading";

const Quiz = ({
  numOfQ,
  setNumOfQ,
  chosenCategory,
  setSelected,
  selected,
  setScore,
  score,
  setIsFinished,
  isFinished,
  resetQuiz,
}) => {
  const [answers, setAnswers] = useState([]);

  const [bgClass, setBgClass] = useState("yellow");
  const { data, isLoading, isError, error, isRefetching, refetch } = useQuery({
    queryKey: "q",
    queryFn: () => getData(chosenCategory),
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate(null);

  const checkAnswer = (answer) => {
    setSelected(answer);
    if (numOfQ <= 9) {
      if (answer === data[numOfQ]?.correctAnswer) {
        setScore((prev) => prev + 1);

        setBgClass("bg-green-500 hover:bg-green-500 hover:text-[#f2f2f2]");
      } else {
        setBgClass("bg-red-500 hover:bg-red-500 hover:text-[#f2f2f2]");
      }
    }
    if (numOfQ < 9) {
      setTimeout(() => {
        setNumOfQ((prev) => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 1000);
    }
  };

  useEffect(() => {
    isLoading ? (
      <Loading />
    ) : (
      setAnswers(
        [...data[numOfQ]?.incorrectAnswers, data[numOfQ]?.correctAnswer].sort(
          () => 0.5 - Math.random()
        )
      )
    );
    setSelected(0);
  }, [numOfQ, data]);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem("reload-url", window.location.href);
    };
    window.onload = () => {
      if (localStorage.getItem("reload-url") != null) {
        if (window.location.href == localStorage.getItem("reload-url")) {
          refetch();
          // resetQuiz();
          navigate("/");
        }
      }
    };
    window.addEventListener("popstate", () => {
      resetQuiz();
    });
  }, [data]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="=text-[24ox]">{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className=" text-[14px] font-medium sm:text-[16px] absolute top-8 sm:right-[10%] right-[20%] translate-x-[50%]  py-2 px-4">
        {chosenCategory.replaceAll("_", " ").replaceAll("and", "&")}
      </h1>
      <div className=" absolute top-[20%] left-[50%] translate-x-[-50%] ">
        <div className="w-64 h-1 bg-[#3c3a4a] flex gap-1">
          {[...Array(numOfQ + 1).keys()].map((n) => (
            <div key={n} className="bg-[#f2f2f2] w-[22px]"></div>
          ))}
        </div>
      </div>

      {isFinished && (
        <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full bg">
          <div className=" text-center py-8 max-w-[400px] w-full m-8 flex flex-col gap-4 items-center justify-center bg-[#f2f2f2]  text-black z-20 opacity-100">
            <p className="text-[14px] capitalize">your score</p>
            <span className="text-[30px] ">
              <span className={score > 5 ? "text-green-500" : "text-red-500"}>
                {score}
              </span>
              / 10
            </span>
            <p className="text-[14px] ">Learn more by taking another quiz</p>
            <button
              className="bg-[#3c3a4a] text-[#f2f2f2] px-10 py-3"
              onClick={resetQuiz}
            >
              Take another Quiz
            </button>
          </div>
        </div>
      )}
      <div className="flex  items-center justify-center h-full ">
        {isRefetching || isLoading ? (
          <Loading />
        ) : (
          <div className=" p-6  sm:text-[20px] text-[14px] max-w-[750px] w-full flex flex-col items-center justify-center gap-6">
            <h1 className="text-center border-2 border-[#3c3a4a] w-full py-2 px-8 rounded-3xl">
              {data[numOfQ]?.question.replace("Israel", "Palestine")}
            </h1>
            <div className="grid grid-cols-2 sm:gap-x-8 sm:gap-y-4 gap-x-4 gap-y-2 w-full place-items-center h-full">
              {answers?.map((answer) => (
                <div
                  onClick={() => checkAnswer(answer)}
                  className={`  " ${
                    selected === answer && bgClass
                  } h-full flex items-center justify-center w-full text-center rounded-3xl py-2 sm:px-8 px-2 border-2 border-[#3c3a4a] hover:bg-[#f2f2f2] hover:text-[#3c3a4a] ease-in-out duration-300 cursor-pointer ${
                    selected && "pointer-events-none"
                  }`}
                  key={answer}
                >
                  <p>{answer === "Israel" ? "Palestine" : answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
