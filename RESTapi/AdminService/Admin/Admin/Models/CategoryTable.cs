using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class CategoryTable
{
    public int Cid { get; set; }

    public string? Cname { get; set; }

    public string Cdesc { get; set; } = null!;

    public virtual ICollection<SkillTable> SkillTables { get; set; } = new List<SkillTable>();
}
