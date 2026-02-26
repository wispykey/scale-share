using System.Runtime.CompilerServices;
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


app.MapPost("/register", async (AddUserDTO user, UserManager<IdentityUser> userManager) =>
{
    var newUser = new IdentityUser
    {
        UserName = user.Name,
        Email = user.Email,
    };

    var result = await userManager.CreateAsync(newUser, user.Password);

    return result.Succeeded ? Results.Ok("Created new user") : Results.BadRequest(result.ToString());
});


app.MapPost("/login", async (LoginDTO login, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager) =>
{
    var user = await userManager.FindByNameAsync(login.Name);
    if (user == null) return Results.BadRequest("Invalid login");

    var isPasswordCorrect = await userManager.CheckPasswordAsync(user, login.Password);
    if (!isPasswordCorrect) return Results.BadRequest("Invalid login");

    await signInManager.SignInAsync(user, true);

    return Results.Ok("Signed in!");
});


app.Run();
