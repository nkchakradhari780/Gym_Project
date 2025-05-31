import styles from './rightbar-notifi.module.css'
import Image from 'next/image'
import { format } from 'date-fns'; // Import date-fns for formatting

const RightbarNotifi = () => {
    const currentDateTime = new Date(); // Get the current date and time
    const formattedDateTime = format(currentDateTime, 'dd/MM/yyyy HH:mm'); // Format the date and time

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image 
                        src="/images/coverimage.jpg" 
                        alt="" 
                        fill 
                        className={styles.bg} 
                    />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>Announcement</span>
                    <p className={styles.msg}>
                        Today Gym Will Be Closed. Please Enjoy the day. If anyone wants to come to office, they are dearly welcome.
                    </p>
                    <span className={styles.dateTime}>{formattedDateTime}</span> {/* Date and time display */}
                </div>
            </div>
        </div>
    )
}

export default RightbarNotifi;
