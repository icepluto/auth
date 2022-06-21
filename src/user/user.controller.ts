import { Body, Controller, Get, HttpStatus, Post, Req, Res, Session } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './models/CreateUserDto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import {Request, Response} from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('')
    @ApiOperation({ summary: 'Get userlist' })
    @ApiResponse({ status: 200, description: 'User Found' })
    @ApiResponse({ status: 404, description: 'User Not found' })
    public async getAllUsers(@Req() req: Request, @Res() res, @Session() session) {
        const users: UserEntity[] = await this.userService.findAll();
        return res
            .status(HttpStatus.OK)
            .send(users);
    }
    @Post('')
    @ApiOperation({ summary: 'Create User' })
    public async create(@Body() createUser: CreateUserDto, @Res() res) {
        await this.userService.createUser(createUser);
        return res.status(HttpStatus.CREATED).send();
    }
}
