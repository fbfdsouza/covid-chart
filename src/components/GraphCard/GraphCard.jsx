import React, { memo } from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import "./styles/GraphCard.css";

const GraphCard = ({ options }) => {
  console.log("render graph");
  return (
    <div style={{ margin: "0% 2%" }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        styleMode={true}
      />
    </div>
  );
};

export default memo(GraphCard);

GraphCard.propTypes = {
  options: PropTypes.object.isRequired,
};

GraphCard.defaultProps = {};
