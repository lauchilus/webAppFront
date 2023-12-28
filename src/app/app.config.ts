import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggerInterceptor } from './logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideNoopAnimations(),importProvidersFrom(HttpClientModule), provideHttpClient(withInterceptors([
    loggerInterceptor,
  ]))]
};
