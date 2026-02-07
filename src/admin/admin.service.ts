import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const totalUsers = await this.prisma.user.count();
    const totalPhotos = await this.prisma.photo.count();

    return {
      totalUsers,
      totalPhotos,
    };
  }

  async getPhotos(userId?: string, name?: string) {
    return this.prisma.photo.findMany({
      where: {
        userId: userId ? Number(userId) : undefined,
        user: name ? { name: { contains: name } } : undefined,
      },
      include: {
        user: true,
        variants: {
          include: { frame: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
