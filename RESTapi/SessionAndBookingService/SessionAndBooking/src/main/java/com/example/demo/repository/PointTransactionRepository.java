package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.*;
import java.util.List;

public interface PointTransactionRepository
extends JpaRepository<PointTransaction, Integer> {
}
