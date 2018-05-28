const today = new Date();
const defaultDate = {
	month: today.getMonth()+1,
	year: today.getFullYear(),
	date: today.getDate(),
}
export default class Calendar {
	constructor(props){
		this.setCurrentDate(props);
	}
	static monthName = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	static days31 = [1,3,5,7,8,10,12];
	static days30 = [4,6,9,11];
	static weekDays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	setCurrentDate(props) {
		this.year = props && this.validYear(props.year) || defaultDate.year;
		this.month = props && this.validMonth(props.month) || defaultDate.month;
		this.maxDates = Calendar.days31.includes(this.month) ? 31 : Calendar.days30.includes(this.month) ? 30 : this.year % 4 === 0 ? 29 : 28;
		this.date = props && this.validDate(props.year, props.month, props.date) || defaultDate.date;
		this.currentDate = new Date(`${this.month}/${this.date}/${this.year}`);
	}
	validMonth(month) {
		return !Number.isNaN(parseInt(month, 10)) && month > 0 && month <= 12 ? parseInt(month, 10) : null;
	}
	validYear(year) {
		return !Number.isNaN(parseInt(year, 10)) && year>0 && year <= 9999 ? parseInt(year, 10): null;
	}
	validDate(y, m, date) {
		const month = this.validMonth(m);
		const year = this.validYear(y);
		if (!month || !year) return null;
		return !Number.isNaN(parseInt(date, 10)) && date > 0 && date <= this.maxDates;
	}
	nextMonth() {
		var m = this.month + 1;
		if (m == 13) {
			m = 1;
			this.year++;
		}
		this.setCurrentDate({month: m, year: this.year, date: this.date});
	}
	prevMonth() {
		var m = this.month - 1;
		if (m == 0) {
			m = 12;
			this.year--;
		}
		this.setCurrentDate({month: m, year: this.year, date: this.date});
	}
	get monthName() {
		return Calendar.monthName[this.month];
	}
	get datesToPrint() {
		const firstDay = new Date(`${this.month}/1/${this.year}`);
		var startDayOfMonth = firstDay.getDay();
		var prevMonth = new Calendar({date: 1, month: this.month-1, year: this.year-1});
		var dates = [];
		for (var i=0; i < startDayOfMonth; i++) {
			dates.push({
				date: prevMonth.maxDates - (startDayOfMonth-(i+1)),
				disable: true
			});
		}
		for (var i=0; i < this.maxDates; i++) {
			dates.push({
				date:i+1,
				disable: false
			});
		}
		var nextMonthDates = 7 - (dates.length % 7);
		for (var i=0; i < nextMonthDates; i++) {
			dates.push({
				date: i+1,
				disable: true
			});
		}
		return dates;
	}
}

