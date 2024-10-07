export const runWithCatch = (cb: () => void) => {
  try {
    cb();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`${error.name}: ${error.message}`);
    } else {
      console.log("Something went wrong");
    }
  }
};
