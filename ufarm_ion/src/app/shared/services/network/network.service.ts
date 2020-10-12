import { Injectable } from "@angular/core";

import { Plugins } from "@capacitor/core";
import { Subject } from "rxjs";

const { Network } = Plugins;

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  _network_status_sub = new Subject<any>();

  constructor() {
    Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      this._network_status_sub.next(status);
    });
  }

  get_network_status = async () => {
    return await Network.getStatus();
  };
}
