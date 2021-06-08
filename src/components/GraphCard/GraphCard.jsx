import React, { memo } from "react";
import Highcharts from "highcharts";
import PropTypes from "prop-types";
import HighchartsReact from "highcharts-react-official";
import "./styles/GraphCard.css";
import styled from "styled-components";

export const GraphCardWrapper = styled.div`
  margin: 0% 2%;
`;

const GraphCard = ({ options }) => {
  return (
    <GraphCardWrapper>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        styleMode={true}
      />
    </GraphCardWrapper>
  );
};

export default memo(GraphCard);

GraphCard.propTypes = {
  options: PropTypes.object.isRequired,
};

GraphCard.defaultProps = {};
