import { Module } from '@nestjs/common';
import { CharactersModule } from 'src/modules/core/characters/characters.module';
import { PublicCharacterController } from './character.controller';

@Module({
  imports: [CharactersModule],
  controllers: [PublicCharacterController],
})
export class PublicCharacterModule {}
