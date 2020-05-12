package com.fininfo.bazarshop.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.fininfo.bazarshop.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.fininfo.bazarshop.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.fininfo.bazarshop.domain.User.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Authority.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.User.class.getName() + ".authorities");
            createCache(cm, com.fininfo.bazarshop.domain.Categorie.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Categorie.class.getName() + ".sousCategories");
            createCache(cm, com.fininfo.bazarshop.domain.Categorie.class.getName() + ".stocks");
            createCache(cm, com.fininfo.bazarshop.domain.Categorie.class.getName() + ".remises");
            createCache(cm, com.fininfo.bazarshop.domain.SousCategorie.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.SousCategorie.class.getName() + ".produits");
            createCache(cm, com.fininfo.bazarshop.domain.SousCategorie.class.getName() + ".stocks");
            createCache(cm, com.fininfo.bazarshop.domain.SousCategorie.class.getName() + ".remises");
            createCache(cm, com.fininfo.bazarshop.domain.Produit.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Produit.class.getName() + ".stocks");
            createCache(cm, com.fininfo.bazarshop.domain.Produit.class.getName() + ".mouvementStocks");
            createCache(cm, com.fininfo.bazarshop.domain.Produit.class.getName() + ".commandeLignes");
            createCache(cm, com.fininfo.bazarshop.domain.Produit.class.getName() + ".remises");
            createCache(cm, com.fininfo.bazarshop.domain.ProdEnumeration.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.ProduitUnite.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.ProduitUnite.class.getName() + ".produits");
            createCache(cm, com.fininfo.bazarshop.domain.Stock.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.MouvementStock.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Client.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Client.class.getName() + ".adresses");
            createCache(cm, com.fininfo.bazarshop.domain.Client.class.getName() + ".commandes");
            createCache(cm, com.fininfo.bazarshop.domain.Adresse.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Adresse.class.getName() + ".commandes");
            createCache(cm, com.fininfo.bazarshop.domain.GestionFidelite.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Commande.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Commande.class.getName() + ".mouvementStocks");
            createCache(cm, com.fininfo.bazarshop.domain.Commande.class.getName() + ".commandeLignes");
            createCache(cm, com.fininfo.bazarshop.domain.CommandeLignes.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Zone.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.Zone.class.getName() + ".adresses");
            createCache(cm, com.fininfo.bazarshop.domain.Zone.class.getName() + ".livraisons");
            createCache(cm, com.fininfo.bazarshop.domain.Livraison.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.CodePostaux.class.getName());
            createCache(cm, com.fininfo.bazarshop.domain.CodePostaux.class.getName() + ".adresses");
            createCache(cm, com.fininfo.bazarshop.domain.Remise.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
