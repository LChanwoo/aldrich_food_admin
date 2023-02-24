/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller("/api/user")
export class UsersController { 
    constructor(
        private readonly userService: UsersService
    ) { }
    
    @Post()
    async create(@Body() body :User): Promise<User> {
        return this.userService.create(body);
    }
}
