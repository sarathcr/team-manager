import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//ngx bootstrap
import { setTheme } from 'ngx-bootstrap/utils';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectEditorRoutingModule } from './project-editor-routing.module';
// containers
import { StepOneComponent } from './containers/step-one/step-one.component';
import { ContextualHelpComponent } from './containers/contextual-help/contextual-help.component';
// components
import { ProjectThumbnailComponent } from './components/project-thumbnail/project-thumbnail.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { EditorSidebarComponent } from './components/editor-sidebar/editor-sidebar.component';
import { ProjectTitleComponent } from './components/project-title/project-title.component';
import { StepMenuComponent } from './components/step-menu/step-menu.component';
import { StepTwoComponent } from './containers/step-two/step-two.component';
import { TextareaBulletsComponent } from './components/textarea-bullets/textarea-bullets.component';
import { InfoToolTipComponent } from './components/info-tooltip/info-tooltip.component';
import { StepSevenComponent } from './containers/step-seven/step-seven.component';
import { StepEightComponent } from './containers/step-eight/step-eight.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { StepThreeComponent } from './containers/step-three/step-three.component';
import { StepFourComponent } from './containers/step-four/step-four.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ModalContentComponent } from './components/modal-content/modal-content.component';
import { LinkComponent } from './components/link/link.component';
import { VideoThumbComponent } from './components/video-thumb/video-thumb.component';
import { StepFiveComponent } from './containers/step-five/step-five.component';
import { StepSixComponent } from './containers/step-six/step-six.component';
import { StepNineComponent } from './containers/step-nine/step-nine.component';
import { StepTenComponent } from './containers/step-ten/step-ten.component';
import { InputComponent } from './components/input/input.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
// pages
import { HomeComponent } from './containers/home/home.component';
import { EditorComponent } from './containers/editor/editor.component';

// ngx translate
import { TranslateModule } from '@ngx-translate/core';

// NgRx
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { ProjectEntityService } from './services/project/project-entity.service';
import { ProjectsResolver } from './services/project/projects.resolver';
import { ProjectsDataService } from './services/project/projects-data.service';
import { compareProjects } from 'src/app/shared/constants/project.model';
import { CountryEntityService } from './services/country/country-entity.service';
import { CountryDataService } from './services/country/country-data.service';
import { SubjectDataService } from './services/subject/subject-data.service';
import { SubjectEntityService } from './services/subject/subject-entity.service';
import { RegionEntityService } from './services/region/region-entity.service';
import { RegionDataService } from './services/region/region-data.service';
import { GradeDataService } from './services/grade/grade-data.service';
import { AcademicYearDataService } from './services/academic-year/academic-year-data.service';
import { AcademicYearEntityService } from './services/academic-year/academic-year-entity.service';
import { GradeEntityService } from './services/grade/grade-entity.service';
import { StatusComponent } from './components/status/status.component';
import { StepStatusEntityService } from './services/step-status/step-status-entity.service';
import { StepStatusDataService } from './services/step-status/step-status-data.service';
import { ProjectEditorComponent } from './project-editor.component';
import { EditorService } from './services/editor/editor.service';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

const entityMetadata: EntityMetadataMap = {
  Project: {
    sortComparer: compareProjects,
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Country: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Subject: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Region: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  Grade: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  AcademicYear: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
  StepStatus: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  }
};

@NgModule({
    declarations: [
        HomeComponent,
        EditorComponent,
        StepOneComponent,
        ProjectThumbnailComponent,
        CreateProjectComponent,
        EditorHeaderComponent,
        EditorSidebarComponent,
        ProjectTitleComponent,
        StepMenuComponent,
        StepTwoComponent,
        TextareaBulletsComponent,
        StatusComponent,
        InfoToolTipComponent,
        StepSevenComponent,
        StepEightComponent,
        TextareaComponent,
        StepThreeComponent,
        StepFourComponent,
        StepFiveComponent,
        StepSixComponent,
        StepNineComponent,
        StepTenComponent,
        ProjectEditorComponent,
        ContextualHelpComponent,
        AccordionComponent,
        ModalContentComponent,
        LinkComponent,
        VideoThumbComponent,
        VideoPlayerComponent,
        InputComponent,
        ImageUploadComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProjectEditorRoutingModule,
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        AccordionModule.forRoot(),
        ModalModule.forRoot()
    ],
    providers: [
        ProjectsResolver,
        ProjectEntityService,
        ProjectsDataService,
        CountryEntityService,
        CountryDataService,
        SubjectDataService,
        SubjectEntityService,
        RegionEntityService,
        RegionDataService,
        GradeDataService,
        GradeEntityService,
        AcademicYearDataService,
        AcademicYearEntityService,
        StepStatusEntityService,
        StepStatusDataService,
        EditorService,
        BsModalRef
    ]
})

export class ProjectEditorModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private projectsDataService: ProjectsDataService,
    private countryDataService: CountryDataService,
    private regionDataService: RegionDataService,
    private subjectDataService: SubjectDataService,
    private gradeDataService: GradeDataService,
    private academicYearDataService: AcademicYearDataService,
    private stepStatusDataService: StepStatusDataService) {

    // ngx-bootstrap theme
    setTheme('bs4');

    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Project', projectsDataService);
    entityDataService.registerService('Country', countryDataService);
    entityDataService.registerService('Subject', subjectDataService);
    entityDataService.registerService('Region', regionDataService);
    entityDataService.registerService('Grade', gradeDataService);
    entityDataService.registerService('AcademicYear', academicYearDataService);
    entityDataService.registerService('StepStatus', stepStatusDataService)
  }
}
