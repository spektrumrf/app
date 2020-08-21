
# Spektrum App

[![](https://img.shields.io/badge/Version-1.0-blue)](https://github.com/spektrumrf/app/releases)
[![](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[<img src="https://github.com/spektrumrf/assets/raw/master/images/playstore/ic-launcher.png" width="100">](https://play.google.com/store/apps/details?id=fi.spektrum.app)

----

Android application for the Spektrum student association with a couple of handy features for members. Here are the various screens in the app:

**Home**

- Links to different forms of media where Spektrum is present
- Settings from where you can change themes

**Lunch**

- Fetches the university lunch menu
- Different types of food categorized with vector icons

**Spektraklet**

- Lists articles in our student paper
- Posts can be opened in a mobile friendly way with sharing ability

**Activities**

- Link to the Spektrum songbook
- Calendar with dates of upcoming events

----

## Directory structure

<details>
<summary>Toggle</summary>
<p>

```
.
├── api
│   ├── calendar.ts
│   ├── lunch.js
│   └── spektraklet.ts
├── assets
│   └── images
│       ├── icon.png
│       ├── launcher.png
│       ├── logo-black.png
│       ├── logo-pink.png
│       └── logo-white.png
├── components
│   └── Themed.tsx
├── constants
│   ├── Layout.ts
│   └── Theme.ts
├── functions
│   ├── credentials.json
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── hooks
│   ├── useCachedResources.ts
│   ├── useFirestore.ts
│   ├── useStorage.ts
│   └── useTheme.js
├── navigation
│   ├── BottomTabNavigator.tsx
│   └── index.tsx
├── screens
│   ├── Activities
│   │   ├── ActivitiesScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   └── SongArchiveScreen.tsx
│   ├── Home
│   │   ├── HomeScreen.jsx
│   │   └── SettingsScreen.jsx
│   ├── Lunch
│   │   └── LunchScreen.tsx
│   ├── Spektraklet
│   │   ├── PostScreen.jsx
│   │   └── SpektrakletScreen.jsx
│   ├── LoadingScreen.tsx
│   └── NotFoundScreen.tsx
├── app.jks
├── app.json
├── App.tsx
├── babel.config.js
├── env.json
├── firebase.json
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── types.tsx
```

</p>
</details>

## Set up Expo

(Node installed e.g. `curl -L https://git.io/n-install | bash`)

```
npm install -g expo-cli
```

## Install dependencies

```
npm i
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

### Platform of choice

React Native is a cross-platform mobile framework, however the annual fee for an Apple developer account is 99$ whereas Android has a one time fee of 25$. For as long as Finland is not on [the list of eligible countires](https://developer.apple.com/support/membership-fee-waiver/) for a possibility of waiving the fee the app remains Android-only.

## Cloud Functions

Connecting to Google Calendar requires an OAuth handshake, a service account is set up for this purpose. A Cloud Function on Firebase accessible via Google Cloud Console use the credentials for this account to access the desired Spektrum Google Calendar. In depth information can be found in the document in [the Secrets part](##Secrets).

Any backend stuff that needs Node.js (in this case the `googleapis` library) can be implemented as a Cloud Function.

### Install dependencies

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

### Filetree

```
sudo apt install tree
tree --dirsfirst -I node_modules
```