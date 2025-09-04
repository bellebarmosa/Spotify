# Spotify-Style React Native App

This project is a Spotify-inspired mobile application built using **React Native**, featuring custom navigation, animated drawer transitions, and a clean music library UI.

---

## 📱 Features Implemented

### 1. **Sign-up Flow with Stack Navigation**
- Implemented stack navigation using `@react-navigation/native-stack`
- The **Sign-up screen** (`SignUpScreen`) is the entry point of the app
- Upon successful sign-up, users are redirected to the main app with drawer navigation

---

### 2. **Drawer Navigation**
- Used `@react-navigation/drawer` to create a custom drawer navigator
- Drawer includes:
  - **Profile**
  - **Settings**
  - **Playlists**
- Each screen is accessible via the drawer with Spotify-style icons (`Ionicons` from `@expo/vector-icons`)

---

### 3. **Custom Drawer Design**
- Styled the drawer with a dark background (`#121212`)
- Added app branding/logo at the top of the drawer
- Drawer content is defined in `CustomDrawerContent.tsx`
- Smooth transition and touch-friendly UI

---

### 4. **Animated Drawer Transitions**
- Configured `react-native-reanimated` for drawer animations
- Drawer uses `slide` type with smooth transitions
- All screens animate in/out with smooth easing curves

---

### 5. **Access Control**
- Drawer is **disabled** on the Sign-up screen
- Only accessible **after** login (via main `DrawerNavigator`)

---

### 6. **Library Screen (Spotify-Inspired UI)**
- Built a custom `LibraryScreen` replicating Spotify’s "Your Library" UI
- Includes:
  - User avatar and header
  - Tabs (Playlists, Podcasts, Albums, Artists)
  - Vertical playlist list (with title/subtitle)
  - Floating bottom player bar (Now Playing)

---

## 🧰 Tech Stack

- React Native
- Expo
- React Navigation (Stack & Drawer)
- React Native Reanimated
- React Native Gesture Handler
- @expo/vector-icons

---

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm start
