import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { media } from '../styles/media-templates';

const Content = styled(Paper)`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 300px;
  width: 100vw;
  ${media.mobile`width: 100vw;`} ${props =>
    props.position === 'fullscreen'
      ? `
  width: 100vw;
  height: 100vh;
  font-size: 1.2em;
  `
      : `
      max-width: ${
        ['startBottomLeft', 'startBottomRight', 'startTopLeft', 'startTopRight', 'center'].includes(
          props.position
        )
          ? '440px'
          : '768px'
      };
    `} transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  background: ${props => props.theme.body.backgroundColor};
`;

export default Content;
