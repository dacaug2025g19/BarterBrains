namespace Admin.DTOs
{
    public class AdminSkillDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int CategoryId { get; set; }
        public int BasePoints { get; set; }
    }
}
