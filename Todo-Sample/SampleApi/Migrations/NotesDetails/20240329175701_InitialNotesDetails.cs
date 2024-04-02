using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleApi.Migrations.NotesDetails
{
    /// <inheritdoc />
    public partial class InitialNotesDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NotesDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "Int", nullable: false),
                    UserMessage = table.Column<string>(type: "VarChar(250)", nullable: false),
                    UserTitle = table.Column<string>(type: "VarChar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotesDetails", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotesDetails");
        }
    }
}
