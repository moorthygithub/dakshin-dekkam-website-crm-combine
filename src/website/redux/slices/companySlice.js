import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  store_name: "",
  store_description: "",
  store_owner_name: "",
  support_email: "",
  support_phone: "",
  support_whatsapp: "",
  store_address: "",
  google_map_url: null,
  app_store_url: null,
  google_store_url: null,
  store_banner_image: null,
  store_logo_image: null,
  store_custom_fields: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
