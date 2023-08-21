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
import { CategoryService } from './categories/services/category.service';
import { MysqlDataSource } from './datasources';
import { ProductService } from './products/services/product.service';
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
        dirs: ['health', 'auth', 'categories', 'products'],
        extensions: ['.controller.js'],
        nested: true,
      },
      repositories: {
        dirs: ['auth', 'categories', 'products'],
        extensions: ['.repository.js'],
        nested: true,
      },
    };

    this.dataSource(MysqlDataSource);
    this.binds();
  }

  private binds() {
    this.bind('logger').toClass(Logger);
    this.bind('auth.service').toClass(AuthService);
    this.bind('categories.service').toClass(CategoryService);
    this.bind('products.service').toClass(ProductService);
    this.bind('datasource').toClass(MysqlDataSource);
  }
}
