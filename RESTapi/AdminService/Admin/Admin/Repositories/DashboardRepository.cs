using Admin.Models;
using Admin.Repositories.Interfaces;

public class DashboardRepository : IDashboardRepository
{
    private readonly P19BarterbrainsContext _context;

    public DashboardRepository(P19BarterbrainsContext context)
    {
        _context = context;
    }

    public int TotalUsers()
    {
        return _context.UserTables.Count();
    }

    public int TotalSkills()
    {
        return _context.SkillTables.Count();
    }

    public int TotalSessions()
    {
        return _context.SessionTables.Count();
    }

    public int TotalBookings()
    {
        return _context.BookedSessions.Count();
    }

    public int TotalTransactions()
    {
        return _context.PointTransactions.Count();
    }
}
