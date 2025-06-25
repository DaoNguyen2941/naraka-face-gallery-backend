import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FaceEntity } from '../../faces/entitys/face.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { FileEntity } from '../../object-storage/entitys/file.entity';

@Entity('characters')
export class CharacterEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => FaceEntity, face => face.character)
    faces: FaceEntity[];

    @ManyToOne(() => FileEntity, { nullable: true, eager: true, cascade: ['insert'] })
    @JoinColumn({ name: 'avatar_id' })
    avatar?: FileEntity;
}