
# Documentation

## Manual

Load the app on [Play Store](https://play.google.com/store/apps/details?id=fi.spektrum.app)

### Platform of choice

React Native is a cross-platform mobile framework, however the annual fee for an Apple developer account is 99$ whereas Android has a one time fee of 25$. For as long as Finland is not on [the list of eligible countires](https://developer.apple.com/support/membership-fee-waiver/) for a possibility of waiving the fee the app remains Android-only.

### Screens

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
- Song archive
- Calendar with dates of upcoming events

## Development

The application requires [Node.js](https://nodejs.org/). It is a cross-platform mobile application using the [React Native](https://reactnative.dev) framework, and [Expo](https://expo.io) to make life easier. The latter abstracts away intermediary steps and let's you run, build and deploy the app easily.

### Secrets

[Request access](https://drive.google.com/drive/folders/1yFhN1mDozLJanYhJHctUY1VYy11xgXvR?usp=sharing)

### Directory structure

<details>
<summary>Toggle</summary>
<p>

```
.
├── api
│   ├── calendar.ts
│   ├── lunch.ts
│   ├── songArchive.ts
│   └── spektraklet.ts
├── assets
│   ├── icon.png
│   ├── launcher.png
│   ├── logo-black.png
│   ├── logo-pink.png
│   └── logo-white.png
├── components
│   └── Themed.tsx
├── constants
│   ├── Colors.ts
│   ├── Layout.ts
│   └── Lunch.ts
├── functions
│   ├── credentials.json
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── hooks
│   ├── useCachedResources.ts
│   ├── useFirestore.ts
│   ├── useStorage.ts
│   └── useTheme.tsx
├── navigation
│   ├── BottomTabNavigator.tsx
│   └── index.tsx
├── screens
│   ├── Activities
│   │   ├── ActivitiesScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   └── SongArchiveScreen.tsx
│   ├── Home
│   │   ├── HomeScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── Lunch
│   │   └── LunchScreen.tsx
│   ├── Spektraklet
│   │   ├── PostScreen.tsx
│   │   └── SpektrakletScreen.tsx
│   ├── LoadingScreen.tsx
│   └── NotFoundScreen.tsx
├── app.jks
├── app.json
├── App.tsx
├── babel.config.js
├── documentation.md
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

### Api

Inside [/api](/api) we find the http requests for the data used in the app. More specifically calendar, lunch, spektraklet (student paper) and song archive data. Calendar and spektraklet comes as json whereas lunch and song archive are formatted as XML (parsed using [react-native-xml2js](https://www.npmjs.com/package/react-native-xml2js)).

### Cloud Functions

Connecting to Google Calendar requires an OAuth handshake, a service account is set up for this purpose. A Cloud Function on Firebase accessible via Google Cloud Console use the credentials for this account to access the desired Spektrum Google Calendar. More in depth information can be found in the document in [the Secrets part](#Secrets).

Any backend stuff that needs Node.js (in this case the [googleapis](https://www.npmjs.com/package/googleapis) library) can be implemented as a Cloud Function. They are located in the [/functions](/functions) directory.

### Navigation

All navigation logic is stored in [/navigation](/navigation). The app uses the [React Navigation](https://reactnavigation.org), they provide a seamless out-of-the-box experience. The Spektrum app uses their [BottomTabNavigator](https://reactnavigation.org/docs/bottom-tab-navigator) as a base and [StackNavigator](https://reactnavigation.org/docs/stack-navigator) on top of that for navigating stacked screens.

### Theme

The app comes packed with multiple themes (light, dark and pink) which can be changed manually or by changing the system theme on android. The decision is saved as a key-value pair on the device. The logic for theming is in [hooks/useTheme.tsx](/hooks/useTheme.tsx) and the color themselves are stored in [constants/Colors.ts](/constants/Colors.ts). The theme changes responsively by utilizing [React hooks](https://reactjs.org/docs/hooks-overview.html).

### Screens

The screens fetch data from the [api](#api) and rely heavily on React hooks so that they are updated seamlessly. All screens share a common loading screen having the same [RefreshControl](https://reactnative.dev/docs/refreshcontrol) animation as the "pull down to refresh" functionality commonly seen in android apps.

I stuck mainly to the [react-native-elements](https://www.npmjs.com/package/react-native-elements) library for UI elements not availabale from the react-native/expo base, this includes icons, the cards seen on many screens as well as buttons.

## Journal

| Day | Time | Task |
|:---:|:----:|:-----|
| 23.7 | 7   | Learn React Native and Expo, Initialize an app with bottom-tab navigator |
| 25.7 | 5   | Learn React Navigation |
| 26.7 | 4   | Fetch the Spektrum student paper |
| 27.7 | 6   | Student paper screen, HTML renderer |
| 29.7 | 6   | Individual article's screen |
| 30.7 | 1   | Loading screen |
| 1.8  | 2   | Code linting |
| 3.8  | 6   | Home screen |
| 3.8  | 6   | Setting screen |
| 4.8  | 7   | Optimize assets, Dark mode, Article sharing, Initialize Activities screen |
| 5.8  | 7   | Initialize Calendar, Songarchive and Songbook screens, Persist theme in local storage, System default theme |
| 6.8  | 9   | Learn Firebase, Cloud functions, Firestore, Calendar screen |
| 8.8  | 5   | Social icons, Prevent callback loops |
| 9.8  | 4   | Migrate api calls |
| 10.8 | 8   | Lunch screen, Styling, Author and date to articles |
| 13.8 | 1   | Improve lunch |
| 14.8 | 1   | Pull down refresh |
| 19.8 | 4   | Adaptive launcher android icon |
| 20.8 | 7   | License, Cleanup, Filetree, Release fixes |
| 21.8 | 1   | Improve Readme |
| 24.8 | 8   | Song archive screen, Add types, Improve linting |
| 25.8 | 8   | Pink theme, Refactor, Release fixes |
| 28.8 | 3   | Documentation |
| 29.8 | 4   | Documentation |
| 1.9  | 3   | Improve Lunch |
| 2.9  | 1   | Create release, Publish |
| tot  | 124  || 
