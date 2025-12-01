import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type ConversionId = 'storyToHours' | 'hoursToStory' | 'usdToTnd' | 'usdToEur';

const conversionConfigs: Record<
  ConversionId,
  {
    label: string;
    inputLabel: string;
    outputLabel: string;
    helper: string;
    convert: (value: number, rates: FxRates) => number | null;
    suffix?: string;
  }
> = {
  storyToHours: {
    label: 'Story Points → Hours',
    inputLabel: 'Story Points',
    outputLabel: 'Estimated Hours',
    helper: 'Assumes a 4h average per point (team velocity metric).',
    convert: (value) => value * 4,
    suffix: 'h',
  },
  hoursToStory: {
    label: 'Hours → Story Points',
    inputLabel: 'Hours',
    outputLabel: 'Approx. Story Points',
    helper: 'Great for rough-planning tasks from timeboxes.',
    convert: (value) => value / 4,
    suffix: 'pts',
  },
  usdToTnd: {
    label: 'USD → TND',
    inputLabel: 'USD',
    outputLabel: 'Tunisian Dinar',
    helper: 'Live rate sourced from exchangerate.host (fallback 3.10).',
    convert: (value, rates) => {
      const rate = rates.usdTnd ?? 3.1;
      return value * rate;
    },
  },
  usdToEur: {
    label: 'USD → EUR',
    inputLabel: 'USD',
    outputLabel: 'Euro',
    helper: 'Tech travel budget sanity check (fallback 0.92).',
    convert: (value, rates) => {
      const rate = rates.usdEur ?? 0.92;
      return value * rate;
    },
  },
};

interface FxRates {
  usdTnd: number | null;
  usdEur: number | null;
  updatedAt: string | null;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [conversionInput, setConversionInput] = useState('1');
  const [conversionMode, setConversionMode] = useState<ConversionId>('storyToHours');
  const [rates, setRates] = useState<FxRates>({
    usdTnd: null,
    usdEur: null,
    updatedAt: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=TND,EUR');
        if (!response.ok) throw new Error('Failed to fetch exchange rates');
        const data = await response.json();
        if (!isMounted) return;
        setRates({
          usdTnd: data.rates?.TND ?? null,
          usdEur: data.rates?.EUR ?? null,
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.warn('Exchange rate fetch failed, using fallback values.', error);
      }
    };
    fetchRates();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const selectedConversion = conversionConfigs[conversionMode];
  const conversionResult = useMemo(() => {
    const numericValue = parseFloat(conversionInput);
    if (Number.isNaN(numericValue)) return '—';
    const value = selectedConversion.convert(numericValue, rates);
    if (value === null || Number.isNaN(value)) return '—';
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    });
    return `${formatter.format(value)}${selectedConversion.suffix ? ` ${selectedConversion.suffix}` : ''}`;
  }, [conversionInput, conversionMode, rates, selectedConversion]);

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

      {/* Conversion Helpers */}
      <div className="mt-6 space-y-4 bg-muted/20 rounded-2xl p-4 border border-border/30">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="font-semibold text-sm text-foreground/90">Quick conversions</p>
            <p className="text-xs text-muted-foreground">Bring numbers into context instantly.</p>
          </div>
          <select
            className="rounded-lg border border-border/40 bg-background px-3 py-1.5 text-sm"
            value={conversionMode}
            onChange={(e) => setConversionMode(e.target.value as ConversionId)}
          >
            {Object.entries(conversionConfigs).map(([id, config]) => (
              <option key={id} value={id}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wide text-muted-foreground">
            {selectedConversion.inputLabel}
          </label>
          <input
            type="number"
            className="w-full rounded-xl border border-border/30 bg-background px-4 py-2.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={conversionInput}
            onChange={(e) => setConversionInput(e.target.value)}
            min="0"
          />
          <div className="rounded-xl bg-background px-4 py-3 flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {selectedConversion.outputLabel}
            </div>
            <div className="text-2xl font-semibold">{conversionResult}</div>
          </div>
          <p className="text-xs text-muted-foreground">
            {selectedConversion.helper}
            {selectedConversion.label.includes('USD') && rates.updatedAt && (
              <> • Updated {new Date(rates.updatedAt).toLocaleTimeString()}</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
