import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
    getAllProducts():string{
        return "Get All Products"
    }
}