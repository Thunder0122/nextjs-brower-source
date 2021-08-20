/**
 * Inspired by https://loading.io/css/
 */
import styles from "./AppLoadingSpinner.module.css";

export type AppLoadingSpinnerProps = {
  width?: `${number}px` | number;
  color?: string;
};

AppLoadingSpinner.defaultProps = {
  width: "100px",
  color: "#900000",
} as AppLoadingSpinnerProps;

export default function AppLoadingSpinner({
  width,
  color,
}: AppLoadingSpinnerProps): JSX.Element {
  const formattedWidth = typeof width === "number" ? `${width}px` : width;
  return (
    <div
      className={styles.root}
      style={
        {
          "--custom-width": formattedWidth,
          "--custom-color": color,
        } as React.CSSProperties
      }
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
