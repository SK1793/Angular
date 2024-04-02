using Microsoft.EntityFrameworkCore;
using SampleApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UserDetailsContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConn")));

builder.Services.AddDbContext<NotesDetailsContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConn")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options=>options.WithOrigins("http://localhost:4200")
.AllowAnyMethod()
.AllowAnyHeader()
.AllowAnyOrigin()
.WithHeaders("Access-Control-Allow-Origin")
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
