import React from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";


const StartTimeFormat = "HH:mm:ss.SSS";
const StartDateFormat = "YYYY-MM-DD";


function processHAR(
	har)
{
	har.startTime = parse(har.startedDateTime);
	har.startTimeString = format(har.startTime, StartTimeFormat);
	har.startDateString = format(har.startTime, StartDateFormat);

	return har;
}


export default class RequestList extends React.Component{
	state = {
		requests: []
	};


	componentDidMount()
	{
		chrome.devtools.network.onRequestFinished.addListener(this.handleRequestFinished);
	}


	componentWillUnmount()
	{
		chrome.devtools.network.onRequestFinished.removeListener(this.handleRequestFinished);
	}


	handleRequestFinished = (
		har) =>
	{
//console.log(har);
		const {requests} = this.state;

		requests.push(processHAR(har));
		this.setState({ requests });
	};


	render()
	{
		const items = this.state.requests.map(request => <li
        title={request.startDateString}>{request.startTimeString}</li>);

		return (
			<ul>
				{items}
			</ul>
		)
	}
}
