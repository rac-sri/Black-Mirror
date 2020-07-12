import React, { useState } from "react";
import "./start.css";

import Help from "../help/Help.tsx";
import Sets from "../cardSets/Sets.tsx";
import Task from "../Task/task.tsx";
import Menu from "../Menu/menu.tsx";
import Info from "../Info/Info.tsx";
import StartContent from "./startContent.tsx";
import YourRole from "../yourRole/YourRole.tsx";
import Role from "../role/Role.tsx";
import PlayerOrHost from "../playerOrHost/PlayerOrHost.tsx";
import Profile from "../profile/profile.tsx";

export default function Start() {
    const [component, changeComponent] = useState("StartContent");
    return (
        <>
            {component === "StartContent" && (
                <StartContent change={changeComponent} />
            )}
            {component === "playerorhost" && (
                <PlayerOrHost change={changeComponent} />
            )}
            {component === "profile" && <Profile />}
        </>
    );
}
