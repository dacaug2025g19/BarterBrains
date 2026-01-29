namespace Admin.DTOs;

public class UserDTO
{
    public int Uid { get; set; }
    public string Uname { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; }   // Admin / User
}
