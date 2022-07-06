# UoA Admin Bot Module

This module houses the API used by my UoA Admin bot.

To set up your own version of this module, follow [this guide](https://firebase.google.com/docs/admin/setup?authuser=0#add-sdk) alongside the steps below.

1. Firebase Setup

    1. Make a Firebase project and generate a private key for a service account.
    2. Put this key in the Firebase folder as [serviceAccountKey.json](./Firebase/serviceAccountKey.json).
    3. Make sure you put the database URL shown into the root [config.json](../../../config.json) file.

2. Discord Bot Setup
    1. Make a new Discord bot application with the following details:
        - Scopes: `bot`, `appplications.commands`
        - Permissions: `Manage Roles`, `Kick Members`, `Ban Members`, `Read Messages/View Channels`, `Moderate Members`, `Send Messages`, `Create Public Threads`, `Create Private Threads`, `Send Messages in Threads`, `Embed Links`, `Read Message History`
