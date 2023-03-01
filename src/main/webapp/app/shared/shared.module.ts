import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MomoAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MomoAppSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MomoAppSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MomoAppSharedModule {
  static forRoot() {
    return {
      ngModule: MomoAppSharedModule
    };
  }
}
