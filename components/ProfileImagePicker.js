import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileImagePicker = ({ onImagePicked }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
      onImagePicked(result.uri);
    }
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      )}
    </View>
  );
};

export default ProfileImagePicker;
