package com.pulpy.sharedservices.entity.sharedentities;

import com.pulpy.sharedservices.entity.leads.Leads;
import com.pulpy.sharedservices.entity.user.User;

public record LeadsUser(Leads leads, User user) {
}
