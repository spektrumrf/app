export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Lunch: undefined;
  Spektraklet: undefined;
  Activities: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

export type LunchParamList = {
  LunchScreen: undefined;
};

export type SpektrakletParamList = {
  SpektrakletScreen: undefined;
  PostScreen: undefined;
};

export type ActivitiesParamList = {
  ActivitiesScreen: undefined;
  SongArchiveScreen: undefined;
  CalendarScreen: undefined;
};

export type Calendar = {
  date: string;
  event: string;
  id: number;
}[];

export type SongArchive = {
  date: string;
  title: string;
  description: string;
  id: string
}[];

export type Lunch= {
  id: number;
  title: string;
  date: string;
  menu: {
    type: string;
    content: string;
  }[];
};

export type RawSongArchive = {
  'rss': {
    '$': {
      'version': string,
      'xmlns:atom': string,
      'xmlns:content': string,
      'xmlns:dc': string,
      'xmlns:geo': string,
      'xmlns:georss': string,
      'xmlns:sy': string,
    },
    'channel': [
      {
        'atom:link': [
          {
            '$': {
              'href': string,
              'rel': string,
              'type': string,
            },
          },
        ],
        'description': [
          string,
        ],
        'generator': [
          string,
        ],
        'item': [
          {
            'content:encoded': [
              string,
            ],
            'dc:creator': [
              string,
            ],
            'description': [
              string,
            ],
            'guid': [
              {
                '$': {
                  'isPermaLink': string,
                },
                '_': string,
              },
            ],
            'link': [
              string,
            ],
            'pubDate': [
              string,
            ],
            'title': [
              string,
            ],
          },
        ]
      }
    ]
  }
};

export type RawLunch = {
  'rss': {
    '$': {
      'version': string,
      'xmlns:blogChannel': string,
    },
    'channel': [
      {
        'description': [
          string,
        ],
        'item': [
          {
            'description': [
              string,
            ],
            'guid': [
              {
                '$': {
                  'isPermaLink': string,
                },
                '_': string,
              },
            ],
            'title': [
              string,
            ],
          },
        ],
        'link': [
          string,
        ],
        'title': [
          string,
        ],
      },
    ],
  },
};
