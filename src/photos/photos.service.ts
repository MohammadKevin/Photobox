import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async savePhoto(userId: number, imageUrl: string, frameIds: number[]) {
    // 1. buat photo utama
    const photo = await this.prisma.photo.create({
      data: { userId },
    });

    // 2. simpan variants per frame
    const variants = await Promise.all(
      frameIds.map((frameId) =>
        this.prisma.photoVariant.create({
          data: {
            photoId: photo.id,
            frameId,
            imageUrl,
          },
        }),
      ),
    );

    return {
      message: 'Preview generated',
      photoId: photo.id,
      variants,
    };
  }

  async getUserHistory(userId: number) {
    return this.prisma.photo.findMany({
      where: { userId },
      include: {
        variants: {
          include: { frame: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
