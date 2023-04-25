import { DocumentRow } from "@/components/FileList/DocumentRow";
import styles from "./Dashboard.module.css";

const ids = [...Array(30).keys()];

export function FileList() {
  return <div className={styles.dashboard}>file list</div>;
}
