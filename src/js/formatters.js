import React from "react";


export const PercentFormatter = ({value}) => (
	<div
		style={{
			padding: "2px 5px",
			background: `linear-gradient(90deg, #ddd ${value}%, #ffffff00 0%)`
		}}
		title={`${value}%`}
	>
		{value}%
	</div>
);


export const LinkFormatter = ({value, dependentValues}) => (
	<a href={value} title={dependentValues.text} target="blank">{dependentValues.text}</a>
);


export const NameFormatter = ({value, dependentValues}) => (
	<div
		title={value}
		style={{
			fontWeight: dependentValues.endsSoon ? "bold" : "normal",
		}}
	>
		{value}
	</div>
);


export const TitleFormatter = ({value, dependentValues}) => {
	const {text, title} = dependentValues;

	return (
		<div
			title={title}
		>
			{text}
		</div>
	);
};


export const EndsInFormatter = ({value, dependentValues}) => (
	<div
		style={{
			padding: "2px 5px",
			fontWeight: dependentValues.endsSoon ? "bold" : "normal",
			background: dependentValues.endsSoon ? `rgba(255, 0, 0, ${(11 - value) / 2 / 10})` : "none"
		}}
	>
		{value}
	</div>
);
