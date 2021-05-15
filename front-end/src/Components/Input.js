import React, {useState} from "react";

export default function Input() {

    const [tokenName, setTokenName] = useState("Token Name");
    const [symbol, setSymbol] = useState("Token Symbol");
    const [decimals, setDecimals] = useState("Decimals");
    const [totalSupply, setTotalSupply] = useState("Total Supply");

    function clearName() {
        setTokenName("");
    }

    function sendInfo () {
        console.log(tokenName);
        console.log(symbol);
        console.log(decimals);
        console.log(totalSupply);

        fetch('http://localhost:3010/api?tokenName=' + tokenName + '&symbol=' + symbol + "&decimals=" + decimals + "&totalSupply=" + totalSupply)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }

    return (
        <>
        <div Style="margin-left:15px">
            <h2>Token Name</h2>
            <input type="text"
                    value={tokenName}
                    onClick={() => clearName()}
                    onChange={e => setTokenName(e.target.value)}
            />

            <br />
            <br />

            <h2>Symbol</h2>
            <input type="text"
                    value={symbol}
                    onClick={() => clearName()}
                    onChange={e => setSymbol(e.target.value)}
            />

            <br />
            <br />

            <h2>Decimal</h2>
            <input type="text"
                    value={decimals}
                    onClick={() => clearName()}
                    onChange={e => setDecimals(e.target.value)}
            />

            <br />
            <br />

            <h2>Total Supply</h2>
            <input type="text"
                    value={totalSupply}
                    onClick={() => clearName()}
                    onChange={e => setTotalSupply(e.target.value)}
            />

            <br />
            <br />

            <button onClick={() => sendInfo()} >
                Submit 
            </button>
            <br />
        </div>
        </>
    )
}