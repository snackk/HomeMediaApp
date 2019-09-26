import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'analytics',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs-analytics/tabs-analytics.module').then(m => m.TabsAnalyticsModule)
          }
        ]
      },
      {
        path: 'led',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs-led/tabs-led.module').then(m => m.TabsLedPModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/analytics',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/analytics',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
