function getRandomInt(min: number, max: number): number {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);

  return Math.floor(Math.random() * (floorMax - ceilMin)) + ceilMin;
}

export default getRandomInt;
