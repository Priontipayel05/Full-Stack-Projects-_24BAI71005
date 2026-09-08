package com.prionti.performance_optimization.config;

import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {

        CacheConfigurationBuilder<Long, String>
                cacheConfiguration =
                CacheConfigurationBuilder
                        .newCacheConfigurationBuilder(
                                Long.class,
                                String.class,
                                ResourcePoolsBuilder.heap(100)
                        );

        return CacheManagerBuilder
                .newCacheManagerBuilder()
                .withCache(
                        "studentCache",
                        cacheConfiguration
                )
                .build(true);
    }

    @Bean
    public Cache<Long, String> studentCache(
            CacheManager cacheManager) {

        return cacheManager.getCache(
                "studentCache",
                Long.class,
                String.class
        );
    }
}