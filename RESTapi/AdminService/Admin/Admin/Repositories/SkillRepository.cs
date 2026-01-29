using Admin.Models;
using Admin.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

public class SkillRepository : ISkillRepository
{
    private readonly P19BarterbrainsContext _context;

    public SkillRepository(P19BarterbrainsContext context)
    {
        _context = context;
    }

    // Get all skills with category
    public List<SkillTable> GetAll()
    {
        return _context.SkillTables
                       .Include(s => s.CidNavigation)
                       .ToList();
    }

    // Get skill by id
    public SkillTable GetById(int sid)
    {
        return _context.SkillTables
                       .Include(s => s.CidNavigation)
                       .FirstOrDefault(s => s.Sid == sid);
    }

    // Add new skill
    public void Add(SkillTable skill)
    {
        _context.SkillTables.Add(skill);
    }

    // Delete skill
    public void Delete(SkillTable skill)
    {
        _context.SkillTables.Remove(skill);
    }

    // Save changes
    public void Save()
    {
        _context.SaveChanges();
    }
}
