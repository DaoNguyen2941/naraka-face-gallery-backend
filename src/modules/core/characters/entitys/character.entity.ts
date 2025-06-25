import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FaceEntity } from '../../faces/entitys/face.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('characters')
export class CharacterEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => FaceEntity, face => face.character)
    faces: FaceEntity[];

    @Column({ type: "varchar", nullable: true, default: 'https://pub-5c96059ac5534e72b75bf2db6c189f0c.r2.dev/default-avatar.png' })
    avatar: string;
}
