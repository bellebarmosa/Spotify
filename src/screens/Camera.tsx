
// import React, { useState, useRef, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Camera, CameraType, CameraCapturedPicture } from "expo-camera";

// const CameraScreen: React.FC = () => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [type, setType] = useState(CameraType.back);

//   const cameraRef = useRef<Camera | null>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.text}>Requesting camera permission...</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.text}>No access to camera</Text>
//       </View>
//     );
//   }

//   const takePicture = async () => {
//     if (!cameraRef.current) return;

//     try {
//       const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({
//         quality: 0.7,
//         skipProcessing: true,
//       });
//       console.log("Photo URI:", photo.uri);
//     } catch (error) {
//       console.warn("Failed to take picture:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Camera ref={cameraRef} style={styles.camera} type={type}>
//         <View style={styles.controls}>
//           <TouchableOpacity
//             style={styles.smallButton}
//             onPress={() =>
//               setType((prev) =>
//                 prev === CameraType.back ? CameraType.front : CameraType.back
//               )
//             }
//           >
//             <Text style={styles.text}>Flip</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//             <Text style={styles.captureText}>📸</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.smallButton}
//             onPress={() => console.log("Filters placeholder")}
//           >
//             <Text style={styles.text}>Filters</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "black" },
//   camera: { flex: 1, justifyContent: "flex-end" },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingVertical: 18,
//     backgroundColor: "rgba(0,0,0,0.35)",
//   },
//   smallButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: "rgba(255,255,255,0.12)",
//   },
//   captureButton: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "white",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   captureText: { fontSize: 24 },
//   text: { color: "white", fontSize: 16 },
//   center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black" },
// });

// export default CameraScreen;

// import React from 'react'

// const camera = () => {
//   return (
//     <div>camera</div>
//   )
// }

// export default camera


// import React, { useState } from "react";
// import { View, Button, Image, StyleSheet, Alert } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default function CameraScreen() {
//   const [photo, setPhoto] = useState<string | null>(null);

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert("Permission required", "Camera access is needed to take photos.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setPhoto(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Take a Photo" onPress={takePhoto} />
//       {photo && <Image source={{ uri: photo }} style={styles.preview} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   preview: { width: 300, height: 300, marginTop: 20, borderRadius: 8 },
// });

import React from 'react'

const camera = () => {
  return (
    <div>camera</div>
  )
}

export default camera