const Logger = {
  info(msg = "", options = {}) {
    console.info(`%c ${msg} `, "background: aqua; color: black", options);
  },
  warn(msg = "", options = {}) {
    console.warn(`%c ${msg} `, "background: black; color: yellow", options);
  },
  success(msg = "", options = {}) {
    console.log(`%c ${msg} `, "background: lime; color: black", options);
  },
  error(msg = "", options = {}) {
    console.error(`%c ${msg} `, "background: salmon; color: black", options);
  },
  misc(msg = "", options = {}) {
    console.log("%c ${msg} ", "background: black; color: lime", options);
  }
};

export default Logger;
