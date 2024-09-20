// src/utils/fixed-account.service.ts

import { Injectable } from '@nestjs/common';
import { FixedAccount } from './fixed-account.model';

@Injectable()
export class FixedAccountService {
  private fixedAccounts: FixedAccount[] = [
    new FixedAccount('Add1Sponsor', '0xe9d2a0781d3297b183effbe798d43dcd3b39662c0538ba19265832e945b3cccf', 10000000000,0),
    new FixedAccount('Add2Sender', '0x24709573ca85741a12b645837e2e11c81e4c857a6e62a24d2bb85576b4192856', 0,1000),
    new FixedAccount('Add2Receiver', '0x10c6fc9e944a6895738a547ded7ff1c69cc7f277829f8630693d4f469541c272', 0,1000),
  ];

  getFixedAccounts(): FixedAccount[] {
    return this.fixedAccounts;
  }
}
