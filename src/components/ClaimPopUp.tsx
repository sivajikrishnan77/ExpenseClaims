import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

interface Props {
  visible: boolean;
  onClose: () => void;
  onProceed: (includeImages: boolean) => void;
}

const ClaimPopup: React.FC<Props> = ({ visible, onClose, onProceed }) => {

  const [includeImages, setIncludeImages] = useState(false);

  const handleProceed = () => {
    onProceed(includeImages);
    setIncludeImages(false);
  };

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >

      <View style={styles.modalContainer}>

        <View style={styles.popup}>

          <Text style={styles.title}>Generate Claim</Text>

          {/* Checkbox Row */}
          <View style={styles.checkboxRow}>

            <CheckBox
              value={includeImages}
              onValueChange={setIncludeImages}
            />

            <Text style={styles.checkboxText}>
              Include Images in PDF
            </Text>

          </View>


          {/* Buttons */}
          <View style={styles.buttonRow}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.proceedButton}
              onPress={handleProceed}
            >
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>

  );
};
const styles = StyleSheet.create({

modalContainer: {
flex: 1,
backgroundColor: "rgba(0,0,0,0.5)",
justifyContent: "center",
alignItems: "center"
},

popup: {
width: "85%",
backgroundColor: "#fff",
padding: 20,
borderRadius: 10
},

title: {
fontSize: 18,
fontWeight: "600",
marginBottom: 20
},

checkboxRow: {
flexDirection: "row",
alignItems: "center"
},

checkboxText: {
fontSize: 16
},

buttonRow: {
flexDirection: "row",
justifyContent: "space-between",
marginTop: 25
},

cancelButton: {
padding: 10
},

cancelText: {
color: "red",
fontSize: 16
},

proceedButton: {
backgroundColor: "#007AFF",
paddingVertical: 8,
paddingHorizontal: 20,
borderRadius: 6
},

proceedText: {
color: "#fff",
fontSize: 16
}

});

export default ClaimPopup;