
import { useState } from "react";
import axios from "axios";
import { COURSES_ENDPOINT } from "./endpoints";

export const useCourses = () => {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const { data } = await axios.get(COURSES_ENDPOINT);
            setCourses(data);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
    return { courses, isLoading, error };

}