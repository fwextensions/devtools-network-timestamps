import React from "react";
import styled from "styled-components";
import parse from "date-fns/parse";
import format from "date-fns/format";


const StartTimeFormat = "HH:mm:ss.SSS";
const StartDateFormat = "YYYY-MM-DD";


const Timestamp = styled.span`
    font-size: 12px !important;
    font-family: Consolas, Lucida Console, Courier New, monospace;
`;


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
console.log("mount");
		chrome.devtools.network.getHAR(log => {
console.log(log.entries.length);
			this.setState({ requests: log.entries.map(har => processHAR(har)) });
		});
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
		const items = this.state.requests.map((request, i) => (
			<li key={i}>
				<Timestamp title={request.startDateString}>{request.startTimeString}</Timestamp>
			</li>
		));

		return (
			<ul>
				{items}
			</ul>
		)
	}
}
