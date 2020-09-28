import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EntityDataService, EntityDefinitionService } from '@ngrx/data'
import { entityMetadata } from './entity/entity-metadata'
import { RoleDataService } from './entity/role/role-data.service'
import { RoleEntityService } from './entity/role/role-entity.service'
import { UserDataService } from './entity/user/user-data.service'
import { UserEntityService } from './entity/user/user-entity.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserDataService,
    UserEntityService,
    RoleDataService,
    RoleEntityService,
  ],
})
export class AuthStoreModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private UserService: UserDataService,
    private RoleService: RoleDataService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerServices({
      User: UserService,
      Role: RoleService,
    })
  }
}
