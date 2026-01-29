using Admin.DTOs;
using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly P19BarterbrainsContext _context;

    public AuthController(P19BarterbrainsContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequestDTO request)
    {
        var user = _context.UserTables
            .Include(u => u.RidNavigation)
            .FirstOrDefault(u => u.Email == request.Email);

        if (user == null)
            return Unauthorized("Invalid credentials");

        bool passwordMatch =
            user.Password == request.Password || // TEMP (plain text)
            BCrypt.Net.BCrypt.Verify(request.Password, user.Password);

        if (!passwordMatch)
            return Unauthorized("Invalid credentials");

        return Ok(new
        {
            token = "dummy-token-for-now",
            role = user.RidNavigation.Rname
        });
    }
}
