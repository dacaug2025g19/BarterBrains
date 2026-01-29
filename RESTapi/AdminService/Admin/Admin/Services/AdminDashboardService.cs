using Admin.DTOs;
using Admin.Repositories.Interfaces;
namespace Admin.Services;

public class AdminDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public AdminDashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public AdminDashboardDTO GetDashboardStats()
    {
        return new AdminDashboardDTO
        {
            TotalUsers = _dashboardRepository.TotalUsers(),
            TotalSkills = _dashboardRepository.TotalSkills(),
            TotalSessions = _dashboardRepository.TotalSessions(),
            TotalBookings = _dashboardRepository.TotalBookings(),
            TotalTransactions = _dashboardRepository.TotalTransactions()
        };
    }
}
