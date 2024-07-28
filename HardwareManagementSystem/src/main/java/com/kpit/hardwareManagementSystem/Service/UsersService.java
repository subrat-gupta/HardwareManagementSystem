package com.kpit.hardwareManagementSystem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import com.kpit.hardwareManagementSystem.dto.UsersDto;
import com.kpit.hardwareManagementSystem.model.UserType;
import com.kpit.hardwareManagementSystem.model.Users;
import com.kpit.hardwareManagementSystem.repository.UserTypeRepository;
import com.kpit.hardwareManagementSystem.repository.UsersRepository;

import java.util.List;

@Service
@Transactional
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private UserTypeRepository userTypeRepository;
    @Autowired
	private ModelMapper mapper;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
    @Transactional
    public Users getUserById(Long kpid) {
        return usersRepository.findById(kpid).orElse(null);
    }
   
    public Users createUser(UsersDto userDto) {
    	
    	Users cx= mapper.map(userDto, Users.class);
//    	UserType userType = userTypeRepository.findById(userDto.getUserType().getId()).orElseThrow(() -> new RuntimeException("UserType not found"));
//        cx.setUserType(userType);
        return usersRepository.save(cx);
    }
    @Transactional
    public void deleteUser(Long kpid) {
        usersRepository.deleteById(kpid);
    }
    public void editUser(Users user) {
    	UserType userType = userTypeRepository.findById(user.getUserType().getId()).orElseThrow(() -> new RuntimeException("UserType not found"));
        user.setUserType(userType);
        usersRepository.save(user);
    }
}