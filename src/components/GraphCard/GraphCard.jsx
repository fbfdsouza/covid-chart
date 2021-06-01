import React from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import "./styles/GraphCard.css";

const GraphCard = ({ options }) => {
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

export default GraphCard;

GraphCard.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GraphCard.defaultProps = {};
