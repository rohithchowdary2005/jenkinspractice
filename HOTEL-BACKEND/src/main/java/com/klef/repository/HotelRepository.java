package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.model.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    Hotel findByName(String name);
    Hotel findByLocation(String location);
}
