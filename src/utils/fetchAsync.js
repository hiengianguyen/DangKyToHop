export async function fetchAsync(url, method, body, headers, isParseJson = false) {
  switch (method) {
    case "GET": {
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        console.log("error", error);
        return undefined;
      }
    }
    case "POST": {
      try {
        console.log(url, method, headers, body, isParseJson);
        const response = await fetch(url, {
          method: method,
          headers: headers
            ? headers
            : {
                "Content-Type": "application/json"
              },
          body: isParseJson ? JSON.stringify(body) : body
        });
        return await response.json();
      } catch (error) {
        console.log("error", error);
        return undefined;
      }
    }
  }
}
