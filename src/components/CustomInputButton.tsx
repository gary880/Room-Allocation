import React, { useState, useEffect, useRef } from 'react';

interface CustomInputButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement>) => void;
    sign: string;
    disabled?: boolean;
}

const CustomInputButton: React.FC<CustomInputButtonProps> = ({ onClick, disabled = false, sign }) => {
    const [isPressing, setIsPressing] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled) return;
        setIsPressing(true);
        onClick(event); // Trigger click immediately on press
    };

    const handleMouseUp = () => {
        setIsPressing(false);
    };

    const handleMouseLeave = () => {
        setIsPressing(false);
    };

    useEffect(() => {
        if (isPressing) {
            intervalRef.current = setInterval(() => {
                onClick(new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
            }, 300);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPressing, onClick]);

    return ( 
        <button
            className='p-1 border border-sky-400 text-sky-400 box-border w-12 h-12 rounded-lg disabled:border-stone-300 disabled:text-stone-300'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
        >
            {sign}
        </button>
    );
}

export default CustomInputButton;
