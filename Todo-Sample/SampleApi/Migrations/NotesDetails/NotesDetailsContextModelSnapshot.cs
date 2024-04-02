﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SampleApi.Models;

#nullable disable

namespace SampleApi.Migrations.NotesDetails
{
    [DbContext(typeof(NotesDetailsContext))]
    partial class NotesDetailsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SampleApi.Models.NotesDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("Int");

                    b.Property<string>("UserMessage")
                        .IsRequired()
                        .HasColumnType("VarChar(250)");

                    b.Property<string>("UserTitle")
                        .IsRequired()
                        .HasColumnType("VarChar(50)");

                    b.HasKey("Id");

                    b.ToTable("NotesDetails");
                });
#pragma warning restore 612, 618
        }
    }
}
