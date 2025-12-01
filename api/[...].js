import { app, initializeApp } from '../dist/index.cjs';

let initialized = false;

export default async (req, res) => {
  if (!initialized) {
    await initializeApp();
    initialized = true;
  }
  app.handle(req, res);
};
