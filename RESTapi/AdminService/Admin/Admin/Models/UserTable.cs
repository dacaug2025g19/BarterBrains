using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.Models;

public partial class UserTable
{
    public int Uid { get; set; }

    public string? Uname { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public int? Rid { get; set; }

    // ✅ FIXED: maps correctly to adhar_id column
    [Column("adhar_id")]
    public string? AdharId { get; set; }

    public DateOnly Bdate { get; set; }

    

    // ================= NAVIGATION PROPERTIES =================

    public virtual Role? RidNavigation { get; set; }

    public virtual ICollection<BookedSession> BookedSessions { get; set; }
        = new List<BookedSession>();

    public virtual ICollection<PointTransaction> PointTransactions { get; set; }
        = new List<PointTransaction>();

    public virtual ICollection<SessionTable> SessionTables { get; set; }
        = new List<SessionTable>();

    public virtual ICollection<UserLearnSkill> UserLearnSkills { get; set; }
        = new List<UserLearnSkill>();

    public virtual ICollection<UserTeachSkill> UserTeachSkills { get; set; }
        = new List<UserTeachSkill>();
}
