using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
.AddEntityFrameworkStores<ApplicationDbContext>();
// both cookie and proprietary tokens are activated by default

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/data", (HttpContext httpContext) =>
{
    // dummy test
    List<int> data = [1, 2, 3];
    return data;
})
.WithName("GetData")
.RequireAuthorization();


app.Run();
