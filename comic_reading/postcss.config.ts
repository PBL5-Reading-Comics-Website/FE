// postcss.config.mjs
import tsNode from 'ts-node';

tsNode.register({
  compilerOptions: {
    module: 'commonjs'
  }
});

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};