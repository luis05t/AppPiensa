import * as SecureStore from "expo-secure-store";

export const secureStorage = {
  async getToken() {
    return await SecureStore.getItemAsync("accessToken");
  },
  async setToken(token: string) {
    await SecureStore.setItemAsync("accessToken", token);
  },
  async removeToken() {
    await SecureStore.deleteItemAsync("accessToken");
  },
};
