namespace Admin.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        int TotalUsers();
        int TotalSkills();
        int TotalSessions();
        int TotalBookings();
        int TotalTransactions();
    }

}
