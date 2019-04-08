import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule, MatTable} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home/home.component';
import { SidenavComponent } from './_components/layout/sidenav/sidenav.component';
import { LoginComponent } from './_components/login/login.component';
import { UsersComponent } from './_components/users/users.component';
import { ProjectCreateComponent } from './_components/projectCreate/projectCreate.component';
import { ProjectComponent } from './_components/project/project.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { BugComponent } from './_components/bug/bug.component';
import { DialogAddTask } from './_components/project/dialogaddtask.component';
import { DialogEditTask } from './_components/project/dialogedittask.component';
import { DialogEditDialog } from './_components/users/editUserDialog.component';
import { DialogAddUser } from './_components/users/addUserDialog.component';
import { SettingsComponent } from './_components/settings/settings.component';

import { UserService } from './_services/user.service';
import { CommentService } from './_services/comment.service';
import { AuthorizationService } from './_services/auth.service';
import { ProjectService } from './_services/project.service';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { BugService } from './_services/bug.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    LoginComponent,
    UsersComponent,
    ProjectCreateComponent,
    DialogEditDialog,
    DialogAddUser,
    BugComponent,
    ProjectComponent,
    SidebarComponent,
    SettingsComponent,
    DialogAddTask,
    DialogEditTask
  ],
  entryComponents: [DialogEditDialog, DialogAddUser, DialogAddTask, DialogEditTask],
  imports: [
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthenticationGuard], pathMatch: 'full' }, //Login
      { path: 'login', component: LoginComponent },
      { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthenticationGuard] },
      { path: 'projectCreate', component: ProjectCreateComponent, canActivate: [AuthenticationGuard] },
      { path: 'project/:id', component: ProjectComponent, canActivate: [AuthenticationGuard] },
      { path: 'project/:id/:taskId', component: ProjectComponent, canActivate: [AuthenticationGuard] },
      { path: 'bug/:id', component: BugComponent, canActivate: [AuthenticationGuard] },
    ])
  ],
  providers: [UserService, AuthorizationService, ProjectService, AuthenticationGuard, CommentService, BugService],
  bootstrap: [AppComponent]
})
export class AppModule { }
