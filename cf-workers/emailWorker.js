export default {
  async email(message, env) {
    const res = await fetch(
      `https://forwarder-util.newsubdom.workers.dev/?token=${env.ACCESS_TOKEN}&action=fetch&alias=${message.to}`,
    );
    const jsonRes = await res.json();
    if (jsonRes.status && jsonRes.res.original) {
      await message.forward(jsonRes.res.original);
    }
  },
};
