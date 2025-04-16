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

	// Going to style numbers and equals differently to the operations
	const getButtonClass = (button) => {
		//Numbers
		if (!isNaN(button) && button != '' || ['⁺⁄₋', '.'].includes(button)) {
			// console.log(`${button} is a number`);
			return 'numbers';
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
