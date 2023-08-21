import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import { AuthService } from './auth/services/auth.service';
import { MysqlDataSource } from './datasources';
import { Logger } from './shared/logger/logger';
import { CustomSequence } from './shared/middlewares/sequence';

export { ApplicationConfig };

export class BolsiyoTechChallengeApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.sequence(CustomSequence);
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['health', 'auth'],
        extensions: ['.controller.js'],
        nested: true,
      },
      repositories: {
        dirs: ['auth'],
        extensions: ['.repository.js'],
        nested: true,
      },
      models: {
        dirs: ['auth'],
        extensions: ['.model.js'],
        nested: true,
      },
    };

    this.dataSource(MysqlDataSource);
    this.binds();

  }

  private binds() {
    this.bind('logger').toClass(Logger);
    this.bind('auth.service').toClass(AuthService);
    this.bind('datasource').toClass(MysqlDataSource);
  }

}
