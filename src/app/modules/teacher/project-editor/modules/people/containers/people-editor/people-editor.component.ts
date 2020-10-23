import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { UserService } from 'src/app/modules/auth/services/user/user.service'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'
import {
  Collaborator,
  CollaboratorFilter,
  CollaboratorFilterByProfileType,
  CollaboratorList,
  InvitationStatus,
  ProfileType,
} from '../../../../constants/model/collaborator'
import {
  InvitationErrorResponse,
  InvitationErrorTitle,
  InvitationModalConfig,
  InvitationModalData,
  InvitationModalUserType,
  InvitationModalView,
} from '../../constants/model/invitation.model'
import { PeopleService } from '../../services/people.service'

@Component({
  selector: 'app-people-editor',
  templateUrl: './people-editor.component.html',
  styleUrls: ['./people-editor.component.scss'],
})
export class PeopleEditorComponent implements OnInit, OnDestroy {
  localExperienceType: number
  experienceId = 0
  currentUserEmail = ''
  modalRef: BsModalRef
  loading = true
  isEmpty = true
  collaborators: CollaboratorFilterByProfileType
  collaboratorList = {
    users: [],
    userCount: 0,
  }
  pendingInvitations: Collaborator[] = []
  filteredInvitations: Collaborator[] = []
  filterList: CollaboratorFilter[]
  modalButtonDisabled = true
  modalLoading = false
  addedEmails: string[]
  studentTabs: string[]
  teacherInvitationConfig: InvitationModalData
  studentInvitationConfig: InvitationModalData
  invitationSuccessModal: InvitationModalData
  errorModalData: InvitationModalData
  modalErrorTitle: InvitationErrorTitle
  modalErrors: InvitationErrorResponse
  modalData: InvitationModalData
  modalConfig: InvitationModalConfig
  modalView: InvitationModalView = 'INVITATION'
  teacherAcceptedLoading = true
  studentAcceptedLoading = true
  emptyInvitedLoading = true
  emptyDeniedLoading = true
  subscriptions = new SubSink()
  currentFilterId: 1 | 2 | 3 = 1
  loadingDetail: string
  @ViewChild('invitationModal') invitationModal: TemplateRef<any>
  constructor(
    private editor: EditorService,
    private modalService: BsModalService,
    private translate: TranslateService,
    private peopleServcie: PeopleService,
    private userServcie: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localExperienceType = this.editor.getLocalExperienceType()
    this.collaboratorListInit()
    this.InvitationModalInit()
    this.getTranslations()
    this.subscriptions.sink = this.userServcie.getUser().subscribe((user) => {
      this.currentUserEmail = user?.email
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  collaboratorListInit(): void {
    this.experienceId = +this.router.url
      .split(`/editor/${this.editor.getExperienceUrl()}/`)[1]
      .split('/')[0]
    this.collaborators = {
      teacher: {
        invited: {
          users: [],
          userCount: 0,
        },
        accepted: {
          users: [],
          userCount: 0,
        },
        denied: {
          users: [],
          userCount: 0,
        },
      },
      student: {
        invited: {
          users: [],
          userCount: 0,
        },
        accepted: {
          users: [],
          userCount: 0,
        },
        denied: {
          users: [],
          userCount: 0,
        },
      },
    }
    this.getListData()
  }

  InvitationModalInit(): void {
    this.modalConfig = {
      view: 'INVITATION',
      userType: 'TEACHER',
    }
    this.studentTabs = [
      'PEOPLE-INVITE-STUDENT.invite_popup_student_mail_tab',
      'PEOPLE-INVITE-STUDENT.invite_popup_student_classroom_tab',
    ]
    this.teacherInvitationConfig = {
      title: 'PEOPLE-INVITE-TEACHER.invite_popup_teacher_title',
      confirmLabel: 'PEOPLE-INVITE-GENERAL.action_send',
      label: 'PEOPLE-INVITE-TEACHER.invite_popup_teacher_mail_input_label',
      placeholder: '',
    }
    this.studentInvitationConfig = {
      title: 'PEOPLE-INVITE-STUDENT.invite_popup_student_title',
      confirmLabel: 'PEOPLE-INVITE-GENERAL.action_send',
      label: 'PEOPLE-INVITE-STUDENT.invite_popup_student_mail_input_label',
      placeholder: '',
    }
    this.invitationSuccessModal = {
      title: 'PEOPLE-INVITE-GENERAL.invite_popup_confirmation_title',
      description:
        'PEOPLE-INVITE-TEACHER.invite_popup_teacher_confirmation_message',
      confirmLabel: 'PROJECT.project_button_gotit',
    }
    this.errorModalData = {
      title: 'PEOPLE-INVITE-GENERAL.invite_popup_error1_title',
      description: 'PEOPLE-INVITE-GENERAL.invite_popup_error1_message_teacher',
      confirmLabel: 'PROJECT.project_button_gotit',
    }
    this.modalErrorTitle = {
      inExperience: 'PEOPLE-INVITE-GENERAL.invite_popup_error1_reason1',
      invitationPending: 'PEOPLE-INVITE-GENERAL.invite_popup_error1_reason2',
      notTeacher: 'PEOPLE-INVITE-GENERAL.invite_popup_error1_reason3',
      notStudent: 'PEOPLE-INVITE-GENERAL.invite_popup_error1_reason4',
    }
  }

  changeCaseFirstLetter(
    text: string,
    caseType: 'toLowerCase' | 'toUpperCase' = 'toLowerCase'
  ): string {
    return text.charAt(0)[caseType]() + text.slice(1)
  }

  getListData(): void {
    if (this.experienceId) {
      this.getCollaborators('TEACHER', 'ACCEPTED')
      this.getCollaborators('STUDENT', 'ACCEPTED')
      this.getCollaborators('EMPTY', 'INVITED')
      this.getCollaborators('EMPTY', 'DENIED')
    }
  }

  setPendingInvitations(): void {
    this.pendingInvitations = [
      ...this.collaborators.teacher.invited.users,
      ...this.collaborators.teacher.denied.users,
      ...this.collaborators.student.invited.users,
      ...this.collaborators.student.denied.users,
    ]
    this.filterPending()
  }

  getCollaborators(
    userType: ProfileType,
    invitationStatus: InvitationStatus
  ): void {
    const query = `?invitationStatus=${invitationStatus}&profile=${userType}`
    this.subscriptions.sink = this.peopleServcie
      .getCollaborators(this.experienceId, query)
      .subscribe((data: CollaboratorList) => {
        const profileType = userType.toLowerCase()
        const capitalizedStatus = this.changeCaseFirstLetter(
          invitationStatus.toLowerCase(),
          'toUpperCase'
        )
        this[`${profileType}${capitalizedStatus}Loading`] = false
        if (
          !this.teacherAcceptedLoading &&
          !this.studentAcceptedLoading &&
          !this.emptyInvitedLoading &&
          !this.emptyDeniedLoading
        ) {
          this.loading = false
        }
        if (!!data?.users?.length) {
          this.isEmpty = false
        }
        const teachers = data.users?.filter(
          (user) => user.profile === 'TEACHER'
        )
        const students = data.users?.filter(
          (user) => user.profile === 'STUDENT'
        )
        let teachersStatus
        let studentsStatus
        if (teachers.length) {
          teachersStatus = this.getCollaboratorListFromFilter(
            teachers,
            invitationStatus
          )
        }
        if (teachersStatus) {
          this.updateCollaboratorData(
            'TEACHER',
            invitationStatus,
            teachersStatus
          )
        }
        if (students.length) {
          studentsStatus = this.getCollaboratorListFromFilter(
            students,
            invitationStatus
          )
        }
        if (studentsStatus) {
          this.updateCollaboratorData(
            'STUDENT',
            invitationStatus,
            studentsStatus
          )
        }
      })
  }

  updateCollaboratorData(
    profileType: ProfileType,
    statusType: InvitationStatus,
    status: CollaboratorList
  ): void {
    const userType = profileType.toLowerCase()
    const collaboratorStatus = statusType.toLowerCase()
    this.collaborators[userType][collaboratorStatus] = status
    if (statusType !== 'ACCEPTED') {
      this.setPendingInvitations()
    }
  }

  getCollaboratorListFromFilter(
    users: Collaborator[],
    invitationStatus: InvitationStatus
  ): CollaboratorList {
    return {
      users: users.map((user) => ({
        ...user,
        checked: false,
        inviteLable: 'Invite text',
        invitationStatus,
      })),
      userCount: users.length,
    }
  }

  filterPending(selectedItemId?: 1 | 2 | 3): void {
    if (selectedItemId) {
      this.currentFilterId = selectedItemId
    }
    const type = this.filterList.find(
      (item) => item.id === this.currentFilterId
    ).type
    if (type === 'ALL') {
      this.filteredInvitations = [...this.pendingInvitations]
    } else {
      const userType = type.toLowerCase()
      this.filteredInvitations = [
        ...this.collaborators[userType].invited.users,
        ...this.collaborators[userType].denied.users,
      ]
    }
  }

  getTranslations(): void {
    this.subscriptions.sink = this.translate
      .stream([
        'PEOPLE-INVITE-TEACHER.invite_popup_teacher_mail_input_placeholder',
        'PEOPLE-INVITE-STUDENT.invite_popup_student_mail_input_placeholder',
        'PEOPLE-EMPTY-STATE.people_pending_filter_all',
        'PEOPLE-EMPTY-STATE.people_teachers',
        'PEOPLE-EMPTY-STATE.people_students',
        'PEOPLE-INVITE-GENERAL.spinner_sending_people_invitations',
      ])
      .subscribe((translations) => {
        this.filterList = [
          {
            name: translations['PEOPLE-EMPTY-STATE.people_pending_filter_all'],
            id: 1,
            type: 'ALL',
          },
          {
            name: translations['PEOPLE-EMPTY-STATE.people_teachers'],
            id: 2,
            type: 'TEACHER',
          },
          {
            name: translations['PEOPLE-EMPTY-STATE.people_students'],
            id: 3,
            type: 'STUDENT',
          },
        ]
        this.teacherInvitationConfig.placeholder =
          translations[
            'PEOPLE-INVITE-TEACHER.invite_popup_teacher_mail_input_placeholder'
          ]
        this.studentInvitationConfig.placeholder =
          translations[
            'PEOPLE-INVITE-STUDENT.invite_popup_student_mail_input_placeholder'
          ]
        this.modalData = { ...this.teacherInvitationConfig }
        this.loadingDetail =
          translations[
            'PEOPLE-INVITE-GENERAL.spinner_sending_people_invitations'
          ]
      })
  }

  deleteInvitation(emails: string[]): void {
    const deleteSubscription = new SubSink()
    deleteSubscription.sink = this.peopleServcie
      .removeCollaborator(this.experienceId, emails)
      .subscribe(() => {
        deleteSubscription.unsubscribe()
        this.pendingInvitations = this.pendingInvitations.filter(
          (item) => !emails.includes(item.email)
        )
        this.updateRemovedEmails(emails)
        if (
          !this.pendingInvitations.length &&
          !this.collaborators.teacher.accepted.users.length &&
          !this.collaborators.student.accepted.users.length
        ) {
          this.isEmpty = true
        }
        this.filterPending()
      })
  }

  updateRemovedEmails(emails: string[]): void {
    const users = ['teacher', 'student']
    const invitationStatus = ['invited', 'accepted', 'denied']
    for (const user of users) {
      for (const status of invitationStatus) {
        this.collaborators[user][status].users = this.collaborators[user][
          status
        ].users.filter((item) => !emails.includes(item.email))
      }
    }
  }

  deleteEmails(): void {
    const markedTeachers: Collaborator[] = this.collaborators.teacher.accepted.users.filter(
      (user) => user.checked
    )
    const markedStudents: Collaborator[] = this.collaborators.student.accepted.users.filter(
      (user) => user.checked
    )
    const markedUserEmails = [...markedStudents, ...markedTeachers].map(
      (user: Collaborator) => user.email
    )
    this.deleteInvitation(markedUserEmails)
  }

  // Function to invite people
  invitePeople(userType: InvitationModalUserType): void {
    this.modalConfig = { userType, view: 'INVITATION' }
    this.modalData =
      this.modalConfig.userType === 'TEACHER'
        ? this.teacherInvitationConfig
        : this.studentInvitationConfig
    this.openInvitationModal()
  }

  openInvitationModal(): void {
    this.modalRef = this.modalService.show(this.invitationModal, {
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-layout_medium',
    })
  }

  setSuccessModal(userType: InvitationModalUserType): void {
    this.modalData = this.invitationSuccessModal
    this.modalData.description = `PEOPLE-INVITE-${userType}.invite_popup_${userType.toLowerCase()}_confirmation_message`
    this.modalConfig = { userType, view: 'SUCCESS' }
  }

  setErrorModal(): void {
    this.modalConfig = {
      userType: this.modalConfig.userType,
      view: 'ERROR',
    }
    this.modalData = this.errorModalData
  }

  confirmModal(): void {
    if (this.experienceId && this.modalConfig.view === 'INVITATION') {
      this.modalLoading = true
      const peopleSubscriptions = new SubSink()
      peopleSubscriptions.sink = this.peopleServcie
        .addCollaborator(
          this.addedEmails,
          this.modalConfig.userType,
          this.experienceId
        )
        .subscribe((res) => {
          peopleSubscriptions.unsubscribe()
          this.modalLoading = false
          if (res?.errors?.length) {
            this.setErrorModal()
            this.modalErrors = res.errors
          } else {
            this.setSuccessModal(this.modalConfig.userType)
          }
          if (res.totalInvited) {
            this.findInvitedEmails(res.errors)
          }
        })
    } else {
      this.hideModal()
    }
  }

  findInvitedEmails(errors: InvitationErrorResponse[]): void {
    const userType = this.modalConfig.userType.toLowerCase()
    const errorEmails = errors.map((error) => error.mail).flat()
    const successEmails = this.addedEmails.filter(
      (email) => !errorEmails.includes(email)
    )
    const users: Collaborator[] = successEmails.map((email) => ({
      email,
      profile: this.modalConfig.userType,
      invitationStatus: 'INVITED',
      checked: false,
      inviteLable: 'Invite text',
    }))
    const successMails = users.map((user) => user.email)
    if (users.length) {
      const deniedusers = this.collaborators[userType].denied.users
      if (deniedusers.length) {
        this.collaborators[userType].denied.users = this.collaborators[
          userType
        ].denied.users.filter(
          (deniedUser) => !successMails.includes(deniedUser.email)
        )
      }
      this.collaborators[userType].invited.users.push(...users)
      this.setPendingInvitations()
      this.isEmpty = false
    }
  }

  hideModal(): void {
    this.modalRef.hide()
  }

  onChipsetValueChange(emails: string[]): void {
    this.addedEmails = [...new Set(emails)]
    this.modalButtonDisabled = !emails?.length
  }
}
