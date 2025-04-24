import React, { useState } from 'react';
import './Calculator.css';

//input formatting for values
const toLocaleString = (number) =>
	String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

//process a string of numbers by removing spaces and converting to a number
const removeSpaces = (number) => number.toString().replace(/\s/g, '');

function CreateCalculator() {
	let [screenValue, setScreenValue] = useState({
		operator: '', // the operator
		number: 0, // the entered value
		result: 0, // the result of the calculation
	});

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
		if ((!isNaN(button) && button != '') || ['⁺⁄₋', '.'].includes(button)) {
			// console.log(`${button} is a number`);
			return 'numbers';
		} else if (button === '=') {
			// console.log(`${button} is equals`);
			return 'equals';
		}
	};

	// Create the screen to hold values
	const Screen = ({ value }) => {
		return <div className='screen'>{value}</div>;
	};

	//Button component to render buttonValues
	const Button = ({ className, value, onClick }) => {
		return (
			<button className={className} onClick={onClick}>
				{value}
			</button>
		);
	};

	//Number handler to trigger when 0-9 are clicked. gets the value fo the button and sends to the num value created in useState
	const numberHandler = (event) => {
		event.preventDefault(); //prevent a default action from the event.
		const value = event.target.innerHTML; //get the value of the button clicked

		//limit the number of values to 16
		if (removeSpaces(screenValue.number).length < 16) {
			setScreenValue({
				...screenValue,
				number:
					screenValue.number === 0 && value === '0'
						? '0'
						: removeSpaces(screenValue.number) % 1 === 0
						? toLocaleString(Number(removeSpaces(screenValue.number + value)))
						: toLocaleString(screenValue.number + value),
				result: !screenValue.operator ? 0 : screenValue.result,
			});
		}
	};

	const decimalHandler = (event) => {
		event.preventDefault();
		const value = event.target.innerHTML;

		setScreenValue({
			...screenValue,
			number: !screenValue.number.toString().includes('.')
				? screenValue.number + value
				: screenValue.number,
		});
	};

	const operatorHandler = (event) => {
		event.preventDefault();
		const value = event.target.innerHTML; //get the value of the button clicked

		setScreenValue({
			...screenValue,
			operator: value,
			result:
				!screenValue.result && screenValue.number
					? screenValue.number
					: screenValue.result,
			number: 0,
		});
	};

	const equalsHandler = () => {
		if (screenValue.operator && screenValue.number) {
			let math = 0;
			const number1 = Number(removeSpaces(screenValue.result));
			const number2 = Number(removeSpaces(screenValue.number));
			switch (screenValue.operator) {
				case '+':
					math = number1 + number2;
					break;
				case '–':
					math = number1 - number2;
					break;
				case '×':
					math = number1 * number2;
					break;
				case '÷':
					math = number1 / number2;
					break;
				default:
					break;
			}

			setScreenValue({
				...screenValue,
				result: toLocaleString(math),
				number: 0,
				operator: '',
			});
		}
	};

	return (
		<div className='wrapper'>
			<Screen
				value={screenValue.number ? screenValue.number : screenValue.result}
			/>
			<div className='buttonBox'>
				{buttonValues.flat().map((button, i) => {
					return (
						<Button
							className={getButtonClass(button)}
							value={button}
							key={i}
							onClick={
								button === '.'
									? decimalHandler
									: button === '÷' ||
									  button === '×' ||
									  button === '–' ||
									  button === '+'
									? operatorHandler
									: button === '=' ? equalsHandler
									: numberHandler
							}
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
