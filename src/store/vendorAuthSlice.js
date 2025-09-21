import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper: convert ArrayBuffer -> hex string
function bufferToHex(buffer) {
  const byteArray = new Uint8Array(buffer);
  const hexCodes = Array.from(byteArray).map((value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  });
  return hexCodes.join('');
}

// Helper: sha256 hex of input string using Web Crypto API
async function sha256Hex(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(digest);
}

// Generate checksum: sha256(secret + timestamp)
export const generateVendorAccessToken = createAsyncThunk(
  'vendorAuth/generateVendorAccessToken',
  async (_, { getState }) => {
    const state = getState();
    const apiSecret = state.vendorAuth.apiSecret;
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const checksum = await sha256Hex(apiSecret + timestamp);
    // In absence of a real endpoint, treat checksum as the access token
    return { timestamp, checksum, accessToken: checksum };
  }
);

const initialState = {
  apiKey: 'eyJraWQiOiJaTUtjVXciLCJhbGciOiJFUzI1NiJ9.eyJleHAiOjI1NDY1ODA3OTcsImlhdCI6MTc1ODE4MDc5NywibmJmIjoxNzU4MTgwNzk3LCJzdWIiOiJ7XCJ0b2tlblJlZklkXCI6XCJhMGExMjRhZS02MzdlLTRlNTYtYjk5My1mYzU4OTg0N2ViYzdcIixcInZlbmRvckludGVncmF0aW9uS2V5XCI6XCJlMzFmZjIzYjA4NmI0MDZjODg3NGIyZjZkODQ5NTMxM1wiLFwidXNlckFjY291bnRJZFwiOlwiYWMzOWU4NDctMDQxZC00ODc5LTlkMDUtNWM3NmM5NTA4N2VkXCIsXCJkZXZpY2VJZFwiOlwiNDg4MmRmNzEtZmQ4MC01YWI5LTliOWItZGM2NjViNWEzZjBiXCIsXCJzZXNzaW9uSWRcIjpcIjgzMmIzZmRkLTAwODctNDMyYi1iNzY5LTBmMTJiZGM1ODk2N1wiLFwiYWRkaXRpb25hbERhdGFcIjpcIno1NC9NZzltdjE2WXdmb0gvS0EwYk10cjZPY2NsZVdtWWt3aGFDcHJ2NjFSTkczdTlLa2pWZDNoWjU1ZStNZERhWXBOVi9UOUxIRmtQejFFQisybTdRPT1cIixcInJvbGVcIjpcImF1dGgtdG90cFwiLFwic291cmNlSXBBZGRyZXNzXCI6XCIxMDYuMjIyLjIwNS4xMTcsMTcyLjY5Ljg3LjE2NiwzNS4yNDEuMjMuMTIzXCIsXCJ0d29GYUV4cGlyeVRzXCI6MjU0NjU4MDc5Nzk4M30iLCJpc3MiOiJhcGV4LWF1dGgtcHJvZC1hcHAifQ.IaOW-72NGS5enUnNERKhPvvMD_8az1BMSB1WIh-XO2YHJZV0zo73moYt9bA4y1aK-rVKXDOnGn292busIXIK9g',
  apiSecret: 'JQIZQ2RDUZMIUEZ7475BEPIUFDQAMFWC',
  timestamp: null,
  checksum: null,
  accessToken: null,
};

const vendorAuthSlice = createSlice({
  name: 'vendorAuth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.apiKey = action.payload.apiKey;
      state.apiSecret = action.payload.apiSecret;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateVendorAccessToken.fulfilled, (state, action) => {
      state.timestamp = action.payload.timestamp;
      state.checksum = action.payload.checksum;
      state.accessToken = action.payload.accessToken;
    });
  }
});

export const { setCredentials } = vendorAuthSlice.actions;
export const { reducer: vendorAuthReducer } = vendorAuthSlice;
export default vendorAuthSlice;


