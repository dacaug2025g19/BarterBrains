using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class SkillTable
{
    public int Sid { get; set; }

    public string? Sname { get; set; }

    public int? Cid { get; set; }

    public string Skdesc { get; set; } = null!;

    public int Basepoints { get; set; }

    public virtual CategoryTable? CidNavigation { get; set; }

    public virtual ICollection<SessionTable> SessionTables { get; set; } = new List<SessionTable>();

    public virtual ICollection<UserLearnSkill> UserLearnSkills { get; set; } = new List<UserLearnSkill>();

    public virtual ICollection<UserTeachSkill> UserTeachSkills { get; set; } = new List<UserTeachSkill>();
}
