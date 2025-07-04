import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DocsLayoutComponent } from '../../components/docs/layout/docs-layout.component';
import { DocsSpiderlyMenuItem } from '../../components/docs/layout/sidebar/docs-sidebar-menu.component';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  imports: [
    CommonModule,
    DocsLayoutComponent,
],
})
export class DocsComponent {
    menu: DocsSpiderlyMenuItem[] = [
      {
        items: [
          {
            label: 'Getting Started', 
            icon: 'pi pi-fw pi-home', 
            routerLink: '/docs/getting-started',
          },
          {
            separator: true,
          },
          {
            label: 'Entity',
            icon: 'pi pi-fw pi-building',
            items: [
              {
                label: 'Add New Entity', 
                icon: 'pi pi-fw pi-file-plus', 
                routerLink: '/docs/add-new-entity',
              },
              {
                label: 'Entity Validation', 
                icon: 'pi pi-fw pi-shield', 
                routerLink: '/docs/entity-validation',
              },
              {
                label: 'Entity Authorization', 
                icon: 'pi pi-fw pi-lock', 
                routerLink: '/docs/entity-authorization',
              },
            ]
          },
          {
            label: 'Customize UI', 
            icon: 'pi pi-fw pi-palette', 
            routerLink: '/docs/ui-customization',
          },
          {
            label: 'Translate Spiderly App', 
            icon: 'pi pi-fw pi-flag', 
            routerLink: '/docs/translate-spiderly-app',
          },
          {
            label: 'Attributes', 
            icon: 'pi pi-fw pi-tag', 
            routerLink: '/docs/attributes',
          },
        ]
      }
    ];
  
  constructor(
    private metaService: Meta
  ) {
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }


}
