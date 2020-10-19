import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'

@Component({
  selector: 'app-people-editor',
  templateUrl: './people-editor.component.html',
  styleUrls: ['./people-editor.component.scss'],
})
export class PeopleEditorComponent implements OnInit {
  localExperienceType: number
  tempRouteId: string // To be deleted once functionality implemented
  constructor(private editor: EditorService, private route: ActivatedRoute) {}
  invitations = [
    {
      email: 'ciglesias@gmail.com',
      role: 'Docente',
      status: 'Pendiente',
      id: 1,
    },
    {
      email: 'antonio.merino@tekman-email.com',
      role: 'Docente',
      status: 'Pendiente',
      id: 2,
    },
    {
      email: 'gina.morera@gmail.com',
      role: 'Alumno/a',
      status: 'Rechazado',
      id: 3,
    },
  ]
  filterList = [
    {
      name: 'Ver todas',
      id: 0,
      type: 'Ver todas',
    },
    {
      name: 'Sólo docentes',
      id: 1,
      type: 'Sólo docentes',
    },
    {
      name: 'Sólo alumnado',
      id: 2,
      type: 'Sólo alumnado',
    },
  ]
  teachers = [
    {
      profileName: 'teacher1',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_teacher',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/teacher1.png',
      checked: false,
    },
    {
      profileName: 'teacher2',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_teacher',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/teacher2.png',
      checked: false,
    },
    {
      profileName: 'teacher3',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_teacher',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/teacher3.png',
      checked: false,
    },
  ]

  students = [
    {
      profileName: 'student1',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student1.png',
      checked: false,
    },
    {
      profileName: 'student2',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student2.png',
      checked: false,
    },
    {
      profileName: 'student3',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student3.png',
      checked: false,
    },
    {
      profileName: 'student4',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student4.png',
      checked: false,
    },
    {
      profileName: 'student5',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student5.png',
      checked: false,
    },
    {
      profileName: 'student6',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student6.png',
      checked: false,
    },
    {
      profileName: 'student7',
      profileType: 'PEOPLE-EMPTY-STATE.people_card_student',
      inviteLabel: 'Invite text',
      imageUrl: '../assets/images/people/student7.png',
      checked: false,
    },
  ]

  ngOnInit(): void {
    this.localExperienceType = this.editor.getLocalExperienceType()
    this.tempRouteId = this.route.snapshot?.paramMap.get('id')
  }
  deleteInvitation(invitation: any): void {
    this.invitations = this.invitations.filter(
      (item) => invitation.id !== item.id
    )
  }
  deleteCard(): void {
    this.teachers = this.teachers.filter((item) => !item.checked)
    this.students = this.students.filter((item) => !item.checked)
  }
  // function for invite a teacher
  inviteTeacher(): void {}

  // function for invite a student
  inviteStudent(): void {}
}
