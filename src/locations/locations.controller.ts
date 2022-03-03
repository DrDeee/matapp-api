import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateLocationDto,
  LocationDto,
  UpdateLocationDto,
} from 'src/dtos/locations.dtos';
import { LocationsService } from './locations.service';

@Controller('locations')
@ApiBearerAuth()
@ApiTags('Locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOkResponse({ type: [LocationDto] })
  async getAll() {
    return await this.locationsService.getAllLocations();
  }

  @Post()
  @ApiCreatedResponse({
    type: LocationDto,
  })
  async create(@Body() newLocation: CreateLocationDto) {
    return await this.locationsService.createNewLocation(newLocation);
  }

  @Get('/:id')
  @ApiOkResponse({ type: LocationDto })
  @ApiNotFoundResponse()
  async getOne(@Param('id') id: string) {
    const location = await this.locationsService.getLocationById(id);
    if (location) return location;
    throw new NotFoundException();
  }

  @Put('/:id')
  @ApiOkResponse({ type: LocationDto })
  @ApiNotFoundResponse()
  async updateOne(@Param('id') id: string, @Body() updates: UpdateLocationDto) {
    const location = await this.locationsService.updateLocationById(
      id,
      updates,
    );
    if (location) return location;
    throw new NotFoundException();
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    const location = await this.locationsService.deleteLocationById(id);
    if (location) return;
    throw new NotFoundException();
  }

  @Post('/:id/members/:userId')
  @ApiOkResponse({ type: LocationDto })
  @ApiNotFoundResponse()
  async addMember(@Param('id') id: string, @Param('userId') userId: string) {
    const location = await this.locationsService.addUserToLocation(id, userId);
    if (location === 'no_user') throw new NotFoundException('User not found');
    else if (location == null)
      throw new NotFoundException('Location not found');
    return location;
  }

  @Delete('/:id/members/:userId')
  @ApiOkResponse({ type: LocationDto })
  @ApiNotFoundResponse()
  async removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    const location = await this.locationsService.removeUserFromLocation(
      id,
      userId,
    );
    if (location === 'no_user') throw new NotFoundException('User not found');
    else if (location == null)
      throw new NotFoundException('Location not found');
    return location;
  }
}
