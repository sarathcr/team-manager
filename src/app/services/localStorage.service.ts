import { Injectable } from '@angular/core';
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  theme: string;
  status: string;
  threads: string[];
  date: Date;
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  projectsList: Project[];
  project: Project;
  getDataComplete = false;
  constructor() {
    this.getAllProjects();
  }
  getProject(id: number){
    this.getAllProjects();
    this.project = this.projectsList.reduce((acc, item) => {
      return (item.id === id) ? item : acc;
    });
  }
  getAllProjects(){
    this.projectsList = this.getData();
  }
  updateProject(id: number, key: string, value: any){
    this.getAllProjects();
    this.projectsList = this.projectsList.map( project =>  project.id === id ? {...project, [key]: value} : project);
    this.setData(this.projectsList);
  }
  addProject(project: Project){
    this.getAllProjects();
    if (this.projectsList === null){
      this.projectsList = [project];
    } else{
      this.projectsList.push(project);
    }
    this.project = project;
    this.setData(this.projectsList);
  }
  deleteProject(id: number){
    this.getAllProjects();
    this.projectsList = this.projectsList.filter((item) => item.id !== id);
    this.setData(this.projectsList);
  }

  // Common functions for setting and getting data
  setData(projects: Project[] ){
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  getData(){
    const projects = localStorage.getItem('projects');
    if ( projects !== null || projects !== undefined ){
      return JSON.parse(projects);
    }
    return projects;
  }
}
