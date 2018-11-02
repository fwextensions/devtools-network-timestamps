import React from "react";
import RequestList from "./RequestList";


export default class Panel extends React.Component {
	state = {
	};


	render()
	{
		const state = this.state;

		return (
			<div>
				<RequestList />
			</div>
		)
	}
}
