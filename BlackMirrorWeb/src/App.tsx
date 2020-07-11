import React from "react";
import Help from "./components/help/Help.tsx";
import Sets from "./components/cardSets/Sets.tsx";
import Task from "./components/Task/task.tsx";
import Menu from "./components/Menu/menu.tsx";
import Info from "./components/Info/Info.tsx";

export interface Props {}

export interface State {}

class App extends React.Component<Props, State> {
    render() {
        return (
            <>
                <Info />
            </>
        );
    }
}

export default App;
