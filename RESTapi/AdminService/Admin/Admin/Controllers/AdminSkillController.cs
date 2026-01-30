using Admin.DTOs;
using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/admin/skills")]
public class AdminSkillController : ControllerBase
{
    private readonly P19BarterbrainsContext _context;

    public AdminSkillController(P19BarterbrainsContext context)
    {
        _context = context;
    }

    // GET ALL SKILLS
    [HttpGet]
    public IActionResult GetAllSkills()
    {
        var skills = _context.SkillTables
            .Include(s => s.CidNavigation)
            .Select(s => new SkillDTO
            {
                Sid = s.Sid,
                Sname = s.Sname!,
                Cid = s.Cid ?? 0,
                CategoryName = s.CidNavigation!.Cname,
                Basepoints = s.Basepoints,
                Description = s.Skdesc
            })
            .ToList();

        return Ok(skills);
    }

    // ADD SKILL ✅ FIXED
    [HttpPost]
    public IActionResult AddSkill([FromBody] CreateSkillDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var skill = new SkillTable
        {
            Sname = dto.Sname,
            Skdesc = dto.Skdesc,
            Cid = dto.Cid,
            Basepoints = dto.Basepoints
        };

        _context.SkillTables.Add(skill);
        _context.SaveChanges();

        return Ok(skill);
    }

    // UPDATE SKILL
    [HttpPut("{id}")]
    public IActionResult UpdateSkill(int id, [FromBody] UpdateSkillDTO dto)
    {
        var skill = _context.SkillTables.FirstOrDefault(s => s.Sid == id);
        if (skill == null) return NotFound();

        skill.Sname = dto.Sname;
        skill.Skdesc = dto.Skdesc;
        skill.Cid = dto.Cid;
        skill.Basepoints = dto.Basepoints;

        _context.SaveChanges();
        return Ok("Skill updated");
    }

    // DELETE SKILL
    [HttpDelete("{id}")]
    public IActionResult DeleteSkill(int id)
    {
        var skill = _context.SkillTables.Find(id);
        if (skill == null) return NotFound();

        _context.SkillTables.Remove(skill);
        _context.SaveChanges();

        return Ok("Skill deleted");
    }
}
