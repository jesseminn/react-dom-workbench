import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEventCallback } from 'react-workbench/hooks';
import { setTimer } from 'ts-workbench/timer';
import { Clickable } from './src/components/Clickable';

const App = () => {
    const onClick = useEventCallback(() => {
        setTimer(
            () => {
                console.log('hi');
            },
            1000,
            3000,
        );
    });

    return (
        <div>
            <Clickable>
                {state => {
                    let opacity = 1;
                    switch (state) {
                        case 'normal':
                            opacity = 1;
                            break;
                        case 'active':
                            opacity = 0.8;
                            break;
                        case 'disabled':
                            opacity = 0.5;
                            break;
                    }
                    return (
                        <div
                            onClick={onClick}
                            style={{
                                padding: 16,
                                backgroundColor: 'green',
                                color: 'white',
                                opacity,
                            }}
                        >
                            Click
                        </div>
                    );
                }}
            </Clickable>
        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.log('root element not found');
}
