import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import { Header, TwelveGrid, TwelveGridItem } from './CalendarUI';
import { NButton } from './ui';

class YearView extends Component {
  constructor(props) {
    super(props);
    this.state = { year: props.date.year() };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  prev() {
    this.setState(oldState => ({ year: oldState.year - 12 }));
  }

  next() {
    this.setState(oldState => ({ year: oldState.year + 12 }));
  }

  render() {
    const { handleChangeYear } = this.props;
    const { year } = this.state;
    return (
      <Fragment>
        <Header>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <NButton onClick={this.prev}>
              <MdChevronLeft />
            </NButton>
            <NButton onClick={this.next}>
              <MdChevronRight />
            </NButton>
          </div>
        </Header>
        <TwelveGrid>
          {Array(12)
            .fill()
            .map((_, i) => (
              <TwelveGridItem
                onClick={() => handleChangeYear(year - 5 + i)}
                key={`month-${year - 5 + i}`}
              >
                {year - 5 + i}
              </TwelveGridItem>
            ))}
        </TwelveGrid>
      </Fragment>
    );
  }
}

YearView.propTypes = {
  handleChangeYear: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default YearView;
