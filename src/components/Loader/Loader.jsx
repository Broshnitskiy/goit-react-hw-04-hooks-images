import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.Spinner}>
      <Oval
        arialLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="red"
        secondaryColor="yellow"
      />
    </div>
  );
};
