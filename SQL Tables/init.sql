/*
    Tady koment k čemu to je
*/
-- tbuser
CREATE TABLE [tbUser]
(
 [id]         int IDENTITY (1, 1) NOT NULL ,
 [login]      nvarchar(30) NOT NULL ,
 [password]   char(64) NOT NULL ,
 [first_name] nvarchar(30) COLLATE CZECH_CI_AS NOT NULL  ,
 [last_name]  nvarchar(30) COLLATE CZECH_CI_AS NOT NULL ,
 [email]      nvarchar(30) NOT NULL ,
 [role]       int NULL ,
 [getEmails]  bit NOT NULL ,

 CONSTRAINT [PK_tbUser] PRIMARY KEY CLUSTERED ([id] ASC),
 CONSTRAINT [AK1_tbUser] UNIQUE NONCLUSTERED ([login] ASC)
);
GO

-- tbProject
CREATE TABLE [tbProject]
(
 [Id]          int IDENTITY (1, 1) NOT NULL ,
 [Name]        nvarchar(90) COLLATE CZECH_CI_AS NOT NULL ,
 [Fk_Owner_Id] int NOT NULL ,
 [Assigned]    nvarchar(1000) COLLATE CZECH_CI_AS,

 CONSTRAINT [PK_tbProject] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [FK_tbProject_UserId] FOREIGN KEY ([Fk_Owner_Id])  REFERENCES [tbUser]([id])
);
GO

-- tbProjectParticipants
CREATE TABLE [tbProjectParticipants]
(
 [Fk_User_Id]            int NOT NULL ,
 [Fk_Project_Id]         int NOT NULL ,

 CONSTRAINT [FK_tbProjectParticipants_ProjectId] FOREIGN KEY ([Fk_Project_Id])  REFERENCES [tbProject]([Id]),
 CONSTRAINT [FK_tbProjectParticipants_UserId] FOREIGN KEY ([Fk_User_Id])  REFERENCES [tbUser]([id])
);
GO

-- tbTask
CREATE TABLE [tbTask]
(
 [Id]            int IDENTITY (1, 1) NOT NULL ,
 [Name]          nvarchar(30) COLLATE CZECH_CI_AS NOT NULL ,
 [Description]   text COLLATE CZECH_CI_AS NOT NULL ,
 [Fk_Owner_Id]   int NOT NULL ,
 [Fk_Project_Id] int NOT NULL ,
 [Assigned]      nvarchar(1000) COLLATE CZECH_CI_AS NOT NULL ,
 [Status]        nvarchar(20) COLLATE CZECH_CI_AS NOT NULL ,
 [Priority]      nvarchar(20) COLLATE CZECH_CI_AS NOT NULL ,
 [Labels]        nvarchar(250) COLLATE CZECH_CI_AS NOT NULL ,

 CONSTRAINT [PK_tbTask] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [FK_tbTask_UserId] FOREIGN KEY ([Fk_Owner_Id])  REFERENCES [tbUser]([id]),
 CONSTRAINT [FK_tbTask_ProjectId] FOREIGN KEY ([Fk_Project_Id])  REFERENCES [tbProject]([Id])
);
GO

-- tbTaskComment
CREATE TABLE [tbTaskComment]
(
 [Id]          int IDENTITY (1, 1) NOT NULL ,
 [Content]     nvarchar(250) COLLATE CZECH_CI_AS NOT NULL ,
 [TimeChanged] datetime NOT NULL ,
 [Fk_Owner_Id] int NOT NULL ,
 [Fk_Task_Id]  int NOT NULL ,

 CONSTRAINT [PK_tbTaskComment] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [FK_tbTaskComment_UserId] FOREIGN KEY ([Fk_Owner_Id])  REFERENCES [tbUser]([id]),
 CONSTRAINT [FK_tbTaskComment_TaskId] FOREIGN KEY ([Fk_Task_Id])  REFERENCES [tbTask]([Id])
);
GO


-- tbBug
CREATE TABLE [tbBug]
(
 [Id]            int IDENTITY (1, 1) NOT NULL ,
 [Name]          nvarchar(30) COLLATE CZECH_CI_AS NOT NULL ,
 [Description]   text NOT NULL ,
 [Fk_Owner_Id]   int NOT NULL ,
 [Fk_Project_Id] int NOT NULL ,
 [Assigned]      nvarchar(1000) COLLATE CZECH_CI_AS NOT NULL ,
 [Status]        nvarchar(20) COLLATE CZECH_CI_AS NOT NULL ,
 [Priority]      nvarchar(20) COLLATE CZECH_CI_AS NOT NULL ,
 [Labels]        nvarchar(250) COLLATE CZECH_CI_AS NOT NULL ,
 [Start]         date NULL ,
 [End]           date NULL ,

 CONSTRAINT [PK_tbBug] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [Fk_tbBug_UserId] FOREIGN KEY ([Fk_Owner_Id])  REFERENCES [tbUser]([id]),
 CONSTRAINT [FK_tbBug_ProjectId] FOREIGN KEY ([Fk_Project_Id])  REFERENCES [tbProject]([Id])
);

