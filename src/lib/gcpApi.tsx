import axios from "axios";

// Google Maps APIキー（環境変数に設定するのが望ましい）
const API_KEY = process.env.GCP_API_KEY;

// 検索対象の施設の種類
const PLACE_TYPES = ["hotel", "supermarket", "shopping_mall", "gym", "drugstore", "restaurant", "park", "school"];

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

// 周辺施設を検索し、カテゴリ別に分類する関数
export const searchNearbyPlaces = async (latitude: number, longitude: number, radius: number = 500, maxResults: number = 10) => {
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "places.displayName,places.types,places.location,places.formattedAddress",
  };

  const data = {
    includedTypes: PLACE_TYPES, // 指定した施設タイプ
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
      const places = response.data.places || [];

      // 施設を `PLACE_TYPES` ごとに分類
      const structuredPlaces: Record<string, any[]> = {};
      PLACE_TYPES.forEach(type => structuredPlaces[type] = []);

      places.forEach(place => {
        // `place.types` に `PLACE_TYPES` のどれかが含まれているかチェック
        const matchedTypes = PLACE_TYPES.filter(type => place.types?.includes(type));

        const placeData = {
          name: place.displayName?.text || "不明",
          types: place.types || [],
          address: place.formattedAddress || "住所不明",
          location: place.location
            ? { lat: place.location.latitude, lng: place.location.longitude }
            : null,
        };

        if (matchedTypes.length > 0) {
          matchedTypes.forEach(type => {
            structuredPlaces[type].push(placeData);
          });
        } else {
          // タイプが不明な場合は `others` カテゴリに入れる
          if (!structuredPlaces["others"]) structuredPlaces["others"] = [];
          structuredPlaces["others"].push(placeData);
        }
      });

      return structuredPlaces;
    } else {
      console.error("Places API Error:", response.status, response.data);
      return {};
    }
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    return {};
  }
};
