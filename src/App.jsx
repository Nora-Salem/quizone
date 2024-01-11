import { useState, useEffect } from "react";
import "./App.css";
import { getData } from "./components/hooks/useData";
import { useQuery } from "react-query";
import Quiz from "./components/Quiz";
import Category from "./components/Category";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage";
function App() {
  const [chosenCategory, setChosenCategory] = useState("");
  const [numOfQ, setNumOfQ] = useState(0);
  const [selected, setSelected] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["q"],
    queryFn: () => getData(chosenCategory),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const chooseCategory = (category) => {
    category = category.replaceAll(" ", "_");
    category = category.replace("&", "and");
    setChosenCategory(category);
    setTimeout(() => {
      refetch();
    }, 500);
  };
  const resetQuiz = () => {
    navigate("/");
    setNumOfQ(0);
    setIsFinished(false);
    setSelected(0);
    setScore(0);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      resetQuiz();
    }
  }, [navigate]);
  return (
    <>
      <Nav resetQuiz={resetQuiz} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/category"
          element={<Category chooseCategory={chooseCategory} />}
        />
        <Route
          path="/quiz"
          element={
            <Quiz
              setSelected={setSelected}
              selected={selected}
              setScore={setScore}
              score={score}
              setIsFinished={setIsFinished}
              isFinished={isFinished}
              numOfQ={numOfQ}
              setNumOfQ={setNumOfQ}
              chosenCategory={chosenCategory}
              resetQuiz={resetQuiz}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
