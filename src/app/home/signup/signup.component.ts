import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { lowerCaseValidator } from "src/app/shared/validators/lowerCase.validator";
import { UserNotTakenValidatorService } from "./userNotTaken.validator.service";
import { NewUser } from "./newUser";
import { SignupService } from "./signup.service";
import { Router } from "@angular/router";
import { userNamePassword } from "./username-password.validator";

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent 
{
    signupForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private userNotTakenValidatorService: UserNotTakenValidatorService,
                private signupService: SignupService,
                private router: Router) 
    {

    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: [
                '',
                [
                    Validators.required, 
                    Validators.email
                ]
            ],
            fullName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: [
                '',
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ],
        },{
			validator: userNamePassword
		})
    }

    signup() {
		if(this.signupForm.valid && !this.signupForm.pending){
			const newUser = this.signupForm.getRawValue() as NewUser;
			this.signupService.signup(newUser).subscribe(() => {
				this.router.navigate([''])
			}, err => {
				console.log(err)
			})
		}
    }
}