import { ComponentProps } from "react";

type Props = {
  iconSize: "sm" | "md";
} & ComponentProps<"svg">;

export function CrossIcon(props: Props) {
  const { iconSize, ...otherProps } = props;

  if (iconSize === "sm") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
        {...otherProps}
      >
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    );
  }

  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...otherProps}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
