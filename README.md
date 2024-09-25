# SwapFee DApp - Pay Gas Fees with Custom Tokens on IOTA

## Introduction

Welcome to **SwapFee**, a groundbreaking decentralized application (DApp) that aims to eliminate barriers to entry in the IOTA ecosystem. One of the most significant challenges for new users in blockchain ecosystems is the need to acquire native tokens to pay for transaction fees (gas fees). This process can be cumbersome and discouraging, hindering widespread adoption.

**SwapFee** changes the game by allowing users to pay gas fees using custom tokens instead of the native IOTA token. By leveraging IOTA's advanced features such as **Sponsored Transactions** and **Programmable Transactions**, SwapFee provides a seamless and user-friendly experience. This innovation simplifies onboarding for new users and accelerates the growth of decentralized applications on the IOTA network.

We are proud to be pioneers in offering this kind of service on IOTA, inspired by similar concepts in other ecosystems but tailored to the unique capabilities of IOTA. Our goal is to make interactions with DApps more accessible, removing friction and encouraging broader participation in the IOTA community.

---

## Motivation

In the blockchain world, user experience is paramount. Complexities such as acquiring native tokens for gas fees can deter potential users. By enabling gas payments with custom tokens, we lower the entry barriers and make the IOTA ecosystem more inviting.

**SwapFee** allows users to:

- Use their existing custom tokens to pay for gas fees.
- Avoid the need to acquire IOTA tokens solely for transaction fees.
- Enjoy a smoother and more intuitive experience when interacting with DApps.

This approach not only benefits users but also fosters innovation and adoption within the IOTA ecosystem.

---

## Features

- **Dynamic Gas Payment with Custom Tokens**: Pay gas fees using whitelisted custom tokens, eliminating the need for IOTA tokens.
- **User-Friendly Interface**: An intuitive UI that guides users through each step of the process.
- **Token Whitelisting**: Support for specific custom tokens added to a whitelist, ensuring security and compatibility.
- **Seamless Transactions**: Utilizes IOTA's Sponsored Transactions and Programmable Transactions to abstract complexity.

---

## Getting Started

### Prerequisites

- **Node.js** and **pnpm** installed on your system.
- An IOTA wallet compatible with the DApp.
- Custom tokens in your wallet that are whitelisted in the application.

### Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/swapfee.git
   cd swapfee
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Set Up the IOTA Environment**

   Ensure you have the necessary IOTA environment configurations. This may involve setting environment variables or installing additional IOTA SDKs.

4. **Configure the Service Address**

   In the `App.tsx` file, locate the `serviceAddress` variable and replace it with your service's address where users will send custom tokens for gas fees.

   ```typescript
   // App.tsx
   const serviceAddress = 'YOUR_SERVICE_ADDRESS'; // Replace with your service's address
   ```

5. **Whitelist Custom Tokens**

   Add the coin types of the custom tokens you wish to support to the `whitelistedCoinTypes.ts` file.

   ```typescript
   // src/utils/whitelistedCoinTypes.ts
   export const whitelistedCoinTypes = [
     '0x1::your_custom_token::TOKEN',
     // Add other coin types as needed
   ];
   ```

6. **Configure Gas Fee Conversion**

   Adjust the gas fee calculation logic in `calculateDynamicGasFee.ts` to define how custom tokens are converted to the equivalent gas fee in IOTA. For this initial version, the conversion will be static.

   ```typescript
   // src/utils/calculateDynamicGasFee.ts
   export const calculateDynamicGasFee = (token: Token): bigint => {
     // Put your conversion rate
     return BigInt(100); // Example static fee in terms of the custom token
   };
   ```

---

### Running the Application

1. **Build the Project**

   ```bash
   pnpm run build
   ```

2. **Start the Development Server**

   ```bash
   pnpm run start
   ```

3. **Access the DApp**

   Open your web browser and navigate to `http://localhost:3000` to interact with SwapFee.

---

## Video Demo PoC 

Watch a full demonstration of the SwapFee DApp in action:

