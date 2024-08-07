
# Spektrum App

[![](https://img.shields.io/badge/Version-2.3.2-blue)](https://github.com/spektrumrf/app/releases)
[![](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[<img src="https://github.com/spektrumrf/assets/raw/master/images/playstore/ic-launcher.png" width="100">](https://play.google.com/store/apps/details?id=fi.spektrum.app)

[Expo Demo](https://expo.io/@deinal/app)

----

Android application for the Spektrum student association with a couple of handy features for members.

----

## Documentation

1. [Manual](documentation.md#Manual)
2. [Development](documentation.md#Development)
3. [Journal](documentation.md#Journal)

## Commands

### App

#### Requirements

Node 20

```
npm i
```

#### Update Expo

```
npm install expo@46
npx expo install --fix
```

#### Run

```
npm start
```

#### Build apk
```
npm install -g eas-cli
eas login
```

```
eas build -p android --profile preview
```

### Cloud Functions

Inside [functions](/functions)

#### Install dependencies

```
npm i
```

#### Deploy

```
npm run deploy
```

### Extra

#### Optimize assets

```
npx expo-optimize
```

#### Filetree

```
sudo apt install tree
tree --dirsfirst -I node_modules
```