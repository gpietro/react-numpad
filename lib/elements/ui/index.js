import styled from 'styled-components';
import Color from 'color';

const NButton = styled.button`
  color: ${props => props.theme.header.secondaryColor};
  &:hover {
    color: ${props => props.theme.header.highlightColor};
  }
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 1.6em;
  padding: 0px 0px 2px 0px;
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

export { NButton };
