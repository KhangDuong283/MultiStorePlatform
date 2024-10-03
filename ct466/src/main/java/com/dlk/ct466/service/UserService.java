package com.dlk.ct466.service;

import com.dlk.ct466.domain.entity.PaymentMethod;
import com.dlk.ct466.domain.entity.User;
import com.dlk.ct466.domain.mapper.UserMapper;
import com.dlk.ct466.domain.response.ResPaginationDTO;
import com.dlk.ct466.domain.response.user.ResCreateUserDTO;
import com.dlk.ct466.domain.response.user.ResUpdateUserDTO;
import com.dlk.ct466.domain.response.user.ResUserDTO;
import com.dlk.ct466.repository.UserRepository;
import com.dlk.ct466.util.PaginationUtil;
import com.dlk.ct466.util.error.IdInvalidException;
import com.turkraft.springfilter.converter.FilterSpecification;
import com.turkraft.springfilter.converter.FilterSpecificationConverter;
import com.turkraft.springfilter.parser.FilterParser;
import com.turkraft.springfilter.parser.node.FilterNode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FilterParser filterParser;
    private final FilterSpecificationConverter filterSpecificationConverter;

    public User fetchUserById(long id) throws IdInvalidException {
        return userRepository.findByIdIfNotDeleted(id).orElseThrow(
                () -> new IdInvalidException("User with id: '" + id + "' not found")
        );
    }

    public ResUserDTO getUserById(long id) throws IdInvalidException {
        User dbUser = userRepository.findByIdIfNotDeleted(id).orElseThrow(
                () -> new IdInvalidException("User with id: '" + id + "' not found")
        );
        return UserMapper.mapToUserDTO(dbUser);
    }

    public User fetchUserByIdAdmin(long id) throws IdInvalidException {
        return userRepository.findById(id).orElseThrow(
                () -> new IdInvalidException("User with id: '" + id + "' not found")
        );
    }

    public ResCreateUserDTO createUser(User user) throws IdInvalidException {
        Optional<User> dbUser = userRepository.findByEmailNotDeleted(user.getEmail());
        if (dbUser.isPresent()) {
            throw new IdInvalidException("Email: '" + user.getEmail() + "' already exist");
        }

        String  hashPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);

        User newUser = userRepository.save(user);
        return UserMapper.mapToCreateUserDTO(newUser);
    }


    public ResUpdateUserDTO updateUser(User user, long id) throws IdInvalidException {
        User dbUser = fetchUserById(id);
        dbUser.setFullName(user.getFullName());
        dbUser.setImageUrl(user.getImageUrl());
        dbUser.setActive(user.isActive());
        User updatedUser = userRepository.save(dbUser);
        return UserMapper.mapToUpdateUserDTO(updatedUser);
    }

    public Void deleteUser(long id) throws IdInvalidException {
        User dbUser = fetchUserById(id).toBuilder()
                .deleted(true)
                .build();
        userRepository.save(dbUser);
        return null;
    }

    public Void restoreUser(long id) throws IdInvalidException {
        User dbUser = fetchUserByIdAdmin(id).toBuilder()
                .deleted(false)
                .build();
        userRepository.save(dbUser);
        return null;
    }

    public ResPaginationDTO getAllUser(Pageable pageable) {
        FilterNode node = filterParser.parse("deleted=false");
        FilterSpecification<User> spec = filterSpecificationConverter.convert(node);

        Page<User> pageUser = userRepository.findAll(spec, pageable);
        return PaginationUtil.getPaginatedResult(pageUser, pageable, UserMapper::mapToUserDTO);
    }

    public ResPaginationDTO getAllUserAdmin(Pageable pageable) {
        FilterNode node = filterParser.parse("");
        FilterSpecification<User> spec = filterSpecificationConverter.convert(node);

        Page<User> pageUser = userRepository.findAll(spec, pageable);
        return PaginationUtil.getPaginatedResult(pageUser, pageable, UserMapper::mapToUserDTO);
    }
}
