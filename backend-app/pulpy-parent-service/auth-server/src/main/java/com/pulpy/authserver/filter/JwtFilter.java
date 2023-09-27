package com.pulpy.authserver.filter;

import com.pulpy.authserver.service.UserService;
import com.pulpy.authserver.utility.JWTUtility;
import com.pulpy.sharedservices.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@Configuration
//public class JwtFilter extends OncePerRequestFilter {
//    @Autowired
//    private JWTUtility jwtUtility;
//
//    @Autowired
//    private UserService userService;
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//            String authorization = request.getHeader("Authorization");
//            String token = null;
//            String userName=null;
//            filterChain.doFilter(request,response);
////            if(request.getServletPath().equals("/api/v1/oauth/authenticate")){
////                filterChain.doFilter(request,response);
////            }
////            else{
////
////            }
////
////            if(null!=authorization && authorization.startsWith("Bearer ")){
////                token = authorization.substring(7).trim();
////                userName = jwtUtility.getUsernameFromToken(token);
////
////            }
////            if(null!=userName){
////                User user = userService.loadUserByUsername(userName);
////                UserDetails userDetails = new USer
////                if(jwtUtility.validateToken(token,userDetails)){
////                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
////                            new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
////                    usernamePasswordAuthenticationToken.setDetails(
////                            new WebAuthenticationDetailsSource().buildDetails(request)
////                    );
////                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
////                }
////                else{
////                    throw new ServletException("Invalid token");
////                }
////                filterChain.doFilter(request,response);
////            }
//    }
//}
