const toRad = (deg) => (deg * Math.PI) / 180;

const mToMi = (m) => m * 0.0006213712;

const earthRadius = 6371e3;

const haversine = (c1, c2) => {
  const [lat1, long1] = c1;
  const [lat2, long2] = c2;

  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);
  const long1Rad = toRad(long1);
  const long2Rad = toRad(long2);

  const distance =
    2 * earthRadius *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin((lat2Rad - lat1Rad) / 2), 2) +
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.pow(Math.sin((long2Rad - long1Rad) / 2), 2)
      )
    );

  return mToMi(distance);
};

module.exports = haversine;
