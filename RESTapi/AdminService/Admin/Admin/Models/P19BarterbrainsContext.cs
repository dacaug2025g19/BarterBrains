using System;
using Microsoft.EntityFrameworkCore;

namespace Admin.Models;

public partial class P19BarterbrainsContext : DbContext
{
    public P19BarterbrainsContext()
    {
    }

    public P19BarterbrainsContext(DbContextOptions<P19BarterbrainsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BookedSession> BookedSessions { get; set; }
    public virtual DbSet<CategoryTable> CategoryTables { get; set; }
    public virtual DbSet<PointTransaction> PointTransactions { get; set; }
    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<SessionTable> SessionTables { get; set; }
    public virtual DbSet<SkillTable> SkillTables { get; set; }
    public virtual DbSet<UserLearnSkill> UserLearnSkills { get; set; }
    public virtual DbSet<UserTable> UserTables { get; set; }
    public virtual DbSet<UserTeachSkill> UserTeachSkills { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql(
            "server=localhost;database=p_19_barterbrains;user=root;password=root",
            ServerVersion.Parse("8.2.0-mysql")
        );

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        // ================= BOOKED SESSION =================
        modelBuilder.Entity<BookedSession>(entity =>
        {
            entity.HasKey(e => e.Bsid);
            entity.ToTable("booked_session");

            entity.HasOne(d => d.LearnerU)
                .WithMany(p => p.BookedSessions)
                .HasForeignKey(d => d.LearnerUid)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.Se)
                .WithMany(p => p.BookedSessions)
                .HasForeignKey(d => d.Seid)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ================= CATEGORY =================
        modelBuilder.Entity<CategoryTable>(entity =>
        {
            entity.HasKey(e => e.Cid);
            entity.ToTable("category_table");
        });

        // ================= POINT TRANSACTION =================
        modelBuilder.Entity<PointTransaction>(entity =>
        {
            entity.HasKey(e => e.Tid);
            entity.ToTable("point_transaction");

            entity.HasOne(d => d.UidNavigation)
                .WithMany(p => p.PointTransactions)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.Se)
                .WithMany(p => p.PointTransactions)
                .HasForeignKey(d => d.Seid)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.Bs)
                .WithMany(p => p.PointTransactions)
                .HasForeignKey(d => d.Bsid)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ================= ROLE =================
        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid);
            entity.ToTable("role");
        });

        // ================= SESSION =================
        modelBuilder.Entity<SessionTable>(entity =>
        {
            entity.HasKey(e => e.Seid);
            entity.ToTable("session_table");

            entity.HasOne(d => d.TeacherU)
                .WithMany(p => p.SessionTables)
                .HasForeignKey(d => d.TeacherUid)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.Skill)
                .WithMany(p => p.SessionTables)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ================= SKILL =================
        modelBuilder.Entity<SkillTable>(entity =>
        {
            entity.HasKey(e => e.Sid);
            entity.ToTable("skill_table");

            entity.HasOne(d => d.CidNavigation)
                .WithMany(p => p.SkillTables)
                .HasForeignKey(d => d.Cid)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ================= USER LEARN SKILL =================
        modelBuilder.Entity<UserLearnSkill>(entity =>
        {
            entity.HasKey(e => e.Lid);
            entity.ToTable("user_learn_skill");

            entity.HasOne(d => d.UidNavigation)
                .WithMany(p => p.UserLearnSkills)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.SidNavigation)
                .WithMany(p => p.UserLearnSkills)
                .HasForeignKey(d => d.Sid)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ================= USER =================
        modelBuilder.Entity<UserTable>(entity =>
        {
            entity.HasKey(e => e.Uid);
            entity.ToTable("user_table");

            entity.HasOne(d => d.RidNavigation)
                .WithMany(p => p.UserTables)
                .HasForeignKey(d => d.Rid)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ================= USER TEACH SKILL =================
        modelBuilder.Entity<UserTeachSkill>(entity =>
        {
            entity.HasKey(e => e.Teid);
            entity.ToTable("user_teach_skill");

            entity.HasOne(d => d.UidNavigation)
                .WithMany(p => p.UserTeachSkills)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.SidNavigation)
                .WithMany(p => p.UserTeachSkills)
                .HasForeignKey(d => d.Sid)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
