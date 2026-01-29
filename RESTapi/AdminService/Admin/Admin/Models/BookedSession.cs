using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class BookedSession
{
    public int Bsid { get; set; }

    public int Seid { get; set; }

    public int LearnerUid { get; set; }

    public string TeacherConfirm { get; set; } = null!;

    public string LearnerConfirm { get; set; } = null!;

    public DateOnly BookingDate { get; set; }

    public string Feedback { get; set; } = null!;

    public virtual UserTable LearnerU { get; set; } = null!;

    public virtual ICollection<PointTransaction> PointTransactions { get; set; } = new List<PointTransaction>();

    public virtual SessionTable Se { get; set; } = null!;
}
