export async function fetchAsync(url, method, body, headers) {
  switch (method) {
    case "GET": {
      try {
        const response = await fetch(url);
        return response.json();
      } catch (error) {
        return undefined;
      }
    }
    case "POST": {
      try {
        const response = await fetch(url, {
          method: method,
          headers: headers
            ? headers
            : {
                "Content-Type": "application/json"
              },
          body: body
        });
        return response.json();
      } catch (error) {
        console.log("error", error);
        return undefined;
      }
    }
  }
}
