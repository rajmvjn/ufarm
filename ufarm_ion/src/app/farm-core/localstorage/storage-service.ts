import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  async getStorageData(keyValue) {
    const data: any = await Storage.get(keyValue);
    const returnData = data ? JSON.parse(data.value) : {};
    return returnData;
  }

  async setStorageData(data) {
    return await Storage.set(data);
  }

  async removeStorageData(keyValue) {
    return await Storage.remove(keyValue);
  }
}
