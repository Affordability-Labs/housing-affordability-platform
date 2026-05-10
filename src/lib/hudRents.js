const HUD_FMR_BASE_URL = "https://www.huduser.gov/hudapi/public/fmr";
const SAN_DIEGO_COUNTY_FIPS = "0607300000";
const SAN_DIEGO_COUNTY_ENTITY_ID = "0607399999";
const AUTH_HEADER_FORMAT = "Authorization: Bearer [redacted]";
const HUD_YEAR = "2024";

export const HUD_FMR_NEIGHBORHOODS = [
  "Mira Mesa",
  "North Park",
  "Clairemont",
  "Chula Vista",
  "UTC",
  "La Mesa",
  "Escondido",
  "Carmel Valley",
  "Hillcrest",
  "Downtown San Diego",
];

export const HUD_BEDROOM_LABELS = ["0BR", "1BR", "2BR", "3BR", "4BR"];

const FALLBACK_HUD_2024_SAN_DIEGO = {
  "0BR": 2062,
  "1BR": 2248,
  "2BR": 2833,
  "3BR": 3819,
  "4BR": 4638,
};

function toRentNumber(value) {
  const parsed = Number.parseInt(String(value ?? "").replace(/[$,\s]/g, ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function normalizeBasicData(basicData) {
  const row = Array.isArray(basicData)
    ? basicData.find((item) => item.zip_code === "MSA level") || basicData[0]
    : basicData;

  if (!row || typeof row !== "object") return null;

  const bedroomRents = {
    "0BR": toRentNumber(row.Efficiency),
    "1BR": toRentNumber(row["One-Bedroom"]),
    "2BR": toRentNumber(row["Two-Bedroom"]),
    "3BR": toRentNumber(row["Three-Bedroom"]),
    "4BR": toRentNumber(row["Four-Bedroom"]),
  };

  return HUD_BEDROOM_LABELS.every((label) => bedroomRents[label])
    ? bedroomRents
    : null;
}

function mapCountyRentsToNeighborhoods(bedroomRents) {
  return HUD_FMR_NEIGHBORHOODS.reduce((mapped, neighborhood) => {
    mapped[neighborhood] = {
      ...bedroomRents,
      geographicLevel: "San Diego County HUD FMR baseline",
    };
    return mapped;
  }, {});
}

function buildRentData({ bedroomRents, year, areaName, source }) {
  return {
    countyFips: SAN_DIEGO_COUNTY_FIPS,
    entityId: SAN_DIEGO_COUNTY_ENTITY_ID,
    year,
    areaName,
    source,
    geographicLevel: "County-level HUD Fair Market Rent baseline",
    bedrooms: bedroomRents,
    neighborhoods: mapCountyRentsToNeighborhoods(bedroomRents),
    mappedNeighborhoods: HUD_FMR_NEIGHBORHOODS,
  };
}

function getCheckedAt() {
  return new Date().toISOString();
}

function fallbackResponse(reason, debug = {}) {
  const checkedAt = getCheckedAt();

  return {
    rentData: buildRentData({
      bedroomRents: FALLBACK_HUD_2024_SAN_DIEGO,
      year: HUD_YEAR,
      areaName: "San Diego County, CA",
      source: "FY 2024 fallback HUD FMR values",
    }),
    lastChecked: checkedAt,
    lastUpdated: checkedAt,
    isFallback: true,
    error: reason,
    endpointUsed: debug.endpointUsed || null,
    entityIdUsed: debug.entityIdUsed || null,
    hudStatus: debug.hudStatus ?? null,
    authHeaderFormatUsed: AUTH_HEADER_FORMAT,
    fallbackReason: reason,
  };
}

function cleanHUDToken(rawToken) {
  return String(rawToken || "")
    .trim()
    .replace(/^Bearer\s+/i, "")
    .replace(/^["']|["']$/g, "")
    .replace(/[^\x21-\x7e]/g, "");
}

function hudHeaders(token) {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// HUD fetch utility: token stays on the server route, and only sanitized JSON
// is returned to the client-side calculator hook.
async function fetchHUDJson(path, token) {
  const endpointUsed = `${HUD_FMR_BASE_URL}${path}`;
  const response = await fetch(endpointUsed, {
    headers: hudHeaders(token),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      payload: null,
      error: `HUD API returned ${response.status}.`,
      endpointUsed,
    };
  }

  try {
    return {
      ok: true,
      status: response.status,
      payload: await response.json(),
      error: null,
      endpointUsed,
    };
  } catch {
    return {
      ok: false,
      status: response.status,
      payload: null,
      error: "HUD API response was invalid JSON.",
      endpointUsed,
    };
  }
}

function findSanDiegoCountyEntity(payload) {
  const counties = Array.isArray(payload?.data) ? payload.data : [];
  return counties.find((county) =>
    String(county?.county_name || "")
      .toLowerCase()
      .includes("san diego")
  )?.fips_code;
}

function findSanDiegoMetroEntity(payload) {
  const metros = Array.isArray(payload?.data) ? payload.data : [];
  return metros.find((metro) =>
    String(metro?.area_name || "")
      .toLowerCase()
      .includes("san diego")
  )?.cbsa_code;
}

async function resolveSanDiegoEntityIds(token) {
  const entityIds = [];
  const lookupDebug = [];

  const counties = await fetchHUDJson("/listCounties/CA", token);
  lookupDebug.push({
    endpointUsed: counties.endpointUsed,
    hudStatus: counties.status,
  });

  if (counties.ok) {
    const countyEntityId = findSanDiegoCountyEntity(counties.payload);
    if (countyEntityId && !entityIds.includes(countyEntityId)) {
      entityIds.push(countyEntityId);
    }
  }

  if (!entityIds.includes(SAN_DIEGO_COUNTY_ENTITY_ID)) {
    entityIds.push(SAN_DIEGO_COUNTY_ENTITY_ID);
  }

  const metros = await fetchHUDJson("/listMetroAreas", token);
  lookupDebug.push({
    endpointUsed: metros.endpointUsed,
    hudStatus: metros.status,
  });

  if (metros.ok) {
    const metroEntityId = findSanDiegoMetroEntity(metros.payload);
    if (metroEntityId && !entityIds.includes(metroEntityId)) {
      entityIds.push(metroEntityId);
    }
  }

  return { entityIds, lookupDebug };
}

async function fetchFMRData(entityId, token) {
  const result = await fetchHUDJson(`/data/${entityId}`, token);
  if (!result.ok) {
    return {
      ...result,
      entityId,
      bedroomRents: null,
    };
  }

  const data = result.payload?.data;
  const bedroomRents = normalizeBasicData(data?.basicdata);

  if (!bedroomRents) {
    return {
      ok: false,
      status: result.status,
      payload: result.payload,
      entityId,
      bedroomRents: null,
      error: "HUD API response was invalid.",
      endpointUsed: result.endpointUsed,
    };
  }

  return {
    ok: true,
    status: result.status,
    payload: result.payload,
    entityId,
    bedroomRents,
    endpointUsed: result.endpointUsed,
    error: null,
  };
}

function getHUDToken() {
  return cleanHUDToken(
    process.env.HUD_API_TOKEN || process.env.NEXT_PUBLIC_HUD_API_TOKEN
  );
}

export async function getHUDRents() {
  const token = getHUDToken();

  if (!token) {
    // Fallback keeps the calculator usable if the token is missing or invalid.
    return fallbackResponse("HUD API token is not configured.");
  }

  const attemptedEntityIds = [];
  const attemptedEndpoints = [];

  try {
    let lastError = "HUD API response was invalid.";
    let lastEndpoint = null;
    let lastEntityId = null;
    let lastStatus = null;

    const firstResult = await fetchFMRData(SAN_DIEGO_COUNTY_FIPS, token);
    attemptedEntityIds.push(SAN_DIEGO_COUNTY_FIPS);
    attemptedEndpoints.push(firstResult.endpointUsed);
    lastEndpoint = firstResult.endpointUsed;
    lastEntityId = firstResult.entityId;
    lastStatus = firstResult.status;

    if (firstResult.ok) {
      const data = firstResult.payload?.data;
      const checkedAt = getCheckedAt();

      return {
        rentData: {
          ...buildRentData({
            bedroomRents: firstResult.bedroomRents,
            year: data?.year || HUD_YEAR,
            areaName:
              data?.area_name ||
              data?.metro_name ||
              data?.county_name ||
              "San Diego County, CA",
            source: "HUD Fair Market Rent API",
          }),
          entityId: firstResult.entityId,
          attemptedEntityIds,
        },
        lastChecked: checkedAt,
        lastUpdated: checkedAt,
        isFallback: false,
        error: null,
      };
    }

    lastError = firstResult.error;
    const { entityIds, lookupDebug } = await resolveSanDiegoEntityIds(token);
    attemptedEndpoints.push(
      ...lookupDebug.map((lookup) => lookup.endpointUsed).filter(Boolean)
    );

    for (const entityId of entityIds) {
      if (attemptedEntityIds.includes(entityId)) continue;
      attemptedEntityIds.push(entityId);

      const result = await fetchFMRData(entityId, token);
      attemptedEndpoints.push(result.endpointUsed);
      lastEndpoint = result.endpointUsed;
      lastEntityId = result.entityId;
      lastStatus = result.status;

      if (!result.ok) {
        lastError = result.error;
        continue;
      }

      const data = result.payload?.data;
      const checkedAt = getCheckedAt();

      return {
        rentData: {
          ...buildRentData({
            bedroomRents: result.bedroomRents,
            year: data?.year || HUD_YEAR,
            areaName:
              data?.area_name ||
              data?.metro_name ||
              data?.county_name ||
              "San Diego County, CA",
            source: "HUD Fair Market Rent API",
          }),
          entityId: result.entityId,
          attemptedEntityIds,
        },
        lastChecked: checkedAt,
        lastUpdated: checkedAt,
        isFallback: false,
        error: null,
      };
    }

    return {
      ...fallbackResponse(lastError, {
        endpointUsed: lastEndpoint,
        entityIdUsed: lastEntityId,
        hudStatus: lastStatus,
      }),
      debug: {
        attemptedEntityIds,
        attemptedEndpoints,
      },
    };
  } catch {
    return {
      ...fallbackResponse("HUD request network error.", {
        endpointUsed: attemptedEndpoints.at(-1) || null,
        entityIdUsed: attemptedEntityIds.at(-1) || null,
        hudStatus: null,
      }),
      debug: {
        attemptedEntityIds,
        attemptedEndpoints,
      },
    };
  }
}
