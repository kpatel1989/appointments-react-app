import React from "react";
import Calendar from "../lib/calendar";
import NewEvent from "./new-event";

import './calendar.css';

class CalendarComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			calendar : new Calendar(props),
			addEventLeft : -500,
			addEventTop : -500,
			addEventDisplay: "none"
		};
		console.log(this.state.calendar);
		console.log(this.state.calendar.datesToPrint);
	}
	componentWillMount() {
		document.addEventListener("mousedown", this.dayClick(), false);
	}
	componentWillUnmount() {
		document.removeEventListener("mousedown", this.dayClick(), false);
	}
	nextMonth() {
		var calendar = this.state.calendar;
		calendar.nextMonth();
		this.setState({calendar:calendar});
	}
	prevMonth() {
		var calendar = this.state.calendar;
		calendar.prevMonth();
		this.setState({calendar:calendar});
	}
	dayClick(date) {
		return (e) => {
			if (!date || date.disable) {
				this.setState({
					"addEventDisplay": "none"
				});
			};
			if (e.target.className.includes("day") ||
				e.target.className.includes("new-event") || 
				e.target.className.includes("input-row")) {
					this.setState({
						"addEventDisplay": "inline-block"
					});
				}
			if (e.target.className.includes("day")) {
				this.setState({
					addEventLeft : e.target.offsetLeft - 100 + 35,
					addEventTop : e.target.offsetTop + 36,
				});
			}
		}
	}
	
	saveEvent() {
		return (e) => {

		}
	}
	render() {
		var dateRows = [];
		for(var i =0; i < this.state.calendar.datesToPrint.length; i+=7) {
			var daysInWeek = [];
			for(var j =0; j < 7; j++) {
				daysInWeek.push(<span onClick={this.dayClick(this.state.calendar.datesToPrint[i+j])} className={this.state.calendar.datesToPrint[i+j].disable ? "btn disabled" : "day"}> {this.state.calendar.datesToPrint[i+j].date} </span>); 
			}
			dateRows.push((<div className="week-row" key={i}>{daysInWeek}</div>));
		}
		return (<div className="container calendar">
			<section className="month-year">  
				<div className="left-handler" onClick={() => this.prevMonth()}> <span> {"<"}</span> </div>
				<div className="month-year-label">  
					<div className="monthLabel"> {this.state.calendar.monthName} </div>
					<div className="yearLabel"> {this.state.calendar.year} </div>
				</div>
				<div className="right-handler" onClick={() => this.nextMonth()}> <span>{">"}</span> </div>
			</section>
			<section>
				<div className="weekNames week-row"> 
					<span> Su </span> <span> Mo </span> <span> Tu </span> <span> We </span> <span> Th </span> <span> Fr </span> <span> Sa </span>
				</div>
				<div className="days">
					{ dateRows }
				</div>
			</section>
			<NewEvent addEventLeft={this.state.addEventLeft} addEventTop={this.state.addEventTop} addEventDisplay={this.state.addEventDisplay} ></NewEvent>
		</div>);
	}
}

export default CalendarComponent;