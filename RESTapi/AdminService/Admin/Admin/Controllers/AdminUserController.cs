using Admin.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admin/users")]
public class AdminUserController : ControllerBase
{
    private readonly AdminUserService _userService;

    public AdminUserController(AdminUserService userService)
    {
        _userService = userService;
    }

    // GET: api/admin/users
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        return Ok(_userService.GetAllUsers());
    }

    // PUT: api/admin/users/{uid}/role/{roleId}
    [HttpPut("{uid}/role/{roleId}")]
    public IActionResult ChangeUserRole(int uid, int roleId)
    {
        var result = _userService.ChangeUserRole(uid, roleId);
        if (!result)
            return NotFound("User not found");

        return Ok("User role updated successfully");
    }
}
