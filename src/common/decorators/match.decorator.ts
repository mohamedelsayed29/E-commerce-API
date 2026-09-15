import { 
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({name:"match_between_feilds", async: true })
export class MatchBetweenFeilds<T = any> implements ValidatorConstraintInterface {
  validate(value: T, args: ValidationArguments) {    
    return value === args.object[args.constraints[0]]
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Password missMatch with Confirm Password"
  }
  
}


export function IsMatch<T = any>(constraints:string[],validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: MatchBetweenFeilds,
    });
  };
}

