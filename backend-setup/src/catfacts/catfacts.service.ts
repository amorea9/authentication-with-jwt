//send https request to the catfacts api
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CatsFactService {
  constructor(private httpService: HttpService) {}

  async getFact() {
    const response = await firstValueFrom(
      this.httpService.get('https://cat-fact.herokuapp.com/facts'),
    );
    return response.data;
  }

  getAllCatsFacts(): string {
    return 'All cats facts';
  }
  getOneCatsFact(): string {
    return 'One cats fact';
  }
}
