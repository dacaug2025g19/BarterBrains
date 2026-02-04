package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "point_transaction")
public class PointTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tid")
    private Integer tid;

    private Integer uid;
    private String type;
    private Integer seid;
    private Integer bsid;
    private Integer points;

    private LocalDateTime timestamp;

    private LocalDate date;

    @Column(name = "from_uid")
    private Integer fromUid;

    @Column(name = "to_uid")
    private Integer toUid;

    private String reason;

    // ---------- getters & setters ----------

    public Integer getTid() { return tid; }

    public Integer getUid() { return uid; }
    public void setUid(Integer uid) { this.uid = uid; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getSeid() { return seid; }
    public void setSeid(Integer seid) { this.seid = seid; }

    public Integer getBsid() { return bsid; }
    public void setBsid(Integer bsid) { this.bsid = bsid; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Integer getFromUid() { return fromUid; }
    public void setFromUid(Integer fromUid) { this.fromUid = fromUid; }

    public Integer getToUid() { return toUid; }
    public void setToUid(Integer toUid) { this.toUid = toUid; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
