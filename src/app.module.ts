import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from "./category/category.module";
import { KeywordModule} from "./keyword/keyword.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      CategoryModule,
      KeywordModule
  ],
})
export class AppModule {}
