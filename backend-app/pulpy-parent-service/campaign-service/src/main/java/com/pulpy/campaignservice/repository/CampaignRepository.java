package com.pulpy.campaignservice.repository;

import com.pulpy.sharedservices.entity.campaign.Campaign;
import org.joda.time.DateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, UUID> {

    @Query(value = "SELECT * FROM campaign WHERE campaign.scheduled_date_time BETWEEN ':startTime'" +
            " AND ':endTime' ORDER BY campaign.scheduled_date_time desc",nativeQuery = true)
    public List<Campaign> getCampaignsBasedOnBetweenTimestamp(@Param("startTime") Date startTime, @Param("endTime") Date endTime);
    public List<Campaign> findByScheduledDateTimeBetweenOrderByScheduledDateTimeAsc(Date startTime, Date endTime);
}
