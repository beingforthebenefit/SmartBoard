import React from 'react';
import styled from 'styled-components';

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  z-index: 0;
`;

const GradientTop = styled(Gradient)`
  top: 0;
  background: linear-gradient(to top, transparent, rgba(0, 0, 0, 1));
`;

const GradientBottom = styled(Gradient)`
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1));
`;

export function TopGradient() {
  return <GradientTop />;
}

export function BottomGradient() {
  return <GradientBottom />;
}