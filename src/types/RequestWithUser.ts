declare global {
  namespace Express {
    interface Request {
      user?: any; // or whatever type you're assigning
    }
  }
}
export {};
