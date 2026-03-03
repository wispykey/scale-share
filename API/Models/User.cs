public class User
{
    public int Id {get; set;}
    public required string Name {get; set;}
    public required string Email {get; set;}
    public required string Password {get; set;}

}


public record AddUserDTO(string Name, string Email, string Password);

public record LoginDTO(string Name, string Password);