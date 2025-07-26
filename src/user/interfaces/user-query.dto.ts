import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { QueryDTO } from "src/shared/interfaces/query.dto";

export class UserQueryDTO extends QueryDTO {}