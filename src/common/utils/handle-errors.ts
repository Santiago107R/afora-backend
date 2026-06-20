import { BadRequestException, ForbiddenException, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

const logger = new Logger

export function handleError(error: any): never {
    if (error?.code === '23505') {
        throw new BadRequestException(error.detail);
    }

    if (error?.code === '23502') {
        throw new BadRequestException(`Missing required value for column: ${error.column}`);
    }

    if (error instanceof HttpException) {
        throw error;
    }

    logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
}