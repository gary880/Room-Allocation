import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInputButton from '@/components/CustomInputButton';

describe('CustomInputButton', () => {
    it('renders the button with the correct sign +', () => {
        render(<CustomInputButton onClick={() => {}} sign="+" />);
        expect(screen.getByRole('button')).toHaveTextContent('+');
    });
    it('renders the button with the correct sign -', () => {
        render(<CustomInputButton onClick={() => {}} sign="-" />);
        expect(screen.getByRole('button')).toHaveTextContent('-');
    });
    it('calls onClick function when clicked', () => {
        const handleClick = jest.fn();
        render(<CustomInputButton onClick={handleClick} sign="+" />);
        const button = screen.getByRole('button');

        fireEvent.mouseDown(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick function when disabled', () => {
        const handleClick = jest.fn();
        render(<CustomInputButton onClick={handleClick} sign="+" disabled />);
        const button = screen.getByRole('button');

        fireEvent.mouseDown(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('calls onClick repeatedly when pressed and held', async () => {
        jest.useFakeTimers();
        const handleClick = jest.fn();
        render(<CustomInputButton onClick={handleClick} sign="+" />);
        const button = screen.getByRole('button');

        fireEvent.mouseDown(button);
        jest.advanceTimersByTime(900); // 3 intervals of 300ms each

        expect(handleClick).toHaveBeenCalledTimes(4); // Initial click + 3 intervals

        fireEvent.mouseUp(button);
        jest.advanceTimersByTime(300); // Extra interval to ensure it stops

        expect(handleClick).toHaveBeenCalledTimes(4);

        jest.useRealTimers();
    });

    it('stops calling onClick when mouse leaves the button', async () => {
        jest.useFakeTimers();
        const handleClick = jest.fn();
        render(<CustomInputButton onClick={handleClick} sign="+" />);
        const button = screen.getByRole('button');

        fireEvent.mouseDown(button);
        jest.advanceTimersByTime(600); // 2 intervals of 300ms each

        fireEvent.mouseLeave(button);
        jest.advanceTimersByTime(600); // Ensure no more intervals are called

        expect(handleClick).toHaveBeenCalledTimes(3); // Initial click + 2 intervals

        jest.useRealTimers();
    });
});
