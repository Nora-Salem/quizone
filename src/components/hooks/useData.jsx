import { useQuery } from "react-query";

export const getData = async (category) => {
  const response = await fetch(
    `https://the-trivia-api.com/api/questions?limit=50&categories=${category}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};
export const useCategories = () => useQuery(["category"], getCategories);
