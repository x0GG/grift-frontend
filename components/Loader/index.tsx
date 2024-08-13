import styles from "./Loader.module.scss";
import { HOST } from "@/config/constants";

export default function Loader() {
    return <div id="clicker-loader" className={styles.loader}>
        <div className={styles.top}>
            
        </div>
        <img src={"/img/loading.svg"} width={85} height={85} alt="Loading" />
        <div className={styles.bottom}>
            
        </div>
    </div>;
}