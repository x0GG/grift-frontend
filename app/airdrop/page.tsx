import { Heading } from "@/components/Heading"
import styles from "./airdrop.module.scss"
export default function Page() {
  return (
    <>
      <Heading
        title="Airdrop Tasks"
        txt="Listing is on its way. Taks will appear below. Complete them to participate in the airdrop."
      />
      <div className={styles.coming}>Coming soon...</div>
    </>
  )
}
