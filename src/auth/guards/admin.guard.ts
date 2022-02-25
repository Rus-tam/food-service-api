import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    if (request.user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
