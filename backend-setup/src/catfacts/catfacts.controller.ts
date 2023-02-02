import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsFactService } from './catfacts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('catsfacts')
export class CatfactsController {
  constructor(private catsFactsService: CatsFactService) {}
  @Get('allcatsfacts')
  getCatsFacts(): string {
    return this.catsFactsService.getAllCatsFacts();
  }
  @Get('onecatsfact')
  getOneCatsFact(): string {
    return this.catsFactsService.getOneCatsFact();
  }
  @UseGuards(JwtAuthGuard)
  @Get('catfact')
  getFact() {
    return this.catsFactsService.getFact();
  }
}
