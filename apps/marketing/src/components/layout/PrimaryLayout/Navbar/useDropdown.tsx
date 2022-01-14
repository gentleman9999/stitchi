import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useDropdown<T = string | boolean>() {
  const router = useRouter();
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    const handleRouteChange = () => {
      setActive(null);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const handleClick = (value: T) => {
    if (active === value) {
      setActive(null);
    } else {
      setActive(value);
    }
  };

  const handleClose = () => {
    if (active) {
      setActive(null);
    }
  };

  return { active, handleClick, handleClose };
}
