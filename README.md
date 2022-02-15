### Install

```bash
git clone https://github.com/Salimattivenkatvinay/StackUp
cd StackUp
git checkout scaffold_stackup
yarn install
```

### Setup

You'll have three terminals up for:

`yarn chain` (hardhat backend)

`yarn start` (react app frontend)

`yarn deploy` (to compile, deploy, and publish your contracts to the frontend)

> 👀 Visit your frontend at http://localhost:3000

> 👩‍💻 Rerun `yarn deploy --reset` whenever you want to deploy new contracts to the frontend.

> ignore any warnings, we'll get to that...

### Contract Details

1. YourToken.sol - Contract which deploys our stackup token
2. Vendor.sol - Vendor who maintains our token,  where you can buy and sell our tokens
3. LoanPool.sol - Contract for pool creation, subscribe, bid, addInstallment, depositCollateral, ClaimWinnings etc related to our Pool Service
4. Positions.sol - Contract to trade your pool positions

