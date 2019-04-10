import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeCs from '@angular/common/locales/cs';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule, MatTable} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatNativeDateModule } from '@angular/material';
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
import { TasksComponent } from './_components/tasks/tasks.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { BugsComponent } from './_components/bug/bugs.component';
import { DialogAddBug } from './_components/bug/dialogAddBug.component';
import { DialogEditBug } from './_components/bug/dialogEditBug.component';
import { DialogAddTask } from './_components/tasks/dialogAddTask.component';
import { DialogEditTask } from './_components/tasks/dialogEditTask.component';
import { DialogEditDialog } from './_components/users/editUserDialog.component';
import { DialogAddUser } from './_components/users/addUserDialog.component';
import { SettingsComponent } from './_components/settings/settings.component';

import { UserService } from './_services/user.service';
import { CommentService } from './_services/comment.service';
import { AuthorizationService } from './_services/auth.service';
import { ProjectService } from './_services/project.service';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { BugService } from './_services/bug.service';
import { registerLocaleData, DatePipe } from '@angular/common';

registerLocaleData(localeCs);

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
    DialogAddBug,
    DialogEditBug,
    BugsComponent,
    TasksComponent,
    SidebarComponent,
    SettingsComponent,
    DialogAddTask,
    DialogEditTask
  ],
  entryComponents: [DialogEditDialog, DialogAddUser, DialogAddTask, DialogEditTask, DialogAddBug, DialogEditBug],
  imports: [
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
      { path: 'project/tasks/:id', component: TasksComponent, canActivate: [AuthenticationGuard] },
      { path: 'project/tasks/:id/:taskId', component: TasksComponent, canActivate: [AuthenticationGuard] },
      { path: 'project/bugs/:id', component: BugsComponent, canActivate: [AuthenticationGuard] },
      { path: 'project/bugs/:id/:bugId', component: BugsComponent, canActivate: [AuthenticationGuard] },
    ])
  ],
  providers: [UserService, AuthorizationService, ProjectService, AuthenticationGuard, CommentService, BugService, TasksComponent, DatePipe, {provide: LOCALE_ID, useValue: 'cs-CZ'}],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
