import { ModalConfig } from './modal-config.model'

export const ModalDelete: ModalConfig = {
  variant: 'delete',
  title: 'OBJECTIVES.project_objectives_delete_confirmation_title',
  description: 'OBJECTIVES.project_objectives_delete_confirmation_message_nonrelated',
  confirmLabel: 'PROJECT.project_button_delete',
  cancelLabel: 'PROJECT.project_button_cancel'
}

export const ModalUnlock: ModalConfig = {
  variant: 'unlock',
  title: 'PROJECT.project_dependancy_title_cv',
  description: 'CONTENT.project_content_dependancy_filterbycriteria_description',
  confirmLabel: 'CONTENT.project_content_dependancy_filterbycriteria_button'
}
