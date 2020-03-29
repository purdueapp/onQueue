## Room State
```js
{
  trackWindow: {
    currentTrack: <SpotifyTrack>,
    nextTracks: [<SpotifyTrack>, <SpotifyTrack>, ...],
    previousTracks: [<SpotifyTrack>, <SpotifyTrack>, ...]
  },
  duration: 0,
  position: 0,
  paused: false,
  members: [<User>, <User>, ...],
  host: <SpotifyUser>
}
```

## User
```js
{
  displayName: 'John Doe',
  role: 'Admin',
  id: 'asdfaskdjkljs',
}
```

## Host Redux State
```js
{
  spotify: {
    player: <SpotifyWebPlayer>,
    trackWindow: {
      nextTracks: [],
      previousTracks: [],
      currentTrack: initialCurrentTrack,
    },
    tokens: {
      accessToken: <AuthAccessToken>,
      refreshToken: <AuthRefreshToken>,
    },
    api: <OpenSourceSpotifyApi>,
    playbackState: <SpotifyWebPlaybackState>
  },
  roomState: <RoomState>
 }
```
