/* =========================================================
   PROVINCIAL EMPLOYMENT DATA
   Values are change in employed persons in thousands.
   Q1 2025 vs Q4 2024.
========================================================= */

const provinceEmploymentData = [
  {
    province: "Western Cape",
    change: 49,
    lat: -33.2278,
    lng: 21.8569
  },
  {
    province: "Gauteng",
    change: 9,
    lat: -26.2708,
    lng: 28.1123
  },
  {
    province: "Free State",
    change: 4,
    lat: -28.4541,
    lng: 26.7968
  },
  {
    province: "KwaZulu-Natal",
    change: -104,
    lat: -28.5306,
    lng: 30.8958
  },
  {
    province: "Eastern Cape",
    change: -83,
    lat: -32.2968,
    lng: 26.4194
  },
  {
    province: "North West",
    change: -57,
    lat: -26.6639,
    lng: 25.2838
  },
  {
    province: "Limpopo",
    change: -55,
    lat: -23.4013,
    lng: 29.4179
  },
  {
    province: "Mpumalanga",
    change: -43,
    lat: -25.5653,
    lng: 30.5279
  },
  {
    province: "Northern Cape",
    change: -12,
    lat: -29.0467,
    lng: 21.8569
  }
];


/* =========================================================
   CREATE MAP
========================================================= */

const map = L.map(
  "saEmploymentMap",
  {
    scrollWheelZoom: false,
    zoomControl: true
  }
);


/* =========================================================
   MAP TILES
========================================================= */

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
).addTo(map);


/* =========================================================
   SOUTH AFRICA BOUNDS
========================================================= */

const southAfricaBounds = L.latLngBounds(
  [
    [-35.1, 16.0],
    [-22.0, 33.2]
  ]
);

map.fitBounds(
  southAfricaBounds,
  {
    padding: [25, 25]
  }
);


/* =========================================================
   HELPERS
========================================================= */

function getMarkerColour(change) {
  return change >= 0
    ? "#1aa89e"
    : "#ed6a5e";
}


function getMarkerRadius(change) {
  const magnitude = Math.abs(change);

  return Math.max(
    10,
    Math.min(
      30,
      9 + magnitude * 0.16
    )
  );
}


function formatChange(value) {
  if (value > 0) {
    return `+${value}k`;
  }

  if (value < 0) {
    return `−${Math.abs(value)}k`;
  }

  return "0k";
}


function getOrdinalSuffix(number) {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (
    mod10 === 1 &&
    mod100 !== 11
  ) {
    return "st";
  }

  if (
    mod10 === 2 &&
    mod100 !== 12
  ) {
    return "nd";
  }

  if (
    mod10 === 3 &&
    mod100 !== 13
  ) {
    return "rd";
  }

  return "th";
}


/* =========================================================
   CALCULATE MEDIAN
========================================================= */

const sortedChanges = provinceEmploymentData
  .map(
    province => province.change
  )
  .sort(
    (a, b) => a - b
  );

const medianChange =
  sortedChanges[
    Math.floor(
      sortedChanges.length / 2
    )
  ];


/* =========================================================
   RANK PROVINCES
   Highest employment movement = rank 1
========================================================= */

const rankedProvinces =
  [...provinceEmploymentData]
    .sort(
      (a, b) =>
        b.change - a.change
    );


/* =========================================================
   MAP MARKERS
========================================================= */

const provinceMarkers = {};


provinceEmploymentData.forEach(
  province => {

    const positive =
      province.change >= 0;

    const sign =
      positive
        ? "+"
        : "−";

    const absoluteChange =
      Math.abs(
        province.change
      );


    const marker =
      L.circleMarker(
        [
          province.lat,
          province.lng
        ],
        {
          radius:
            getMarkerRadius(
              province.change
            ),

          fillColor:
            getMarkerColour(
              province.change
            ),

          color:
            "#ffffff",

          weight:
            3,

          opacity:
            1,

          fillOpacity:
            0.9
        }
      )
      .addTo(map);


    marker.bindPopup(
      `
        <div class="province-popup">

          <strong>
            ${province.province}
          </strong>

          <div
            class="
              popup-change
              ${
                positive
                  ? "popup-positive"
                  : "popup-negative"
              }
            "
          >
            ${sign}${absoluteChange},000
          </div>

          <div class="popup-note">
            Change in employed persons
            <br>
            Q1 2025 vs Q4 2024
          </div>

        </div>
      `
    );


    marker.bindTooltip(
      `${province.province}: ${formatChange(province.change)}`,
      {
        direction: "top",
        offset: [0, -8]
      }
    );


    provinceMarkers[
      province.province
    ] = marker;

  }
);


/* =========================================================
   DOM REFERENCES
========================================================= */

const provinceSelect =
  document.getElementById(
    "provinceSelect"
  );

const selectedProvinceName =
  document.getElementById(
    "selectedProvinceName"
  );

