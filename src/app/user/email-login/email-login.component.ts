import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  Validators
 } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  type: 'login' | 'signup' | 'reset' = 'signup';
  loading: false;
  serverMessage: string;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });
  }

  // tslint:disable-next-line: typedef
  changeType(val) {
    this.type = val;
  }

  // tslint:disable-next-line: typedef
  get isLogin() {
    return this.type === 'login';
  }

  // tslint:disable-next-line: typedef
  get isSignup() {
    return this.type === 'signup';
  }

  // tslint:disable-next-line: typedef
  get isPasswordReset() {
    return this.type === 'reset';
  }

  // tslint:disable-next-line: typedef
  get email() {
    return this.form.get('email');
  }

  // tslint:disable-next-line: typedef
  get password() {
    return this.form.get('password');
  }

  // tslint:disable-next-line: typedef
  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  // tslint:disable-next-line: typedef
  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  // tslint:disable-next-line: typedef
  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }

    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
