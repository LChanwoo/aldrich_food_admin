import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super(
      super({
        usernameField: 'email',
        passwordField: 'password',
    })
    )
  }

  async validate(email:string ,password : string, done: any,){
    try{
      return true
    }catch(err){
        return false;
    }
  }
}