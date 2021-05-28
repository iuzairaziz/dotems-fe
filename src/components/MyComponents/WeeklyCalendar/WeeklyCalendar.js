import React from "react";
import Helmet from "react-helmet";
import moment from "moment";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

function getWeekDays(weekStart) {
  const days = [weekStart];
  for (let i = 1; i < 7; i += 1) {
    days.push(
      moment(weekStart)
        .add(i, "days")
        .toDate()
    );
  }
  return days;
}

function getWeekRange(date) {
  return {
    from: moment(date)
      .startOf("isoWeek")
      .toDate(),
    to: moment(date)
      .endOf("isoWeek")
      .toDate(),
  };
}

export default class WeeklyCalendar extends React.Component {
  state = {
    hoverRange: undefined,
    selectedDays: [],
    show: false,
  };

  handleDayChange = (date) => {
    this.setState(
      {
        selectedDays: getWeekDays(getWeekRange(date).from),
      },
      () => {
        console.log("selected days", this.state.selectedDays);
        this.props.setSelectedDays(this.state.selectedDays);
      }
    );
  };

  handleDayEnter = (date) => {
    this.setState({
      hoverRange: getWeekRange(date),
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };

  handleWeekClick = (weekNumber, days, e) => {
    this.props.setWeekNum(weekNumber);
    console.log("weeeeekNo", weekNumber);
    this.setState({
      selectedDays: days,
    });
  };

  render() {
    const { hoverRange, selectedDays } = this.state;

    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[1],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[1],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    return (
      <div className="SelectedWeekExample">
        <input
          value={
            moment(selectedDays[0]).format("LL") +
            "-" +
            moment(selectedDays[6]).format("LL")
          }
          onFocus={() => this.setState({ show: true })}
          style={{ width: "200px" }}
        />
        <DayPicker
          className={`${this.state.show ? "" : "d-none"} position-absolute`}
          style={{ background: "#fff" }}
          selectedDays={selectedDays}
          showWeekNumbers
          onBlur={() => this.setState({ show: false })}
          showOutsideDays
          firstDayOfWeek={1}
          modifiers={modifiers}
          onDayClick={this.handleDayChange}
          onDayMouseEnter={this.handleDayEnter}
          onDayMouseLeave={this.handleDayLeave}
          onWeekClick={this.handleWeekClick}
        />
        {selectedDays.length === 7 && (
          <div className="d-none">
            {moment(selectedDays[0]).format("LL")} –{" "}
            {moment(selectedDays[6]).format("LL")}
          </div>
        )}

        <Helmet>
          <style>{`
            .SelectedWeekExample .DayPicker {
                background:white;
              }
            .SelectedWeekExample .DayPicker-Month {
              border-collapse: separate;
            }
            .SelectedWeekExample .DayPicker-WeekNumber {
              outline: none;
            }
            .SelectedWeekExample .DayPicker-Day {
              outline: none;
              border: 1px solid transparent;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange {
              background-color: #EFEFEF !important;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange {
              background-color: #fff7ba !important;
              border-top-color: #FFEB3B;
              border-bottom-color: #FFEB3B;
              border-left-color: #fff7ba;
              border-right-color: #fff7ba;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeStart {
              background-color: #FFEB3B !important;
              border-left: 1px solid #FFEB3B;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRangeEnd {
              background-color: #FFEB3B !important;
              border-right: 1px solid #FFEB3B;
            }

            .SelectedWeekExample .DayPicker-Day--selectedRange:not(.DayPicker-Day--outside).DayPicker-Day--selected,
            .SelectedWeekExample .DayPicker-Day--hoverRange:not(.DayPicker-Day--outside).DayPicker-Day--selected {
              border-radius: 0 !important;
              color: black !important;
            }
            .SelectedWeekExample .DayPicker-Day--hoverRange:hover {
              border-radius: 0 !important;
            }
          `}</style>
        </Helmet>
      </div>
    );
  }
}
