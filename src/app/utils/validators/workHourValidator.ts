import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export default (): ValidatorFn => {
    return ({ value }: AbstractControl): ValidationErrors | null => {
        const isValid = value >= '08:00' && value < '17:00'
        return isValid ? null : { workHour: { value } }
    }
}