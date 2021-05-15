const fs = require("fs");
const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.get('/api', (req, res) => {

  const tokenName = req.query.tokenName;
  const symbol = req.query.symbol;
  const decimals = req.query.decimals;
  const totalSupply = req.query.totalSupply;
  
  let data = { 
    Name: tokenName,
    Symbol: symbol, 
    Decimals: decimals,
    TotalSupply: totalSupply
  }
   
  //Write Token Config File
  fs.writeFile("TokenConfig.json", JSON.stringify(data), err => {  
    if (err) throw err;  
    console.log("Done writing"); 
  }) 

  //Run Truffle command on server to lanuch smart contract
  exec('truffle deploy --network ropsten', (err, stdout, stderr) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }       
    });

   res.send("success");
})

app.listen(3010, () =>
  console.log('Express server is running on localhost:3010')
);