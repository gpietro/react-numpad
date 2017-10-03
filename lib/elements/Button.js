import styled from 'styled-components';

const Button = styled.button`
  background: #fff;
  border: 1px solid #333;
  border-radius: 0px;
  color: #333;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  line-height: 40px;
  font-weight: 200;
  margin: 8px 0;
  outline: none;
  padding: 0 12px;
  text-transform: uppercase;
  box-shadow: 2px 6px #999;
  &:hover {
    background: #f8b0af;
  }
  &:active {
    background-color: #3e8e41;
    box-shadow: 2px 2px #666;
    transform: translateY(4px);
  }
  
`;

export default Button;
