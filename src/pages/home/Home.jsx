import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import ReservationCard from "../../components/reservationCard";
import { AppLayout } from "../../layouts/appLayout";
import { useDispatch, useSelector } from "react-redux";
import CustomHashLoader from "../../components/customLoader/CustomHashLoader";

import images from "./Images";
import { getActiveProperties } from "../../redux/features/PropertySlice";
import ReservationCardCopy from "../../components/reservationCard/index copy";

export default function Home() {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.properties);
  const [loading, setLoading] = useState(false);
  const [recommendedProperties, setRecommendedProperties] = useState([]);

  useEffect(() => {
    setLoading(true);

  // Fetch recommended properties from your API
  // fetch("http://localhost:5000/api/recommended/6549db69d4de650c92a3c316")
    fetch("http://localhost:5000/api/recommended/6549db69d4de650c92a3c316")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);  // Log the response data to the console

      if (data.recommended_properties && data.recommended_properties.length > 0) {
        setRecommendedProperties(data.recommended_properties);
      } else {
        console.warn("No recommended properties found in the API response:", data);
      }
    })
    .catch((error) => console.error("Error fetching recommended properties:", error))
    .finally(() => setLoading(false));

  // Fetch active properties (assuming getActiveProperties is defined in your redux slice)
  dispatch(getActiveProperties());
}, [dispatch]);

  return (
    <AppLayout>
      <Container maxWidth="xl">
        <Grid>
          <h1>Suggested</h1>
        </Grid>
        <Grid container spacing={4}>
          {loading ? (
            <CustomHashLoader />
          ) : (
            <>
              {recommendedProperties && recommendedProperties.length > 0 ? (
                recommendedProperties.map((propertyId, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    {/* Render your recommended property using the propertyId */}
                    <ReservationCard propertyId={propertyId} />
                  </Grid>
                ))
              ) : (
                <CustomHashLoader />
              )}
            </>
          )}

          {images.map((card, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <ReservationCardCopy
                image1={card.image1}
                image2={card.image2}
                image3={card.image3}
                title={"Chaing Rai, Thailand"}
                subtitle={"29 km to Lam Nam Kok National Park Aug 19 - 24"}
                price={card.price}
                review={"4.9"}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: { md: "none" } }}></Box>
      </Container>
    </AppLayout>
  );
}