[![SwapFee DApp Demo](https://st.depositphotos.com/1907633/4936/i/380/depositphotos_49367797-stock-photo-hand-press-play-button-sign.jpg)](https://www.youtube.com/watch?v=yjeIL4L9lGI)

---
## Usage Guide

1. **Connect Your Wallet**

   Click on the **"Connect Wallet"** button and follow the prompts to connect your IOTA wallet to the DApp.

2. **Select a Token for Gas Payment**

   - The DApp will display a list of your custom tokens that are whitelisted.
   - Select the token you wish to use to pay for gas fees.
   - The required gas fee amount in terms of the selected token will be calculated.

3. **Proceed with Service Payment**

   - Confirm the gas fee payment.
   - The DApp will facilitate a transaction where you pay the gas fee to the service address using your custom token.

4. **Specify Main Transaction Details**

   - Choose the token you want to send (from your available tokens).
   - Enter the recipient's IOTA address.
   - Specify the amount to send.

5. **Review and Confirm Transactions**

   - Review the details of the gas fee payment and the main transaction.
   - Ensure all information is correct before proceeding.

6. **Sign and Execute Transactions**

   - Use your wallet to sign and authorize the transactions.
   - The DApp will handle the execution of both the gas fee payment and the main transaction.

7. **Transaction Completion**

   - Upon successful execution, a confirmation message will be displayed.
   - Your token balances will be updated accordingly.

8. **Perform Additional Actions or Disconnect**

   - You can choose to perform another action or disconnect your wallet.

---

## Technical Details

- **Sponsored Transactions**: SwapFee uses IOTA's Sponsored Transactions to allow users to pay gas fees with custom tokens.
- **Programmable Transactions**: Leveraging Programmable Transactions to facilitate complex transaction flows in a seamless manner.
- **Token Whitelisting**: Only tokens specified in the `whitelistedCoinTypes.ts` file are allowed for gas payments to ensure security and prevent misuse.
- **Static Gas Fee Conversion**: Currently, the gas fee conversion is static, but it can be extended to dynamic calculations based on real-time exchange rates or other logic.

---

## Future Enhancements

- **Dynamic Gas Fee Conversion**: Implement real-time conversion rates between custom tokens and IOTA for more accurate gas fee calculations.
- **Enhanced Token Support**: Expand the whitelist to support more custom tokens, subject to security considerations.
- **Improved User Experience**: Continuously refine the UI/UX to make the DApp even more intuitive and user-friendly.

---

## Contribution Guidelines

We welcome contributions from the community. If you're interested in contributing to SwapFee, please follow these steps:

1. **Fork the Repository**: Create a personal fork of the repository on GitHub.
2. **Create a Feature Branch**: Develop your feature or fix in a new branch.
3. **Submit a Pull Request**: Once your changes are ready, submit a pull request for review.

Please ensure that your code adheres to the project's coding standards and includes appropriate documentation.

---

## Author

Developed by **Silvio Meneguzzo** , Giulia Matricardi , Marco Di Ianni

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

We would like to acknowledge the inspiration drawn from similar initiatives in other ecosystems, such as the Dynamic Gas feature from Aftermath in the Sui ecosystem. By adapting these innovative ideas to the IOTA network, we aim to enhance user experience and drive adoption.

---

## Conclusion

**SwapFee** represents a significant step forward in making the IOTA ecosystem more accessible and user-friendly. By removing the necessity to acquire native IOTA tokens for gas fees, we simplify the onboarding process and encourage broader participation in decentralized applications. We believe that this service is essential for the growth and success of the IOTA network, and we are excited to be pioneers in this space.

---

**Note**: Ensure that you replace placeholder texts like `YOUR_SERVICE_ADDRESS` and `your_custom_token` with actual values relevant to your setup.

---

## Additional DApp: Transact with Gas Donor

As a fun and instructive project, we've also developed another small DApp called Transact with Gas Donor, located in the **Transact_with_gas_donor/** folder of this repository.

What It Does
Transact with Gas Donor is a graphical interface that allows users to send transactions on the IOTA network where a donor account covers the gas fees. This enables the sender to transfer an object without incurring any gas costs directly. The DApp supports any transaction involving an identifiable object (Object ID) and provides a minimal, user-friendly interface.

Why We Created It
This project was created as a tutorial and exploratory exercise to understand and demonstrate how gas donation can be implemented in IOTA transactions. It serves as an educational tool and a proof of concept for alternative gas payment mechanisms. Don't use sponsor transaction in reality but it was an instructive project for us, just to practice with IOTA command line and integration.

---

## Additional Development (PLUS)
## Future Work: Dynamic Gas Integration Scripts

We've developed Python scripts to enhance **SwapFee** with dynamic and automated functionalities. These scripts are located in the `future_work/` folder of this repository.

### Purpose

The scripts aim to:

- **Fetch Coins**: Retrieve all coins held by a specific IOTA address.
- **Blacklist Filtering**: Exclude any coins on a predefined blacklist.
- **Update Whitelisted Coins**: Automatically update `whiteListedCoinTypes.ts` with valid coins.
- **Manage Exchange Rates**: Ensure all coins have exchange rates, prompting for any missing values.

This foundation prepares **SwapFee** for:

- **Dynamic Gas Fee Calculations**: Implementing real-time exchange rates.
- **Automated Token Support**: Simplifying the addition of new tokens.
- **Enhanced Security**: Maintaining integrity by filtering out blacklisted coins.

To run or try these scripts, please navigate to the `future_work/` folder and read the included README.

---
