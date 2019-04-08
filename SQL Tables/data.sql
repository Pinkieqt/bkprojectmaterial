SET IDENTITY_INSERT [dbo].[tbUser] ON 
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (1, 'lada', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Ladislav', 'Novák', 'test@seznam.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (2, 'peny', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Pennny', 'Market', 'penny@market.com', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (3, 'mattoni', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Alfy', 'Kinnie', 'akinnie3@vk.com', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (4, 'acer', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Květoslav', 'Nový', 'Kvetoslav.Kvasnicka@seznam.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (5, 'asus', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Bohuslava', 'Šulcová', 'Bohuslava.sulcova@seznam.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (6, 'protei', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Noraa', 'Doležalová', 'Dita.Valickova@seznam.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (7, 'sacharid', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Evže', 'Čajka', 'Evzen.cajka@seznam.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (8, 'coffee', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Ferdinand', 'Andrýsek', 'ferdinan@seznam.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (9, 'lake', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Intel', 'Coffee Lake', 'pentium@intel.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (10, 'intel', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Some', 'Data', 'test@data.com', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (11, 'dang', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Karel', 'Vojáček', 'karel@kral.cz', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (12, 'josefhrab', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'Josef', 'Hrabálek', 'josef@josef.cs', 2, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (13, 'admi', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Administrator', 'Administrator', 'admin@admin.cz', 1, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (14, 'pluc01', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'David', 'Plucnar', 'ahoj@ahoj.cz', 3, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (15, 'readonly', '8171bacf32668a8f44b90087ad107ed63170f57154763ba7e44047bf9e5a7be3', 'ReadOnly', 'ReadOnly', 'kuc0277@vsb.cz', 3, 1)
GO
INSERT [dbo].[tbUser] ([id], [login], [password], [first_name], [last_name], [email], [role], [getEmails]) VALUES (16, 'rom123', '4d72990af17cc63c8240b1c28a62e9012799624639db07b5335b9d1cdafd6aac', 'Romča', 'Hrdlička', 'ahoj@seznam.cz', 1, 1)
GO
SET IDENTITY_INSERT [dbo].[tbUser] OFF
GO







/*


Another data


*/

-- SET IDENTITY_INSERT [dbo].[tbProject] ON 
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (6035, 'Project Test', 1005)
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (6036, 'Project Test #2', 1005)
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (8034, 'Testovací projekt', 4011)
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (8035, 'Další testovací projekt', 4011)
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (8036, 'Testovani emailu', 4011)
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (8037, 'Testovani emailu 2', 4011)
-- GO
-- INSERT [dbo].[tbProject] ([Id], [Name], [Fk_Owner_Id]) VALUES (8038, 'Dalsi test projektu', 4011)
-- GO
-- SET IDENTITY_INSERT [dbo].[tbProject] OFF
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (6035, 1009)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (6035, 2001)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (6035, 2013)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (6036, 1009)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (6036, 2001)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8034, 1005)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8034, 1009)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8035, 1005)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8035, 1009)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8035, 2004)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8035, 2002)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8035, 2001)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8036, 1005)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8037, 1005)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8037, 4013)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8038, 1005)
-- GO
-- INSERT [dbo].[tbProjectParticipants] ([Fk_Project_Id], [Fk_User_Id]) VALUES (8038, 1009)
-- GO
-- SET IDENTITY_INSERT [dbo].[tbTask] ON 
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5024, 'už to funguje', 'dasjkd
-- myslím si že jo
-- ', 1005, 6035, 'Nezapočatý', 'medium', 'administrace')
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5025, 'fsd', 'fsdf
-- fsda
-- asdf
-- sdf
-- sadfsd
-- ', 1005, 6035, 'Nezapočatý', 'low', 'another1')
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5027, 'Nový úkol', 'Tohle je jenom testování
-- Omnis voluptas voluptates quas repudiandae consectetur, dicta beatae fugiat est voluptatibus quidem. Facere perferendis iure dolorem modi voluptatum soluta, maxime ipsa iste!', 4011, 8034, 'Nezapočatý', 'Vysoká', 'Administrace')
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5030, 'Přidat emailové konstrukce', 'Popis ukolu, něco
-- opravuje pravopis
-- , další text, lorem ipsum
-- ', 4011, 8036, 'Započatý', 'Nízká', 'Administrace')
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5031, 'Lorem ipsum Lorem ipsum', 'Lorem ipsumLorem ipsum
-- Lorem ipsumLorem ipsum
-- Lorem ipsumLorem ipsumLorem ipsum', 4011, 8036, 'Nezapočatý', 'Nízká', 'Další1')
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5032, 'Lorem ipsum', '
-- Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis voluptas voluptates quas repudiandae consectetur, dicta beatae fugiat est voluptatibus quidem. Facere perferendis iure dolorem modi voluptatum soluta, maxime ipsa iste!', 4011, 8034, 'Nezapočatý', 'Nízká', 'Administrace')
-- GO
-- INSERT [dbo].[tbTask] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5033, 'Přidat emaily', 'ke každé objednávce se má odeslat email', 4011, 8034, 'Započatý', 'Vysoká', 'Další1')
-- GO
-- SET IDENTITY_INSERT [dbo].[tbTask] OFF
-- GO
-- SET IDENTITY_INSERT [dbo].[tbTaskComment] ON 
-- GO
-- INSERT [dbo].[tbTaskComment] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (9, 'První komentář', CAST('2019-03-24T15:58:33.900' AS DateTime), 4011, 5027)
-- GO
-- INSERT [dbo].[tbTaskComment] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (18, 'Funguje přidání komentáře?', CAST('2019-03-25T13:47:38.050' AS DateTime), 4011, 5027)
-- GO
-- INSERT [dbo].[tbTaskComment] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (19, 'Jak vypadá overflow. A vůbec jak vypadá delší buňka než má být a taky psaní v textovém poli? ', CAST('2019-03-25T13:48:55.690' AS DateTime), 4011, 5027)
-- GO
-- INSERT [dbo].[tbTaskComment] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (21, 'Lorem ipsum', CAST('2019-03-25T22:41:11.537' AS DateTime), 4011, 5027)
-- GO
-- INSERT [dbo].[tbTaskComment] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (22, '26 marec', CAST('2019-03-26T08:34:34.480' AS DateTime), 4011, 5027)
-- GO
-- INSERT [dbo].[tbTaskComment] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (23, 'už na tom pracuju šéfe', CAST('2019-03-29T22:30:32.307' AS DateTime), 4011, 5033)
-- GO
-- SET IDENTITY_INSERT [dbo].[tbTaskComment] OFF
-- GO
-- INSERT [dbo].[tbTaskArchive] ([Id], [Name], [Description], [Fk_Owner_Id], [Fk_Project_Id], [Status], [Priority], [Labels]) VALUES (5029, 'gsdfgsdfdasd', 'gsdfg
-- :)d', 4011, 8034, 'Započatý', 'Střední', 'Další1')
-- GO
-- INSERT [dbo].[tbTaskCommentArchive] ([Id], [Content], [TimeChanged], [Fk_Owner_Id], [Fk_Task_Id]) VALUES (20, 'hmmm
-- ', CAST('2019-03-25T14:44:34.163' AS DateTime), 4011, 5029)
-- GO
