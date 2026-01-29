using Admin.DTOs;
using Admin.Models;
using Admin.Repositories.Interfaces;

namespace Admin.Services;

public class AdminSkillService
{
    private readonly ISkillRepository _skillRepository;

    public AdminSkillService(ISkillRepository skillRepository)
    {
        _skillRepository = skillRepository;
    }

    public List<SkillDTO> GetAllSkills()
    {
        return _skillRepository.GetAll()
            .Select(s => new SkillDTO
            {
                Sid = s.Sid,
                Sname = s.Sname!,
                Cid = s.Cid ?? 0,                      // ✅ FIX
                CategoryName = s.CidNavigation!.Cname,
                Basepoints = s.Basepoints,
                Description = s.Skdesc
            })
            .ToList();
    }

    public bool AddSkill(CreateSkillDTO dto)
    {
        var skill = new SkillTable
        {
            Sname = dto.Sname,
            Skdesc = dto.Skdesc,
            Cid = dto.Cid,
            Basepoints = dto.Basepoints
        };

        _skillRepository.Add(skill);
        _skillRepository.Save();
        return true;
    }

    public bool UpdateSkill(int sid, UpdateSkillDTO dto)
    {
        var skill = _skillRepository.GetById(sid);
        if (skill == null) return false;

        skill.Sname = dto.Sname;
        skill.Skdesc = dto.Skdesc;
        skill.Cid = dto.Cid;
        skill.Basepoints = dto.Basepoints;

        _skillRepository.Save();
        return true;
    }

    public bool DeleteSkill(int sid)
    {
        var skill = _skillRepository.GetById(sid);
        if (skill == null) return false;

        _skillRepository.Delete(skill);
        _skillRepository.Save();
        return true;
    }
}
