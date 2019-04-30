--Drop
DROP TABLE tbTaskArchive;
DROP TABLE tbTaskCommentArchive;
DROP TABLE tbTaskComment;
DROP TABLE tbTask;
DROP TABLE tbBugComment;
DROP TABLE tbBug;
DROP TABLE tbProjectParticipants;
DROP TABLE tbProject;
DROP TABLE tbUser;


DROP PROCEDURE spDeleteProject;
DROP PROCEDURE spArchiveTask;
DROP PROCEDURE spDeleteBug;
DROP PROCEDURE spDeleteTask;
DROP PROCEDURE spDeleteUser;


--truncate
TRUNCATE TABLE tbTaskArchive;
TRUNCATE TABLE tbTaskCommentArchive;
TRUNCATE TABLE tbTaskComment;
TRUNCATE TABLE tbTask;
TRUNCATE TABLE tbBugComment;
TRUNCATE TABLE tbBug;
TRUNCATE TABLE tbProjectParticipants;
TRUNCATE TABLE tbProject;
TRUNCATE TABLE tbUser;