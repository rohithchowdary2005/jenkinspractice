package com.klef.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hotel_table")
public class Hotel {
	    @Id
	    @Column(name = "hotel_id")
	    private int id;

	    @Column(name = "hotel_name", nullable = false, length = 50)
	    private String name;

	    @Column(name = "hotel_location", nullable = false, length = 100)
	    private String location;

	    @Column(name = "hotel_rating", nullable = false)
	    private double rating;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public double getRating() {
			return rating;
		}

		public void setRating(double rating) {
			this.rating = rating;
		}

		@Override
		public String toString() {
			return "Hotel [id=" + id + ", name=" + name + ", location=" + location + ", rating=" + rating + "]";
		}

}
