import { Injectable } from "@nestjs/common";
import { LikeEntity } from "./like.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class LikeRepository extends Repository<LikeEntity> {
    constructor(private dataSource: DataSource) {
        super(LikeEntity, dataSource.createEntityManager());
    }

    async createLike(data: Partial<LikeEntity>): Promise<LikeEntity> {
        const newLike = this.create(data);
        return this.save(newLike);
    }
}