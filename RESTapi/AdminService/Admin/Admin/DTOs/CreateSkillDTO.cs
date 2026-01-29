namespace Admin.DTOs;

public class CreateSkillDTO
{
    public string Sname { get; set; } = null!;
    public string Skdesc { get; set; } = null!;
    public int Cid { get; set; }
    public int Basepoints { get; set; }
}
