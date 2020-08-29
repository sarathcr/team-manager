import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EntityDataService, EntityDefinitionService } from '@ngrx/data'
import { entityMetadata } from './entity/entity-metadata'
import { HelpDataService } from './entity/help/help-data.service'
import { HelpEntityService } from './entity/help/help-entity.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HelpEntityService, HelpDataService],
})
export class ContextualHelpStoreModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private contextualHelpService: HelpDataService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerServices({
      ContextualHelp: contextualHelpService,
    })
  }
}
