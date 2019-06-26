import styled from 'styled-components';

export default styled.div`
  display: flex;
  font-size: 0.8em;
  padding: 2px 0;
  justify-content: center;
  flex-grow: ${props => props.widthHeader};
  flex-basis: 0;
  background: ${props => props.theme.header.backgroundColor};
  color: white;
  text-transform: uppercase;
`;
