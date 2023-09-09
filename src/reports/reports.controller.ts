import { Controller,Post,Body,UseGuards,Patch,Param } from '@nestjs/common';
import { CreateReportDto } from './DTO/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { ReportDto } from './DTO/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApprovedReportDto } from './DTO/ApprovedReportDto';
import { AdminGuard } from 'src/guards/admin.guard';
@Controller('reports')
export class ReportsController {
    constructor(private reportsService : ReportsService){}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportsService.create(body,user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approvedReport(@Param('id') id: string,@Body() body : ApprovedReportDto){
        return this.reportsService.changeApproval(id,body.approved)
    }


}
