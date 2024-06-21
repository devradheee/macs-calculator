import React, { useState } from 'react';
import { evaluate, sqrt, sin, cos, tan, log, exp, factorial, random } from 'mathjs';
import ConfettiExplosion from 'react-confetti-explosion';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [isRadians, setIsRadians] = useState(true);
  const [degreeMode, setDegreeMode] = useState(true);
  const [secondFunction, setSecondFunction] = useState(false);

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const evalResult = evaluate(input);
        setResult(evalResult);
        setInput(String(evalResult));
        if (input.includes('5') && input.includes('6')) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 3000);
        }
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === '+/-') {
      setInput((prev) => String(-1 * parseFloat(prev)));
    } else if (value === '%') {
      setInput((prev) => String(parseFloat(prev) / 100));
    }else if (value === 'e^x') {
      // Handle e^x
      const currentValue = input || result || 0;
      setResult(Math.exp(currentValue));
      setInput('');
    } else if (value === 'x^y') {
      // Handle x^y
      setInput((prev) => prev + '^');
    }else if (value === 'x^y') {
      // Handle x^y
      setInput((prev) => prev + '^');
    } else if (value === '1/x') {
      // Handle 1/x
      const currentValue = input || result || 1;
      setResult(1 / currentValue);
      setInput('');
    } else if (value === 'y√x') {
      setInput((prev) => prev + 'root');
    }else if (value === 'EE') {
      setInput((prev) => prev + 'e');
    } else if (value === 'Rad') {
      setIsRadians((prev) => !prev);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleAdvancedFunction = (func) => {
    try {
      let currentInput = evaluate(input);
      if (degreeMode && ['sin', 'cos', 'tan'].includes(func)) {
        currentInput = currentInput * (Math.PI / 180);
      }
      let evalResult;
      switch (func) {
        case 'sqrt':
          evalResult = sqrt(currentInput);
          break;
        case 'sin':
          evalResult = sin(currentInput);
          break;
        case 'cos':
          evalResult = cos(currentInput);
          break;
        case 'tan':
          evalResult = tan(currentInput);
          break;
        case 'log':
          evalResult = log(currentInput);
          break;
        case 'exp':
          evalResult = exp(currentInput);
          break;
        case 'factorial':
          evalResult = factorial(currentInput);
          break;
        case 'random':
          evalResult = random();
          break;
        case 'sinh':
          evalResult = Math.sinh(currentInput);
          break;
        case 'cosh':
          evalResult = Math.cosh(currentInput);
          break;
        case 'tanh':
          evalResult = Math.tanh(currentInput);
          break;
        case 'ln':
          evalResult = Math.log(currentInput);
          break;
        case 'x²':
          evalResult = currentInput ** 2;
          break;
        case 'x³':
          evalResult = currentInput ** 3;
          break;
        case '10ˣ':
          evalResult = 10 ** currentInput;
          break;
        case '²√x':
          evalResult = Math.sqrt(currentInput);
          break;
        case '³√x':
          evalResult = Math.cbrt(currentInput);
          break;
        default:
          break;
      }
      setResult(evalResult);
      setInput(String(evalResult));
    } catch (error) {
      setResult('Error');
    }
  };

  const handleMemoryFunction = (func) => {
    switch (func) {
      case 'MC':
        setMemory(null);
        break;
      case 'MR':
        if (memory !== null) setInput(String(memory));
        break;
      case 'M+':
        if (result) setMemory((prev) => (prev ? prev + result : result));
        break;
      case 'M-':
        if (result) setMemory((prev) => (prev ? prev - result : -result));
        break;
      default:
        break;
    }
  };

  const handleOperatorClick = (operator) => {
    if (result) {
      setInput(result + operator);
      setResult('');
    } else {
      setInput((prev) => prev + operator);
    }
  };

  const toggleDegreeMode = () => {
    setDegreeMode((prev) => !prev);
  };

  const toggleSecondFunction = () => {
    setSecondFunction((prev) => !prev);
  };

  return (
    <div className="calculator">
      {confetti && <ConfettiExplosion />}
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button id="button-open-paren" onClick={() => handleButtonClick('(')}>(</button>
        <button id="button-close-paren" onClick={() => handleButtonClick(')')}>)</button>
        <button className="function" onClick={() => handleMemoryFunction('MC')}>MC</button>
        <button className="function" onClick={() => handleMemoryFunction('M+')}>M+</button>
        <button className="function" onClick={() => handleMemoryFunction('M-')}>M-</button>
        <button className="function" onClick={() => handleMemoryFunction('MR')}>MR</button>
        <button id="button-ac" className="function" onClick={() => handleButtonClick('AC')}>C</button>
        <button className="function" onClick={() => handleButtonClick('+/-')}>+/-</button>
        <button className="function" onClick={() => handleButtonClick('%')}>%</button>
        <button id="button-divide" className="operator" onClick={() => handleButtonClick('/')}>÷</button>

        <button className="function" onClick={toggleSecondFunction}>2nd</button>
        <button className="function" onClick={() => handleAdvancedFunction('x²')}>x²</button>
        <button className="function" onClick={() => handleAdvancedFunction('x³')}>x³</button>
        <button id="button-ex" className="function" onClick={() => handleButtonClick('e^x')}>eˣ</button>
        <button id="button-xy" className="function" onClick={() => handleButtonClick('x^y')}>x^y</button>
        <button className="function" onClick={() => handleAdvancedFunction('10ˣ')}>10ˣ</button>
        <button id="button-7" className="number" onClick={() => handleButtonClick('7')}>7</button>
        <button id="button-8" className="number" onClick={() => handleButtonClick('8')}>8</button>
        <button id="button-9" className="number" onClick={() => handleButtonClick('9')}>9</button>
        <button id="button-multiply" className="operator" onClick={() => handleButtonClick('*')}>×</button>

        <button id="button-reciprocal" className="function" onClick={() => handleButtonClick('1/x')}>1/x</button>
        <button className="function" onClick={() => handleAdvancedFunction('²√x')}>²√x</button>
        <button className="function" onClick={() => handleAdvancedFunction('³√x')}>³√x</button>
        <button id="button-root" className="function" onClick={() => handleButtonClick('y√x')}>y√x</button>
        <button className="function" onClick={() => handleAdvancedFunction('ln')}>ln</button>
        <button className="function" onClick={() => handleAdvancedFunction('log')}>log</button>
        <button id="button-4" className="number" onClick={() => handleButtonClick('4')}>4</button>
        <button id="button-5" className="number" onClick={() => handleButtonClick('5')}>5</button>
        <button id="button-6" className="number" onClick={() => handleButtonClick('6')}>6</button>
        <button id="button-subtract" className="operator" onClick={() => handleButtonClick('-')}>-</button>

        <button className="function" onClick={() => handleAdvancedFunction('factorial')}>x!</button>
        <button className="function" onClick={() => handleAdvancedFunction('sin')}>sin</button>
        <button className="function" onClick={() => handleAdvancedFunction('cos')}>cos</button>
        <button className="function" onClick={() => handleAdvancedFunction('tan')}>tan</button>
        <button className="function" onClick={() => handleAdvancedFunction('exp')}>e</button>
        <button id="button-ee" className="function" onClick={() => handleButtonClick('EE')}>EE</button>
        <button id="button-1" className="number" onClick={() => handleButtonClick('1')}>1</button>
        <button id="button-2" className="number" onClick={() => handleButtonClick('2')}>2</button>
        <button id="button-3" className="number" onClick={() => handleButtonClick('3')}>3</button>
        <button id="button-add" className="operator" onClick={() => handleButtonClick('+')}>+</button>

        <button id="button-rad" className="function" onClick={() => handleButtonClick('Rad')}>{isRadians ? 'Rad' : 'Deg'}</button>
        <button className="function" onClick={() => handleAdvancedFunction('sinh')}>sinh</button>
        <button className="function" onClick={() => handleAdvancedFunction('cosh')}>cosh</button>
        <button className="function" onClick={() => handleAdvancedFunction('tanh')}>tanh</button>
        <button className="function" onClick={() => handleButtonClick('π')}>π</button>
        <button className="function" onClick={() => handleAdvancedFunction('random')}>Rand</button>
        <button id="button-0" className="number" onClick={() => handleButtonClick('0')}>0</button>
        <button id="button-decimal" className="number" onClick={() => handleButtonClick('.')}>.</button>
        <button id="button-equal" className="operator" onClick={() => handleButtonClick('=')}>=</button>
      </div>
    </div>
  );
};

export default App;
