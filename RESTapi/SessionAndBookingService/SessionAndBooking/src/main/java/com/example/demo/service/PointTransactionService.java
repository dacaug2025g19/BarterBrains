package com.example.demo.service;

import com.example.demo.entity.PointTransaction;
import com.example.demo.repository.PointTransactionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PointTransactionService {

    private final PointTransactionRepository txRepo;
    private final UserRepository userRepo;

    public PointTransactionService(PointTransactionRepository txRepo,
                                   UserRepository userRepo) {
        this.txRepo = txRepo;
        this.userRepo = userRepo;
    }

    public void transact(Integer uid,
                          Integer seid,
                          Integer bsid,
                          int points,
                          String type) {

        // 1️⃣ Save transaction history
        PointTransaction tx = new PointTransaction();
        tx.setUid(uid);
        tx.setSeid(seid);
        tx.setBsid(bsid);
        tx.setPoints(points);
        tx.setType(type);
        tx.setTimestamp(LocalDateTime.now());

        txRepo.save(tx);

        // 2️⃣ Update actual user balance
        userRepo.updatePoints(uid, points);

        System.out.println("✅ User " + uid + " points changed by " + points);
    }
}
