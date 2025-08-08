import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Chart = ({ title, data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);

    const isMulti = Array.isArray(data[0][1]);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[0]))
      .range([margin.left, width - margin.right]);

    let yDomain;
    if (isMulti) {
      const allValues = data.flatMap((d) => d[1]).filter((v) => v != null);
      yDomain = d3.extent(allValues);
    } else {
      const values = data.map((d) => d[1]).filter((v) => v != null);
      yDomain = d3.extent(values);
    }

    const yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .range([height - margin.bottom, margin.top]);


    if (isMulti) {
      const colors = ["blue", "green", "red"];
      const linesCount = data[0][1].length;

      for (let i = 0; i < linesCount; i++) {
        const line = d3
          .line()
          .defined((d) => d[1][i] != null)
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1][i]));

        svg
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", colors[i])
          .attr("stroke-width", 2)
          .attr("d", line);
      }
    } else {
      const line = d3
        .line()
        .defined((d) => d[1] != null)
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]));

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", line);
        
    }
  }, [data]);

  return (
    <>
      <h1>{title}</h1>
      <svg ref={svgRef} width={500} height={300}></svg>
    </>
  );
};

export default Chart;
