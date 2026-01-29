using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class UserLearnSkill
{
    public int Lid { get; set; }

    public int? Uid { get; set; }

    public int? Sid { get; set; }

    public virtual SkillTable? SidNavigation { get; set; }

    public virtual UserTable? UidNavigation { get; set; }
}
