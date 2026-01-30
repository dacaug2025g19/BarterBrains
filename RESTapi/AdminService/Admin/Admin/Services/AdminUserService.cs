namespace Admin.Services;

using Admin.DTOs;
using Admin.Models;
using Admin.Repositories.Interfaces;

public class AdminUserService
{
    private readonly IUserRepository _userRepository;

    public AdminUserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    // ✅ Get all users (Admin view)
    public List<UserDTO> GetAllUsers()
    {
        return _userRepository.GetAll()
            .Select(u => new UserDTO
            {
                Uid = u.Uid,
                Uname = u.Uname,
                Email = u.Email,
                Phone = u.Phone,
                Role = u.RidNavigation!.Rname
            })
            .ToList();
    }

    // ✅ Change user role (Admin/User)
    public bool ChangeUserRole(int uid, int roleId)
    {
        var user = _userRepository.GetById(uid);
        if (user == null)
            return false;

        user.Rid = roleId;
        _userRepository.Update(user);
        _userRepository.Save();

        return true;
    }
}
