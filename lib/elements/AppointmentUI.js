import styled from 'styled-components';
import { media } from '../styles/media-templates';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 300px;
  width: 100vw;
  ${media.mobile`width: 100vw;`} ${props =>
    props.theme.position === 'fullscreen'
      ? `
  width: 100vw;
  height: 100vh;
  font-size: 1.2em;
  `
      : `
    max-width: ${props.theme.coords ? '440px' : '768px'};
  `} transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px;
  background: ${props => props.theme.body.backgroundColor};
`;

export default Content;
