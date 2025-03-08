import axios from "axios";

// Google Maps APIキー（環境変数に設定するのが望ましい）
const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// 検索対象の施設の種類
const PLACE_TYPES = ["hotel", "supermarket", "shopping_mall", "gym", "drugstore", "restaurant", "park"];

// 住所から緯度経度を取得する関数
export const getGeocode = async (address: string) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error("Geocoding Error:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocode:", error);
    return null;
  }
};

// 周辺施設を検索する関数
export const searchNearbyPlaces = async (latitude: number, longitude: number, radius: number = 500, maxResults: number = 10) => {
  const types = PLACE_TYPES;
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "places.displayName",
  };

  const data = {
    includedTypes: types,
    maxResultCount: maxResults,
    locationRestriction: {
      circle: {
        center: { latitude, longitude },
        radius,
      },
    },
  };

  try {
    const response = await axios.post(url, data, { headers });

    if (response.status === 200) {
      return response.data.places || [];
    } else {
      console.error("Places API Error:", response.status, response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return [];
  }
};


// 使用例
// import { searchNearbyPlaces } from "@/api/places/route";
//
// const fetchPlaces = async () => {
//     const location = await getGeocode(address);
//     if (location) {
//       const nearbyPlaces = await searchNearbyPlaces(location.lat, location.lng);
//       setPlaces(nearbyPlaces);
//     }
// };