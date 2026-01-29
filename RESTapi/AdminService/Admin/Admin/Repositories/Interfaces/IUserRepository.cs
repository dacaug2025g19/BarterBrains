using Admin.Models;

namespace Admin.Repositories.Interfaces
{
    public interface IUserRepository
    {
        List<UserTable> GetAll();
        UserTable? GetById(int uid);
        void Add(UserTable user);
        void Update(UserTable user);
        void Save();
    }
}
