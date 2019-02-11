import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  ${props =>
    props.separator ? `border-left: 2px solid ${props.theme.header.backgroundColor}` : ''};
`;
