
import { useContext } from "react";

import Chart from "./chart";
import { DataContext } from "./DataContext";


const ChartList = () => {
      const { data, error, setError } = useContext(DataContext);
  return (
          <div>
        {data?.map((chart, i) => (
          <Chart key={i} title={chart.title} data={chart.data} />
        ))}
        <ul>
          {error.map((e,idx)=>(
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </div>
  )
}

export default ChartList