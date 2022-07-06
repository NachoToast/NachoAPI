# Nacho API [![Node.js CI](https://github.com/NachoToast/NachoAPI/actions/workflows/node.js.yml/badge.svg)](https://github.com/NachoToast/NachoAPI/actions/workflows/node.js.yml)[![CodeQL](https://github.com/NachoToast/NachoAPI/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/NachoToast/NachoAPI/actions/workflows/codeql-analysis.yml)[![Deploy](https://github.com/NachoToast/NachoAPI/actions/workflows/deploy.yml/badge.svg)](https://github.com/NachoToast/NachoAPI/actions/workflows/deploy.yml)

General use API for NachoToast-related services.

# Installation

If you want to setup your own version of this API, follow these steps:

```sh
git clone https://github.com/NachoToast/NachoAPI.git
cd NachoAPI/
cp config.example.json config.json
touch serviceAccountKey.json
yarn # or npm install
```

Then, follow these steps to set up a Firebase realtime database:

1. Make a [Firebase project](https://console.firebase.google.com/u/0/) and generate a private key for a service account (in Project settings > Service accounts).
2. Copy this key into the root level [serviceAccountKey.json](./serviceAccountKey.json) file.
3. Make sure you put the database URL shown into the root [config.json](../../../config.json) file.

Finally, fill out the fields in [config.json](./config.json) with their appropriate values (see [Config.ts](./src/@types/Config.ts) for more in-depth explanations of what each value should be). You can disable specific modules if you don't require them.
