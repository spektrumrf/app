
# Spektrum App

## Set up Expo

(Node installed e.g. `curl -L https://git.io/n-install | bash`)

```
npm install -g expo-cli
```

## Run

```
expo start
```

## Optimize assets

```
npx expo-optimize
```

## New packages

```
expo install <package>
```

Trouble?

```
rm -r node_modules
npm install expo
expo install
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

## Deploy Cloud Functions

```
cd functions
npm i
firebase deploy --only functions
```