import { Controller, Get } from '@nestjs/common';
import { CatsFactService } from './catfacts.service';

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
  @Get('catfact')
  getFact() {
    return this.catsFactsService.getFact();
  }
}
