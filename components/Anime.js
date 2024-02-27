import styles from "@/styles/Anime.module.css"

export default function Anime() {
    return (
        <div className={`${styles.loader} ${styles.triangle}`}>
            <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
        </div>
    )
}
