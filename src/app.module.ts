import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { KeywordModule } from './keyword/keyword.module';
import { ExpanseModule } from './expanse/expanse.module';
import { UploadToExpanseModule } from './uploadToExpanse/uploadToExpanse.module';
import { CardTypeModule } from './cardType/cardtype.module';
import { MonthlyBudgetModule } from './monthlyBudget/monthlyBudget.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    CategoryModule,
    KeywordModule,
    ExpanseModule,
    UploadToExpanseModule,
    CardTypeModule,
    MonthlyBudgetModule,
  ],
})
export class AppModule {}
