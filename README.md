# Documentation

This project is created as a requirement for the **Advanced Mobile Development** subject. It showcases my work on building React Native apps, including a Spotify-inspired playlist app, a camera app with real-time filters, and location-based map features.


## Activity 1

I installed Node.js, npm, and the React Native CLI but had issues with the missing brew command and macOS version requirements. I created a React Native project using npx react-native init MyApp, mistakenly using React v20, and experienced NPM cache problems. Despite these challenges, I successfully ran the app on an emulator/physical device.

<img src="assets/images/activity 1/Screenshot 2025-11-21 at 9.58.59 PM.png" width="700">


## Activity 2

Created a ComponentShowcase screen that displays and uses basic React Native components: Text, Button, Image, and ScrollView. Arranged them in a clean, readable layout. Run the app to ensure everything works, then submitted my code and a screenshot of the screen.

<img src="assets/images/activity 2/Screenshot 2025-11-21 at 9.59.21 PM.png" width="700">


## Week 3

The task involves building a Spotify-inspired React Native app with four main parts:
- Create Screens
 Develop Profile, Settings, Sign-up, and Playlists screens, each with a consistent Spotify-style header.

- Implement Navigation
 Set up stack navigation for major screens and add a custom drawer navigation with icons and animated transitions.

- Offline Navigation Caching (Bonus)
 Use AsyncStorage to save the last visited screen and restore it when the app reloads, even offline.

- Test Accessibility
 Ensure drawer and headers work with screen readers, add ARIA labels, and test keyboard navigation.

<table>
  <tr>
    <td><img src="assets/images/week 3/IMG_5197.PNG" width="300"></td>
    <td><img src="assets/images/week 3/IMG_5198.PNG" width="300"></td>
    <td><img src="assets/images/week 3/IMG_5199.PNG" width="300"></td>
  </tr>
  <tr>
    <td><img src="assets/images/week 3/IMG_5200.PNG" width="300"></td>
    <td><img src="assets/images/week 3/IMG_5201.PNG" width="300"></td>
    <td><img src="assets/images/week 3/IMG_5202.PNG" width="300"></td>
  </tr>
  <tr>
    <td><img src="assets/images/week 3/IMG_5203.PNG" width="300"></td>
  </tr>
</table>


## Week 4

I added the current app with state management, animations, and persistence. Using useState and useReducer, I added, removed, and cleared songs, with undo/redo functionality via state history. I implemented smooth animations with react-native-reanimated and saved the playlist and history using AsyncStorage. Finally, I optimized re-renders with React.memo and ensured the app worked across restarts.

<table>
  <tr>
    <td><img src="assets/images/week 4/IMG_5204.PNG" width="300"></td>
    <td><img src="assets/images/week 4/IMG_5205.PNG" width="300"></td>
    <td><img src="assets/images/week 4/IMG_5206.PNG" width="300"></td>
  </tr>
  <tr>
    <td><img src="assets/images/week 4/IMG_5207.PNG" width="300"></td>
    <td><img src="assets/images/week 4/IMG_5208.PNG" width="300"></td>
  </tr>
</table>


## Week 5

I implemented a theme switcher in my Spotify app using Redux Toolkit, adding light/dark modes, custom themes, and smooth transitions with react-native-reanimated, and persisted the selected theme with AsyncStorage. I also built a camera app with real-time filters and editing tools using expo-camera, including grayscale and sepia filters with adjustable intensity, crop and rotate functions, and optimized previews with React.memo. Both apps were tested on iOS and Android, documented, and submitted with screenshots.

<table>
  <tr>
    <td><img src="assets/images/week 5/IMG_5210.PNG" width="300"></td>
    <td><img src="assets/images/week 5/IMG_5211.PNG" width="300"></td>
    <td><img src="assets/images/week 5/Screenshot 2025-11-21 at 10.11.00 PM.png" width="300"></td>
  </tr>
</table>

## Week 6

I enhanced my React Native app with real-time location tracking and interactive maps. I added react-native-maps and react-native-geolocation-service to show the user’s location, placed custom markers for mock points of interest, and implemented zoom, pan, and geofencing alerts. I applied a custom map style, tested functionality on iOS and Android, and documented the features with a screenshot and brief note.

<img src="assets/images/week 6/IMG_5209.PNG" width="300">