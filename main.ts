// declare default min and max
const DEFAULT_MAX = 1000;
const DEFAULT_MIN = 0;

// start server
Deno.serve(function (request) {
  // get incoming url
  const url = new URL(request.url);

  // set max variable to default
  // if query param is provided, and it's not greater than default max, use that value
  let max = DEFAULT_MAX;
  const maxParam = url.searchParams.get("max");
  if (maxParam) {
    const userMax = parseInt(maxParam);
    if (isNaN(userMax)) {
      return new Response(`max must be a number`, {
        status: 400,
      });
    }
    if (userMax > DEFAULT_MAX) {
      return new Response(`max must be less than or equal to ${DEFAULT_MAX}`, {
        status: 400,
      });
    }
    max = userMax;
  }

  // set min variable to default
  // if query param is provided, and it's not less than default min, use that value
  let min = DEFAULT_MIN;
  const minParam = url.searchParams.get("min");
  if (minParam) {
    const userMin = parseInt(minParam);
    if (isNaN(userMin)) {
      return new Response(`min must be a number`, {
        status: 400,
      });
    }
    if (userMin < DEFAULT_MIN) {
      return new Response(
        `min must be greater than or equal to ${DEFAULT_MIN}`,
        {
          status: 400,
        }
      );
    }
    min = userMin;
  }

  // check that min is actually less than max
  if (min > max) {
    return new Response("min must be less than or equal max", { status: 400 });
  }

  // calculate random number, between min and max
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  // return number
  return new Response(randomNum.toString());
});
