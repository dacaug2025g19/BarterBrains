using Admin.Models;

namespace Admin.Repositories.Interfaces
{
    public interface ISkillRepository
    {
        List<SkillTable> GetAll();
        SkillTable GetById(int sid);
        void Add(SkillTable skill);
        void Delete(SkillTable skill);
        void Save();
    }

}
