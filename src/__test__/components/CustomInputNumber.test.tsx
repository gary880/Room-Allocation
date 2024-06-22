import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInputNumber from '@/components/CustomInputNumber';

describe('CustomInputNumber', () => {
    const setup = (props = {}) => {
        const initialProps = {
            min: 0,
            max: 10,
            step: 1,
            name: 'test-input',
            value: 5,
            onChange: jest.fn(),
            onBlur: jest.fn(),
            ...props,
        };

        const utils = render(<CustomInputNumber {...initialProps} />);
        const input = screen.getByRole('spinbutton');
        const incrementButton = screen.getByRole('button', { name: '+' });
        const decrementButton = screen.getByRole('button', { name: '-' });

        return {
            ...utils,
            input,
            incrementButton,
            decrementButton,
            initialProps,
        };
    };

    it('renders with the correct initial value', () => {
        const { input } = setup();
        expect(input).toHaveValue(5);
    });


    it('disables decrement button when value is at min', () => {
        const { decrementButton } = setup({ value: 0 });
        expect(decrementButton).toBeDisabled();
    });

    it('disables increment button when value is at max', () => {
        const { incrementButton } = setup({ value: 10 });
        expect(incrementButton).toBeDisabled();
    });

    it('updates the value when typed into the input', () => {
        const { input, initialProps } = setup();
        fireEvent.change(input, { target: { value: '7' } });
        expect(initialProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
            target: expect.objectContaining({
                value: '7',
                name: 'test-input',
            }),
        }));
    });

    it('calls onBlur when input loses focus', () => {
        const { input, initialProps } = setup();
        fireEvent.blur(input);
        expect(initialProps.onBlur).toHaveBeenCalled();
    });
});

