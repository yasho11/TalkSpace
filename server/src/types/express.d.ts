declare namespace Express {
  export interface Request {
    userId?: string; // Make sure to use the correct type for userId, e.g., string or ObjectId based on your setup
  }
}
