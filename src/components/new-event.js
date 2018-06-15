
import React from "react";
import { FormGroup, FormControl} from "react-bootstrap";

class NewEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hour: "",
			minute: "",
			name: "",
			hourValidation:null,
			minuteValidation:null,
			nameValidation:null
		}
	}
	validate() {
			this.setState({
				hourValidation: this.state.hour != "" ? "success" : "error",
				minuteValidation: this.state.minute != "" ? "success" : "error",
				nameValidation: this.state.name != "" ? "success" : "error"
			})
	}
	saveClick() {
			if (this.state.hourValidation == "success" && 
			this.state.minuteValidation == "success" && 
			this.state.eventNameValidation == "success") {
				this.props.saveEvent({
					hour: this.state.hour,
					minute: this.state.minute,
					name: this.state.name
				});
			} else {
				this.validate();
			}
	}
	render() {
		return(
			<form className="new-event" id="newEvent" style={{left:this.props.addEventLeft,top:this.props.addEventTop,display:this.props.addEventDisplay}}> 
				<FormGroup bsSize="sm" className="input-row" validationState={this.state.hourValidation}>
					<FormControl type="number" className="new-event-input" id="hour" placeholder="Hour" required onChange={(e) => this.validate(e)} value={this.state.hour} />
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup bsSize="sm" className="input-row" validationState={this.state.minuteValidation}>
					<FormControl type="number" className="new-event-input" id="minute" placeholder="Minute" required onChange={(e) => this.validate(e)} value={this.state.minute}/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup bsSize="sm"  className="input-row"  validationState={this.state.eventNameValidation}>
					<FormControl type="text" className="new-event-input" id="eventName" placeholder="Event Name" required onChange={(e) => this.validate(e)} value={this.state.eventName}/>
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup bsSize="sm"  className="input-row">
					<FormControl type="button" className="new-event-input btn btn-default" id="save" value="Save" onClick={() => this.saveClick()}/>
				</FormGroup>
			</form>);
	}
}

export default NewEvent;