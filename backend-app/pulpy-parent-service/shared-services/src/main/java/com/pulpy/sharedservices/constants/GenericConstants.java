package com.pulpy.sharedservices.constants;

import java.util.Arrays;
import java.util.List;

public final class GenericConstants {
    private GenericConstants(){};
    public static final List<String> linksWithoutAuthentication = Arrays.asList(new String[]{
            "/api/v1/oauth/authenticate",
            "/api/v1/user/register",
            "/api/v1/user/verify-user"
    });
}
