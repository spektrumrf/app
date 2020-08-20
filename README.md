
# Spektrum App

[![](https://img.shields.io/badge/Version-1.0-blue)](https://github.com/spektrumrf/app/releases)
[![](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Set up Expo

(Node installed e.g. `curl -L https://git.io/n-install | bash`)

```
npm install -g expo-cli
```

## Run

```
expo start
```

## New packages

```
expo install <package>
```

## Optimize assets

```
npx expo-optimize
```

## Calendar API Setup

- Google Cloud Platform > APIs & Services > Credentials > Create Oauth Client ID
- Authorized redirect URIs: https://developers.google.com/oauthplayground
- Save Oath Client ID > `credentials.json`
- Visit https://developers.google.com/oauthplayground
    1. Use your own OAuth credentials
    2. Set scope for Calendar API v3 (events.readonly) and press Authorize APIs
    3. Exchange authorization code for tokens
    4. Place refresh-token in `credentials.json`

To access the API we can use the Node library `googleapis`. Cloud functions are used for that purpose ...

### Deploy Cloud Functions

```
cd functions
npm i
firebase deploy --only functions
```