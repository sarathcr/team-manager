import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { SubSink } from '../../../../../../shared/utility/subsink.utility'
import { Activity } from '../../../../constants/model/activity.model'
import { Project } from '../../../../constants/model/project.model'
import { DraggableRow } from '../../constants/model/draggable-row.model'
import { Box } from '../../constants/model/statistics-box.model'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  translations: string[]
  subscriptions = new SubSink()

  constructor(private translate: TranslateService) {}

  initDraggableRows(activities: Activity[], projectId: number): DraggableRow[] {
    if (!activities) {
      activities = []
    }
    const draggableRows: DraggableRow[] = []

    const dropdownData = [
      {
        icon: 'icon-ic_edit',
        text: this.translations['ACTIVITIES.activities_edit_title'],
        action: 'update',
      },
      {
        icon: 'icon-ic_duplicate',
        text: this.translations['ACTIVITIES.activities_duplicate'],
        action: 'clone',
      },
      {
        icon: 'icon-ic_delete',
        text: this.translations['ACTIVITIES.activities_delete'],
        action: 'delete',
      },
    ]

    for (const activity of activities) {
      const columnOne = { text: activity.name }
      const columnTwo = {
        text:
          (activity.duration ? activity.duration : '') +
          ' ' +
          this.translations['ACTIVITIES.activities_min'],
        icon: 'duration',
        disabled: !activity.duration,
      }
      const columnThree = {
        text:
          this.translations['ACTIVITIES.activity_card_objectives'] +
          (!activity.objectives || activity.objectives.length === 0
            ? ''
            : activity.objectives.map((obj) => ' ' + obj.id)),
        icon: 'objetivos',
        disabled: !activity.objectives || activity.objectives.length === 0,
      }
      const columFourCount = activity.exercises?.length
        ? activity.exercises.length
        : ''
      const columnFourText =
        activity.exercises?.length === 1
          ? this.translations['ACTIVITIES.activity_card_exercice']
          : this.translations['ACTIVITIES.activity_card_exercices']
      const columnFour = {
        text: columFourCount + '' + columnFourText,
        icon: 'actividades',
        disabled: !activity.exercises || activity?.exercises.length === 0,
      }
      let translationText = ''
      switch (activity.state) {
        case 'DEFINED':
          translationText = 'ACTIVITIES.activities_DEFINED'
          break
        case 'CREATED':
          translationText = 'ACTIVITIES.activities_CREATED'
          break
        case 'PUBLISHED':
          translationText = 'ACTIVITIES.activities_PUBLISHED'
          break
        case 'TO_DEFINE':
          translationText = 'ACTIVITIES.activities_TO_DEFINE'
          break
      }
      const columnFive = {
        text: translationText,
        step:
          activity.state === 'DEFINED'
            ? 1
            : 0 + activity.state === 'CREATED'
            ? 1
            : 0 + activity.state === 'PUBLISHED'
            ? 1
            : 0,
      }
      const draggableRow: DraggableRow = {
        id: activity.id,
        url: '/editor/project/' + projectId + '/activity',
        dropdownElements: dropdownData,
        columnOne,
        columnTwo,
        columnThree,
        columnFour,
        columnFive,
      }
      draggableRows.push(draggableRow)
    }

    return draggableRows
  }

  initBoxesData(activities: Activity[], project: Project): Box[] {
    const boxes: Box[] = []
    if (!activities) {
      activities = []
    }
    const box1 = {
      title:
        activities.length +
        ' ' +
        (activities.length !== 1
          ? this.translations['ACTIVITIES.activities_title_activities']
          : this.translations['ACTIVITIES.activities_title_activity']),
      supertitle: this.translations['ACTIVITIES.activities_title_pre'],
      phases: [
        {
          text: this.translations['ACTIVITIES.activities_phase_initial'],
          total: 0,
        },
        {
          text: this.translations['ACTIVITIES.activities_phase_development'],
          total: 0,
        },
        {
          text: this.translations['ACTIVITIES.activities_phase_syntesis'],
          total: 0,
        },
      ],
    }

    let totalObjectives = 0
    let objectives = 0
    let totalExercises = 0
    let exercises = 0
    let totalTimeActivities = 0
    for (const activity of activities) {
      totalTimeActivities += activity.duration ? activity.duration : 0
      totalObjectives += activity.objectives ? activity.objectives.length : 0
      objectives +=
        activity.objectives && activity.state !== 'TO_DEFINE'
          ? activity.objectives.length
          : 0
      totalExercises += activity.exercises ? activity.exercises.length : 0
      exercises +=
        activity.exercises && activity.state !== 'TO_DEFINE'
          ? activity.exercises.length
          : 0
      if (activity.phase === 'INITIAL') {
        box1.phases[0].total += 1
      } else if (activity.phase === 'DEVELOP') {
        box1.phases[1].total += 1
      } else if (activity.phase === 'SYNTHESIS') {
        box1.phases[2].total += 1
      }
      if (activity.state !== 'TO_DEFINE') {
        totalObjectives += 1
      }
    }

    const hasMinutes = totalTimeActivities % 60 > 0
    const hasHours = Math.round(totalTimeActivities / 60) > 0
    const box2 = {
      title: this.translations['ACTIVITIES.activities_title_time'],
      infoText:
        project.didacticSeqDuration && project.didacticSeqDuration > 0
          ? this.translations['ACTIVITIES.activities_content_time']
          : this.translations[
              'ACTIVITIES.activities_card_duration_project_title'
            ],
      chartText:
        (hasHours ? Math.round(totalTimeActivities / 60) : '0') +
        (hasMinutes ? ':' + (totalTimeActivities % 60) : '') +
        'h',
      icon: 'duration',
      progress:
        project.didacticSeqDuration !== null &&
        project.didacticSeqDuration !== 0
          ? (totalTimeActivities * 100) / project.didacticSeqDuration
          : 0,
      hasValue:
        project.didacticSeqDuration !== null &&
        project.didacticSeqDuration !== 0,
      actionValue:
        project.didacticSeqDuration !== null &&
        project.didacticSeqDuration !== 0
          ? project.didacticSeqDuration + ''
          : '',
      actionValueUnit: 'h',
    }

    const box3 = {
      title: this.translations['ACTIVITIES.activities_title_objectives'],
      icon: 'objetivos',
      charDoubleValue: {
        current: '' + objectives,
        total: '' + totalObjectives,
      },
      progress: (objectives * 100) / totalObjectives,
      infoText: this.translations[
        'ACTIVITIES.activities_card_objectives_placeholder'
      ],
    }
    const box4 = {
      title: this.translations['ACTIVITIES.activities_title_califications'],
      icon: 'actividades',
      infoText: this.translations[
        'ACTIVITIES.activities_card_exercises_placeholder'
      ],
      charDoubleValue: {
        current: '' + exercises,
        total: '' + totalExercises,
      },
      progress: totalExercises ? (exercises * 100) / totalExercises : 0,
    }

    boxes.push(box1)
    boxes.push(box2)
    boxes.push(box3)
    boxes.push(box4)
    return boxes
  }

  initTranslations(): void {
    this.subscriptions.sink = this.translate
      .stream([
        'ACTIVITIES.activities_min',
        'ACTIVITIES.activity_card_objectives',
        'ACTIVITIES.activity_card_exercices',
        'ACTIVITIES.activity_card_exercice',
        'ACTIVITIES.singular_objective',
        'ACTIVITIES.activities_TO_DEFINE',
        'ACTIVITIES.activities_CREATED',
        'ACTIVITIES.activities_PUBLISHED',
        'ACTIVITIES.activities_edit_title',
        'ACTIVITIES.activities_duplicate',
        'ACTIVITIES.activities_delete',
        'ACTIVITIES.activities_title_pre',
        'ACTIVITIES.activities_phase_initial',
        'ACTIVITIES.activities_phase_development',
        'ACTIVITIES.activities_phase_syntesis',
        'ACTIVITIES.activities_content_time',
        'ACTIVITIES.activities_content_objectives',
        'ACTIVITIES.activities_link_view',
        'ACTIVITIES.activities_link_assign',
        'ACTIVITIES.activities_title_time',
        'ACTIVITIES.activities_title_objectives',
        'ACTIVITIES.activities_title_califications',
        'ACTIVITIES.activities_title_activities',
        'ACTIVITIES.activities_card_duration_project_title',
        'ACTIVITIES.activities_card_duration_project_title',
        'ACTIVITIES.activities_card_objectives_placeholder',
        'ACTIVITIES.activities_card_exercises_placeholder',
        'ACTIVITIES.activities_card_duration_project_hours',
        'ACTIVITIES.activities_card_duration_project_input',
        'ACTIVITIES.activities_project_button_save',
        'ACTIVITIES.activities_title_activity',
      ])
      .subscribe((translations) => {
        this.translations = translations
      })
  }

  initModalForm(type: string, data?: Activity, project?: Project): any {
    if (type === 'update') {
      return {
        title: 'ACTIVITIES.activities_header_update',
        label: 'ACTIVITIES.activities_update_label',
        confirmLabel: 'ACTIVITIES.activities_update',
        data: data ? data.name : '',
        innerLabel: '',
        maxLength: 70,
      }
    } else if (type === 'create') {
      return {
        title: 'ACTIVITIES.activities_new_activity',
        label: 'ACTIVITIES.activities_update_label',
        confirmLabel: 'ACTIVITIES.activities_new',
        data: data.name,
        innerLabel: '',
        maxLength: 70,
        inputType: 'text',
      }
    } else if (type === 'clone') {
      return {
        title: 'ACTIVITIES.activities_duplicate_label',
        label: 'ACTIVITIES.activities_update_label',
        confirmLabel: 'ACTIVITIES.activities_new',
        data: data.name,
        innerLabel: '',
        maxLength: 70,
        inputType: 'text',
      }
    }
  }

  initModalProjectTimeForm(project: Project): any {
    return {
      title: 'ACTIVITIES.activities_card_duration_project_title',
      label: 'ACTIVITIES.activities_card_duration_project_input',
      confirmLabel: 'ACTIVITIES.activities_project_button_save',
      data:
        project.didacticSeqDuration !== null
          ? project.didacticSeqDuration / 60
          : '',
      innerLabel: 'ACTIVITIES.activities_card_duration_project_hours',
      maxLength: '',
      inputVariant: 'number',
    }
  }
}
