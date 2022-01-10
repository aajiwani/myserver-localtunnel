const localtunnel = require("localtunnel");
const portConfig = require("./config");

async function createTunnel(port) {
  const tunnel = await localtunnel({ port: port });

  tunnel.on("close", () => {
    // tunnels are closed
  });

  tunnel.on("error", () => {
    createTunnel(port);
  });

  const portCfg = portConfig.ports.find((x) => x.value === port);

  axios
    .post(portConfig.keyvalueStore.GetUpdateAPI(portCfg.key, tunnel.url), {})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

(async () => {
  for (const port of portConfig.ports) {
    await createTunnel(port.value);
  }
})();
