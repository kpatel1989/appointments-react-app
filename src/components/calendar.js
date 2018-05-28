import React from "react";
import Calendar from "../lib/calendar";
import './calendar.css';

class CalendarComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			calendar : new Calendar(props)
		};
		console.log(this.state.calendar);
		console.log(this.state.calendar.datesToPrint);
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
		return () => {
			if (date.disable) return;
			console.log("Clicked ", date);
		}
	}
	render() {
		var dateRows = [];
		for(var i =0; i < this.state.calendar.datesToPrint.length; i+=7) {
			var daysInWeek = [];
			for(var j =0; j < 7; j++) {
				daysInWeek.push(<span onClick={this.dayClick(this.state.calendar.datesToPrint[i+j])} className={this.state.calendar.datesToPrint[i+j].disable ? "btn disabled" : ""}> {this.state.calendar.datesToPrint[i+j].date} </span>); 
			}
			dateRows.push((<div className="week-row" key={i}>{daysInWeek}</div>));
		}
		return (<div className="container">
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
			
		</div>);
	}
}

export default CalendarComponent;