-- tbBugComment
CREATE TABLE [tbBugComment]
(
 [Id]          int IDENTITY (1, 1) NOT NULL ,
 [Content]     nvarchar(250) COLLATE CZECH_CI_AS NOT NULL ,
 [TimeChanged] datetime NOT NULL ,
 [Fk_Owner_Id] int NOT NULL ,
 [Fk_Bug_Id]   int NOT NULL ,

 CONSTRAINT [PK_tbBugComment] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [FK_tbBugComment_UserId] FOREIGN KEY ([Fk_Owner_Id])  REFERENCES [tbUser]([id]),
 CONSTRAINT [FK_tbBugComment_BugId] FOREIGN KEY ([Fk_Bug_Id])  REFERENCES [tbBug]([Id])
);

-- tbTaskArchive
CREATE TABLE [tbTaskArchive]
(
 [Id]            int NOT NULL ,
 [Name]          nvarchar(30) COLLATE CZECH_CI_AS NOT NULL ,
 [Description]   text NOT NULL ,
 [Fk_Owner_Id]   int NOT NULL ,
 [Fk_Project_Id] int NOT NULL ,
 [Assigned]      nvarchar(1000) COLLATE CZECH_CI_AS NOT NULL ,
 [Status]        nvarchar(20) COLLATE CZECH_CI_AS NOT NULL ,
 [Priority]      nvarchar(20) COLLATE CZECH_CI_AS NOT NULL ,
 [Labels]        nvarchar(250) COLLATE CZECH_CI_AS NOT NULL ,
);
GO

-- tbTaskCommentArchive
CREATE TABLE [tbTaskCommentArchive]
(
 [Id]          int NOT NULL ,
 [Content]     nvarchar(250) COLLATE CZECH_CI_AS NOT NULL ,
 [TimeChanged] datetime NOT NULL ,
 [Fk_Owner_Id] int NOT NULL ,
 [Fk_Task_Id]  int NOT NULL ,
);
GO

/* ------------------------------------------------------------------------------------------------------------------------------- */
/* 
    Procedury
*/
CREATE OR ALTER PROCEDURE spDeleteProject @id int
AS
BEGIN
    DELETE from tbBugComment WHERE Fk_Bug_Id = (SELECT Id from tbBug WHERE Fk_Project_Id = @id);
    DELETE from tbBug WHERE Fk_Project_Id = @id;

	DELETE from tbTaskComment WHERE Fk_Task_Id = (SELECT Id from tbTask WHERE Fk_Project_Id = @id)
	DELETE from tbTask WHERE Fk_Project_Id = @id;

	DELETE from tbProjectParticipants WHERE Fk_Project_Id = @id;
	DELETE from tbProject WHERE Id = @id;
END
GO

CREATE OR ALTER PROCEDURE spArchiveTask @id int
AS
BEGIN
    INSERT into tbTaskCommentArchive select * from tbTaskComment where Fk_Task_Id = @id;
    DELETE from tbTaskComment where Fk_Task_Id = @id;

    INSERT into tbTaskArchive  select * from tbTask where Id = @id;
    DELETE from tbTask where Id = @id;
END
GO

CREATE OR ALTER PROCEDURE spDeleteBug @id int
AS
BEGIN
	DELETE from tbBugcomment WHERE Fk_Bug_Id = @id
	DELETE from tbBug WHERE Id = @id;
END
GO

CREATE OR ALTER PROCEDURE spDeleteTask @id int
AS
BEGIN
	DELETE from tbTaskComment WHERE Fk_Task_Id = @id
	DELETE from tbTask WHERE Id = @id;
END
GO

CREATE OR ALTER PROCEDURE spDeleteUser @id int
AS
BEGIN
    DELETE from tbBugComment WHERE Fk_Owner_Id = @id;
    DELETE from tbBug WHERE Fk_Owner_Id = @id;

	DELETE from tbTaskComment WHERE Fk_Owner_Id = @id;
	DELETE from tbTask WHERE Fk_Owner_Id = @id;

	DELETE from tbProjectParticipants WHERE Fk_Project_Id = (SELECT Id from tbProject WHERE Fk_Owner_Id = @id);
	DELETE from tbProjectParticipants WHERE Fk_User_Id = @id;
	DELETE from tbProject WHERE Fk_Owner_Id = @id;

	DELETE from tbUser WHERE id = @id
END
GO