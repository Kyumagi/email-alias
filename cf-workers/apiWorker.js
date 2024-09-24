export default {
  async fetch(request, env) {
    // get url parameters
    const urlParams = new URLSearchParams(
      "".concat(...request.url.split("/").slice(3)),
    );

    if (urlParams.get("token") === env.ACCESS_TOKEN) {
      try {
        switch (urlParams.get("action")) {
          // fetch the original email address behind an alias
          case "fetch": {
            const res = await env.DB.prepare(
              "SELECT original FROM aliases WHERE alias=?",
            )
              .bind(urlParams.get("alias"))
              .first();
            const jsonResponse = JSON.stringify({ status: 1, res });
            return new Response(jsonResponse);
          }

          // fetch all aliases that belong to an email address
          case "fetchall": {
            const res = await env.DB.prepare(
              "SELECT alias FROM aliases WHERE original=?",
            )
              .bind(urlParams.get("original"))
              .all();
            const jsonResponse = JSON.stringify({
              status: res ? 1 : 0,
              aliases: res["results"],
            });
            return new Response(jsonResponse);
          }

          // add an alias for an email address
          case "add": {
            const res = await env.DB.prepare(
              "SELECT original FROM aliases WHERE alias=?",
            )
              .bind(urlParams.get("alias"))
              .first();
            if (!res) {
              const alias = urlParams.get("alias");
              const original = urlParams.get("original");
              try {
                const addRes = await env.DB.exec(
                  `INSERT INTO aliases (original, alias) VALUES ("${original}", "${alias}")`,
                );
                return new Response(
                  JSON.stringify({
                    status: 1,
                    result: addRes,
                    error: null,
                    message: "Alias added successfully.",
                  }),
                );
              } catch (e) {
                console.error(e);
                return new Response(
                  JSON.stringify({
                    status: 0,
                    error: e.message,
                    message: "Something went wrong.",
                  }),
                );
              }
            }
            return new Response(
              JSON.stringify({
                status: 0,
                error: "This alias is not available.",
                message: "This alias is not available.",
              }),
            );
          }
          case "delete": {
            try {
              const res = await env.DB.exec(
                `DELETE FROM aliases WHERE alias="${urlParams.get("alias")}"`,
              );
              return new Response(
                JSON.stringify({
                  result: res,
                  status: 1,
                  error: null,
                  messsage: "Alias deleted successfully.",
                }),
              );
            } catch (e) {
              return new Response(
                JSON.stringify({
                  status: 0,
                  error: e.message,
                  messsage: "Something went wrong.",
                }),
              );
            }
          }
          default:
            return new Response(
              JSON.stringify({ status: 0, error: "Action not specified." }),
            );
        }
      } catch (e) {
        return new Response(
          JSON.stringify({
            status: 0,
            error: e.message,
            message: "Something went wrong.",
          }),
        );
      }
    }
    return new Response(
      JSON.stringify({
        status: 0,
        error: "Access token is wrong or not provided.",
      }),
    );
  },
};
