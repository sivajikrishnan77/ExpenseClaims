import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import Label from '../components/label'
import TextInputField from '../components/TextInput'
import { useDispatch, useSelector } from "react-redux"
import { updateField } from '../store/slices/ClaimsSlice'
import CalendarInput from '../components/calendar'
import DropDown from '../components/DropDown'
import useImagePicker from '../hooks/imagePicker'
import ClaimPopup from '../components/ClaimPopUp'
import { generatePDF } from '../utils/GeneratePdf'
import { shareFiles } from '../utils/ShareFiles'

export default function ClaimsScreen() {

  const dispatch = useDispatch();
  const form = useSelector((state: any) => state.claims) || {};
  const images = useSelector((state: any) => state.claims.images) || [];

  const { pickImage, deleteImage } = useImagePicker();

  const [showPopup, setShowPopup] = useState(false);

  // 🔹 DROPDOWN STATES
  const [companyOpen, setCompanyOpen] = useState(false);
  const [divisionOpen, setDivisionOpen] = useState(false);
  const [sitesOpen, setSitesOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  // 🔹 Close all dropdowns
  const closeAllDropdowns = () => {
    setCompanyOpen(false);
    setDivisionOpen(false);
    setSitesOpen(false);
    setDepartmentOpen(false);
  };

  const handleClaimProceed = async (includeImages: boolean) => {
    try {
      setShowPopup(false);

      const pdfPath = await generatePDF(form, images, includeImages);

      if (!pdfPath) return;

      await shareFiles(pdfPath, images, includeImages);

    } catch (error) {
      console.log("Claim process failed:", error);
    }
  };

  return (

    <Pressable style={{ flex: 1 }} onPress={closeAllDropdowns}>

      <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1, backgroundColor: "#F5F7FA", }}>
        <View style={{flex:1,backgroundColor:"ffffff"}}>

        <View style={{   backgroundColor:"#4CAF50",
  paddingTop:10,
  paddingBottom:25,
  borderBottomLeftRadius:25,
  borderBottomRightRadius:25,
  alignItems:"center" }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5, paddingTop: 16 }}>
            ExpenseClaim
          </Text>
        </View>
<View style={{ flex: 1, paddingHorizontal:20,paddingTop:20 }}>
        <Label text="Requested By" />
        <TextInputField
          value={form.requestedBy}
          onChangeText={(text) =>
            dispatch(updateField({ field: "requestedBy", value: text }))
          }
        />

        <Label text="Employee No" />
        <TextInputField
          value={form.employeeNo}
          onChangeText={(text) =>
            dispatch(updateField({ field: "employeeNo", value: text }))
          }
        />

        <Label text="Request Type" />
        <TextInputField
          value={form.requestType}
          onChangeText={(text) =>
            dispatch(updateField({ field: "requestType", value: text }))
          }
        />

        <Label text="Band" />
        <TextInputField
          value={form.Band}
          onChangeText={(text) =>
            dispatch(updateField({ field: "Band", value: text }))
          }
        />

        <Label text="Purpose" />
        <TextInputField
          value={form.purpose}
          onChangeText={(text) =>
            dispatch(updateField({ field: "purpose", value: text }))
          }
        />

        <Label text="Voucher Date" />
        <CalendarInput
          value={form.voucherDate}
          onChange={(date) =>
            dispatch(updateField({ field: "voucherDate", value: date }))
          }
        />

        {/* COMPANY */}
        <Label text="Company" />
        <DropDown
          open={companyOpen}
          setOpen={(val) => {
            closeAllDropdowns();
            setCompanyOpen(val);
          }}
          value={form.company}
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
          placeholder="Select Company"
        />

        {/* BUSINESS DIVISION */}
        <Label text="Business Division" />
        <DropDown
          open={divisionOpen}
          setOpen={(val) => {
            closeAllDropdowns();
            setDivisionOpen(val);
          }}
          value={form.businessDivision}
          list={[
            { label: "IT", value: "IT" },
            { label: "HR", value: "HR" },
            { label: "Finance", value: "Finance" },
            { label: "Marketing", value: "Marketing" },
            { label: "Infra", value: "Infra" },
          ]}
          setValue={(value) =>
            dispatch(updateField({ field: "businessDivision", value }))
          }
          placeholder="Select Business Division"
        />

        <Label text="Activity Date" />
        <CalendarInput
          value={form.activityDate}
          onChange={(date) =>
            dispatch(updateField({ field: "activityDate", value: date }))
          }
        />

        {/* SITES */}
        <Label text="Sites" />
        <DropDown
          open={sitesOpen}
          setOpen={(val) => {
            closeAllDropdowns();
            setSitesOpen(val);
          }}
          value={form.sites}
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

        {/* DEPARTMENT */}
        <Label text="Department" />
        <DropDown
          open={departmentOpen}
          setOpen={(val) => {
            closeAllDropdowns();
            setDepartmentOpen(val);
          }}
          value={form.department}
          list={[
            { label: "Software Development", value: "Software Development" },
            { label: "Human Resources", value: "Human Resources" },
            { label: "Finance", value: "Finance" },
            { label: "Marketing", value: "Marketing" },
          ]}
          setValue={(value) =>
            dispatch(updateField({ field: "department", value }))
          }
          placeholder="Select Department"
        />

        <Label text="Micellaneous(Remarks)" />
        <TextInputField
          value={form.micellaneous}
          onChangeText={(text) =>
            dispatch(updateField({ field: "micellaneous", value: text }))
          }
        />

        <Label text="Food & Beverage" />
        <TextInputField
          value={form.foodBeverage}
          onChangeText={(text) =>
            dispatch(updateField({ field: "foodBeverage", value: text }))
          }
        />
</View>
        {/* BUTTONS */}
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

        {/* IMAGE PREVIEW */}
        <View style={styles.imageContainer}>
          {images.map((img: string, index: number) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: img }} style={styles.previewImage} />

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}
              >
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>

            </View>
          ))}
        </View>
          </View>
      </ScrollView>

    </Pressable>
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
    backgroundColor: "#b8b1b6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10
  },
 
  imageButton: {
    flex: 1,
    backgroundColor: "#1ac28f",
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
  },

  imageWrapper: {
    position: "relative"
  },

  deleteButton: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2
  },

  deleteText: {
    color: "white",
    fontWeight: "bold"
  }

});