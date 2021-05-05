# OnQueue
[Youtube Demo](https://www.youtube.com/watch?v=uQor8VXAzY8)
![image](https://user-images.githubusercontent.com/22432719/117171289-99ef9800-ad7f-11eb-9e45-6b3a346f339e.png)

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
  volume: 0.5,
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
