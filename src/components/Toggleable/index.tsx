import React, { useRef } from 'react';
import { useDerivedState, useEventCallback } from 'react-workbench/hooks';

type ToggleableRenderProp = (state: boolean) => React.ReactNode;

export type ToggleableProps = {
    state?: boolean;
    /*
     * true -> toggle UI first, then run `onPress`, if result of `onPress` is `false` or `Promise<false>, reset the UI to original state
     * false -> run `onPress` first, if result of `onPress` is `true` or `Promise<true>`, toggle the UI.
     *
     * Default to `true`
     */
    optimistic?: boolean;
    /*
     * When optimistic, switch will be toggled first, if `onPress` returns "not true" value or `Promise<not true>`, reset the UI to original state.
     * When not optimistic, if `onPress` returns `true` or `Promise<true>`, toggle the UI.
     */
    onClick?: (
        nextState: boolean,
        currentState: boolean,
    ) => void | null | undefined | boolean | Promise<void | null | undefined | boolean>;
    disabled?: boolean;
    children: ToggleableRenderProp | React.ReactNode;
    // TODO:
    // debounceTime: number;
};

export const Toggleable = (props: ToggleableProps) => {
    const { state = false, optimistic = true, disabled = false, children, onClick } = props;
    const [derivedState, setDerivedState] = useDerivedState(() => state, [state]);

    const isWaitingRef = useRef(false);
    const onToggle = useEventCallback(() => {
        if (isWaitingRef.current) return;

        const result = onClick?.(!derivedState, derivedState);
        isWaitingRef.current = true;

        if (optimistic) {
            setDerivedState(current => !current);

            if (result instanceof Promise) {
                result
                    .then(v => {
                        if (v !== true) {
                            setDerivedState(current => !current);
                        }
                    })
                    .catch(() => {
                        setDerivedState(current => !current);
                    })
                    .finally(() => {
                        isWaitingRef.current = false;
                    });
            } else {
                isWaitingRef.current = false;
                if (result !== true) {
                    setDerivedState(current => !current);
                }
            }
        } else {
            if (result instanceof Promise) {
                result
                    .then(v => {
                        if (v === true) {
                            setDerivedState(current => !current);
                        }
                    })
                    .finally(() => {
                        isWaitingRef.current = false;
                    });
            } else {
                isWaitingRef.current = false;
                if (result === true) {
                    setDerivedState(current => !current);
                }
            }
        }
    });

    return (
        <div className={`contents ${disabled ? 'pointer-events-none' : ''}`} onClick={onToggle}>
            {typeof children === 'function' ? children(derivedState) : children}
        </div>
    );
};
