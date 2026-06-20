import { BadRequestException, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';

const logger = new Logger

export function handleDbError(error: any): never {
    if (error?.code === '23505') {
        throw new BadRequestException(error.detail);
    }

    if (error?.code === '23505') {
        throw new UnauthorizedException(error.detail)
    }

    logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
}