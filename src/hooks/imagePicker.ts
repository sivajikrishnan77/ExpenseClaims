import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { addImages } from "../store/slices/ClaimsSlice";

export default function useImagePicker() {

  const dispatch = useDispatch();

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 0 // allow multiple
      },
      (res) => {
        if (res.assets && res.assets.length > 0) {

          const imageUris = res.assets
            .map(img => img.uri)
            .filter(Boolean) as string[];

          dispatch(addImages(imageUris));
        }
      }
    );
  };

  return { pickImage };
}