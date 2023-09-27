package com.pulpy.schedulerservice.repository;

import com.pulpy.sharedservices.entity.campaign.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, UUID> {

        public List<Campaign> findByScheduledDateTimeBetweenOrderByScheduledDateTimeAsc(Date startTime, Date endTime);

}
