using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class SessionTable
{
    public int Seid { get; set; }

    public int? TeacherUid { get; set; }

    public int? SkillId { get; set; }

    public string Mode { get; set; } = null!;

    public DateOnly SDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual ICollection<BookedSession> BookedSessions { get; set; } = new List<BookedSession>();

    public virtual ICollection<PointTransaction> PointTransactions { get; set; } = new List<PointTransaction>();

    public virtual SkillTable? Skill { get; set; }

    public virtual UserTable? TeacherU { get; set; }
}
