import { Component } from "@angular/core";
import { FormControl, FormSubmittedEvent } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
    selector: "login-component",
    templateUrl: "./login.component.html",
    imports: [RouterLink]
})

export class LoginComponent {
    emailFormControl = new FormControl('');

    handleSubmit = (e : any) => {
        e.preventDefault();
        console.log(e);
    }
}