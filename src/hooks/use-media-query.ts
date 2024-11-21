"use client";

import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  const mediaQueryRef = React.useRef<MediaQueryList>();

  React.useLayoutEffect(() => {
    const mediaQuery = window.matchMedia(query);
    mediaQueryRef.current = mediaQuery;

    const onChange = () => {
      setValue(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    setValue(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}
