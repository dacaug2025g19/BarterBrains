using System;
using System.Collections.Generic;

namespace Admin.Models;

public partial class Role
{
    public int Rid { get; set; }

    public string? Rname { get; set; }

    public virtual ICollection<UserTable> UserTables { get; set; } = new List<UserTable>();
}
