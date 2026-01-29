using Admin.DTOs;
using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/admin/categories")]
public class AdminCategoryController : ControllerBase
{
    private readonly P19BarterbrainsContext _context;

    public AdminCategoryController(P19BarterbrainsContext context)
    {
        _context = context;
    }

    // GET ALL CATEGORIES
    [HttpGet]
    public IActionResult GetAll()
    {
        var categories = _context.CategoryTables
            .Select(c => new
            {
                cid = c.Cid,
                cname = c.Cname,
                cdesc = c.Cdesc
            })
            .ToList();

        return Ok(categories);
    }

    // ADD CATEGORY
    [HttpPost]
    public IActionResult Add([FromBody] AdminCategoryDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var category = new CategoryTable
        {
            Cname = dto.Name,
            Cdesc = dto.Description
        };

        _context.CategoryTables.Add(category);
        _context.SaveChanges();

        return Ok(category);
    }

    // DELETE CATEGORY (FK SAFE)
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var category = _context.CategoryTables
            .Include(c => c.SkillTables)
            .FirstOrDefault(c => c.Cid == id);

        if (category == null)
            return NotFound("Category not found");

        if (category.SkillTables.Any())
            return BadRequest("Cannot delete category with skills");

        _context.CategoryTables.Remove(category);
        _context.SaveChanges();

        return Ok("Category deleted");
    }
}
