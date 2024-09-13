// src/RevenuePage.js
import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { styled } from '@mui/system';

const FullScreenContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '75vh',
  width: '75vw',
  padding: 16,
  boxSizing: 'border-box',
});

const StyledCard = styled(Card)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: 8,
  overflow: 'hidden',
});

const Title = styled(Typography)({
  marginBottom: 24,
  fontWeight: 600,
  color: '#333',
});

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75%',
});

const ErrorText = styled(Typography)({
  color: '#f44336',
  textAlign: 'center',
  marginTop: 16,
});

const ChartContainer = styled('div')({
  flex: 1,
  height: '75%',
});

const RevenuePage = () => {
  const [revenueData, setRevenueData] = useState<{ date: string; sum: number }[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost/api_rev/revenue.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Transform data into expected format
        const transformedData = data.map((item: { date: string; sum: string }) => ({
          date: item.date,
          sum: parseFloat(item.sum),
        }));
        setRevenueData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <FullScreenContainer>
      <StyledCard >
        <CardContent >
          <Title variant="h4" align="center">
            Revenue by Date
          </Title>
          {loading && <LoadingContainer><CircularProgress /></LoadingContainer>}
          {error && <ErrorText variant="h6">Error: {error}</ErrorText>}
          {revenueData && (
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fill: '#666' }} />
                  <YAxis tick={{ fill: '#666' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sum" fill="#8884d8" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </StyledCard>
    </FullScreenContainer>
  );
};

export default RevenuePage;
