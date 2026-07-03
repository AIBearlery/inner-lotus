// Type declarations for CSS imports (Metro/web handles these at bundle time;
// this only satisfies the TypeScript compiler for side-effect and module CSS imports).
declare module '*.css';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
