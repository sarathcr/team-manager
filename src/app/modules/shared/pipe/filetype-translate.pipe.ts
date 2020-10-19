import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'FiletypeTranslate', pure: false })
export class FiletypeTranslate implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'SHEET':
        return 'ADD_MATERIAL.material_add_type_table'
        break
      case 'DOCUMENT':
        return 'ADD_MATERIAL.material_add_type_doc'
        break
      case 'PRESENTATION':
        return 'ADD_MATERIAL.material_add_type_presentation'
        break
      case 'WEB':
        return 'ADD_MATERIAL.material_add_type_web'
        break
      case 'FORM':
        return 'ADD_MATERIAL.material_add_type_form'
        break
      case 'IMAGE':
        return 'ADD_MATERIAL.material_type_image'
        break
      case 'VIDEO':
        return 'ADD_MATERIAL.material_type_video'
        break
      case 'PDF':
        return 'ADD_MATERIAL.material_type_pdf'
        break
      case 'ARCHIVE':
        return 'ADD_MATERIAL.material_type_archivo'
        break
      case 'OTHER':
        return 'ACTIVITY_POPUPS.definition_generic_popup_other_label'
        break
    }
    return value
  }
}
