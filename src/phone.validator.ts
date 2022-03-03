import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { phone } from 'phone';

@ValidatorConstraint({ name: 'customPhoneNumber', async: false })
export class PhoneNumber implements ValidatorConstraintInterface {
  validate(text: string) {
    return phone(text, { country: 'DE' }).isValid;
  }

  defaultMessage(): string {
    return 'Text ($value) is not a valid phone number';
  }
}
