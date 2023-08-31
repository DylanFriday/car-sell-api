import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/DTO/user.dto";

interface classConstructor{
    new (...args: any[]): {}
}

export  function Serialize(dto : classConstructor){
    return UseInterceptors(new SerializerInterceptor(dto));
}


export class SerializerInterceptor implements NestInterceptor{
    constructor(private dto : any){

    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
     
        return next.handle().pipe(
            map ((data : any)=>{
              return plainToClass(UserDto,data,{
                excludeExtraneousValues : true
              })
            })
        )
        
    }
}