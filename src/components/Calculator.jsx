import './Calculator.css';

function CreateCalculator() {
	//button values for Button component
	const buttonValues = [
		['%', 'CE', 'C', '←'],
		['⅟x', '𝑥²', '√𝑥', '÷'],
		['7', '8', '9', '×'],
		['4', '5', '6', '–'],
		['1', '2', '3', '+'],
		['⁺⁄₋', '0', '.', '='],
	];

	/**
	 * As we are setting the buttonValues to their classname
	 * I want a helper function to get the classname for each button
	 * to make it easier to style them in the CSS file.
	 */
	const getButtonClass = (button) => {
		//Numbers
		if (!isNaN(button) && button != '') {
			// console.log(`${button} is a number`);
			return 'number';
		} else if (
			['%', 'CE', 'C', '←', '⅟x', '𝑥²', '√𝑥', '÷', '×', '–', '+'].includes(
				button
			)
		) {
			// console.log(`${button} is an operation`);
			return 'operations';
		} else if (button === '=') {
			// console.log(`${button} is equals`);
			return 'equals';
		}
	};

	//Button component to render buttonValues
	const Button = ({ className, value, onClick }) => {
		return (
			<button className={className} onClick={onClick}>
				{value}
			</button>
		);
	};

	return (
		<div className='wrapper'>
			<div className='screen'></div>
			<div className='buttonBox'>
				{buttonValues.flat().map((button, i) => {
					return (
						<Button
							className={getButtonClass(button)}
							value={button}
							key={i}
							onClick={() => {
								console.log(`${button} Clicked!`);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default function Calculator() {
	return (
		<section>
			<CreateCalculator />
		</section>
	);
}
