import { useState } from 'react';
import { motion } from 'framer-motion';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const result = calculate(parseFloat(previousValue), current, operation);
      setDisplay(String(result));
      setPreviousValue(String(result));
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(parseFloat(previousValue), parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handleClick = (btn: string) => {
    if (btn === 'C') handleClear();
    else if (btn === '=') handleEquals();
    else if (btn === '.') handleDecimal();
    else if (['+', '-', '×', '÷'].includes(btn)) handleOperation(btn);
    else if (btn === '±') setDisplay(String(parseFloat(display) * -1));
    else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
    else handleNumber(btn);
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      {/* Display */}
      <div className="bg-muted/30 rounded-xl p-6 text-right">
        <div className="text-4xl font-light break-all">{display}</div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        {buttons.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {row.map((btn) => {
              const isOperation = ['+', '-', '×', '÷', '='].includes(btn);
              const isZero = btn === '0';
              
              return (
                <motion.button
                  key={btn}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(btn)}
                  className={`
                    h-14 rounded-xl font-medium text-lg transition-all
                    ${isOperation 
                      ? 'bg-primary text-primary-foreground hover:brightness-110' 
                      : 'bg-muted/40 hover:bg-muted/60'
                    }
                    ${isZero ? 'col-span-2' : ''}
                  `}
                >
                  {btn}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
