import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { JwtGuard } from '../common/guards/jwt.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    role: string;
  };
}

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(JwtGuard)
  @Post('save')
  savePhoto(
    @Req() req: AuthenticatedRequest,
    @Body()
    body: {
      imageUrl: string;
      frameIds: number[];
    },
  ) {
    return this.photosService.savePhoto(
      req.user.userId,
      body.imageUrl,
      body.frameIds,
    );
  }

  @UseGuards(JwtGuard)
  @Get('history')
  getHistory(@Req() req: AuthenticatedRequest) {
    return this.photosService.getUserHistory(req.user.userId);
  }
}
