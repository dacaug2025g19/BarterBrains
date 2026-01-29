using Admin.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admin/dashboard")]
public class AdminDashboardController : ControllerBase
{
    private readonly AdminDashboardService _dashboardService;

    public AdminDashboardController(AdminDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    // GET: api/admin/dashboard
    [HttpGet]
    public IActionResult GetDashboard()
    {
        return Ok(_dashboardService.GetDashboardStats());
    }
}
