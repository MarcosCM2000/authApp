import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    email:    [ 'test1@test.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(6)] ]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    //  request
    this.authService.login(this.miFormulario.controls?.email.value, this.miFormulario.controls?.password.value)
    .subscribe(ok =>{
        if (ok === true) {
          this.router.navigateByUrl('/dashboard');;
        } else {
          //TODO: Mostrar mensaje de error
          Swal.fire('Error', ok.msg, 'error');
        }
      }
      ,err => {
      }
    );

    
  }

}
