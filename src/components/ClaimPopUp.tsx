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
    console.log("Proceed clicked");
    onProceed(includeImages);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>

          <Text style={styles.title}>Generate Claim PDF</Text>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={includeImages}
              onValueChange={setIncludeImages}
            />
            <Text>Include Images</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.proceedBtn}
              onPress={handleProceed}
            >
              <Text style={styles.btnText}>Proceed</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default ClaimPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: "#999",
    borderRadius: 6
  },
  proceedBtn: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 6
  },
  btnText: {
    color: "#fff"
  }
});