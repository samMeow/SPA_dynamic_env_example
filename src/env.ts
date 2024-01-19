// This file only used in local development time
// after build time it should be resolve to '/env.js' instead to enable switching env after built assets
// not using json as import assertion is still in tc39, which blocks firefox/safari from loading
const defaultEnv = import.meta.env;
export default defaultEnv;