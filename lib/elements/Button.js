import styled from 'styled-components';

const Button = styled.button`
  background: #fff;    
  border: none;
  color: #3a3a3a;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  line-height: 40px;
  font-weight: 200;
  margin: 3px 0;
  outline: none;
  padding: 0 12px;
  border-radius: 2px;
  text-transform: uppercase;
  transition:
    transform 0.08s ease,
    background-color 0.08s ease,
    box-shadow 0.08s ease;

  &:active {
    transform: translateY(1.5px);
    box-shadow: 
        inset 0 -0.5px 0 #aaaaaa,
    inset 0px -1px 1px -1px #fff,
        0px 0.5px 0.75px 0px #999;
  }
`;

export default Button;
