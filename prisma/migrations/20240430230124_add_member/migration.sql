/*
  Warnings:

  - You are about to alter the column `Name` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `NomborAhli` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `Peringkat` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `Jantina` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `Umur` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `Kategori` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `Kawasan` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `NomborTelefon` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `Email` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
EXEC SP_RENAME N'dbo.PK_Member', N'Member_pkey';
ALTER TABLE [dbo].[Member] ALTER COLUMN [Name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [NomborAhli] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [Peringkat] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [Jantina] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [Umur] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [Kategori] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [Kawasan] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [NomborTelefon] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Member] ALTER COLUMN [Email] NVARCHAR(1000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
