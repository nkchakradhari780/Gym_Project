import styles from '@/app/ui/dashboard/plans/plans.module.css'
import PlanAvailable from '@/app/ui/dashboard/plan-avail/plan-avail';


const PlanTrainerPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <PlanAvailable />

            </div>
        </div>

    );
};

export default PlanTrainerPage;
