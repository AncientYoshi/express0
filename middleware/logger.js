import colors from "colors";

const logger = (req, res, next) => {
  const methodColor = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };
  const color = methodColor[req.method] || "white";
  const coloredMethod = colors[color](req.method);
  const coloredurl = colors[color](req.url); // <- this is the key

  console.log(`${coloredMethod} ${coloredurl}`);
  next();
};

export default logger;
