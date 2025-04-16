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
								className={button === '=' ? 'equals' : ''}
								value={button}
								key={i}
								onClick={() => {
									console.log(`${i} Clicked!`);
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
