import { Module } from "@nestjs/common";
import { KeywordService } from "./keyword.service";
import { KeywordController } from "./keyword.controller";
import { BigQueryService } from "../db/bigQuery/bigquery.service";
import { UuidService} from "../utils/uuid/uuid.service";

@Module({
    controllers: [KeywordController],
    providers: [KeywordService, BigQueryService, UuidService],
})

export class KeywordModule {}