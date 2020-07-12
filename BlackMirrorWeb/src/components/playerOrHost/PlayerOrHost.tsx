import React, { useState } from "react";
import "./playerorhost.css";
import PhSVG from "./svg.tsx";

export default function PlayerOrHost() {
    const [value, changeValue] = useState("Enter Your Name");
    return (
        <div id="Web_1920__3">
            <PhSVG />
            <input
                id="Enter_Your_Name"
                value={value}
                onChange={(e) => changeValue(e.target.value)}
            ></input>
            <div id="By_clicking_Join_you_have_read">
                <span>By clicking “Join”, you have read and agree to the </span>
                <span
                    style={{
                        color: "rgba(91,191,227,1)",
                        textDecoration: "underline",
                    }}
                >
                    Terms of Service
                </span>
                <span> and </span>
                <span
                    style={{
                        color: "rgba(91,191,227,1)",
                        textDecoration: "underline",
                    }}
                >
                    Privacy Policy
                </span>
            </div>
            <div id="Are_you_a_PLAYER_or_a_HOST">
                <span>Are you a </span>
                <span
                    style={{
                        color: "rgba(91,191,227,1)",
                        textDecoration: "underline",
                    }}
                >
                    PLAYER
                </span>
                <span> or a </span>
                <span
                    style={{
                        color: "rgba(91,191,227,1)",
                        textDecoration: "underline",
                    }}
                >
                    HOST
                </span>
                <span>?</span>
            </div>
        </div>
    );
}
