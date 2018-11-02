import React from "react";
import {SegmentedControl} from "segmented-control";
import moment from "moment";


const TimestampFormat = "YYYY-MM-DD [at] h:mm:ss a";
const TimestampString = timestamp => `Last updated on ${moment(timestamp).format(TimestampFormat)}`;


export default ({
	timestamp,
	onPlatformChange,
	onTypeChange,
	onClick}) =>
(
	<div className="header">
		<SegmentedControl
			name="platform"
			options={[
				{ label: "Desktop", value: "desktop", default: true },
				{ label: "iOS", value: "ios" },
				{ label: "Android", value: "android" }
			]}
			setValue={onPlatformChange}
			style={{ width: 270 }}
		/>
		<SegmentedControl
			name="type"
			options={[
				{ label: "Experiments", value: "Experiments", default: true },
				{ label: "Layers", value: "Layers" }
			]}
			setValue={onTypeChange}
			style={{ width: 180 }}
		/>
		<button className="copy-button"
			onClick={onClick}
			title="Copy the data in tab-delimited format"
		>Copy</button>
		<div className="timestamp">{timestamp && TimestampString(timestamp)}</div>
	</div>
);
