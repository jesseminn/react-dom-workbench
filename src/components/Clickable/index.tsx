import React, { useState } from 'react';

export type ClickableRenderProp = (state: ClickableState) => React.ReactNode;

export type ClickableState = 'normal' | 'active' | 'disabled';

export type ClickableProps = {
    children: ClickableRenderProp | React.ReactNode;
    disabled?: boolean;
};

export const Clickable = (props: ClickableProps) => {
    const { children, disabled, ...restProps } = props;
    const [isClicking, setIsClicking] = useState(false);
    let state: ClickableState;
    if (disabled) {
        state = 'disabled';
    } else if (isClicking) {
        state = 'active';
    } else {
        state = 'normal';
    }

    return (
        <div
            className={`contents ${disabled ? 'pointer-events-none' : ''}`}
            {...restProps}
            onPointerDown={() => {
                setIsClicking(true);
            }}
            // fires after pointerup, pointercancel
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event
            // pointerup or pointerout?
            onPointerUp={() => {
                setIsClicking(false);
            }}
        >
            {typeof children === 'function' ? children(state) : children}
        </div>
    );
};
