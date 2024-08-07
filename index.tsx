import React from "react";
import { createRoot } from "react-dom/client";
import { useEventCallback } from "react-workbench/hooks";
import { setTimer } from "ts-workbench/timer";

const App = () => {
    const onClick = useEventCallback(() => {
        setTimer(
            () => {
                console.log("hi");
            },
            1000,
            3000,
        );
    });

    return (
        <div>
            <button onClick={onClick}>Click!</button>
        </div>
    );
};

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
} else {
    console.log("root element not found");
}
