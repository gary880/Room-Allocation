import { useState, ChangeEvent, FocusEvent, memo } from 'react';
import CustomInputButton from './CustomInputButton';

interface CustomInputNumberProps {
    min: number;
    max: number;
    step: number;
    name: string;
    value: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = ({ min, max, step, name, value, onChange, onBlur, disabled }) => {
    const [inputValue, setInputValue] = useState<number>(value);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(event.target.value);
        if (newValue >= min && newValue <= max) {
            setInputValue(newValue);
            onChange({ ...event, target: { ...event.target, value: newValue.toString(), name } });
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        onBlur(event);
    };

    const handleIncrement = () => {
        if (inputValue < max) {
            const newValue = Math.min(inputValue + step, max);
            setInputValue(newValue);
            onChange({ target: { name, value: newValue.toString() } } as ChangeEvent<HTMLInputElement>);
        }
    };

    const handleDecrement = () => {
        if (inputValue > min) {
            const newValue = Math.max(inputValue - step, min);
            setInputValue(newValue);
            onChange({ target: { name, value: newValue.toString() } } as ChangeEvent<HTMLInputElement>);
        }
    };

    const isMin = inputValue <= min;
    const isMax = inputValue >= max;

    return (
        <div className="flex p-2 justify-center gap-2">
            <CustomInputButton
                onClick={handleDecrement}
                sign='-'
                disabled={disabled || isMin}
                aria-label={`Decrement ${name}`}
            />
            <input
                type='number'
                name={name}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                className='remove-arrow p-2 border box-border w-12 h-12 text-base rounded-lg text-center disabled:text-stone-300'
                aria-label={name}
            />
            <CustomInputButton
                onClick={handleIncrement}
                sign='+'
                disabled={disabled || isMax}
                aria-label={`Increment ${name}`}
            />
        </div>
    );
}

export default memo(CustomInputNumber);
