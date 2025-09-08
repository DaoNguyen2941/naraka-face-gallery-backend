import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreatePageviewDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  visitorId: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsBoolean()
  @IsNotEmpty()
  newVisitor
}
