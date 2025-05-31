'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/ui/dashboard/plans/addPlan/addPlan.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PlanPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        planID: '',
        planName: '',
        level: '',
        price: '',
        category: '',
        duration: '',
        facilities: [],
        trainer: '',  // Added field for selected trainer
    });
    const [trainersList, setTrainersList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    // Handle form field change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle facility checkboxes change
    const handleFacilitiesChange = (event) => {
        const { value, checked } = event.target;
        setFormData((prevData) => {
            const facilities = checked
                ? [...prevData.facilities, value]
                : prevData.facilities.filter((facility) => facility !== value);
            return { ...prevData, facilities };
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { planID, planName, level, price, category, duration, facilities, trainer } = formData;

        // Find the selected trainer's full details from the trainers list
        const selectedTrainer = trainersList.find((trainer) => trainer._id === formData.trainer);
        
        if (!selectedTrainer) {
            setError("Trainer not selected or invalid.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/owner/plans/create',
                {
                    planID,
                    planName,
                    level,
                    price,
                    category,
                    duration,
                    facilities,
                    trainer: [{
                        trainerID: selectedTrainer._id,         // Send trainer ID
                        trainerName: selectedTrainer.fullName,  // Send trainer Name
                        trainerLevel: selectedTrainer.level     // Send trainer level
                    }],
                },
                {
                    withCredentials: true,
                }
            );
            setSuccess(true);
            setError("");
            alert("Plan added successfully");
            router.push("/dashboard-admin/plans");
        } catch (error) {
            setError("Error adding Plan");
            setSuccess(false);
            alert("Failed to add Plan");
            console.log("Error Adding Plan:", error.message);
        }
    };

    // Fetch trainers list
    useEffect(() => {
        const fetchTrainersList = async () => {
            try {
                const trainer = await axios.get('http://localhost:3001/owner/trainer', {
                    withCredentials: true,
                });

                if (trainer.data && trainer.data.trainers) {
                    console.log('Trainer List:', trainer.data.trainers);
                    setTrainersList(trainer.data.trainers);
                } else {
                    console.log('No data returned from API');
                    setError('No data returned from API');
                }
            } catch (error) {
                console.error('Error fetching trainer list', error.message);
                setError(error.message);
            } finally {
                setLoading(false);  // Set loading to false after fetching
            }
        };

        fetchTrainersList();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h2 className={styles.heading}>Create New Plan</h2>
                <Link href="/dashboard-admin/plans">
                    <button className={styles.backButton}>Back</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                {/* Plan ID Input Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Plan ID <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="text"
                        name="planID"
                        className={styles.inputField}
                        value={formData.planID}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Plan Name Input Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Plan Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="text"
                        name="planName"
                        className={styles.inputField}
                        value={formData.planName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Level Select Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Level <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                        name="level"
                        className={styles.selectField}
                        value={formData.level}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="medium">Medium</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                {/* Price Input Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Price (₹) <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        className={styles.inputField}
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="100"
                        required
                    />
                </div>

                {/* Category Select Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Category <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                        name="category"
                        className={styles.selectField}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="flexibility">Flexibility</option>
                        <option value="endurance">Endurance</option>
                    </select>
                </div>

                {/* Duration Input Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Duration (months) <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="number"
                        name="duration"
                        className={styles.inputField}
                        value={formData.duration}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        required
                    />
                </div>

                {/* Trainer Select Field */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Select Trainer 
                    </label>
                    <select
                        name="trainer"
                        className={styles.selectField}
                        value={formData.trainer}
                        onChange={handleChange}
                    >   
                        <option value="" disabled>Select a Trainer</option>
                        {trainersList.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                                {trainer.fullName} ({trainer.level})  {/* Display the trainer's level */}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Facilities Checkboxes */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Facilities <span className={styles.requiredStar}>*</span>
                    </label>
                    <div className={styles.facilitiesContainer}>
                        {['gym', 'pool', 'changing room', 'personal trainer', 'group classes'].map((facility) => (
                            <div key={facility} className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id={facility}
                                    name="facilities"
                                    value={facility}
                                    checked={formData.facilities.includes(facility)}
                                    onChange={handleFacilitiesChange}
                                    className={styles.checkbox}
                                />
                                <label htmlFor={facility} className={styles.checkboxLabel}>
                                    {facility.charAt(0).toUpperCase() + facility.slice(1).replace(/_/g, ' ')}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    Create
                </button>
            </form>
        </div>
    );
};

export default PlanPage;
