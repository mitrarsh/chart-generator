import { createContext, useEffect, useState } from "react";

export const DataContext = createContext({ data: [] });

const DataContextProvider = ({ children }) => {
  const [error,setError] = useState([])
  const [data, setData] = useState([
  // {
  //   "title": "Temperature readings",
  //   "data": [
  //     [0, 22],
  //     [1, 23],
  //     [2, 21]
  //   ]
  // },
  // {
  //   "title": "Sensor comparisons",
  //   "data": [
  //     [0, [5, 8, 6]],
  //     [1, [6, 9, 7]],
  //     [2, [4, 7, 5]]
  //   ]
  // }
]
);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/data");
        if (!res.ok) {
          throw new Error("error fetching data");
        }
        const resData = await res.json();
        setData(resData);
      } catch (errorMsg) {
        setError(...error, errorMsg);
      }
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, error, setError }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
