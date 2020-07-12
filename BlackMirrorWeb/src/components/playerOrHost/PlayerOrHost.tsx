import React, { useState } from "react";
import "./playerorhost.css";
import PhSVG from "./svg.tsx";
import loadWeb3 from "../../web3.ts";
import Box from "3box";

declare global {
    interface Window {
        box: any;
        accounts: any;
    }
}
export default function PlayerOrHost({ change }) {
    const [value, changeValue] = useState("Type your name");
    const [boxSyncDone, setBoxSyncDone] = React.useState(false);
    const [boxWrites, setBoxWrites] = React.useState([]);

    async function openBox() {
        window.ethereum
            .enable()
            .then(async () => {
                const ipfs = await Box.getIPFS();
                console.log(ipfs);
                window.box.auth([], {
                    address: window.accounts[0],
                    provider: window.ethereum,
                });
                window.box.onSyncDone(async () => {
                    setBoxSyncDone(true);
                    await writeToBox();
                });
            })
            .catch(console.error);
    }

    async function writeToBox() {
        window.box.public
            .set("name", value)
            .then(() => {
                console.log("success");
                change("profile");
            })
            .catch(console.error);
    }

    const onclick = async () => {
        if (value != "") {
            const web3 = await loadWeb3();
            const accounts = await web3.eth.getAccounts();
            window.accounts = accounts;
            Box.create().then(async (box) => {
                console.log(box);
                window.box = box;
                await openBox();
            });
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
