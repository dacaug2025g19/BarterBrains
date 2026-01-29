using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class PointTransaction
{
    public int Tid { get; set; }

    public int? Uid { get; set; }

    public string? Type { get; set; }

    public int? Seid { get; set; }

    public int? Bsid { get; set; }

    public int Points { get; set; }

    public DateTime? Timestamp { get; set; }

    public virtual BookedSession? Bs { get; set; }

    public virtual SessionTable? Se { get; set; }

    public virtual UserTable? UidNavigation { get; set; }
}
