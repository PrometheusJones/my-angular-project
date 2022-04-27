import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function rePasswordMatch(passwordFormControl: AbstractControl) {
    const validatorFunc: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
                passwordDontMatch: true
            }
        }

        return null;
    }
    return validatorFunc;
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null;
    }

    if (!/[a-z0-9\.\-\ ]{3,}@[a-z\.]{3,}\.[a-z]{2,3}/.test(value)) {
        return {
            email: true
        }
    }

    return null;
}

