using Admin.Models;
using Admin.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly P19BarterbrainsContext _context;

    public UserRepository(P19BarterbrainsContext context)
    {
        _context = context;
    }

    // Add new user
    public void Add(UserTable user)
    {
        _context.UserTables.Add(user);
    }

    // ✅ Get ALL users with roles (no delete logic)
    public List<UserTable> GetAll()
    {
        return _context.UserTables
                       .Include(u => u.RidNavigation)
                       .ToList();
    }

    // ✅ Get user by id
    public UserTable? GetById(int uid)
    {
        return _context.UserTables
                       .Include(u => u.RidNavigation)
                       .FirstOrDefault(u => u.Uid == uid);
    }

    // Update user (role change, profile update, etc.)
    public void Update(UserTable user)
    {
        _context.UserTables.Update(user);
    }

    // Save changes
    public void Save()
    {
        _context.SaveChanges();
    }
}
