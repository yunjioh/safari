import { useEffect, useRef } from "react";
import "./ScrollReveal.css"

const ScrollReveal = ({
  children,
  animation = "fadeUp",
  delay = 0,
  once = false
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("show");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("show");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
