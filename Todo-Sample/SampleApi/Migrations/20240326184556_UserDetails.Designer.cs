﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SampleApi.Models;

#nullable disable

namespace SampleApi.Migrations
{
    [DbContext(typeof(UserDetailsContext))]
    [Migration("20240326184556_UserDetails")]
    partial class UserDetails
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SampleApi.Models.UserDetails", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("UserDob")
                        .IsRequired()
                        .HasColumnType("VarChar(8)");

                    b.Property<string>("UserGender")
                        .IsRequired()
                        .HasColumnType("Varchar(1)");

                    b.Property<string>("UserMail")
                        .IsRequired()
                        .HasColumnType("Varchar(30)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("VarChar(120)");

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasColumnType("VarChar(30)");

                    b.HasKey("UserId");

                    b.ToTable("UserDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
