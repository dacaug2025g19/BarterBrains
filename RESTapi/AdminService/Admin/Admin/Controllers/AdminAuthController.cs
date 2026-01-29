using Admin.DTOs;
using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin.Controllers
{
    [ApiController]
    [Route("api/admin/auth")]
    public class AdminAuthController : ControllerBase
    {
        private readonly P19BarterbrainsContext _context;

        public AdminAuthController(P19BarterbrainsContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO dto)
        {
            var admin = _context.UserTables
                .Include(u => u.RidNavigation)
                .FirstOrDefault(u =>
                    u.Email == dto.Email &&
                    u.Password == dto.Password &&
                    u.RidNavigation.Rname == "Admin"
                );

            if (admin == null)
                return Unauthorized("Invalid admin credentials");

            return Ok("Admin login success");
        }
    }
}
