namespace Admin.DTOs;

public class SkillDTO
{
    public int Sid { get; set; }
    public string Sname { get; set; } = null!;
    public int Cid { get; set; }
    public string CategoryName { get; set; } = null!;
    public int Basepoints { get; set; }
    public string Description { get; set; } = null!;
}