const selectedChange =
  document.getElementById(
    "selectedChange"
  );

const selectedRank =
  document.getElementById(
    "selectedRank"
  );

const selectedMedianDifference =
  document.getElementById(
    "selectedMedianDifference"
  );

const provinceInsight =
  document.getElementById(
    "provinceInsight"
  );

const movementBadge =
  document.getElementById(
    "movementBadge"
  );


/* =========================================================
   RESET VIEW
========================================================= */

function resetProvinceView() {

  map.fitBounds(
    southAfricaBounds,
    {
      padding: [25, 25]
    }
  );


  Object.values(
    provinceMarkers
  )
  .forEach(
    marker => {

      marker.setStyle(
        {
          opacity: 1,
          fillOpacity: 0.9,
          weight: 3
        }
      );

      marker.closePopup();

    }
  );


  selectedProvinceName.textContent =
    "South Africa provincial overview";


  selectedChange.textContent =
    "9 provinces";


  selectedRank.textContent =
    "—";


  selectedMedianDifference.textContent =
    "Median −43k";


  movementBadge.textContent =
    "All provinces";


  movementBadge.className =
    "movement-badge";


  provinceInsight.textContent =
    "Western Cape recorded the strongest employment increase in the published provincial figures, while KwaZulu-Natal recorded the largest decline. Select a province to explore its movement relative to the rest of the country.";

}


/* =========================================================
   ANALYSE SELECTED PROVINCE
========================================================= */

function analyseProvince(
  provinceName
) {

  const province =
    provinceEmploymentData.find(
      item =>
        item.province === provinceName
    );


  if (!province) {

    resetProvinceView();

    return;

  }


  /* -------------------------
     Ranking
  ------------------------- */

  const rank =
    rankedProvinces.findIndex(
      item =>
        item.province === province.province
    ) + 1;


  /* -------------------------
     Median difference
  ------------------------- */

  const medianDifference =
    province.change -
    medianChange;


  /* -------------------------
     Highlight selected province
  ------------------------- */

  Object.entries(
    provinceMarkers
  )
  .forEach(
    ([name, marker]) => {

      if (
        name === provinceName
      ) {

        marker.setStyle(
          {
            opacity: 1,
            fillOpacity: 1,
            weight: 5
          }
        );

      }
      else {

        marker.setStyle(
          {
            opacity: 0.25,
            fillOpacity: 0.16,
            weight: 2
          }
        );

      }

    }
  );


  /* -------------------------
     Zoom to province
  ------------------------- */

  map.flyTo(
    [
      province.lat,
      province.lng
    ],
    7,
    {
      duration: 0.8
    }
  );


  /* -------------------------
     Open province popup
  ------------------------- */

  provinceMarkers[
    provinceName
  ].openPopup();


  /* -------------------------
     Update metrics
  ------------------------- */

  selectedProvinceName.textContent =
    province.province;


  selectedChange.textContent =
    formatChange(
      province.change
    );


  selectedRank.textContent =
    `${rank}${getOrdinalSuffix(rank)} of ${provinceEmploymentData.length}`;


  selectedMedianDifference.textContent =
    formatChange(
      medianDifference
    );


  /* -------------------------
     Movement badge
  ------------------------- */

  if (
    province.change >= 0
  ) {

    movementBadge.textContent =
      "Employment increase";

    movementBadge.className =
      "movement-badge positive";

  }
  else {

    movementBadge.textContent =
      "Employment decline";

    movementBadge.className =
      "movement-badge negative";

  }


  /* -------------------------
     Comparison wording
  ------------------------- */

  let medianPosition;

  if (
    province.change >
    medianChange
  ) {

    medianPosition =
      "above";

  }
  else if (
    province.change <
    medianChange
  ) {

    medianPosition =
      "below";

  }
  else {

    medianPosition =
      "equal to";

  }


  const movementWord =
    province.change >= 0
      ? "increase"
      : "decline";


  /* -------------------------
     Dynamic analyst narrative
  ------------------------- */

  provinceInsight.textContent =
    `${province.province} recorded an employment ${movementWord} of ${Math.abs(province.change)},000 people between Q4 2024 and Q1 2025. This places the province ${rank}${getOrdinalSuffix(rank)} out of ${provinceEmploymentData.length} provinces when ranked from strongest to weakest employment movement. Its result is ${Math.abs(medianDifference)},000 ${medianPosition} the provincial median movement of ${formatChange(medianChange)}.`;

}


/* =========================================================
   DROPDOWN EVENT
========================================================= */

provinceSelect.addEventListener(
  "change",
  event => {

    const selectedProvince =
      event.target.value;


    if (
      selectedProvince === "all"
    ) {

      resetProvinceView();

    }
    else {

      analyseProvince(
        selectedProvince
      );

    }

  }
);


/* =========================================================
   INITIAL VIEW
========================================================= */

resetProvinceView();