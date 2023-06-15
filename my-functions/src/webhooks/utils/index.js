export const responseBuilder = (code = 200, data = {}, headers = {}) => {
    if (code >= 400) {
      const err = {
        headers,
        statusCude: code,
        body: JSON.stringify({
          errors: data.errors,
          timestamp: new Date().toJSON()
        })
      }
  
      console.log(err)
  
      return err
    }
    return {
      headers,
      statusCode: code,
      body: JSON.stringify(data)
    }
  }