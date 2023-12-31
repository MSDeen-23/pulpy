package com.pulpy.userservice.repository;

import com.pulpy.sharedservices.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User getUserByEmail(String emailId);

    boolean existsByEmail(String emailId);
}
