export.generateRFIDId=async (req, res)=> {
    // Generate a random 8-byte hexadecimal string
    return randomBytes(8).toString('hex').toUpperCase();
  }
  