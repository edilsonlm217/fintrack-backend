import { ConfigService } from '@nestjs/config';

export const getNeo4jConfig = (configService: ConfigService) => {
  return {
    uri: configService.get<string>('NEO4J_URI'),
    username: configService.get<string>('NEO4J_USERNAME'),
    password: configService.get<string>('NEO4J_PASSWORD'),
  };
};
