declare module '*.webp' {
  const content: import('next/dist/shared/lib/get-img-props').StaticImport
  export default content
}

declare module '*.png' {
  const content: import('next/dist/shared/lib/get-img-props').StaticImport
  export default content
}

declare module '*.jpg' {
  const content: import('next/dist/shared/lib/get-img-props').StaticImport
  export default content
}

declare module '*.jpeg' {
  const content: import('next/dist/shared/lib/get-img-props').StaticImport
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}
