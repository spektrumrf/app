
# Spektrum App

[![](https://img.shields.io/badge/Version-1.0-blue)](https://github.com/spektrumrf/app/releases)
[![](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Set up Expo

(Node installed e.g. `curl -L https://git.io/n-install | bash`)

```
npm install -g expo-cli
```

## Secrets

Request access to

https://bit.ly/spektrum-app-dev

## Run

```
expo start
```

## New packages

```
expo install <package>
```

## Publish

```
expo build:android -t app-bundle
expo upload:android
```

### Platform of Choice

React Native is a cross-platform mobile framework, however the annual fee for an Apple developer account is 99$ whereas Android has a one time fee of 25$. For as long as Finland is not on [the list of eligible countires](https://developer.apple.com/support/membership-fee-waiver/) for a possibility of waiving the fee the app remains Android-only.

## Cloud Functions

Connecting to Google Calendar requires a OAuth handshake, a service account is set up for this purpose. A Cloud Function on Firebase accessible via Google Cloud Console use the credentials for this account to access the desired Spektrum Google Calendar. In depth information can be found in the document in [the Secrets part](##Secrets).

Any backend stuff that needs Node.js (in this case the `googleapis` library) can be implemented as a Cloud Function.

### Develop

```
cd functions
npm i
```

### Deploy

```
firebase deploy --only functions
```

## Extra

### Optimize assets

```
npx expo-optimize
```
