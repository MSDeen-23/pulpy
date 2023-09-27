package com.pulpy.cloudgateway.filter;

import com.google.gson.Gson;
import com.pulpy.cloudgateway.service.TokenValidation;
import com.pulpy.sharedservices.constants.GenericConstants;
import com.pulpy.sharedservices.exceptions.ExceptionMessages;
import com.pulpy.sharedservices.exceptions.customexceptions.TokenNotValidException;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletResponse;

@Configuration
public class AuthenticationFilter implements GlobalFilter {
    @Autowired
    TokenValidation tokenValidation;
    Gson gson = new Gson();
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String requestPath = exchange.getRequest().getPath().toString();
        if(GenericConstants.linksWithoutAuthentication.contains(requestPath)){
            return chain.filter(exchange);
        }
        else{
            try {
                String token = String.valueOf(exchange.getRequest().getHeaders().get("Authorization").get(0));
                Claims userDetails = tokenValidation.validateToken(token);
                ServerHttpRequest request = exchange.getRequest().mutate()
                        .header("userDetails", gson.toJson(userDetails))
                        .build();
                return chain.filter(exchange.mutate().request(request).build());
            }catch (Exception e){
                ServerHttpResponse response = exchange.getResponse();
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();

            }
        }
    }
}
