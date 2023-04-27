const getDeviceType = ({ device }) => {
  console.log(device);
  const deviceType = device.type;

  if (deviceType === "phone") return "mobile";

  return deviceType;
};

module.exports = getDeviceType;
