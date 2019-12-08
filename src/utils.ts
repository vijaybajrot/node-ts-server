import { ValidationError } from "class-validator";

export function mapErrors(errors: ValidationError[]): any {
  return errors.map(error => ({
    path: error.property,
    messages: error.constraints
  }));
}
