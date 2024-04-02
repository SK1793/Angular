using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleApi.Migrations
{
    /// <inheritdoc />
    public partial class UserDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserDetails",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "VarChar(120)", nullable: false),
                    UserPassword = table.Column<string>(type: "VarChar(30)", nullable: false),
                    UserMail = table.Column<string>(type: "Varchar(30)", nullable: false),
                    UserGender = table.Column<string>(type: "Varchar(1)", nullable: false),
                    UserDob = table.Column<string>(type: "VarChar(8)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDetails", x => x.UserId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserDetails");
        }
    }
}
