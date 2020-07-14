import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin = true;
  isAdmin: boolean;

  constructor(private loadingCtrl: LoadingController, private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;    
  }

  onSubmit(form: NgForm) {    
    this.isAdmin = this.authService.is_admin;
    this.loadingCtrl.create({message: 'Logging in..', keyboardClose: true}).then(ldingEl => {
      ldingEl.present();
      setTimeout(()=> { 
        this.authService.login();
        ldingEl.dismiss();
        if(this.isAdmin) {
          this.navCtrl.navigateForward('/admin/admins/farm');
        }else {
          this.navCtrl.navigateForward('/ufarm/farms/farm');
        }
        
      },1000);
    });
  }

}
