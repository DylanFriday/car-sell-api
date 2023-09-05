import { rm } from "fs/promises"
import { join } from "path"
import { User } from "../src/users/users.entity";
import { Report } from "../src/reports/reports.entity";
import {DataSource,DataSourceOptions} from 'typeorm'
global.beforeEach(async ()=>{
    try{
        await rm(join(__dirname,'..','test.sqlite'))
    }catch(err){
        
    }
});

global.afterEach(async ()=>{
    const appDataSource = new DataSource ({
        type :'sqlite',
        database : ('DB_NAME'),
        synchronize : true,
        entities : [User,Report]
    })
    // const connection = new DataSource({
        
    // })
    // await connection.destroy()
})


          