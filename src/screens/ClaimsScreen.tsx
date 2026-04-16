import React ,{useState}from 'react'
import { Text, TouchableOpacity, View,StyleSheet,Image } from 'react-native'
import Label from '../components/label'
import TextInputField from '../components/TextInput'
import { useDispatch, useSelector } from "react-redux"
import { updateField,addVoucherDate,removeVoucherDate } from '../store/slices/ClaimsSlice'
import { ScrollView } from 'react-native'
import CalendarInput from '../components/calendar'
import DropDown from '../components/DropDown'
import useImagePicker from '../hooks/imagePicker'
import ClaimPopup from '../components/ClaimPopUp'




export default function ClaimsScreen() {

  const dispatch = useDispatch();
  const form = useSelector((state: any) => state.claims) || {};
  const { pickImage } = useImagePicker();
  const images = useSelector((state: any) => state.claims.images) || [];
  const [showPopup, setShowPopup] = useState(false);
  const handleClaimProceed = (includeImages: boolean) => {

  setShowPopup(false);

  if (includeImages) {
    console.log("User wants images inside PDF");
  } else {
    console.log("User wants images separately");
  }

};
  return (

    <View>
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
  } />



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

<View style={styles.imageContainer}>
  {images.map((img: string, index: number) => (
    <Image
      key={index}
      source={{ uri: img }}
      style={styles.previewImage}
    />
    
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