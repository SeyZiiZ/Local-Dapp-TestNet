# Local-Dapp-TestNet

## 🚀 Overview

Local-Dapp-TestNet is a lightweight decentralized application built with Solidity and powered by Hardhat. It is designed to test smart contracts in a local blockchain environment. The application integrates seamlessly with MetaMask and supports multiple local wallets, offering a smooth development and testing workflow. It also includes an administration panel, GPT wrapper and other features.

## Principal features 
- **Modern Interface**
- **Smart contracts**
- **Admin Panel**
- **Integration With Metamask**
- **Faucet Generator**
- **GPT Integration**

## ⚙️ Technologies used

- **Solidity** : Programming language for smart contracts.
- **Hardhat** : Ethereum development environment.
- **MetaMask** : Ethereum wallet for interacting with DApps.
- **ReactJS** : Framework for user interface development.
- **NestJS** : Framework for backend development

## 📂 Project structure

- `backend/` : Feature integration
- `frontend/` : User interface for interacting with contracts.
- `.gitignore` : Files and folders to be ignored by Git.
- `README.MD`: Project documentation.

## 🛠️ Installation and use

### Docker: 
#### Run the following command on both folders

```bash
docker-compose up --build
```

#### If the front end doesn't want to build, simply run 
```bash
npm run dev
```

# Warning !
## Smart contracts have been placed in the front end folder for development ease. Put it in the backend folder for real deployment and security