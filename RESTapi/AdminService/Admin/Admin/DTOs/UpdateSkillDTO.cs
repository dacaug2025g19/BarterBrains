namespace Admin.DTOs;

public class UpdateSkillDTO
{
    public string Sname { get; set; } = null!;
    public string Skdesc { get; set; } = null!;
    public int Cid { get; set; }
    public int Basepoints { get; set; }
}
