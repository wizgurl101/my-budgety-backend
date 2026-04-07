import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { KeywordModule } from './keyword/keyword.module';
import { ExpanseModule } from './expanse/expanse.module';
import { UploadToExpanseModule } from './uploadToExpanse/uploadToExpanse.module';
import { CardTypeModule } from './cardType/cardtype.module';
import { MonthlyBudgetModule } from './monthlyBudget/monthlyBudget.module';
import { GamesSpentAmountModule } from './gamesSpentAmount/gamesSpentAmount.module';
import { CategoryItemModule } from './categoryItem/categoryItem.module';
import { SubCategoryModule } from './subcategory/subcategory.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    RedisModule,
    CategoryModule,
    KeywordModule,
    ExpanseModule,
    UploadToExpanseModule,
    CardTypeModule,
    MonthlyBudgetModule,
    GamesSpentAmountModule,
    CategoryItemModule,
    SubCategoryModule,
  ],
})
export class AppModule {}
