package com.example.exception_logging_experiment.filter;

import java.io.IOException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestLoggingFilter
        extends OncePerRequestFilter {

    private static final Logger logger =
            LoggerFactory.getLogger(
                    RequestLoggingFilter.class
            );

    private static final String CORRELATION_ID =
            "correlationId";


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String correlationId =
                request.getHeader("X-Correlation-ID");


        if (!StringUtils.hasText(correlationId)) {

            correlationId =
                    UUID.randomUUID().toString();
        }


        MDC.put(
                CORRELATION_ID,
                correlationId
        );


        response.setHeader(
                "X-Correlation-ID",
                correlationId
        );


        long startTime =
                System.currentTimeMillis();


        logger.info(
                "REQUEST START | method={} | uri={} | correlationId={}",
                request.getMethod(),
                request.getRequestURI(),
                correlationId
        );


        try {

            filterChain.doFilter(
                    request,
                    response
            );

        } finally {

            long executionTime =
                    System.currentTimeMillis()
                            - startTime;


            logger.info(
                    "REQUEST END | method={} | uri={} | status={} | executionTime={}ms | correlationId={}",
                    request.getMethod(),
                    request.getRequestURI(),
                    response.getStatus(),
                    executionTime,
                    correlationId
            );


            MDC.remove(CORRELATION_ID);
        }
    }
}