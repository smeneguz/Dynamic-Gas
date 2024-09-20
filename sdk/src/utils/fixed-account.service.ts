// src/utils/fixed-account.service.ts

import { Injectable } from '@nestjs/common';
import { FixedAccount } from './fixed-account.model';

@Injectable()
export class FixedAccountService {
  private fixedAccounts: FixedAccount[] = [
    new FixedAccount('Add1Sponsor', '0xe9d2a0781d3297b183effbe798d43dcd3b39662c0538ba19265832e945b3cccf', 10000000000),
    new FixedAccount('Add2Sender', 'address2', 0),
    new FixedAccount('Add2Receiver', 'address3', 0),
  ];

  getFixedAccounts(): FixedAccount[] {
    return this.fixedAccounts;
  }
}
