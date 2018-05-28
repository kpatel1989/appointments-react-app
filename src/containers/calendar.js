"use strict"

import React from "react";
import CalendarComponent from "../components/calendar";
const today = new Date();
const defaultState = {
	month: 9,
	year: 2017,
	date: 13,
}

class CalendarContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (<CalendarComponent {...this.state}/>);
	}
}

export default CalendarContainer;