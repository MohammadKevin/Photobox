import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FramesService {
  constructor(private readonly prisma: PrismaService) {}

  // USER
  async getActiveFrames() {
    return this.prisma.frame.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ADMIN
  async createFrame(data: {
    name: string;
    frameUrl: string;
    photoCount: number;
  }) {
    return this.prisma.frame.create({
      data: {
        name: data.name,
        frameUrl: data.frameUrl,
        photoCount: data.photoCount,
        isActive: true,
      },
    });
  }

  async deactivateFrame(id: number) {
    const frame = await this.prisma.frame.findUnique({ where: { id } });
    if (!frame) throw new NotFoundException('Frame not found');

    return this.prisma.frame.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async deleteFrame(id: number) {
    const frame = await this.prisma.frame.findUnique({ where: { id } });
    if (!frame) throw new NotFoundException('Frame not found');

    return this.prisma.frame.delete({ where: { id } });
  }
}
