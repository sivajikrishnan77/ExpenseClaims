/* eslint-disable react-native/no-inline-styles */
import React ,{useState}from 'react'
import { Text, TouchableOpacity, View,StyleSheet,Image } from 'react-native'
import Label from '../components/label'
import TextInputField from '../components/TextInput'
import { useDispatch, useSelector } from "react-redux"
import { updateField } from '../store/slices/ClaimsSlice'
import { ScrollView } from 'react-native'
import CalendarInput from '../components/calendar'
import DropDown from '../components/DropDown'
import useImagePicker from '../hooks/imagePicker'
import ClaimPopup from '../components/ClaimPopUp'
import { generatePDF } from '../utils/GeneratePdf'
import { shareFiles } from '../utils/ShareFiles'




export default function ClaimsScreen() {

  const dispatch = useDispatch();
  const form = useSelector((state: any) => state.claims) || {};
  const { pickImage, deleteImage } = useImagePicker();
  const images = useSelector((state: any) => state.claims.images) || [];
  const [showPopup, setShowPopup] = useState(false);
const handleClaimProceed = async (includeImages: boolean) => {
  try {
    setShowPopup(false); // ✅ Close popup immediately for better UX

    console.log("Generating PDF...");
    const pdfPath = await generatePDF(form, images, includeImages);

    if (!pdfPath) {
      console.log("PDF generation returned null — aborting share");
      return;
    }

    console.log("PDF Path:", pdfPath);
    await shareFiles(pdfPath, images, includeImages);

  } catch (error) {
    console.log("Claim process failed:", error);
  }
};
  return (

    <View style={{flex:1}}>
  <ScrollView>

      <View style={{ flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#0b63e7' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5,paddingTop: 16 }}>ExpenseClaim</Text>
      </View>

     <Label text="Requested By" />
     <TextInputField value={form.requestedBy} onChangeText={(text) => dispatch(updateField({ field: "requestedBy", value: text }))} />

      <Label text="Employee No" />
      <TextInputField value={form.employeeNo} onChangeText={(text) => dispatch(updateField({ field: "employeeNo", value: text }))} />

      <Label text="Request Type" />
      <TextInputField value={form.requestType} editable={false} onChangeText={(text) => dispatch(updateField({ field: "requestType", value:text }))} />  

      <Label text="Brand" />
      <TextInputField value={form.Brand} onChangeText={(text) => dispatch(updateField({ field: "Brand", value:text }))} />

      <Label text="Purpose" />
      <TextInputField value={form.purpose} onChangeText={(text) => dispatch(updateField({ field: "purpose", value:text }))} />

      <Label text="Voucher Date" />
      <CalendarInput
  value={form.voucherDate}
  onChange={(date) =>
    dispatch(updateField({ field: "voucherDate", value: date }))
  }
/>

    <Label text="Company" />
    <DropDown value={form.company} 
    list={[
    { label: "HEPL", value: "HEPL" },
    { label: "Stanco", value: "Stanco" },
    { label: "Digifox", value: "Digifox" },
    { label: "CavinInfotec", value: "CavinInfotec" },
    { label: "CkEDGE", value: "CKEDGE" },
    { label: "SocialAnts", value: "SocialAnts" },
  ]}
  setValue={(value) =>
    dispatch(updateField({ field: "company", value }))
  }
  placeholder = "Select Company"
   />



  <Label text="Business Division" />
  <DropDown value={form.businessDivision} 
    list={[ { label: "IT", value: "IT" },
    { label: "HR", value: "HR" },
    { label: "Finance", value: "Finance" },
    { label: "Marketing", value: "Marketing" },
    { label: "Infra", value: "Infra" },
  ]}
    setValue={(value) =>
      dispatch(updateField({ field: "businessDivision", value }))
    }
    placeholder = "Select Business Division"
  />

  <Label text="Activity Date" />
  <CalendarInput
  value={form.activityDate}
  onChange={(date) =>
    dispatch(updateField({ field: "activityDate", value: date }))
  }
/>

<Label text="Sites" />
<DropDown value={form.sites}
  list={[
    { label: "Bangalore", value: "Bangalore" },
    { label: "Chennai", value: "Chennai" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Pune", value: "Pune" },
    { label: "Noida", value: "Noida" },
  ]}
  setValue={(value) =>
    dispatch(updateField({ field: "sites", value }))
  }
  placeholder="Select Sites"
/>

<Label text="Department" />
<DropDown value={form.department}
  list={[
    { label: "Software Development", value: "Software Development" },
    { label: "Human Resources", value: "Human Resources" },
    { label: "Finance", value: "Finance" },
    { label: "Marketing", value: "Marketing" },
  ]}
  setValue={(value) =>
    dispatch(updateField({ field: "department", value }))
  }
  placeholder = "Select Department"
/>

<Label text="Micellaneous" />
<TextInputField value={form.micellaneous} onChangeText={(text) => dispatch(updateField({ field: "micellaneous", value:text }))} />
  
  <Label text="Food & Beverage" />
  <TextInputField value={form.foodBeverage} onChangeText={(text) => dispatch(updateField({ field: "foodBeverage", value:text }))} />
  
  <View style={styles.buttonRow}>

 <TouchableOpacity
  style={styles.claimButton}
  onPress={() => setShowPopup(true)}
>
  <Text>Claim</Text>
</TouchableOpacity>

<ClaimPopup
  visible={showPopup}
  onClose={() => setShowPopup(false)}
  onProceed={handleClaimProceed}
/>
  <TouchableOpacity
    style={styles.imageButton}
    onPress={pickImage}
  >
    <Text style={styles.buttonText}>Add Image</Text>
  </TouchableOpacity>

</View>

// Destructure deleteImage from hook
const { pickImage, deleteImage } = useImagePicker();

// Replace your existing imageContainer View with this:
<View style={styles.imageContainer}>
  {images.map((img: string, index: number) => (
    <View key={index} style={styles.imageWrapper}>
      <Image
        source={{ uri: img }}
        style={styles.previewImage}
      />
      {/* ✅ Delete button on top right of image */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteImage(index)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  ))}
</View>


  </ScrollView>


    
  </View>
  )
}

const styles = StyleSheet.create({

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 20
  },

  claimButton: {
    flex: 1,
    backgroundColor: "#1976D2",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10
  },

  imageButton: {
    flex: 1,
    backgroundColor: "#2E7D32",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  imageContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 20,
  justifyContent: "center"
},

previewImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  margin: 6
}

});