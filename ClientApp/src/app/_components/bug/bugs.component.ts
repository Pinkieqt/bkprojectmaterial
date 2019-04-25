import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/_services/project.service';
import { CommentService } from 'src/app/_services/comment.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { BugService } from 'src/app/_services/bug.service';
import { DialogAddBug } from './dialogAddBug.component';
import { DialogEditBug } from './dialogEditBug.component';
import { AlertComponent } from '../layout/alert/alert.component';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnDestroy
{
  ngOnDestroy(): void {
    this.bugId = undefined;
  }


  private projectId: number;
  private bugId: number;
  private isOwner: boolean;
  private loggedUserId: number = parseInt(localStorage.getItem("userId"));
  public tmpProject: any;
  public tmpBug: any;
  public tmpCommentsList: any;
  private _commentForm: FormGroup;

  constructor( 
    private prjctService: ProjectService,
    private bugService: BugService,
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    )
  {
    this._commentForm = this.formBuilder.group
    ({
      Content: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      TimeChanged: [''],
      Fk_Owner_Id: [''],
      Fk_Bug_Id: ['']
    })
    var tmpEvent = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) 
      {
        this.activatedRoute.params.subscribe(params => {
          this.projectId = params['id'];
          this.bugId = params['bugId'];
          //Ziskani informaci o projektu
          this.getProjectInfo();
  
          //Ziskani daného úkolu z projektu
          this.getBug(this.bugId);

          //Ziskani komentářů k danému úkolu
          this.getComments(this.bugId);
        })
       tmpEvent.unsubscribe(); 
      }
    })
  }

  getProjectInfo()
  {
    this.prjctService.getProjectByItsId(this.projectId).subscribe(data => {
        this.tmpProject = data;
        if (this.tmpProject.owner_Id == this.loggedUserId) this.isOwner = true;
        else this.isOwner = false;
      });
  }

  deleteProject(prjctId: number): void
  {
    this.prjctService.deleteProject(prjctId).subscribe(data => {
      confirm
    })
    var confirmAnswer = confirm("Jste si jistí, že chcete daný projekt a přiřazené úkoly a bugy smazat?");
    if (confirmAnswer) 
    {
      this.prjctService.deleteProject(prjctId).subscribe((data) => 
      {
        this.router.navigate(["/"]);
        this.snackBar.open("Projekt byl úspěšně smazán z databáze.", null, {duration: 2000});
      },
      error => {
        this.errorHandle(error);
      })
    } 
  }

  getBug(bugId: number): void
  {
    this.bugService.getBug(bugId).subscribe(data => {
      if(data)
      {
        this.tmpBug = data[0];
        if(this.tmpBug != undefined)
        {
          if(this.tmpBug.start != null )
            this.tmpBug.start = this.tmpBug.start.split(" ")[0];
          if(this.tmpBug.end != null)
            this.tmpBug.end = this.tmpBug.end.split(" ")[0];
        }
      }
    }, error => {
      this.tmpBug = [];
    })
  }

  //Metoda pro odstranění tasku
  deleteBug(): void
  {
    var confirmAnswer = confirm("Jste si jistí, že chcete smazat bug s názvem \"" + this.tmpBug.name + "\" a ID \"" + this.tmpBug.id + "\"?");
    if (confirmAnswer) 
    {
      this.bugService.deleteBug(this.tmpBug.id).subscribe(data => {
        this.router.navigate(["/project/bugs/" + this.projectId]);
        this.snackBar.open("Bug byl smazán z projektu.", null, {duration: 2000});
      },
      error => {
        this.errorHandle(error);
      })
    } 
  }

  //Status change
  onChangeBug(value): void
  {
    this.bugService.editBugStatus(value, this.tmpBug.id).subscribe(result => {
      this.snackBar.open("Status bugu byl úspěšně změnen.", null, {duration: 2000});
    }, error => {
      this.errorHandle(error);
    });
  }
  
  //Metoda pro zobrazení dialogu pro přidání úkolu
  openAddBugDialog(): void 
  {
    this.dialog.open(DialogAddBug, {
      width: '30%',
      data: {projectId: this.projectId, ownerId: this.loggedUserId, assigned: this.tmpProject.assigned}
    });
  }

  //Metoda pro zobrazení dialogu pro přidání úkolu
  openEditBugDialog(p_id: number, p_name: string, p_description: string, p_priority: string, p_labels: string): void 
  {
    const dialogRef = this.dialog.open(DialogEditBug, {
      width: '30%',
      data: {id: p_id, name: p_name, description: p_description, priority: p_priority, labels: p_labels, projectId: this.projectId, ownerId: this.loggedUserId, assigned: this.tmpProject.assigned}
    });

    dialogRef.afterClosed().subscribe(result => {
      //Ziskani daného úkolu z projektu
      this.getBug(this.bugId);
    });
  }

  //comment adding
  addComment(): void
  {
    if (!this._commentForm.valid)
    {
      alert("Pro přidání komentáře je potřeba zadat nějaký text.");
      return;
    }
    this._commentForm.controls['TimeChanged'].setValue(Date.now);
    this._commentForm.controls['Fk_Owner_Id'].setValue(this.loggedUserId);
    this._commentForm.controls['Fk_Bug_Id'].setValue(this.bugId);
    this.commentService.saveBugComment(this._commentForm.value).subscribe((data) => 
    {
      this.getComments(this.bugId);
    }, error => { 
      this.errorHandle(error);
    })
  }

  //comment adding
  deleteComment(commentId: number): void
  {
    if(confirm("Jste si jistí, že chcete smazat tento komentář?"))
    {
      this.commentService.deleteBugComment(commentId).subscribe(result => {
        if (result == 1)
        {
          this.snackBar.open("Komentář byl smazán.", null, {duration: 2000});
          this.getComments(this.bugId);
        }
      }, error => {
        this.errorHandle(error);
      })
    }
    
  }

  //ziskani komentařů k danému ukolu
  getComments(bugId: number): void
  {
    if(bugId != undefined)
      this.commentService.getBugComments(bugId).subscribe((data) => 
      {
        this.tmpCommentsList = data;
      })
  }


  errorHandle(error: any): void
  {
    //Unauthorized - uživatel nemá povolení to udělat
    if(error.status == 401 || error.status == 403)
    {
      this.dialog.open(AlertComponent, {
        width: '30%'
      });
    }
    else
    this.snackBar.open("Vyskytla se chyba. Zkuste opakovat svůj požadavek později.", null, {duration: 2000});
  }
}


