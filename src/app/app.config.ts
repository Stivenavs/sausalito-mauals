import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideMarkdown, MERMAID_OPTIONS } from 'ngx-markdown';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(),
    provideMarkdown({
      loader: HttpClient,
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          theme: 'base',
          themeVariables: {
            primaryColor: '#e4f2f6',
            primaryTextColor: '#16261d',
            primaryBorderColor: '#2b7f9e',
            secondaryColor: '#f5e9df',
            secondaryTextColor: '#16261d',
            secondaryBorderColor: '#b5652f',
            tertiaryColor: '#f6f7f4',
            tertiaryTextColor: '#16261d',
            tertiaryBorderColor: '#e3e6df',
            lineColor: '#2f6b4f',
            textColor: '#16261d',
            nodeTextColor: '#16261d',
            mainBkg: '#e4f2f6',
            nodeBorder: '#2b7f9e',
            titleColor: '#16261d',
            edgeLabelBackground: '#f6f7f4',
            fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
          },
        },
      },
    }),
  ],
};
