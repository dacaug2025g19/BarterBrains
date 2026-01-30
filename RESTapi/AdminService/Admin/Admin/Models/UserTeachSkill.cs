using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class UserTeachSkill
{
    public int Teid { get; set; }

    public int? Uid { get; set; }

    public int? Sid { get; set; }

    public string? ExpLevel { get; set; }

    public string? CertUrl { get; set; }

    public string? Bio { get; set; }

    public virtual SkillTable? SidNavigation { get; set; }

    public virtual UserTable? UidNavigation { get; set; }
}
