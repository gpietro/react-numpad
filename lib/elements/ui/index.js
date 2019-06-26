import styled from 'styled-components';
import Color from 'color';

// TODO use material-ui colors
const NButton = styled.button`
  display: flex;
  color: white;
  &:hover {
    color: ${props => props.theme.header.highlightColor};
  }
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 1.6em;
  padding: 3px 0px;
  :active,
  :focus {
    outline: none;
  }
  :disabled {
    pointer-events: none;
    cursor: now-allowed;
    color: ${props =>
      Color(props.theme.header.secondaryColor)
        .darken(0.4)
        .string()};
  }
`;

export default NButton;
