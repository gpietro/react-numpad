import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 0.5em;
  border-bottom: 1px solid #fff;
  :nth-child(-n + 7) {
    border-top: '1px solid #ddd';
  }
  &:active {
    ${props =>
      `color: ${props.theme.body.highlightColor}; border-color: ${
        props.theme.body.highlightColor
      }`};
  }
`;
