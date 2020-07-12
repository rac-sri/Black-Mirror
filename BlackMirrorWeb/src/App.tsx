import React from "react";
import Start from "./components/start/Start.tsx";

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
    render() {
        return (
            <>
                <Start />
            </>
        );
    }
}

export default App;
