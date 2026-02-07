import { Module } from '@nestjs/common';
import { FramesController } from './frames.controller';
import { FramesService } from './frames.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FramesController],
  providers: [FramesService, PrismaService],
})
export class FramesModule {}
