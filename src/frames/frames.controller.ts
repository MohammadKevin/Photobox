import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FramesService } from './frames.service';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('frames')
export class FramesController {
  constructor(private readonly framesService: FramesService) {}

  // USER: ambil frame aktif
  @UseGuards(JwtGuard)
  @Get('active')
  getActiveFrames() {
    return this.framesService.getActiveFrames();
  }

  // ADMIN: tambah frame
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('ADMIN')
  @Post()
  createFrame(
    @Body()
    body: {
      name: string;
      frameUrl: string;
      photoCount: number;
    },
  ) {
    return this.framesService.createFrame(body);
  }

  // ADMIN: nonaktifkan frame (soft delete)
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('ADMIN')
  @Patch(':id/deactivate')
  deactivateFrame(@Param('id') id: string) {
    return this.framesService.deactivateFrame(Number(id));
  }

  // ADMIN: hapus permanen (opsional)
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteFrame(@Param('id') id: string) {
    return this.framesService.deleteFrame(Number(id));
  }
}
