import {
  Controller
} from '@nestjs/common';

@Controller()
export abstract class BaseController {
  constructor(
    protected readonly service: any,
  ) { }
}
