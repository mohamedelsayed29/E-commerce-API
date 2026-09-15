
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({value , metadata});
    if(value.password != value.confirmPassword){
        throw new Error("Password and Confirm Password do not match");
    } 
    return value;
  }
}
