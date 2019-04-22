import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TransferService {

  constructor(
    private router:Router
  ) { }

  private data;
  private projectId: number;
  private taskOrbug: string;

  setProjectSymptom(res: string)
  {
    this.taskOrbug = res;
  }

  getProjectSymptom()
  {
    return this.taskOrbug;
  }

  setProjectId(id: number)
  {
    this.projectId = id;
  }

  getProjectId()
  {
    return this.projectId;
  }

  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}