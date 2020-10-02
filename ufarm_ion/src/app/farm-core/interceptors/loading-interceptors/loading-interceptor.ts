import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { from, Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ToastService } from "../../../shared/services/toast/toast.service";
//import { ToastService } from '../../../shared/services/toast/toast.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  loadingEl = null;
  constructor(
    private loadingCtrl: LoadingController,
    private toastService: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.loadingEl) {
      //this.showLoader();
    }
    return next.handle(req).pipe(
      catchError((err) => {
        this.toastService.presentToast(err.statusText, 2000);
        return throwError("Newwork Error: please try again later.");
      }),
      finalize(() => {
        //this.hideLoader();
      })
    );
  }

  showLoader() {
    this.loadingEl = this.loadingCtrl
      .create({
        message: "Processing..",
      })
      .then((el) => {
        el.present();
      });
  }

  hideLoader() {
    if (this.loadingEl) {
      this.loadingCtrl.dismiss();
      this.loadingEl = null;
    }
  }
}
