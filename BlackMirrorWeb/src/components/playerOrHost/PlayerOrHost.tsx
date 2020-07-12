import React, { useState } from "react";
import "./playerorhost.css";
import PhSVG from "./svg.tsx";
import loadWeb3 from "../../web3.ts";
import Box from "3box";

export default function PlayerOrHost({ change }) {
    const [value, changeValue] = useState("Enter Your Name");
    const onclick = async () => {
        if (value != "") {
            const web3 = await loadWeb3();
            const accounts = await web3.eth.getAccounts();
            // const profile = await Box.getProfile(accounts[0]);
            const box = await Box.openBox(
                accounts[0],
                window.ethereum || window.web3.currentProvider
            );
            await box.syncDone;
            // const respose = await box.public.set("name", "oed");
            // console.log(respose);
        }
    };
    return (
        <div id="Web_1920__3">
            <PhSVG />
            <input
                id="Enter_Your_Name"
                value={value}
                onChange={(e) => changeValue(e.target.value)}
                onClick={() => changeValue("")}
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
            <button className="rectangle_400" onClick={onclick}>
                Join Now
            </button>
        </div>
    );
}
