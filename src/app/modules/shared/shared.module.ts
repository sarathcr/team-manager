import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { TranslateModule } from '@ngx-translate/core'
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { NgxDropzoneModule } from 'ngx-dropzone'

import { CommonSharedModule } from 'src/app/common-shared/common-shared.module'

// Components
import { AddFileComponent } from './components/add-file/add-file.component'
import { BoxRowComponent } from './components/box-row/box-row.component'
import { CardExperienceComponent } from './components/card-experience/card-experience.component'
import { DetailsSelectorComponent } from './components/details-selector/details-selector.component'
import { EditableListComponent } from './components/editable-list/editable-list.component'
import { ExercisesCardComponent } from './components/exercises-card/exercises-card.component'
import { FilterComponent } from './components/filter/filter.component'
import { GoogleCardComponent } from './components/google-card/google-card.component'
import { ListboxComponent } from './components/listbox/listbox.component'
import { MaterialCardComponent } from './components/material-card/material-card.component'
import { MaterialLinkComponent } from './components/material-link/material-link.component'
import { PeopleCardComponent } from './components/people-card/people-card.component'
import { PresentationCardComponent } from './components/presentation-card/presentation-card.component'
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component'
import { SearchComponent } from './components/search/search.component'
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component'

// Pipes
import { FileName } from './pipe/filename-trim.pipe'
import { FiletypeTranslate } from './pipe/filetype-translate.pipe'
import { ListFilter } from './pipe/list-filter.pipe'
import { ReadMoreLinesComponent } from './read-more-lines/read-more-lines.component'

// Services
import { InvitationService } from './services/invitation/invitation.service'

@NgModule({
  declarations: [
    EditableListComponent,
    DetailsSelectorComponent,
    MaterialCardComponent,
    PresentationCardComponent,
    GoogleCardComponent,
    ExercisesCardComponent,
    MaterialLinkComponent,
    FilterComponent,
    SearchComponent,
    SidebarMenuComponent,
    ListboxComponent,
    ProfilePicComponent,
    PeopleCardComponent,
    BoxRowComponent,
    AddFileComponent,
    FileName,
    FiletypeTranslate,
    ListFilter,
    CardExperienceComponent,
    ReadMoreLinesComponent,
  ],
  imports: [
    CommonModule,
    CommonSharedModule,
    TranslateModule.forChild(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDropzoneModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports: [
    EditableListComponent,
    DetailsSelectorComponent,
    MaterialCardComponent,
    PresentationCardComponent,
    GoogleCardComponent,
    ExercisesCardComponent,
    MaterialLinkComponent,
    FilterComponent,
    SearchComponent,
    SidebarMenuComponent,
    ListboxComponent,
    ProfilePicComponent,
    PeopleCardComponent,
    BoxRowComponent,
    AddFileComponent,
    FileName,
    FiletypeTranslate,
    ListFilter,
    CardExperienceComponent,
    ReadMoreLinesComponent,
  ],
  providers: [InvitationService],
})
export class SharedModule {}
