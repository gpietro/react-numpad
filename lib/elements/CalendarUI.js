import styled from 'styled-components';
import Color from 'color';

const Header = styled.div`
  min-height: 34px;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  color: white;
  background: ${props => props.theme.header.backgroundColor};
  svg:hover {
    fill: #ffc107;
  }
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`;

const TwelveGridItem = styled.div`
  flex-grow: 1;
  width: 25%;
  align-items: center;
  justify-content: center;
  display: flex;
  text-transform: capitalize;
  &:hover {
    ${props => `color: ${props.theme.body.highlightColor};`};
  }
`;

const TwelveGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

const MonthSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MonthLabel = styled.div`
  min-width: 83px;
  text-align: center;
  &:hover {
    ${props => `color: ${props.theme.body.highlightColor};`};
  }
`;

const YearSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const YearLabel = styled.div`
  min-width: 40px;
  text-align: center;
  &:hover {
    ${props => `color: ${props.theme.body.highlightColor};`};
  }
`;

const Days = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-grow: 1;
`;

const WeekDays = styled.div`
  display: flex;
  width: 100%;
  background: white;
`;

const StyledGridItem = styled.div`
  flex-grow: 1;
  width: calc(100% * (1/7) - 1px - 0.5rem);
  text-align: center;
  border-right: none;
  border-bottom: 1px solid #fff;
  padding: 0.25rem;
  ${WeekDays} & {
    border: none;
    padding: 0.2em;
    font-size: 0.8em;
    :nth-child(-n + 7) {
      border-top: none;
    }
  }
  :nth-child(-n + 7) {
    border-top: '1px solid #ddd';
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: capitalize;
`;

const GridItemLink = StyledGridItem.withComponent('a');
const DayGridItem = GridItemLink.extend`
  ${props =>
    props.prevMonth || props.nextMonth
      ? `color: ${Color(props.theme.body.primaryColor)
          .alpha(0.8)
          .string()};`
      : `color: ${props.theme.body.primaryColor};`} text-decoration: none !important;
  cursor: pointer;
  &:hover {
    ${props =>
      props.active
        ? ''
        : `color: ${props.theme.body.highlightColor}; border-color: ${
            props.theme.body.highlightColor
          }`};
  }
  ${props =>
    props.active
      ? `
        font-weight: 700;
        border-color: ${props.theme.body.primaryColor};
        `
      : ``} &[disabled] {
    color: ${props =>
      Color(props.theme.body.primaryColor)
        .alpha(0.5)
        .string()} !important;
    pointer-events: none;
    cursor: not-allowed;
  }
  position: relative;
  ${props =>
    props.marker
      ? `
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      border-color: transparent;
      border-style: solid;
    }

    &::after {
      border-width: 0.5em;
      border-right-color: ${props.theme.body.highlightColor};
      border-top-color: ${props.theme.body.highlightColor};
    }`
      : ``};
`;

export {
  Header,
  TwelveGrid,
  TwelveGridItem,
  MonthSwitch,
  MonthLabel,
  YearSwitch,
  YearLabel,
  Days,
  WeekDays,
  StyledGridItem,
  DayGridItem,
  GridItemLink,
};
