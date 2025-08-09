import styled from "styled-components";

const NButton = styled.button`
  color: #263238;
  &:hover {
    color: #546E7A;
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
    color: #90a4ae;
  }
`;

export default NButton;
