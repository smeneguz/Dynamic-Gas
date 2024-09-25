# Swapp Fee Interaction - IOTA Gas Sponsoring UI

**Swapp Fee Interaction** is a simple graphical interface developed to facilitate **free gas sponsoring** on the **IOTA** platform. With this application, you can send transactions on IOTA with an identifiable object without having to pay the gas fees yourself, as a sponsor account will cover the costs for you.

## Key Features

- **Free gas sponsoring**: Allows a sponsor account to pay the gas fees for a transaction so that the recipient doesn’t have to worry about the costs.
- **Works with any transaction**: You can initiate any transaction that involves an object with an identifier (Object ID). The only requirement is to provide the ID of the object being transferred.
- **Easy to use**: The interface requires minimal data and removes the need for command-line interaction. Users can initiate transactions without directly interacting with the CLI.

## How It Works

The application allows you to enter the following information:
- **Sender Address**: The account address that will send the IOTA object.
- **Sponsor Address**: The sponsor account address that will cover the gas costs.
- **Sponsor IOTA Object ID**: The IOTA object used by the sponsor to pay for the gas.
- **Destination Address**: The address of the transaction recipient.
- **Object ID To Transfer**: The ID of the object that will be transferred.

## Limitations

Currently, the application has some limitations:

1. **The owner must be the owner of all accounts**: The sender, sponsor, and recipient accounts must all be owned by the person using the application. This is because the account switching functionality (necessary for managing gas payments) requires access to all involved accounts. If the owner doesn’t have control of all these accounts, the switching between accounts won’t work correctly.

2. **Sponsoring is completely free**: The sponsor will cover the gas fees without receiving any payment or compensation from the sender or recipient. The interface does not currently handle payments or mechanisms to reimburse the sponsor.

## Benefits

Despite its limitations, the application offers several advantages:

- **Ease of use**: With its simple user interface, it’s easy to initiate a transaction. Users only need to input a few details, and there’s no need to interact with the command line.

- **Compatible with any transaction**: As long as the transaction involves an object with an identifier (Object ID), the application can be used to sponsor the gas for that transaction.

## Getting Started

1. Clone this repository from GitHub.
2. Make sure you have Node.js and Angular CLI installed.
3. Install the project dependencies:
    ```bash
    npm install
    ```
4. Run the project locally:
    ```bash
    ng serve
    ```
5. Open the application in your browser at `http://localhost:4200`.

## Conclusion

This application is designed to simplify the process of sending transactions on IOTA by allowing a sponsor to cover the gas fees. While it requires the owner to have control over all involved accounts, it offers a straightforward and command-line-free way to send transactions.

