'use client';

import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import styled from 'styled-components';
import { TransientProps } from 'ts-workbench/types';

// Components
import { Clickable } from '../Clickable';

export type ButtonProps = {
    children: React.ReactNode;
    prefix?: React.ReactNode;
    disabled?: boolean;
} & Partial<Pick<ButtonWrapperProps, 'type' | 'size'>> &
    Pick<React.HTMLAttributes<React.ElementRef<'div'>>, 'className' | 'onClick'>;

export const Button = (props: ButtonProps) => {
    const { children, prefix, size = 'large', type = 'primary', disabled = false, className, onClick } = props;

    const handleClick = useDebouncedCallback(event => onClick && onClick(event), 500, {
        leading: true,
        trailing: false,
    });

    return (
        <Clickable disabled={disabled}>
            {state => {
                return (
                    <ButtonWrapper $type={type} $size={size} $state={state} className={className} onClick={handleClick}>
                        {prefix && <div className="mr-[8px] h-[24px] w-[24px]">{prefix}</div>}
                        {children}
                    </ButtonWrapper>
                );
            }}
        </Clickable>
    );
};

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'primary' | 'secondary' | 'negative-primary' | 'negative-secondary';
export type ButtonState = 'normal' | 'active' | 'disabled';
export type ButtonWrapperProps = {
    type: ButtonType;
    size: ButtonSize;
    state: ButtonState;
};

const ButtonWrapper = styled.div<TransientProps<ButtonWrapperProps>>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme, $size }) => {
        return theme.elements.button.padding[$size];
    }};
    background-color: ${({ theme, $type, $state }) => {
        return theme.elements.button.backgroundColor[$type][$state];
    }};
    color: ${({ theme, $type, $state }) => {
        return theme.elements.button.color[$type][$state];
    }};
    border-radius: ${({ theme, $size: size }) => {
        return theme.elements.button.borderRadius[size];
    }};
    ${({ theme, $size: size }) => {
        return theme.elements.button.typography[size];
    }}
    transition:
        background-color 0.125s ease-in-out,
        color 0.125s ease-in-out;
`;
