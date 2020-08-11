export const driverStatus = [
    {
      name: "A",
      currentLocation: "Marathalli",
      occupied: true,
      houseLocation: "HSR",
      wentToHouse: false
    },
    {
      name: "B",
      currentLocation: "HSR",
      occupied: false,
      houseLocation: "Bellandur",
      wentToHouse: false
    },
    {
      name: "C",
      currentLocation: "HSR",
      occupied: true
    },
    {
      name: "D",
      currentLocation: "Bellandur",
      occupied: false,
      houseLocation: "Marathalli",
      wentToHouse: false
    },
    {
      name: "E",
      currentLocation: "Bellandur",
      occupied: false,
      houseLocation: "HSR",
      wentToHouse: false
    },
    {
      name: "F",
      currentLocation: "Bellandur",
      occupied: false,
      houseLocation: "Marathalli",
      wentToHouse: true
    }
  ];
  
  export const trafficStatus = [
    {
      location: "HSR",
      congested: false,
      surgePrice: 1
    },
    {
      location: "Marathalli",
      congested: true,
      surgePrice: 1.5
    },
    {
      location: "Bellandur",
      congested: true,
      surgePrice: 2
    },
    {
      location: "Koramangala",
      congested: false,
      surgePrice: 1
    }
  ];
  
  export const passengerStatus = [
    {
      name: 1,
      currentLocation: "HSR",
      destination: "Bellandur",
      fkplus: false
    },
    {
      name: 2,
      currentLocation: "Bellandur",
      destination: "Marathalli",
      fkplus: false
    },
    {
      name: 3,
      currentLocation: "Koramangala",
      destination: "HSR",
      fkplus: false
    },
    {
      name: 4,
      currentLocation: "Koramangala",
      destination: "Marathalli",
      fkplus: false
    },
    {
      name: 5,
      currentLocation: "Koramangala",
      destination: "Marathalli",
      fkplus: true
    },
    {
      name: 6,
      currentLocation: "Silkboard",
      destination: "HSR",
      fkplus: false
    }
  ];
  